---
name: varasiddhi-design
description: Design and implement the Shri Varasiddhi Shopping Mall website and its fashion-retail UI. Use for homepage, collection, catalogue, responsive design, typography, brand styling, product presentation and visual QA.
---

# Shri Varasiddhi Design System

Build a premium editorial Indian fashion retail website for Shri Varasiddhi Shopping Mall, Adilabad.

## Brand position

Varasiddhi is not a generic e-commerce store.

Position it as an established regional family-fashion destination:
- women
- sarees
- men's wear
- kids
- wedding and festive wear
- family fashion

The visual direction should feel like a premium regional fashion house.

## Core aesthetic

Use:
- editorial fashion layouts
- strong photography
- asymmetric compositions where appropriate
- refined typography
- generous negative space
- high-fashion catalogue influence
- warm ivory surfaces
- espresso brown
- restrained brand gold
- carefully selected campaign accents
- subtle brand-motif details

Never create a generic SaaS or AI-generated looking site.

## Anti-patterns

Do not use:
- purple/blue gradients
- glassmorphism
- excessive blur
- huge rounded cards
- card grids for every section
- floating blobs
- random decorative icons
- generic AI illustrations
- neon effects
- excessive shadows
- excessive pill buttons
- Poppins
- Inter
- Roboto
- generic centered hero layouts
- fake statistics
- fake product prices
- fake customer claims
- invented store information

Do not make every section look like a separate rounded container.

## Typography

Primary editorial/display:
Bodoni Moda Variable.

Interface/body:
Instrument Sans Variable.

Use Bodoni strategically rather than on every element.

Headlines may combine Roman and italic forms to create editorial contrast.

Use fluid typography with clamp().

The actual Varasiddhi Telugu/English logo must remain an image/brand asset.
Do not try to recreate the Telugu logo with an unrelated webfont.

## Palette

Starting design tokens:

--ivory: #F7F3EA;
--paper: #FCFAF5;
--espresso: #3A2014;
--ink: #171512;
--gold: #C89A2B;
--muted-gold: #A78035;

Gold is an accent, not the dominant background color.

Final tokens may be refined based on the provided brand assets.

## Layout

Mobile-first.

Priority viewports:
- 360x800
- 390x844
- 430x932
- 768x1024
- 1440x900

Desktop should feel spacious and editorial.

Mobile must not look like a compressed desktop site.

Use:
- edge-to-edge photography where it benefits composition
- intentional asymmetry
- horizontal collection rails on mobile when appropriate
- 2-column product grids on mobile where readable
- 4-column grids on desktop

## Imagery

Real product/store images are primary content.

Use Astro Image/Picture for local photography.

Do not distort garments.

Respect subject crops and garment details.

Do not put essential product information permanently inside images if it can be semantic HTML.

Generated campaign artwork should be treated as editorial/promotional media, not literal inventory data.

## Components

Prefer small bespoke components.

Avoid adding a generic component library.

Components should exist only where reuse is genuine.

Likely components:
- Header
- MobileMenu
- EditorialHero
- CategoryRail
- CollectionFeature
- ProductCard
- ProductGrid
- CampaignBanner
- StoreExperience
- SocialGallery
- Footer

## Motion

Motion must be restrained.

Prefer:
- CSS transitions
- opacity
- transform
- subtle image scale
- text reveal
- gentle stagger
- crossfade

Do not use:
- bounce
- elastic animation
- scroll hijacking
- excessive parallax
- animated decoration everywhere

Respect prefers-reduced-motion.

## Performance

Keep JavaScript minimal.

Astro first.

Do not introduce React solely for UI effects.

Optimize all local images with Astro's image pipeline.

Lazy-load below-the-fold media.

Prevent CLS.

## Accessibility

Use semantic HTML.
Maintain keyboard accessibility.
Use visible focus states.
Provide useful alt text.
Maintain sufficient contrast.
Touch targets should be mobile-friendly.

## Working rule

Before making a major UI decision:
1. inspect the existing page and design system;
2. preserve what is already strong;
3. identify the weakest visual hierarchy issue;
4. make the smallest coherent improvement;
5. verify mobile and desktop.

Do not redesign unrelated sections during focused fixes.

## Visual QA

After every major page milestone:

1. run the site;
2. run Astro checks;
3. capture Playwright screenshots at 390px and 1440px;
4. inspect:
   - typography
   - spacing
   - image crops
   - overflow
   - alignment
   - header
   - CTA hierarchy
   - section rhythm
5. fix visible issues;
6. repeat until no high-priority visual problems remain.

The page is not complete merely because it builds.