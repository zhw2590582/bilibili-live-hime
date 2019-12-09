var art = new Artplayer({
    container: '.artplayer-app',
    url: './demo.mp4',
    setting: true,
});

art.on('ready', function() {
    // 电影列表
    art.layers.add({
        name: 'movie',
        html: 'movie',
    });

    // 礼物积分信息
    art.layers.add({
        name: 'gift',
        html: 'gift',
    });

    // 公告
    art.layers.add({
        name: 'notice',
        html: 'notice',
    });

    // 新建用户表
    art.setting.add({
        name: 'newUserTable',
        html: 'newUserTable',
    });

    // 导入用户表
    art.setting.add({
        name: 'uploadUserTable',
        html: 'uploadUserTable',
    });

    // 导入电影
    art.setting.add({
        name: 'uploadMovie',
        html: 'uploadMovie',
    });

    // 监听弹幕
    window.addEventListener('message', function(event) {
        var type = event.data.type;
        var data = event.data.data;
        switch (type) {
            case 'danmu':
                console.log('弹幕', data);
                break;
            case 'gift':
                console.log('礼物', data);
                break;
            case 'guard':
                console.log('上船', data);
                break;
            default:
                break;
        }
    });
});
