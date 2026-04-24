# TrueHomeCosts.co.uk

TrueHomeCosts is a local-first, static-first UK home buying cost website built with Next.js 15, TypeScript and Tailwind CSS. It focuses on the true upfront cost of buying a home in the UK, including deposit, property tax, legal fees, searches, surveys, mortgage fees, moving costs and optional furnishing or insurance budgets.

## What is included

- Homepage calculator with client-side cost logic only
- Full guide pages for hidden costs, first-time buyers, stamp duty, mortgage fees, moving, insurance, leasehold, taxes, schemes, regional costs and furnishing
- Centralised tax and fee data files for SDLT, LBTT, LTT and HM Land Registry
- Reusable metadata, sitemap, robots and JSON-LD helpers
- Netlify-ready setup without a CMS, database or authentication layer

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the local dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Project structure

- `app/` - App Router routes, layout, sitemap and robots
- `components/` - reusable UI and content components
- `content/` - guide content and homepage scenario content
- `data/tax/` - official property tax band data
- `data/fees/` - official HM Land Registry fees
- `data/assumptions/` - central editable estimate ranges
- `lib/` - calculator logic, metadata helpers, formatting and structured data
- `public/` - static assets such as the default Open Graph image
- `styles/` - theme tokens

## Where to update tax rates later

Update the official tax data in these files:

- `data/tax/sdlt.ts`
- `data/tax/lbtt.ts`
- `data/tax/ltt.ts`

If HM Land Registry fees change, update:

- `data/fees/hmlr.ts`

## Where to update cost assumptions later

Update the editable estimate ranges in:

- `data/assumptions/solicitors.ts`
- `data/assumptions/searches.ts`
- `data/assumptions/surveys.ts`
- `data/assumptions/mortgageFees.ts`
- `data/assumptions/moving.ts`
- `data/assumptions/insurance.ts`
- `data/assumptions/furnishing.ts`
- `data/assumptions/transfers.ts`

## How to add a new guide page later

1. Add a new entry to `content/guides.ts`
2. Include the new slug in related guide links where useful
3. The dynamic guide route in `app/[slug]/page.tsx` will statically generate it automatically
4. Rebuild the site so the sitemap updates

## Netlify deployment

This project is set up for Netlify with the Next.js plugin.

1. Push the project to a Git provider when you are ready
2. Create a new Netlify site from that repository
3. Netlify should detect `netlify.toml`
4. Use the default install command:

```bash
npm install
```

5. Use the build command:

```bash
npm run build
```

## Notes

- The calculator is client-side only
- The project does not require a database, CMS or login
- Property tax and HMLR fee logic is centralised so rates can be updated in one place
- Market-based fee lines are clearly separated from official rates
