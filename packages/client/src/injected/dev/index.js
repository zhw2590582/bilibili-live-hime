import { DANMU, GIFT } from '../../share/constant';

class Injected {
    constructor() {
        this.getPlayer().then(player => {
            Object.defineProperty(player, 'getVisibilityStatus', {
                value: () => true,
            });

            const { addDanmaku } = player;
            player.addDanmaku = function f(...arg) {
                const result = addDanmaku.call(this, ...arg);
                window.postMessage({
                    type: DANMU,
                    data: arg[0],
                });
                return result;
            };
        });

        this.getChatHistoryList().then(chatHistoryList => {
            console.log(chatHistoryList);
        });

        this.getPenuryGiftMsg().then(penuryGiftMsg => {
            console.log(penuryGiftMsg);
        });
    }

    getPlayer() {
        return new Promise(resolve => {
            (function loop() {
                if (!window.EmbedPlayer || !window.EmbedPlayer.playerInstance) {
                    setTimeout(loop, 1000);
                } else if (window.EmbedPlayer.playerInstance.play) {
                    const instance = window.EmbedPlayer.playerInstance.play();
                    resolve(instance);
                } else {
                    setTimeout(loop, 1000);
                }
            })();
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
