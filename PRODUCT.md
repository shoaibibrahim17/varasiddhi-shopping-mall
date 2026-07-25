# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People and families in and around Adilabad, Telangana, exploring fashion for everyday dressing, celebrations, weddings, and other occasions. The first website experience should help them understand Varasiddhi's fashion range and prepare for an in-store visit.

## Product Purpose

Shri Varasiddhi Shopping Mall's first website is a premium catalogue and brand experience. It presents sarees, women's fashion, men's fashion, and occasion wear with the polish of an established regional fashion retailer. Success means visitors can discover the breadth and character of the collections and recognise the Adilabad store as the physical destination.

## Positioning

An established regional family-fashion destination with particular strength in sarees and celebration dressing, presented with premium editorial craft while remaining culturally relevant and accessible.

## Operating Context

Visitors browse a static, mobile-first catalogue and brand website, then may choose to visit the physical store. The primary browsing context is a phone; tablet and desktop layouts support richer editorial composition.

## Capabilities and Constraints

- Phase 1 is a catalogue and brand website, not an e-commerce checkout, account system, stock platform, ERP, payment system, or database-backed application.
- Content uses typed local data designed for a later migration to Sanity. Sanity is not part of the approved first implementation.
- The required stack is Astro, strict TypeScript, Tailwind CSS v4, Astro assets, Lucide Astro, and minimal client-side JavaScript with static output.
- Only visual assets under `src/assets` are approved for production use. Source assets must not be altered or overwritten.
- Products, prices, discounts, stock, reviews, opening hours, addresses, phone numbers, policies, and social handles must not be invented.
- The repository currently provides catalogue artwork and a primary logo. It does not currently provide an approved production store image under `src/assets/store`.

## Brand Commitments

- Brand name: Shri Varasiddhi Shopping Mall.
- Confirmed location: Adilabad, Telangana.
- The supplied logo at `src/assets/brand/logo/varasiddhi-logo-primary.png` remains the authoritative brand mark and must not be recreated with HTML typography.
- The brand should feel premium, editorial, established, family-oriented, celebration-aware, and culturally relevant without appearing visually old-fashioned.
- Bodoni Moda Variable is the selective editorial display face. Instrument Sans Variable is the interface and body face.

## Evidence on Hand

- Primary brand logo under `src/assets/brand/logo`.
- Ten approved 4:5 catalogue campaign artworks under `src/assets/catalogue`, covering four saree edits, three women's occasion/fusion edits, and three men's edits.
- No verified street address, phone number, opening hours, social account URL, policy content, prices, or reviews are present.
- Building renders under `src/concepts` are experimental material and are not approved production assets.

## Product Principles

- Lead with real supplied fashion imagery and honest catalogue content.
- Make mobile discovery intentional rather than a compressed desktop experience.
- Present fashion through varied editorial compositions instead of repetitive commerce cards.
- Keep the path from inspiration to a future store visit clear without fabricating practical details.
- Preserve a lean, static, accessible implementation until commerce or content-management scope is explicitly approved.

## Accessibility & Inclusion

Use semantic HTML, keyboard-accessible navigation, visible focus states, useful alt text, sufficient contrast, comfortable mobile touch targets, and reduced-motion support.
