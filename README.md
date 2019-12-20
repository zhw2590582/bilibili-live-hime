# :strawberry: Chrome 扩展 - Bilibili 直播姬

> 把浏览器页面直播到 Bilibili 直播间

## 说明

-   无需安装`OBS`这类直播软件，就可以把浏览器任何页面直播到`B站`、`斗鱼`或者`虎牙`的直播间里去，假如你有自己的直播间并且也安装了`Node.js`的话，那么可以安装这个`Chrome`扩展玩下，适合做无人值守`音乐轮播`或者`电影轮播`什么的。

-   配合`弹幕`接口功能，可以做出更自定义更丰富的`弹幕互动`直播场景，例如`弹幕点歌`、`弹幕点电影`和`语音朗读弹幕`这些小玩意，甚至还可以`弹幕写文章`或者`弹幕玩页游`等等，全都能在你的网页用`js`实现。

-   为什么还需要`Node.js`呢，因为找了一圈也没找到浏览器直接编码和推流的好方案，所以还是需要运行一个简单的`Node.js`程序来做中转服务，不过这个程序只有几十行代码，可以本地运行也可以部署到服务器上。

## 演示

我的直播间，不定时在线：[https://live.bilibili.com/4092892](https://live.bilibili.com/4092892)

## 安装

#### 客户端

-   [在线 chrome 网上应用商店](https://chrome.google.com/webstore/detail/jfgjlmafdjaofbkjpaoojooghnocjcag)
-   [代码目录 packages/client](./packages/client)

**注意：目前 chrome 网上应用商店审核周期大概是一周时间，所以商店的版本和开发的版本不同步，想体验最新功能的话，推荐本地离线安装本扩展**

-   [离线安装 packages/client/dist](./packages/client/dist)

#### 服务端

-   [代码目录 packages/server](./packages/server)

也可以通过`npm`获取服务端代码：

```bash
npm i bilibili-live-hime-server
```

进入代码目录，假如不是通过`npm`获取的话，还需要安装依赖：

```bash
npm install
```

运行服务端，默认端口`8080`，默认中转地址就是`http://localhost:8080`：

```bash
npm start
```

假如是部署到服务器的话，中转地址就是`http://[公网IP]:8080`，或者也可以使用自定义端口：

```bash
npm start 8081
```

## 使用

安装好`Chrome`扩展，假如服务端已经在运行情况下，就可以打开你想直播的浏览器页面，然后在扩展填好基本的直播信息(如下图)就可以开播了。

## 截图

<img src="./images/screenshot.png" width="640">

## 支持

只列出常见的平台，请注意有的平台是`rtmp地址`和`直播码`是写在一起的，而且要注意之间的斜杆`/`不能漏掉，你要自己把它拆开填写如：

```bash
rtmp://***/{直播码}
```

| 直播平台     | 获取直播码                                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| B 站直播     | [https://link.bilibili.com/p/center/index#/my-room/start-live](https://link.bilibili.com/p/center/index#/my-room/start-live)       |
| 斗鱼直播     | [https://mp.douyu.com/live/main](https://mp.douyu.com/live/main)                                                                   |
| 虎牙直播     | [https://i.huya.com/index.php?m=ProfileSetting#ktylts](https://i.huya.com/index.php?m=ProfileSetting#ktylts)                       |
| 战旗直播     | [https://www.zhanqi.tv/user/anchor/flowSetting](https://www.zhanqi.tv/user/anchor/flowSetting)                                     |
| Twitch 直播  | [https://stream.twitch.tv/ingests/](https://stream.twitch.tv/ingests/)                                                             |
| Twitch 直播  | [https://dashboard.twitch.tv/settings/channel#stream-preferences](https://dashboard.twitch.tv/settings/channel#stream-preferences) |
| YouTube 直播 | [https://www.youtube.com/live_dashboard](https://www.youtube.com/live_dashboard)                                                   |

## 弹幕

假如你有填写`直播间地址`的话，默认就会生成一个动态简单的弹幕姬，你也可以自定义弹幕行为，只要你的`被直播页面`有类似下面的代码就能接收到弹幕：

```js
window.addEventListener('message', event => {
    const { cmd, info, data } = event.data;
    switch (cmd) {
        case 'DANMU_MSG':
            console.log('弹幕', info);
            break;
        case 'SEND_GIFT':
            console.log('礼物', data);
            break;
        case 'GUARD_BUY':
            console.log('上船', data);
            break;
        default:
            break;
    }
});
```

## 捐助

![捐助](./images/wechatpay.jpg)

## 交流

![QQ 群](./images/qqgroup.png)

## License

MIT © [Harvey Zack](https://sleepy.im/)
