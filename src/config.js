"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// see src/blendMode.js for available blend modes
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

/*********************
 * General Generator Options
 ***********************/

const description =
  "This is the description of your NFT project, remember to replace this";
const baseUri = "ipfs://NewUriToReplace";

const outputJPEG = false; // if false, the generator outputs png's

/**
 * Set your tokenID index start number.
 * ⚠️ Be sure it matches your smart contract!
 */
const startIndex = 0;

const format = {
  width: 2400,
  height: 2400,
  smoothing: true, // set to false when up-scaling pixel art.
};

const background = {
  generate: true,
  brightness: "80%",
};

// good combos:
// brown, peach background, sunset skintone, pink

const layerConfigurations = [
  {
    growEditionSizeTo: 20,
    namePrefix: "WITCH", // Use to add a name to Metadata `name:`
    layersOrder: [
      {
        name: "Archetype",
        options: {
          bypassDNA: true,
        },
      },
      {
        name: "Hair Color",
      },
      {
        name: "Background",
        options: {
          bypassDNA: true,
        },
      },
      {
        name: "Organize-TopHead",
      },
      {
        name: "Hair Back",
        trait: "Hair Back",
        // sublayerOptions: {
        //   "Lower Buns (Brown)": { trait: "Lower Buns" },
        //   "Lower Buns (Pink)": { trait: "Lower Buns" },
        //   "Pigtails (Brown)": { trait: "Pigtails" },
        //   "Pigtails (Light Lilac)": { trait: "Pigtails" },
        // },
      },
      { name: "Skin Tone" },
      { name: "Earrings" },
      { name: "Face Markings" },
      {
        name: "Clothing",
        sublayerOptions: {
          'Sheer Striped transparent': { blend: "source-over", opacity: .73 }
        },
      },
      { name: "Necklace" },
      { name: "Eyes" },
      { name: "Hair Front", trait: "Hair Front" },
      {
        name: "Mouth",
        sublayerOptions: {
          "Laughing (Sunset)": { trait: "Laughing" },
          "Smile (Sunset)": { trait: "Smile" },
        },
      },
      { name: "Eyebrows" },

    ],
  },
];

/**
 * Set to true for when using multiple layersOrder configuration
 * and you would like to shuffle all the artwork together
 */
const shuffleLayerConfigurations = false;

const debugLogs = true;

/*********************
 * Advanced Generator Options
 ***********************/

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "NONE";

const HAG_ONLY = [
  // 'Peony Crown (Pink)',
  // 'Moon Mark (White)',
  // 'Nega Moon Mark (Black)',
];

const ENCHANTRESS_ONLY = [

];

const MAGE_ONLY = [
  // 'Mage Mark Moon (White)',
];

const NECROMANCER_ONLY = [

];

const OCCULTIST_ONLY = [

];

const SEER_ONLY = [

];

const HAIR_BACK_UPPER = [
  'High Buns',
  'High Pigtails',
];

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */
const incompatible = {
  'Lower Buns': ['Baby Drill Curls', 'Dramatic Swoop'],
  'Nega Moon Mark (Black)': ['Relaxed Bubble', 'Surprised Bubble', 'Woeful', 'Soft Bob'],
  'Moon Mark (White)': ['Soft Bob', 'Relaxed Bubble'],
  'Mage Mark Moon (Blue)': ['Soft Bob', 'Relaxed Bubble'],
  'Mage Mark Moon (White)': ['Soft Bob', 'Relaxed Bubble'],
  'Music Mark': ['Soft Bob'],

  'Closed (Brown)': ['Surprised Bubble', 'Relaxed Bubble'],
  'Teary Closed (Brown)': ['Surprised Bubble', 'Relaxed Bubble'],

  'Dangly Bones': ['Baby Drill Curls', 'Xuannu'],
  'Witch': ['Baby Drill Curls', ...HAIR_BACK_UPPER],
  'High Buns': ['Peony Crown (Pink)', 'Dramatic Swoop'],
  'Peony Crown (Pink)': ['High Buns'],
  'Xuannu': ['Round'],
  'Curtain': ['Round', 'Surprised Bubble', 'Relaxed Bubble'],

  'Maleficent Horns': ['High Buns'],

  'Mugler Collarbone Cutout': ['Ring Collar', 'Moon Necklace'],
  'Open Collar with Bow': ['Ring Collar', 'Moon Necklace'],
  'Puff Top': ['Ring Collar', 'Moon Necklace'],
  'Victorian Frippery': ['Ring Collar', 'Moon Necklace'],
  'Dita Disk': [...HAIR_BACK_UPPER],
  'Dita Disk Wrapped': ['Open Collar with Bow'],

  // archetype
  'Enchantress': [...HAG_ONLY, ...MAGE_ONLY, ...NECROMANCER_ONLY, ...OCCULTIST_ONLY, ...SEER_ONLY],
  'Hag': [...ENCHANTRESS_ONLY, ...MAGE_ONLY, ...NECROMANCER_ONLY, ...OCCULTIST_ONLY, ...SEER_ONLY],
  'Mage': [...HAG_ONLY, ...ENCHANTRESS_ONLY, ...NECROMANCER_ONLY, ...OCCULTIST_ONLY, ...SEER_ONLY],
  'Necromancer': [...HAG_ONLY, ...MAGE_ONLY, ...ENCHANTRESS_ONLY, ...OCCULTIST_ONLY, ...SEER_ONLY],
  'Occultlist': [...HAG_ONLY, ...MAGE_ONLY, ...NECROMANCER_ONLY, ...ENCHANTRESS_ONLY, ...SEER_ONLY],
  'Seer': [...HAG_ONLY, ...MAGE_ONLY, ...NECROMANCER_ONLY, ...OCCULTIST_ONLY, ...ENCHANTRESS_ONLY],

  //   Red: ["Dark Long"],
  //   // directory incompatible with directory example
  //   White: ["rare-Pink-Pompadour"],
};

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */
const forcedCombinations = {
  // floral: ["MetallicShades", "Golden Sakura"],
  "Dramatic Swoop": ["Dramatic Swoop"],
};

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  Helmet: "Space Helmet",
  "gold chain": "GOLDEN NECKLACE",
};

const extraMetadata = {};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

// Outputs an Keccack256 hash for the image. Required for provenance hash
const hashImages = true;

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  background,
  baseUri,
  buildDir,
  debugLogs,
  description,
  emptyLayerName,
  extraAttributes,
  extraMetadata,
  forcedCombinations,
  format,
  hashImages,
  incompatible,
  layerConfigurations,
  layersDir,
  outputJPEG,
  preview,
  preview_gif,
  rarityDelimiter,
  shuffleLayerConfigurations,
  startIndex,
  traitValueOverrides,
  uniqueDnaTorrance,
  useRootTraitType,
};
