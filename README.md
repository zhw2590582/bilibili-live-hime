# :strawberry: Chrome 扩展 - Bilibili 直播姬

> 把浏览器页面直播到 Bilibili 直播间

## 说明

-   本扩展同时也支持所有使用`rtmp`做推流的直播平台如虎牙、斗鱼和战旗之类的。

-   本扩展不借助`OBS`这类软件就可以直播浏览器页面，可以做成无人值守的`音乐轮播`或者`视频轮播`等等，后期集成`弹幕姬`功能后还可以做成`弹幕互动积分点播`音乐或者电影。

-   但浏览器本身是难以做到转码和推流的，所有还是需要一个额外的`NodeJs`程序来做中转服务，但这个程序只有几十行代码且逻辑很简单，可以本地运行也可以放到服务器运行。

-   本机亲测在分辨率`720P`和比特率`2500kbps`情况下，直播延迟在`10`秒内。

## 安装

#### 客户端

-   [在线 chrome 网上应用商店](https://chrome.google.com/webstore/detail/jfgjlmafdjaofbkjpaoojooghnocjcag)
-   [代码目录 packages/client](./packages/client)

#### 服务端

-   [代码目录 packages/server](./packages/server)

也可以通过`npm`获取服务端代码：

```bash
npm i bilibili-live-hime-server
```

进入代码目录运行服务端，默认端口`8080`，默认中转地址就是`http://localhost:8080`：

```bash
npm start
```

也可以指定端口：

```bash
npm start 3000
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

## 捐助

![捐助](./images/wechatpay.jpg)

## 交流

![QQ 群](./images/qqgroup.png)

## License

MIT © [Harvey Zack](https://sleepy.im/)
