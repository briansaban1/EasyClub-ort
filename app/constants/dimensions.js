import {Dimensions, Platform} from 'react-native';

var width;
var height;

// Set max width for web dimensions to accomadatae .simulator in web/index.html
if (Platform.OS === 'web') {
  const windowWidth = Dimensions.get('window').width;
  width = windowWidth > 500 ? 500 : windowWidth;

  height = Dimensions.get('window').height;
} else {
  // [width, height] = Dimensions.get('window')
  width = Dimensions.get('window').width;
  height = Dimensions.get('window').height;
}

let multiplier = width / 400;
let multiplierHeight = height / 680;

const Dimension = {
  multiplier,
  multiplierHeight,
  calW: (value) => value * multiplier,
  calH: (value) => value * multiplierHeight,
  deviceWidth: width,
  deviceHeight: height,
  pro5: '5%',
  pro15: '15%',
  pro20: '20%',
  pro30: '30%',
  pro38: '38%',
  pro40: '40%',
  pro49: '49%',
  pro48: '48%',
  pro50: '50%',
  pro60: '60%',
  pro65: '65%',
  pro70: '70%',
  pro75: '75%',
  pro80: '90%',
  pro90: '90%',
  pro95: '95%',
  pro100: '100%',
  px1: 1 * multiplier,
  px2: 2 * multiplier,
  px5: 5 * multiplier,
  px8: 8 * multiplier,
  px10: 10 * multiplier,
  px12: 12 * multiplier,
  px13: 13 * multiplier,
  px14: 14 * multiplier,
  px15: 15 * multiplier,
  px16: 16 * multiplier,
  px17: 17 * multiplier,
  px18: 18 * multiplier,
  px20: 20 * multiplier,
  px23: 23 * multiplier,
  px25: 25 * multiplier,
  px28: 28 * multiplier,
  px30: 30 * multiplier,
  px35: 35 * multiplier,
  px40: 40 * multiplier,
  px45: 45 * multiplier,
  px50: 50 * multiplier,
  px60: 60 * multiplier,
  px70: 70 * multiplier,
  px80: 80 * multiplier,
  px90: 90 * multiplier,
  px100: 100 * multiplier,
  px150: 150 * multiplier,
  px200: 200 * multiplier,
  px220: 220 * multiplier,
  px250: 250 * multiplier,
  px300: 300 * multiplier,
  px340: 340 * multiplier,
};

export default Dimension;
