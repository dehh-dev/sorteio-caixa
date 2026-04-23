# AGENTS.md

## Project Overview

Next.js 13 (Pages Router) app displaying Brazilian lottery results (Lotofácil, Lotomania) from Caixa API.

## Commands

```bash
npm run dev    # Start dev server on :3000
npm test       # Run Jest tests
```

## Architecture (MVC)

- **Controllers**: `controllers/LotteryController.js` — API fetching, cache coordination
- **Models**: `models/LotteryResult.js`, `models/CacheManager.js` — data structures, file I/O
- **Views**: `views/Bola.js`, `views/CardSorteio.js` — UI components
- **Entry point**: `pages/index.js` — orchestrates MVC with ISR
- **Document**: `pages/_document.js` — custom fonts, hydration fix
- **Cache**: `data/resultados.json` — local fallback when API fails

## Key Behaviors

- Fetches results from `servicebus2.caixa.gov.br` at build/revalidation time
- ISR revalidates every 6 hours (`revalidate: 21600`)
- Falls back to `data/resultados.json` if API is unavailable
- Writes to cache after successful API fetch

## Testing

- Jest + Testing Library configured in `jest.config.js`
- Tests in `__tests__/` cover models, cache, and controller integration
- Mock `fs` module for file operations; `fetch` unavailable in test env

## Gotchas

- Uses Pages Router, not App Router — do not introduce `app/` directory patterns
- `suppressHydrationWarning` on `<body>` is intentional (browser extension mismatches)
- Date formatting is manual to avoid Node/browser locale divergence
- `fetch` is not available in Jest — mock or skip API tests
