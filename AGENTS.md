# Shri Varasiddhi Shopping Mall Website

## Objective

Build a production-quality, mobile-first fashion retail website for Shri Varasiddhi Shopping Mall, Adilabad.

The result must look custom-designed, premium and editorial, not like a generated template.

## Stack

- Astro 6
- TypeScript strict
- Tailwind CSS v4
- Astro assets
- Lucide Astro
- Bodoni Moda Variable
- Instrument Sans Variable
- Playwright
- static output
- Cloudflare Pages compatible

Do not introduce another framework unless technically necessary.

## Current product scope

Phase 1 is a premium catalogue/brand website.

It is NOT currently:
- an e-commerce checkout application
- an account system
- a stock-management platform
- an ERP
- a payment system

Do not add cart/login/backend/database/payment architecture without explicit instruction.

## Data

During the design phase use typed local data.

Do not integrate Sanity until the main visual system and page structure are approved.

Design data structures so they can later be migrated to Sanity.

## Truthfulness

Never invent:
- products
- prices
- discounts
- opening hours
- reviews
- addresses
- phone numbers
- policies

Use provided/verified information or obvious temporary development labels clearly marked as such.

## Design

Always use the `varasiddhi-design` skill for significant frontend work.

For major design work also use relevant installed design skills.

References supplied by the client are inspiration for:
- typography
- visual hierarchy
- editorial composition
- catalogue presentation

Do not clone reference layouts.

## Code quality

- Keep components focused.
- Avoid unnecessary abstractions.
- Avoid unnecessary client-side JavaScript.
- No unused components.
- No placeholder lorem ipsum in final UI.
- Use semantic HTML.
- Prefer Astro over hydrated components.

## Assets

Do not replace supplied brand or product assets unless explicitly requested.

Preserve source assets.

Never overwrite originals.

## Validation

After meaningful work run:

npm run check
npm run build

For major visual milestones also run Playwright viewport checks.

Fix errors before reporting completion.

## Git

Do not rewrite history.

Do not delete unrelated work.

Create cohesive changes.

Before finishing, report:
- files changed
- key design decisions
- validation run
- remaining limitations
## Animation System

The site uses:

- Lenis for controlled vertical smooth scrolling.
- Motion JavaScript API for premium editorial animation.

Do not introduce React or motion/react.

Do not install Animate UI components. Animate UI may be used only as visual inspiration.

Animation should feel like premium fashion editorial art direction.

Prefer:
- clip reveals
- opacity
- transform
- subtle stagger
- restrained scroll-linked motion
- image scale
- typography reveal

Avoid:
- bounce
- elastic effects
- excessive parallax
- floating cards
- cursor gimmicks
- constant animation
- animation on every element

Never hide important content permanently behind JavaScript animation.

Respect `prefers-reduced-motion`.

Lenis must not interfere with horizontal catalogue rails.