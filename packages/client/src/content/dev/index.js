import './index.scss';
import { DANMU, GIFT, GUARD } from '../../share/constant';

function query(el, doc = document) {
    return doc.querySelector(el);
}

class Content {
    constructor() {
        if (!query('.blh-danmuku')) {
            this.createUI();
            this.eventBind();
            this.receiveDanmu();
        } else {
            query('.blh-danmuku .blh-danmu-inner').innerHTML = '';
            query('.blh-danmuku .blh-gift-inner').innerHTML = '';
        }
    }

    createUI() {
        this.manifest = chrome.runtime.getManifest();
        this.$danmuku = document.createElement('div');
        this.$danmuku.classList.add('blh-danmuku');
        this.$danmuku.innerHTML = `
            <div class="blh-header">
                <div class="blh-header-l"></div>
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
        this.$headR = query('.blh-header-r', this.$danmuku);
        this.$danmu = query('.blh-danmu', this.$danmuku);
        this.$danmuInner = query('.blh-danmu-inner', this.$danmuku);
        this.$gift = query('.blh-gift', this.$danmuku);
        this.$giftInner = query('.blh-gift-inner', this.$danmuku);
        this.$footer = query('.blh-footer', this.$danmuku);
        this.$headL.textContent = `${this.manifest.name} ${this.manifest.version}`;
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
        if (children.length > 50) {
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
        if (children.length > 50) {
            const child = children[0];
            query('.blh-gift-uname', child).innerText = `${gift.uname}:`;
            query('.blh-gift-text', child).innerText = `${gift.action} ${gift.gift} ${gift.count}`;
            this.$giftInner.appendChild(child);
        } else {
            this.$giftInner.insertAdjacentHTML(
                'beforeend',
                `
                <div class="blh-gift-item">
                    <span class="blh-gift-uname">${gift.uname}:</span>
                    <span class="blh-gift-text">${gift.action} ${gift.gift} ${gift.count}</span>
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

    receiveDanmu() {
        if (!chrome) return;
        chrome.runtime.onMessage.addListener(request => {
            const { type, data } = request;
            window.postMessage(request);
            switch (type) {
                case DANMU:
                    this.addDanmu(data);
                    break;
                case GIFT:
                case GUARD:
                    this.addGift(data);
                    break;
                default:
                    break;
            }
        });
    }
}

export default new Content();
