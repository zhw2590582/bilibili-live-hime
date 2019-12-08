class Injected {
    constructor() {
        this.getPlayer().then(player => {
            const { add } = player.components.danmaku;
            player.components.danmaku.add = function f(...arg) {
                const result = add.call(this, ...arg);
                window.postMessage({
                    type: 'danmu',
                    data: arg[0],
                });
                return result;
            };
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
}

export default new Injected();
