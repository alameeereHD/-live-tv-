export interface Channel {
  id: string;
  name: string;
  url: string;
  type: 'hls' | 'mpegts';
  category: string;
}

const PROXY = '/api/proxy?url=';

export const channels: Channel[] = [
  {
    id: '1',
    name: 'الجزيرة',
    url: 'https://live-hls-web-aja.getaj.net/AJA/index.m3u8',
    type: 'hls',
    category: 'أخبار',
  },
  {
    id: '2',
    name: 'قناة الوان',
    url: PROXY + encodeURIComponent('http://lynovo.cc/live/407F2F55785345F/xiAYSAZIpR/1339224.ts'),
    type: 'mpegts',
    category: 'ترفيه',
  },
  {
    id: '3',
    name: 'PS1',
    url: PROXY + encodeURIComponent('http://185.191.126.127:8080/live//b0:99:d7:15:88:50/3090914536649669/325793.ts'),
    type: 'mpegts',
    category: 'رياضة',
  },
  {
    id: '4',
    name: 'PS2',
    url: PROXY + encodeURIComponent('http://obsfullhd.tv:25461/live/lacherejc/OannyVVIL2/140.ts'),
    type: 'mpegts',
    category: 'رياضة',
  },
];

export const categories = [...new Set(channels.map((c) => c.category))];
