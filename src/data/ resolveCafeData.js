import cafe1 from '../assets/images/cafe1.png';
import cafe2 from '../assets/images/cafe2.png';
import cafe3 from '../assets/images/cafe3.png';
import cafe4 from '../assets/images/cafe4.png';
import cafe5 from '../assets/images/cafe5.jpg';
import cafe6 from '../assets/images/cafe6.jpg';
import cafe7 from '../assets/images/cafe7.jpg';
import cafe8 from '../assets/images/cafe8.jpg';
console.log("✅ resolveCafeData loaded");

const rawData = [
  {
    id: 1,
    image: 'cafe1',
    name: '硫磺   台北 ｜東區 ',
    location: '台北市大安區敦化南路一段100號',
    hours: '10:00 - 18:00',
    lat: 23.0111,
    lng: 120.2001,
  },
  {
    id: 2,
    image: 'cafe2',
    name: 'ハハ珈琲店    台北 ｜中山 ',
    location: '台北市中山區南京東路三段220號',
    hours: '09:30 - 17:30',
    lat: 23.0111,
    lng: 120.3201,
  },
  {
    id: 3,
    image: 'cafe3',
    name: 'CONGRATS CAFE  台北 ｜信義',
    location: '台北市信義區松仁路158號',
    hours: '11:00 - 20:00',
    lat: 23.2211,
    lng: 121.2201,
  },
  {
    id: 4,
    image: 'cafe4',
    name: '珘墨咖啡        台中 ｜北區',
    location: '台中市北區健行路85號',
    hours: '12:00 - 21:00',
    lat: 24.1500,
    lng: 120.6500,
  },
  {
    id: 5,
    image: 'cafe5',
    name: '窄门咖啡 台南 ｜中西',
    location: '台南市中西區南門路55號',
    hours: '10:00 - 18:00',
    lat: 23.0001,
    lng: 120.2001,
  },
  {
    id: 6,
    image: 'cafe6',
    name: '上樓看看 台北 ｜信義',
    location: '台北市信義區永吉路30巷10號',
    hours: '13:00 - 22:00',
    lat: 25.0330,
    lng: 121.5654,
  },
  {
    id: 7,
    image: 'cafe7',
    name: '咖啡•梅 台北 ｜中正',
    location: '台北市中正區羅斯福路二段50號',
    hours: '08:00 - 17:00',
    lat: 25.0423,
    lng: 121.5190,
  },
  {
    id: 8,
    image: 'cafe8',
    name: '隅咖啡 台北 ｜中正',
    location: '台北市中正區信義路一段45號',
    hours: '10:30 - 19:30',
    lat: 25.0418,
    lng: 121.5169,
  }
];

// map string to actual image
const imageMap = {
  cafe1,
  cafe2,
  cafe3,
  cafe4,
  cafe5,
  cafe6,
  cafe7,
  cafe8
};

const resolvedData = rawData.map(cafe => ({
  ...cafe,
  image: imageMap[cafe.image] || '',
}));

export default resolvedData;
