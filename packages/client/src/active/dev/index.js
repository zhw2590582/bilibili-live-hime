import './index.scss';
import './DanmakuWebSocket';
import { DANMU_OPTION, MAX_DANMU } from '../../share/constant';

function query(el, doc = document) {
    return doc.querySelector(el);
}

class Content {
    constructor() {
        chrome.runtime.onMessage.addListener(request => {
            if (query('.blh-danmuku')) return;
            const { type, data } = request;
            switch (type) {
                case DANMU_OPTION: {
                    this.dws = new window.DanmakuWebSocket({
                        ...data,
                        onInitialized: () => {
                            if (!query('.blh-danmuku')) {
                                this.createUI();
                                this.eventBind();
                            }
                        },
                        onReceivedMessage: msg => {
                            window.postMessage(msg);
                            this.receivedMessage(msg);
                        },
                    });
                    break;
                }
                default:
                    break;
            }
        });
    }

    receivedMessage(msg) {
        const { cmd, info, data } = msg;
        switch (cmd) {
            case 'DANMU_MSG':
                this.addDanmu({
                    uname: info[2][1],
                    text: info[1],
                });
                break;
            case 'SEND_GIFT':
                this.addGift({
                    uname: data.uname,
                    action: data.action,
                    gift: data.giftName,
                    num: data.num,
                });
                break;
            case 'GUARD_BUY':
                this.addGift({
                    uname: data.username,
                    action: '购买',
                    gift: data.gift_name,
                    num: data.num,
                });
                break;
            case 'ROOM_REAL_TIME_MESSAGE_UPDATE':
                this.$version.style.display = 'none';
                this.$roomid.innerText = `房间：${data.roomid}`;
                this.$fans.innerText = `粉丝：${data.fans}`;
                break;
            default:
                break;
        }
    }

    createUI() {
        this.manifest = chrome.runtime.getManifest();
        this.$danmuku = document.createElement('div');
        this.$danmuku.classList.add('blh-danmuku');
        this.$danmuku.innerHTML = `
            <div class="blh-header">
                <div class="blh-header-l">
                    <span class="blh-version"></span>
                    <span class="blh-roomid"></span>
                    <span class="blh-fans"></span>
                </div>
                <div class="blh-header-r">×</div>
            </div>
            <div class="blh-danmu">
                <div class="blh-danmu-inner"></div>
            </div>
            <div class="blh-gift">
                <div class="blh-gift-inner"></div>
            </div>
            <div class="blh-footer"></div>
        `;
        this.$headL = query('.blh-header-l', this.$danmuku);
        this.$version = query('.blh-version', this.$danmuku);
        this.$roomid = query('.blh-roomid', this.$danmuku);
        this.$fans = query('.blh-fans', this.$danmuku);
        this.$headR = query('.blh-header-r', this.$danmuku);
        this.$danmu = query('.blh-danmu', this.$danmuku);
        this.$danmuInner = query('.blh-danmu-inner', this.$danmuku);
        this.$gift = query('.blh-gift', this.$danmuku);
        this.$giftInner = query('.blh-gift-inner', this.$danmuku);
        this.$footer = query('.blh-footer', this.$danmuku);
        this.$version.textContent = `${this.manifest.name} ${this.manifest.version}`;
        document.body.appendChild(this.$danmuku);

        this.$icon = document.createElement('div');
        this.$icon.classList.add('blh-danmuku-icon');
        this.$icon.textContent = '弹';
        document.body.appendChild(this.$icon);
    }

    eventBind() {
        let isHeadDroging = false;
        let isFootDroging = false;
        let lastPageX = 0;
        let lastPageY = 0;
        let lastLeft = 0;
        let lastTop = 0;
        let lastHeight = 0;

        this.$headL.addEventListener('mousedown', event => {
            isHeadDroging = true;
            lastPageX = event.pageX;
            lastPageY = event.pageY;
            lastLeft = this.$danmuku.offsetLeft;
            lastTop = this.$danmuku.offsetTop;
        });

        this.$footer.addEventListener('mousedown', event => {
            isFootDroging = true;
            lastPageY = event.pageY;
            lastHeight = this.$danmu.clientHeight;
        });

        document.addEventListener('mousemove', event => {
            if (isHeadDroging) {
                const x = event.pageX - lastPageX;
                const y = event.pageY - lastPageY;
                this.$danmuku.style.transform = `translate(${x}px, ${y}px)`;
            }

            if (isFootDroging) {
                const height = lastHeight + event.pageY - lastPageY;
                if (height >= 100) {
                    this.$danmu.style.height = `${height}px`;
                } else {
                    isFootDroging = false;
                }
            }

            if (event.composedPath().indexOf(this.$danmuku) > -1) {
                this.isHover = true;
            } else {
                this.isHover = false;
            }
        });

        document.addEventListener('mouseup', event => {
            if (isHeadDroging) {
                isHeadDroging = false;
                this.$danmuku.style.transform = 'translate(0, 0)';
                const x = lastLeft + event.pageX - lastPageX;
                const y = lastTop + event.pageY - lastPageY;
                this.$danmuku.style.left = `${x}px`;
                this.$danmuku.style.top = `${y}px`;
            }

            if (isFootDroging) {
                isFootDroging = false;
            }
        });

        this.$headR.addEventListener('click', () => {
            this.$danmuku.style.display = 'none';
            this.$icon.style.display = 'block';
        });

        this.$icon.addEventListener('click', () => {
            this.$danmuku.style.display = 'block';
            this.$icon.style.display = 'none';
        });
    }

    addDanmu(danmu) {
        const { children } = this.$danmuInner;
        if (children.length > MAX_DANMU) {
            const child = children[0];
            query('.blh-danmu-uname', child).innerText = `${danmu.uname}:`;
            query('.blh-danmu-text', child).innerText = danmu.text;
            this.$danmuInner.appendChild(child);
        } else {
            this.$danmuInner.insertAdjacentHTML(
                'beforeend',
                `
                <div class="blh-danmu-item">
                    <span class="blh-danmu-uname">${danmu.uname}:</span>
                    <span class="blh-danmu-text">${danmu.text}</span>
                </div>
            `,
            );
        }
        if (!this.isHover) {
            clearTimeout(this.danmuTimer);
            this.danmuTimer = setTimeout(() => {
                this.$danmu.scrollTo(0, this.$danmu.scrollHeight);
            }, 100);
        }
    }

    addGift(gift) {
        const { children } = this.$giftInner;
        if (children.length > MAX_DANMU) {
            const child = children[0];
            query('.blh-gift-uname', child).innerText = `${gift.uname}:`;
            query('.blh-gift-text', child).innerText = `${gift.action} ${gift.gift} X ${gift.num}`;
            this.$giftInner.appendChild(child);
        } else {
            this.$giftInner.insertAdjacentHTML(
                'beforeend',
                `
                <div class="blh-gift-item">
                    <span class="blh-gift-uname">${gift.uname}:</span>
                    <span class="blh-gift-text">${gift.action} ${gift.gift} X ${gift.num}</span>
                </div>
            `,
            );
        }
        if (!this.isHover) {
            clearTimeout(this.giftTimer);
            this.giftTimer = setTimeout(() => {
                this.$gift.scrollTo(0, this.$gift.scrollHeight);
            }, 100);
        }
    }
}

export default new Content();
