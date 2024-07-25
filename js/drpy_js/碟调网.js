var rule = {
  title: '碟调网',
  host: 'https://www.dietvs.com/',
  searchUrl: '/search/wd/**/page/fypage.html',
  url: '/show/fyclass/page/fypage.html',
  headers: {
    'User-Agent': 'MOBILE_UA',
  },
  timeout: 5000,
  class_parse: 'body&&.hl-nav li:gt(0);a&&Text;a&&href;.*/(.*?).html',
  cate_exclude: '明星|专题|最新|排行',
  limit: 40,
  play_parse: true,
  lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/\.m3u8|\.mp4/.test(url)) {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        } else {
            input
        }
    }),
  推荐: '.hl-vod-list;li;a&&title;a&&data-original;.remarks&&Text;a&&href',
  double: true,
  一级: '.hl-vod-list&&.hl-list-item;a&&title;a&&data-original;.remarks&&Text;a&&href',
  二级: {
    title: '.hl-infos-title&&Text;.hl-text-conch&&Text',
    img: '.hl-lazy&&data-original',
    desc: '.hl-infos-content&&.hl-text-conch&&Text',
    content: '.hl-content-text&&Text',
    tabs: '.hl-tabs&&a',
    lists: '.hl-plays-list:eq(#id)&&li',
  },
  搜索: '.hl-list-item;a&&title;a&&data-original;.remarks&&Text;a&&href',
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
}