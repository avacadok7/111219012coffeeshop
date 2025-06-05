import cafe1 from '../assets/images/cafe1.png';
import cafe2 from '../assets/images/cafe2.png';
import cafe3 from '../assets/images/cafe3.png';
import cafe4 from '../assets/images/cafe4.png';
import cafe5 from '../assets/images/cafe5,jpg';
import cafe6 from '../assets/images/cafe6.jpg';
import cafe7 from '../assets/images/cafe7.jpg';
import cafe8 from '../assets/images/cafe8.jpg';
// ... continue for all images

import rawData from './recommendData.json';

const imageMap = {
  cafe1: cafe1,
  cafe2: cafe2,
  cafe3: cafe3,
  cafe4: cafe4,
  cafe5: cafe5,
  cafe6: cafe6,
  cafe7: cafe7,
  cafe8: cafe8,
  // ... all the rest
};

const resolvedData = rawData.map(cafe => ({
  ...cafe,
  image: imageMap[cafe.image] || '', // Replace string with actual image
}));

export default resolvedData;
