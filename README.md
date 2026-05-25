# world-trump-2026

**World Cup 2026 USA + USA250 Semiquincentennial + Trump Mode**

A 3-microservice web application for the 2026 FIFA World Cup, built for EASS HIT PART A 2026 CLASS IX.

## Stack

| Service  | Tech               | Port |
|----------|--------------------|------|
| Backend  | Python 3.12 + FastAPI | 8000 |
| Frontend | Next.js 14 + Tailwind | 3000 |
| Redis    | Redis 7 Alpine      | 6379 |

## Quick Start

```bash
docker compose up --build
```

Open http://localhost:3000

## API Endpoints

- `GET /teams` — All 48 qualified teams
- `GET /teams/{id}` — Team details
- `GET /venues` — All 16 stadiums
- `GET /matches` — All 104 matches
- `GET /matches/group/{group}` — Matches by group
- `GET /matches/{id}` — Match detail
- `GET /standings` — Group standings
- `GET /bracket` — Knockout bracket
- `GET /odds` — Betting markets (Polymarket-style)
- `GET /usa250` — USA Semiquincentennial facts
- `GET /trump-quotes` — Trump World Cup quotes
- `GET /health` — Health check

## Features

- Full WC2026 schedule (104 matches, 48 teams, 16 venues)
- Polymarket-style betting odds page
- USA 250th anniversary (Semiquincentennial) content
- Trump Mode toggle (cosmetic + prediction game)
- Vegas-style odds display (fractional + moneyline)
- Redis caching layer

## Deploy to islo.dev

```bash
islo use worldcup-2026
islo share 3000
```

## GitHub

https://github.com/EASS-HIT-PART-A-2026-CLASS-IX/world-trump-2026
