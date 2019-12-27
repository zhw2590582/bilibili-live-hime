window.addEventListener('load', () => {
    function getSongs() {
        const $list = document.querySelector('#g_playlist');
        if (!$list) return [];
        const $list_ul = $list.querySelector('.f-cb');
        return Array.from($list_ul.children).map(item => {
            return {
                id: Number(item.dataset.id),
                playing: item.classList.contains('z-sel'),
                song: item.children[1].innerText.trim(),
                singer: item.children[3].innerText,
                duration: item.children[4].innerText,
            };
        });
    }

    function getLyrics() {
        const $list = document.querySelector('#g_playlist');
        if (!$list) return [];
        const $lyrics = $list.querySelector('.listlyric');
        return Array.from($lyrics.children).map(item => {
            return {
                playing: item.classList.contains('z-sel'),
                time: item.dataset.time,
                text: item.innerText.trim(),
            };
        });
    }

    setInterval(() => {
        const $listBtn = document.querySelector('[title="播放列表"]');
        const $list = document.querySelector('#g_playlist');
        if (!$list && $listBtn) {
            $listBtn.click();
        } else {
            window.parent.postMessage(
                {
                    type: 'MUSIC_163',
                    data: {
                        songs: getSongs(),
                        lyrics: getLyrics(),
                    },
                },
                '*',
            );
        }
    }, 1000);

    function order_song(song) {
        const $iframe = document.querySelector('#g_iframe');
        const $input = $iframe.contentDocument.querySelector('#m-search-input');
        const $search = $iframe.contentDocument.querySelector('[title="搜索"]');
        $input.value = song;
        $search.click();
        setTimeout(() => {
            const $add = $iframe.contentDocument.querySelector('[title="添加到播放列表"');
            if ($add) {
                $add.click();
            }
        }, 1000);
    }

    function prev_song() {
        const $prev = document.querySelector('.prv');
        $prev.click();
    }

    function next_song() {
        const $next = document.querySelector('.nxt');
        $next.click();
    }

    function play_song(state) {
        const $play = document.querySelector('.ply');
        const playing = $play.dataset.action === 'pause';
        if ((playing && state) || (!playing && !state)) return;
        if ((playing && !state) || (!playing && state)) $play.click();
    }

    function play_mode(mode) {
        if (!['one', 'loop', 'shuffle'].includes(mode)) return;
        const $mode = document.querySelector('[data-action="mode"]');
        (function check() {
            if (!$mode.classList.contains(`icn-${mode}`)) {
                $mode.click();
                setTimeout(check, 100);
            }
        })();
    }

    function clear_song() {
        const $clear = document.querySelector('.clear');
        $clear.click();
    }

    window.addEventListener('message', event => {
        const { type, data } = event.data;
        switch (type) {
            case 'ORDER_SONG':
                order_song(data);
                break;
            case 'PREV_SONG':
                prev_song();
                break;
            case 'NEXT_SONG':
                next_song();
                break;
            case 'PLAY_SONG':
                play_song(true);
                break;
            case 'PAUSE_SONG':
                play_song(false);
                break;
            case 'PLAY_MODE':
                play_mode(data);
                break;
            case 'CLEAR_SONG':
                clear_song();
                break;
            case 'RELOAD':
                window.location.reload();
                break;
            default:
                break;
        }
    });
});
