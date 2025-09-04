## Ethos Onramp (Next.js + Daimo Pay)

A minimal onramp checkout page built with Next.js that integrates the Daimo Pay widget. It renders a 720×720 canvas with an animated globe background, a bold deposit amount, and a large “PAY WITH CRYPTO” button. The accent color is configurable via URL params.

### Demo URL parameters

- **payId (required)**: Your Daimo Pay ID. Obtain it from your Daimo Pay dashboard or test value.
- **color (optional)**: Controls the accent color of the globe, header, and button.
  - Presets: `Red`, `Green`, `Aqua`, `Ochre`, `Gray`
  - Hex: `#00E4FF` or `00E4FF`
  - Dynamic: `auto` or `dynamic` (cycles through presets every 1.5s)

Examples:

```bash
# Preset color
http://localhost:3000/?payId=YOUR_PAY_ID&color=Green

# Hex color
http://localhost:3000/?payId=YOUR_PAY_ID&color=%2300E4FF

# Dynamic cycling colors
http://localhost:3000/?payId=YOUR_PAY_ID&color=auto
```

### Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Build and run production

```bash
npm run build
npm start
```

### Project structure

- `src/app/page.tsx`: Main deposit screen. Reads `payId` and `color` via `useSearchParams` inside a Suspense boundary. Uses `@daimo/pay` for the checkout button.
- `src/app/Providers.tsx`: App providers and Daimo Pay theme, with accent color injection.
- `src/app/Globe.tsx`: Animated background globe.
- `src/app/PoweredByPayFooter.tsx`: Footer with links to Daimo Pay, Terms, and Privacy.

### Customization

- Adjust sizes/spacing and typography directly in `src/app/page.tsx`.
- Update Daimo Pay theme overrides in `src/app/Providers.tsx` (`customTheme`).
- Change globe size/position via the `Globe` component props in `src/app/page.tsx`.

### Notes

- The deposit amount text reflects the active Daimo Pay order when available.
- `useSearchParams` calls are wrapped in Suspense to ensure compatibility with prerendered routes (e.g., 404).

### License

MIT
