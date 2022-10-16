var fs = require('fs');


const FIRST_NAMES = [
  'Buttercup',
  'Eileen',
  'Lola',
  'Luna',
  'Jade',
  'Mina',
  'Alice',
  'Amethyst',
  'Bonnie',
  'Elzora',
  'Cous cous',
  'Jewel',
  'Diamond',
  'Jadore',
  'Cherry',
  'Peach',
  'Coco',
  'coconut',
  'Gigi',
  'Bella',
  'Pita',
  'Hunter',
  'Honey',
  'Tangerine',
  'Rose',
  'Mei',
  'daph',
  'Jasmine',
  'JoJo',
  'sandy',
  'angela',
  'liz',
  'Kiki',
  'Nebula',
  'Alva',
  'Astora',
  'Velka',
  'Aradiana',
  'Keri',
  'Nyxie',
  'Xuanna',
  'alenthia',
  'Yuria',
  'Cha cha',
  'Serene',
  'teddy',
  'Lulu',
  'Peony',
  'Tulip',
  'Lilac',
  'Anemone',
  'Sweet pea',
  'chamomile',
  'Merselle',
  'Sapphire',
  'lady',
  'azu',
  'Tourmaline',
  'Ruby',
  'Opal',
  'Amber',
  'Emerald',
  'Ametrine',
  'Pepper',
  'Becky',
  'Jawa',
  'jub jub',
  'Adrianna',
  'fio',
  'vox',
  'selly',
  'dalia',
  'entropy',
  'Ceylon',
  'Donchi',
  'aby',
  'Zirconia',
  'Lazuli',
  'Onyx',
  'Trish',
  'Bubz',
  'Honey',
  'Sugar',
  'Venus',
  'Angel',
  'Steph',
  'Thunder',
  'Angelina',
  'Flo',
  'Ying ying',
  'Ash',
  'Pumpkin',
  'Ginger',
  'Crystal',
  'Tiffany',
  'Ginny',
  'Neptune',
  'Skylar',
  'June',
  'Mimi',
  'Daphne',
  'Eloise',
  'Lily',
  'Madalyn',
  'Daisy',
  'Dahlia',
  'Phoenix',
  'Trix',
  'Tarot',
  'melody',
  'Clementine',
  'Emi',
  'Berry',
  'Pom',
  'pom pom',
  'Lulu',
  'Anna',
  'Annie',
  'Sunny',
  'Camille',
  'Momo',
  'yi',
  'Bunny',
  'Xara',
  'Xyler',
  'Xoro',
  'Poki',
  'Rosa',
  'Waiwai',
  'alex',
  'Ori',
  'Seraphine',
  'Xaya',
  'Izzy',
  'Ginny',
  'aqua',
  'Ida',
  'terra',
  'Trinity',
  'mada',
  'Miko',
  'Lizzie',
  'Ethera',
  'Magdalen',
  'madora',
  'Mystique',
  'xerathene',
  'Xayah',
  'Kat',
  'Venus',
  'Yuri',
  'Solania',
  'Bobi',
];

const LAST_NAMES = [
  { v: ', the moonlight butterfly' },
  { v: ', the everlasting' },
  { v: ', the gentle beaut' },
  { v: ', the princess' },
  { v: ', the studious beaut' },
  { v: ', the firecracker' },
  { v: ', the pale moon' },
  { v: ', the sweet tart' },
  { v: ', the twilight princess' },
  { v: ', the echo' },
  { v: ', the wild sparkle' },
  { v: ', the cutie' },
  { v: ', the sassy' },
  { v: ', the bright gem' },
  { v: ', the lovely trinket' },
  { v: ', the everlasting' },
  { v: ', the wise cutie' },
  { v: ', the celestial crystal' },
  { v: ', the dream' },
  { v: ', the shy tart' },
  { v: ', the sweet tart' },
  { v: ' of the full moon' },
  { v: ', the smol' },
  { v: ' of the mini wilds' },
  { v: ', the shiny pearl' },
  { v: ', the visionary' },
  { v: ', the sharp' },
  { v: ', the dearest' },
  { v: ', the sweetest' },
  { v: ', the moonlight keeper' },
  { v: ', the beaut' },
  { v: ' of the howling abyss' },
  { v: ' of the tower' },
  { v: ' of the library' },
  { v: ', the bright pearl' },
  { v: ', the quaint leaf' },
  { v: ' of the sweet wilds' },
  { v: ' of the mysterious wilds' },
  { v: ' of the siren pool' },
  { v: ' of the burning citadel' },
];

const FULL_NAMES = [
  'Sugar the sweet tart',
  'Little miss Gwendolyn',
  'Little miss Rosaline',
  'lady lola',
  'mirabella, the mage'
];

const generatedNames = [];

FIRST_NAMES.forEach((item, i) => {
  generatedNames.push(item.toLowerCase());
  const shuffled = LAST_NAMES.sort(() => 0.5 - Math.random());
  const lastNames = shuffled.slice(0, 3);
  generatedNames.push(`${item}${lastNames[0].v.toLowerCase()}`);
  generatedNames.push(`${item}${lastNames[1].v.toLowerCase()}`);
  generatedNames.push(`${item}${lastNames[2].v.toLowerCase()}`);
});

const shuffledNames = generatedNames.sort(() => 0.5 - Math.random());
const shuffledNamesCut = shuffledNames.slice(0, 495);

const namesWithMusts = [...FULL_NAMES, ...shuffledNamesCut];

const finalNames = namesWithMusts.sort(() => 0.5 - Math.random());

console.log(finalNames);
console.log(finalNames.length);

var files = fs.readdirSync('./final/json/');
const filteredFiles = files.filter(file => file.includes('.json'));
console.log(filteredFiles.length)

// filteredFiles.forEach((item, i) => {
//   const numberpart = item.slice(0, -6);
//   if (item.includes('b')) {
//     fs.rename(`./final/json/${item}`, `./final/json/${numberpart}a.json`, function(err) {
//       if ( err ) console.log('ERROR: ' + err);
//     });
//   }
// });


const shuffledFiles = filteredFiles.sort(() => 0.5 - Math.random());

shuffledFiles.forEach((item, i) => {
  fs.rename(`./final/json/${item}`, `./final/json/${i+1}.json`, function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

  fs.rename(`./final/images/${item}`, `./final/images/${i+1}.png`, function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });
});
