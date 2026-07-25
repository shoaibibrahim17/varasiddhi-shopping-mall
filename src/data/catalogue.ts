import type { ImageMetadata } from "astro";

import essentialWhiteOvershirt from "../assets/catalogue/men/casual/essential-white-overshirt.png.png";
import classicWhiteKurta from "../assets/catalogue/men/ethnic/classic-white-kurta.png.png";
import skyBlueShirt from "../assets/catalogue/men/shirts/sky-blue-button-down-shirt.png.png";
import sparklePinkCoord from "../assets/catalogue/women/fusion/sparkle-pink-coord.png.png";
import mustardSharara from "../assets/catalogue/women/occasion/mustard-sharara-set.png.png";
import royalBlueAnarkali from "../assets/catalogue/women/occasion/royal-blue-anarkali.png.png";
import designerBrocadeSaree from "../assets/catalogue/women/sarees/designer-brocade-saree.png.png";
import festiveRedSaree from "../assets/catalogue/women/sarees/festive-red-saree.png.png";
import indigoBlockprintSaree from "../assets/catalogue/women/sarees/indigo-blockprint-saree.png.png";
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
  | "Shirts";

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
    crop: { x: 19, y: 48, scale: 2.04 },
  },
  {
    id: "maroon-silk-saree",
    title: "Maroon Silk Saree",
    group: "Women",
    category: "Sarees",
    image: maroonSilkSaree,
    alt: "Model wearing a maroon silk saree with an olive and gold heritage border.",
    crop: { x: 19, y: 48, scale: 2.04 },
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
    id: "royal-blue-anarkali",
    title: "Royal Blue Embroidered Anarkali",
    group: "Women",
    category: "Occasion Wear",
    image: royalBlueAnarkali,
    alt: "Model wearing a royal blue Anarkali with detailed gold embroidery.",
    crop: { x: 21, y: 48, scale: 2.04 },
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
    id: "essential-white-overshirt",
    title: "Essential White Overshirt",
    group: "Men",
    category: "Casual Wear",
    image: essentialWhiteOvershirt,
    alt: "Man wearing a white overshirt over a black T-shirt.",
    crop: { x: 19, y: 48, scale: 2.04 },
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
