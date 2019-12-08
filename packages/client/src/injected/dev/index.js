import { DANMU, GIFT, GUARD } from '../../share/constant';

class Injected {
    constructor() {
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
                                        uid: item.dataset.uid,
                                        uname: item.dataset.uname,
                                        danmaku: item.dataset.danmaku,
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
                                        uname: item.querySelector('.username').innerText.trim(),
                                        action: item.querySelector('.action').innerText.trim(),
                                        gift: item.querySelector('.gift-name').innerText.trim(),
                                        count: item.querySelector('.count').innerText.trim(),
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
                                        uname: item.querySelector('.username').innerText.trim(),
                                        action: '购买',
                                        gift: '舰长',
                                        count: item.querySelector('.count').innerText.trim(),
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
                                    uname: item.querySelector('.username').innerText.trim(),
                                    action: item.querySelector('.action').innerText.trim(),
                                    gift: item.querySelector('.gift-name').innerText.trim(),
                                    count: item.querySelector('.count').innerText.trim(),
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
                const chatHistoryList = document.getElementById('chat-history-list');
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
                const penuryGiftMsg = document.getElementById('penury-gift-msg');
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
