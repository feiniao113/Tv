var rule = {
author: '小可乐/240501/第一版',
title: '麻雀视频',
host: 'https://mqtv.cc',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/libs/VodList.api.php?type=tv&page=1',
url: '/libs/VodList.api.php?type=fyclass&page=fypage&rank=&cat=&year=&area=',
filter_url: '',
detailUrl: '',
searchUrl: '/libs/VodList.api.php?search=**',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '电影&剧集&综艺&动漫',
class_url: 'movie&tv&va&ct',
filter_def: {},

proxy_rule: '',  
sniffer: 0,
isVideo: '',
play_parse: true,
parse_url: 'https://player.mqtv.cc/fun/?url=',
lazy: `js:input = {parse: 1, url: rule.parse_url+input}`,

limit: 9,
double: false,
推荐: '*;*;*;*;*',
一级: 'json:data;title;img;remark;url;desc',
二级: `js:
VOD = {};
log(input);
let ctid = input.match(/.*\\/(\\d+)/)[1];
let detailUrl = 'https://mqtv.cc/libs/VodInfo.api.php?ctid=' + ctid;
let html = request(detailUrl);
let kjsn = JSON.parse(html);
VOD.vod_id = input;
VOD.vod_name = kjsn.data.title;
VOD.type_name = kjsn.data.type;
VOD.vod_pic = kjsn.data.img;
VOD.vod_remarks = kjsn.data.remark;
VOD.vod_year = kjsn.data.year;
VOD.vod_area = kjsn.data.area;
VOD.vod_actor = kjsn.data.actor;
VOD.vod_director = kjsn.data.director;
VOD.vod_content = kjsn.data.title+'_'+kjsn.data.des;
VOD.vod_play_from = kjsn.data.playinfo.map(it => it.cnsite).join('$$$');
let playUrls = [];
kjsn.data.playinfo.forEach((it) => {
let plist = it.player.map(it => it.no + '$' + it.url).join('#');
playUrls.push(plist);
});
VOD.vod_play_url = playUrls.join('$$$')
`,
搜索: 'json:data.vod_all[0].show;*;*;*;*',

filter: {}
}