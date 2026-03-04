This project is a pokedex website for my Rize computer science final. 

Getting Started (Development Setup) -----------------------------------------------

### Prerequisites
- **Node.js** ^14.0.0 or higher (check with `node --version`)
- **npm** (comes with Node.js; check with `npm --version`)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone and navigate to the project:**
```bash
cd pokemon_final/PokemonApp
```

2. **Install dependencies:**
```bash
npm install
```

This downloads all packages listed in `package.json` into the `node_modules/` folder.

### Running the Development Server

Start the Vite dev server with hot-reload (changes refresh automatically):
```bash
npm run dev
```

Then open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

### Running Tests

Run the Vitest test suite:
```bash
npm test          # Watch mode (re-runs on file changes)
npm test -- --run # Run once and exit
```

View test UI dashboard:
```bash
npm test -- --ui
```

### Building for Production

Create a production-optimized build:
```bash
npm run build
```

Output is in the `dist/` folder, ready for deployment (e.g., to Vercel).

Preview the production build locally:
```bash
npm run preview
```

### Code Quality

Run ESLint to check for code issues:
```bash
npm run lint
```

### Deployment (Production)

#### Vercel (Recommended)

1. **Ensure project root is set to `PokemonApp/` in Vercel dashboard**
2. **Set Build Command:** `npm run build`
3. **Set Output Directory:** `dist`
4. **Verify `vercel.json` exists** — handles SPA route rewrites automatically
5. **Push to GitHub and connect to Vercel** — auto-deploys on push

#### Local Production Test

Before deploying, test the production build locally:
```bash
npm run build    # Creates dist/ folder
npm run preview  # Serve dist/ on localhost:4173
```

Verify the app works—especially routing (e.g., refresh on `/pokemon-details/1` should work).

#### Environment & Security

- **CSP (Content Security Policy):** Configured in `index.html` `<head>`; adjust `script-src` in production if using external scripts
- **Auth Token:** Stored in localStorage; use `remember: true/false` in login to control persistence
- **API:** PokeAPI is public, no keys needed
- **See `SECURITY.md`** for detailed security notes and server integration guidance

#### Pre-Deploy Checklist

- [ ] `npm run lint` — no errors
- [ ] `npm test -- --run` — all tests pass
- [ ] `npm run build` — builds successfully
- [ ] `npm run preview` — app runs and routes work
- [ ] `.gitignore` includes `node_modules/`, `dist/`
- [ ] No API keys or secrets in source code
- [ ] `vercel.json` is committed
- [ ] `SECURITY.md` reviewed for prod notes

### Project Structure

```
PokemonApp/
├── src/
│   ├── components/          # Reusable UI components (Card, List, Search, etc.)
│   ├── pages/               # Page components (Home, Details, Battle, Favorites, MyTeam, Login, Register)
│   ├── context/             # React Context (AppContext, AuthContext)
│   ├── api/                 # API calls (auth.js for mock auth, PokeAPI calls)
│   ├── App.jsx              # Main app router
│   ├── main.jsx             # Entry point
│   └── *.css                # Component and page styles
├── public/                  # Static assets
├── index.html               # HTML entry point (includes CSP meta tag)
├── vite.config.js           # Vite configuration
├── vitest.config.js         # Vitest configuration
├── package.json             # Dependencies and scripts
├── SECURITY.md              # Security implementation notes
└── vercel.json              # Vercel deployment config (SPA rewrite)
```

### Key Features

- **Search & Filter** Pokémon by name or ID
- **Favorites** Save favorite Pokémon (persistent localStorage)
- **Teams** Build a 6-Pokémon team per user account (user-scoped storage)
- **Battle** Compare stats and battle Pokémon
- **Authentication** Simple mock login/register with localStorage tokens
- **Responsive** Mobile-first CSS design
- **Tests** Component and page unit tests with Vitest + Testing Library

### Environment Notes

- **API:** Uses public PokeAPI (no key required)
- **Auth:** Client-side mock auth (ready for backend integration)
- **Storage:** localStorage for favorites, teams, and auth token
- **Security:** CSP policy, optional token persistence, CSRF guidance in SECURITY.md

### Troubleshooting

**Port already in use:**
```bash
npm run dev -- --host 127.0.0.1 --port 3001
```

**Tests fail with "missing provider":**
Ensure components requiring context are wrapped with `<AuthProvider><AppProvider>` in test render calls.

**Build fails:**
- Clear `node_modules/` and reinstall: `rm -rf node_modules && npm install`
- On Windows: `rmdir /s /q node_modules` (then `npm install`)

Project Info ----------------------------------------------------------------------------

This project is a react application which connects to a public pokeapi API to be able to search, favorite, add to teams, and battle pokemon. User speicifc teams are saved via accounts. 

TECH STACK---

Front end:
-React ^18.3.1
-React DOM ^18.3.1
-React Router DOM ^7.13.0

Build & dev: 
-Vite ^7.3.1
-Vite React Plug-in ^5.1.1

Testing: 
Vitest ^1.1.0
Vitest ^1.1.0 
@vitest/ui ^1.1.0 
@testing-library/react ^14.1.2 
@testing-library/user-event ^14.5.1 
@testing-library/jest-dom ^6.1.5
jsdom ^23.0.1 

Seccurity:
Content Security Policy (CSP meta tag in index.html)
Auth token storage with optional remember flag (in-memory / localStorage)
HttpOnly cookie guidance in SECURITY.md
CSRF token patterns documented

External API:
PokeAPI (https://pokeapi.co/api/v2/)

State Management:
React Context API
localStorage




MVP------------------------------------------------------------------------------

Generative AI was used in the following instances: 
- all css was created by AI, as deemed okay by course including:
    - fully generating css files
    - implimenting stylistic divs with appropriate classnames to coordinate with said css files

- once code was written, AI was prompted to structure code to flow logically, and add labels to different parts/sections for easier itteration when continuing to build and debug

- needed help with a couple obscure things such as:
    - disabling link for a component depending what page I was on
    - creating the randomize function for the detail page

FINAL ---------------------------------------------------------------------------

AI was used to help assist with propper token and vulnerability debugging. Some things that would work locally would not work when deploying, so assisted debugging of my code was a necessary step, used with caution and citations where appropriate