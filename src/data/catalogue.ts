import type { ImageMetadata } from "astro";

import beigeCargoPants from "../assets/catalogue/men/casual/beige-cargo-pants.png";
import essentialWhiteOvershirt from "../assets/catalogue/men/casual/essential-white-overshirt.png.png";
import greenTeeWhiteShorts from "../assets/catalogue/men/casual/green-tee-white-shorts.png";
import whiteOvershirt from "../assets/catalogue/men/casual/white-overshirt.png";
import classicWhiteKurta from "../assets/catalogue/men/ethnic/classic-white-kurta.png.png";
import navyEmbroideredJacketKurta from "../assets/catalogue/men/ethnic/navy-embroidered-jacket-kurta.png";
import navyNehruJacketKurta from "../assets/catalogue/men/ethnic/navy-nehru-jacket-kurta.png";
import pinkBluePrintedKurta from "../assets/catalogue/men/ethnic/pink-blue-printed-kurta.png";
import taupePathaniSuit from "../assets/catalogue/men/ethnic/taupe-pathani-suit.png";
import blackBandhgala from "../assets/catalogue/men/formal/black-bandhgala.png";
import navyPinstripeSuit from "../assets/catalogue/men/formal/navy-pinstripe-suit.png";
import greyLoungewearSet from "../assets/catalogue/men/lounge/grey-loungewear-set.png";
import mandarinWhiteCottonShirt from "../assets/catalogue/men/shirts/mandarin-white-cotton-shirt.png";
import pinkShirt from "../assets/catalogue/men/shirts/pink-shirt.png";
import skyBlueShirt from "../assets/catalogue/men/shirts/sky-blue-button-down-shirt.png.png";
import champagneSherwaniSet from "../assets/catalogue/men/wedding/champagne-sherwani-set.png";
import ivorySherwani from "../assets/catalogue/men/wedding/ivory-sherwani.png";
import sparklePinkCoord from "../assets/catalogue/women/fusion/sparkle-pink-coord.png.png";
import blushPinkAnarkali from "../assets/catalogue/women/occasion/blush-pink-anarkali.png.png";
import mustardSharara from "../assets/catalogue/women/occasion/mustard-sharara-set.png.png";
import royalBlueAnarkali from "../assets/catalogue/women/occasion/royal-blue-anarkali.png.png";
import designerBrocadeSaree from "../assets/catalogue/women/sarees/designer-brocade-saree.png.png";
import festiveRedSaree from "../assets/catalogue/women/sarees/festive-red-saree.png.png";
import indigoBlockprintSaree from "../assets/catalogue/women/sarees/indigo-blockprint-saree.png.png";
import kalamkariCottonSaree from "../assets/catalogue/women/sarees/kalamkari-cotton-saree.png";
import maroonSilkSaree from "../assets/catalogue/women/sarees/maroon-silk-saree.png.png";

export type CatalogueGroup = "Women" | "Men";
export type CatalogueCategory =
  | "Sarees"
  | "Cotton Sarees"
  | "Occasion Wear"
  | "Wedding Wear"
  | "Fusion Wear"
  | "Ethnic Wear"
  | "Casual Wear"
  | "Shirts"
  | "Formal Wear"
  | "Lounge Wear";

export interface CatalogueCrop {
  x: number;
  y: number;
  scale: number;
}

export interface CatalogueItem {
  id: string;
  title: string;
  group: CatalogueGroup;
  category: CatalogueCategory;
  image: ImageMetadata;
  alt: string;
  crop: CatalogueCrop;
}

const posterCrop = { x: 19, y: 48, scale: 2.04 } satisfies CatalogueCrop;
const cleanCrop = { x: 50, y: 50, scale: 1.04 } satisfies CatalogueCrop;

