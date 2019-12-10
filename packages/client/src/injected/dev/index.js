import { DANMU, GIFT, GUARD, BLH } from '../../share/constant';

function query(el, doc = document) {
    return doc.querySelector(el);
}

class Injected {
    constructor() {
        if (window.location.href.includes(BLH)) {
            this.init();
        }
    }

    init() {
        this.getChatHistoryList().then(chatHistoryList => {
            const observer = new MutationObserver(mutationsList => {
                mutationsList.forEach(mutations => {
                    const addedNodes = Array.from(mutations.addedNodes || []);
                    addedNodes.forEach(item => {
                        // 弹幕
                        if (item.classList.contains('danmaku-item')) {
                            try {
                                window.postMessage({
                                    type: DANMU,
                                    data: {
                                        uid: Number(item.dataset.uid),
                                        uname: item.dataset.uname.trim(),
                                        text: item.dataset.danmaku.trim(),
                                    },
                                });
                            } catch (error) {
                                //
                            }
                        }

                        // 礼物
                        if (item.classList.contains('gift-item')) {
                            try {
                                window.postMessage({
                                    type: GIFT,
                                    data: {
                                        uid: null,
                                        uname: query('.username', item).innerText.trim(),
                                        action: query('.action', item).innerText.trim(),
                                        gift: query('.gift-name', item).innerText.trim(),
                                        num: query('.gift-num', item).innerText.trim(),
                                        count: query('.gift-count', item).innerText.trim(),
                                    },
                                });
                            } catch (error) {
                                //
                            }
                        }

                        // 上船
                        if (item.classList.contains('guard-buy')) {
                            try {
                                window.postMessage({
                                    type: GUARD,
                                    data: {
                                        uid: null,
                                        uname: query('.username', item).innerText.trim(),
                                        action: '购买',
                                        gift: '舰长',
                                        num: '',
                                        count: query('.count', item).innerText.trim(),
                                    },
                                });
                            } catch (error) {
                                //
                            }
                        }
                    });
                });
            });
            observer.observe(chatHistoryList, { childList: true });
        });

        this.getPenuryGiftMsg().then(penuryGiftMsg => {
            const observer = new MutationObserver(mutationsList => {
                mutationsList.forEach(mutations => {
                    const addedNodes = Array.from(mutations.addedNodes || []);
                    addedNodes.forEach(item => {
                        try {
                            window.postMessage({
                                type: GIFT,
                                data: {
                                    uid: null,
                                    uname: query('.username', item).innerText.trim(),
                                    action: query('.action', item).innerText.trim(),
                                    gift: query('.gift-name', item).innerText.trim(),
                                    num: '',
                                    count: query('.count', item).innerText.trim(),
                                },
                            });
                        } catch (error) {
                            //
                        }
                    });
                });
            });
            observer.observe(penuryGiftMsg, { childList: true });
        });
    }

    getChatHistoryList() {
        return new Promise(resolve => {
            (function loop() {
                const chatHistoryList = query('#chat-history-list');
                if (!chatHistoryList) {
                    setTimeout(loop, 1000);
                } else {
                    resolve(chatHistoryList);
                }
            })();
        });
    }

    getPenuryGiftMsg() {
        return new Promise(resolve => {
            (function loop() {
                const penuryGiftMsg = query('#penury-gift-msg');
                if (!penuryGiftMsg) {
                    setTimeout(loop, 1000);
                } else {
                    resolve(penuryGiftMsg);
                }
            })();
        });
    }
}

export default new Injected();