export const catalogue: CatalogueItem[] = [
  {
    id: "festive-red-saree",
    title: "Festive Red Saree",
    group: "Women",
    category: "Sarees",
    image: festiveRedSaree,
    alt: "Model wearing a festive red saree with a broad gold woven border.",
    crop: { x: 18, y: 48, scale: 2.04 },
  },
  {
    id: "designer-brocade-saree",
    title: "Designer Brocade Saree",
    group: "Women",
    category: "Sarees",
    image: designerBrocadeSaree,
    alt: "Model wearing a navy brocade saree with intricate multicolour weaving.",
    crop: posterCrop,
  },
  {
    id: "maroon-silk-saree",
    title: "Maroon Silk Saree",
    group: "Women",
    category: "Sarees",
    image: maroonSilkSaree,
    alt: "Model wearing a maroon silk saree with an olive and gold heritage border.",
    crop: posterCrop,
  },
  {
    id: "indigo-blockprint-saree",
    title: "Indigo Blockprint Cotton Saree",
    group: "Women",
    category: "Cotton Sarees",
    image: indigoBlockprintSaree,
    alt: "Model wearing an indigo cotton saree with white blockprint motifs.",
    crop: { x: 18, y: 48, scale: 2.04 },
  },
  {
    id: "kalamkari-cotton-saree",
    title: "Kalamkari Cotton Saree",
    group: "Women",
    category: "Cotton Sarees",
    image: kalamkariCottonSaree,
    alt: "Model wearing a dark Kalamkari cotton saree with intricate printed patterning.",
    crop: { x: 50, y: 50, scale: 1.03 },
  },
  {
    id: "royal-blue-anarkali",
    title: "Royal Blue Embroidered Anarkali",
    group: "Women",
    category: "Occasion Wear",
    image: royalBlueAnarkali,
    alt: "Model wearing a royal blue Anarkali with detailed gold embroidery.",
    crop: { x: 21, y: 48, scale: 2.04 },
  },
  {
    id: "blush-pink-anarkali",
    title: "Blush Pink Anarkali",
    group: "Women",
    category: "Occasion Wear",
    image: blushPinkAnarkali,
    alt: "Model wearing a blush pink Anarkali with tonal embroidery and a flowing dupatta.",
    crop: { x: 48, y: 50, scale: 1.04 },
  },
  {
    id: "mustard-sharara-set",
    title: "Mustard Sharara Set",
    group: "Women",
    category: "Wedding Wear",
    image: mustardSharara,
    alt: "Model wearing a mustard yellow sharara set with floral embroidery.",
    crop: { x: 20, y: 48, scale: 2.04 },
  },
  {
    id: "sparkle-pink-coord",
    title: "Sparkle Pink Co-ord Set",
    group: "Women",
    category: "Fusion Wear",
    image: sparklePinkCoord,
    alt: "Model wearing a vivid pink embroidered co-ord set with wide-leg trousers.",
    crop: { x: 20, y: 48, scale: 2.04 },
  },
  {
    id: "classic-white-kurta",
    title: "Classic White Kurta",
    group: "Men",
    category: "Ethnic Wear",
    image: classicWhiteKurta,
    alt: "Man wearing a classic white embroidered kurta and trousers.",
    crop: { x: 20, y: 48, scale: 2.04 },
  },
  {
    id: "pink-blue-printed-kurta",
    title: "Pink and Blue Printed Kurta",
    group: "Men",
    category: "Ethnic Wear",
    image: pinkBluePrintedKurta,
    alt: "Man wearing a vivid pink and blue printed kurta.",
    crop: { x: 50, y: 48, scale: 1.04 },
  },
  {
    id: "taupe-pathani-suit",
    title: "Taupe Pathani Suit",
    group: "Men",
    category: "Ethnic Wear",
    image: taupePathaniSuit,
    alt: "Man wearing a taupe Pathani suit outdoors.",
    crop: cleanCrop,
  },
  {
    id: "navy-embroidered-jacket-kurta",
    title: "Navy Embroidered Jacket Kurta",
    group: "Men",
    category: "Ethnic Wear",
    image: navyEmbroideredJacketKurta,
    alt: "Man wearing a navy embroidered jacket over a navy kurta set.",
    crop: cleanCrop,
  },
  {
    id: "navy-nehru-jacket-kurta",
    title: "Navy Nehru Jacket Kurta",
    group: "Men",
    category: "Ethnic Wear",
    image: navyNehruJacketKurta,
    alt: "Man wearing a navy Nehru jacket over a white kurta set.",
    crop: { x: 50, y: 50, scale: 1.08 },
  },
  {
    id: "essential-white-overshirt",
    title: "Essential White Overshirt",
    group: "Men",
    category: "Casual Wear",
    image: essentialWhiteOvershirt,
    alt: "Man wearing a white overshirt over a black T-shirt.",
    crop: posterCrop,
  },
  {
    id: "white-overshirt",
    title: "White Overshirt",
    group: "Men",
    category: "Casual Wear",
    image: whiteOvershirt,
    alt: "Man wearing a white overshirt over a black T-shirt.",
    crop: { x: 52, y: 50, scale: 1.08 },
  },
  {
    id: "beige-cargo-pants",
    title: "Beige Cargo Pants",
    group: "Men",
    category: "Casual Wear",
    image: beigeCargoPants,
    alt: "Man wearing beige cargo pants with a light shirt.",
    crop: { x: 50, y: 53, scale: 1.08 },
  },
  {
    id: "green-tee-white-shorts",
    title: "Green Tee with White Shorts",
    group: "Men",
    category: "Casual Wear",
    image: greenTeeWhiteShorts,
    alt: "Man wearing a green T-shirt with white shorts.",
    crop: cleanCrop,
  },
  {
    id: "sky-blue-button-down-shirt",
    title: "Sky Blue Button-Down Shirt",
    group: "Men",
    category: "Shirts",
    image: skyBlueShirt,
    alt: "Man wearing a sky blue button-down shirt with light trousers.",
    crop: { x: 18, y: 48, scale: 2.04 },
  },
  {
    id: "mandarin-white-cotton-shirt",
    title: "Mandarin White Cotton Shirt",
    group: "Men",
    category: "Shirts",
    image: mandarinWhiteCottonShirt,
    alt: "Man wearing a white cotton shirt with a mandarin collar.",
    crop: cleanCrop,
  },
  {
    id: "pink-shirt",
    title: "Pink Shirt",
    group: "Men",
    category: "Shirts",
    image: pinkShirt,
    alt: "Man wearing a dusty pink button-down shirt.",
    crop: cleanCrop,
  },
  {
    id: "black-bandhgala",
    title: "Black Bandhgala",
    group: "Men",
    category: "Formal Wear",
    image: blackBandhgala,
    alt: "Man wearing a black Bandhgala jacket with a gold pocket square.",
    crop: { x: 48, y: 47, scale: 1.07 },
  },
  {
    id: "navy-pinstripe-suit",
    title: "Navy Pinstripe Suit",
    group: "Men",
    category: "Formal Wear",
    image: navyPinstripeSuit,
    alt: "Man wearing a navy pinstripe suit with a tie and pocket square.",
    crop: cleanCrop,
  },
  {
    id: "ivory-sherwani",
    title: "Ivory Sherwani",
    group: "Men",
    category: "Wedding Wear",
    image: ivorySherwani,
    alt: "Man wearing an ivory sherwani in a wedding setting.",
    crop: { x: 50, y: 50, scale: 1.03 },
  },
  {
    id: "champagne-sherwani-set",
    title: "Champagne Sherwani Set",
    group: "Men",
    category: "Wedding Wear",
    image: champagneSherwaniSet,
    alt: "Man wearing a champagne-toned sherwani set with a textured jacket.",
    crop: { x: 49, y: 50, scale: 1.08 },
  },
  {
    id: "grey-loungewear-set",
    title: "Grey Loungewear Set",
    group: "Men",
    category: "Lounge Wear",
    image: greyLoungewearSet,
    alt: "Man wearing a grey loungewear set.",
    crop: cleanCrop,
  },
];

export function getCatalogueItem(id: string): CatalogueItem {
  const item = catalogue.find((entry) => entry.id === id);

  if (!item) {
    throw new Error(`Unknown catalogue item: ${id}`);
  }

  return item;
}

export function getCatalogueByGroup(group: CatalogueGroup): CatalogueItem[] {
  return catalogue.filter((entry) => entry.group === group);
}

export function getCatalogueByCategory(
  category: CatalogueCategory,
): CatalogueItem[] {
  return catalogue.filter((entry) => entry.category === category);
}
