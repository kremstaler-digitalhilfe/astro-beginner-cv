# Interactive CV — Beginner Course

## Get started

1. Open this project folder in your terminal.
2. Install dependencies (needs [Node.js](https://nodejs.org/) installed):

```sh
npm install
```

3. Start the local site:

```sh
npm run dev
```

4. Open the URL shown in the terminal (usually **http://localhost:4321**).

The CV is that address. A second page explains the code: **http://localhost:4321/explain**.

Other useful commands:

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm run build`   | Build the site into `./dist/`               |
| `npm run preview` | Preview the production build locally        |

---

## Line-by-line explanation

**http://localhost:4321/explain** — only while `npm run dev` is running.

This page is the `Explanation` component (`src/components/Explanation.astro`), shown by `src/pages/explain.astro`. It is a beginner guide to an Astro component in general: where the HTML, the CSS, and the JavaScript go inside one `.astro` file. German first, English second.

An illustrated file map shows the four zones, top to bottom:

- **JavaScript between `---`** — runs when the page is built (imports, props, variables)
- **HTML** — the visible structure; `{ }` drops in a value from the top
- **CSS in `<style>`** — applies only to this component, not the whole page
- **JavaScript in `<script>`** — runs in the browser, only for this component

Each zone also notes when something belongs in a shared/global file instead (e.g. `cv-global-styles.css`). The CV page itself is unchanged.

---

## Project structure

```text
/
├── public/
│   ├── images/me.png     ← your profile photo
│   └── cv-pdf/           ← put your PDF here
├── src/
│   ├── data/cv-raw-data.json      ← your CV content
│   ├── types/cv.ts       ← data shapes (usually leave alone)
│   ├── components/       ← page sections (HTML + props)
│   │   ├── Navbar.astro
│   │   ├── Card.astro
│   │   ├── Profile.astro
│   │   ├── ProfileContact.astro
│   │   ├── ProfileQuote.astro
│   │   ├── Experience.astro
│   │   ├── Education.astro
│   │   ├── Skills.astro
│   │   ├── SoftSkills.astro
│   │   ├── Languages.astro
│   │   ├── CvDownload.astro
│   │   └── Explanation.astro  ← line-by-line lesson (DE + EN)
│   ├── layouts/Layout.astro
│   ├── pages/index.astro ← assembles the page from JSON
│   ├── pages/explain.astro ← lesson page at /explain
│   ├── styles/cv-global-styles.css  ← shared palette + page layout
│   └── scripts/cv-global-actions.js ← global JS (e.g. fireConfetti)
└── package.json
```

| Path | What it is |
| ---- | ---------- |
| `src/data/cv-raw-data.json` | All text and lists for the CV |
| `src/types/cv.ts` | TypeScript shapes for the JSON (do not edit) |
| `src/components/` | One file per section; data comes in as props ([Astro Components docs](https://docs.astro.build/en/basics/astro-components/)) |
| `src/pages/explain.astro` | Lesson page. Open **http://localhost:4321/explain** while the dev server is running |
| `src/styles/cv-global-styles.css` | Shared colors, fonts, page sheet |
| `src/components/*.astro` `<style>` | Styles that belong to one component only (e.g. Card border) |
| `src/scripts/cv-global-actions.js` | Global JS helpers (e.g. `fireConfetti`) |
| `public/images/` | Photo files served as `/images/...` |
| `public/cv-pdf/` | PDF files served as `/cv-pdf/...` |

---

## What you edit

- **`src/data/cv-raw-data.json`** — replace the demo person with your real info
- **`public/images/me.png`** — your photo (keep it small, under 150 KB; write a clear `photo.alt` in JSON)
- **`src/styles/cv-global-styles.css`** — change colors/fonts in the `CUSTOMIZE` zone
- **Component `<style>` blocks** — change look of one component (example: Card border in `Card.astro`)
- **`src/components/shared/DownloadButton.astro`** — add your PDF download button when ready
- **`public/cv-pdf/`** — place your PDF file here (e.g. `cv.pdf`)

Demo person in the starter: **User Musterfrau** — replace her with you.

---

## Confetti on the nav pills

`fireConfetti` lives in `src/scripts/cv-global-actions.js` and is loaded globally by the layout. You do **not** need to import it in a component.

Library used: [js-confetti](https://github.com/loonywizard/js-confetti).

Nav pills use `Pill.astro` with a nav `link` (label + href). Optional `confetti` on the link is an **object** passed to `fireConfetti()` — set it in `cv-raw-data.json`. No `confetti` prop → no confetti.

```json
{
  "label": "About",
  "href": "#about",
  "confetti": { "emojis": ["🎉", "✨", "💥"], "confettiNumber": 80 }
}
```

```astro
<Pill link={link} />
```

**Defaults** inside `fireConfetti()` when options are empty/partial: emojis `🎉 ✨ 💥`, `confettiNumber: 100`.

### Customise confetti (in `cv-raw-data.json`)

Same knobs as [js-confetti](https://github.com/loonywizard/js-confetti):

**Emojis**

```json
"confetti": { "emojis": ["🌈", "⚡️", "💥", "✨", "💫", "🌸"] }
```

**Colors** (colored paper — omit `emojis`)

```json
"confetti": {
  "confettiColors": ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd", "#f9bec7"]
}
```

**Radius + number**

```json
"confetti": {
  "confettiColors": ["#ff0a54", "#ff477e"],
  "confettiRadius": 6,
  "confettiNumber": 500
}
```

**Combine**

```json
"confetti": { "emojis": ["🦄"], "emojiSize": 100, "confettiNumber": 30 }
```

| Option | Type | What it does |
| ------ | ---- | ------------ |
| `emojis` | `string[]` | Emoji particles |
| `emojiSize` | `number` | Size of emoji particles |
| `confettiColors` | `string[]` | Colored paper (skips default emojis if `emojis` is omitted) |
| `confettiRadius` | `number` | Size of colored paper pieces |
| `confettiNumber` | `number` | How many pieces |

---

## Do not edit (unless challenge)

- `src/layouts/Layout.astro` — page shell
- `src/types/cv.ts` — TypeScript interfaces for the CV data
- The **DO NOT EDIT** section of `cv-global-styles.css`
- Component logic (loops / props) — read it to learn; don’t rewrite it for the basic tasks

The PDF **button is not included on purpose** — you add it yourself.

---

## Icons

Contact icons use **Lucide** via [`astro-icon`](https://github.com/natemoo-re/astro-icon) (inline SVG at build time, no client JS).

Browse all icons here: **[https://lucide.dev/icons/](https://lucide.dev/icons/)**

To use an icon in a component:

```astro
---
import { Icon } from 'astro-icon/components';
---
<Icon name="lucide:mail" size={18} />
```

Replace `mail` with the icon name from the Lucide site (for example `phone`, `map-pin`, `download`).

If you add a **new** Lucide icon name, also list it in `astro.config.mjs` under `integrations → icon → include → lucide`.

- Lucide: ISC license (free for personal and commercial use)
- astro-icon: MIT license

License texts are kept in [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md).

---

## Learn more

- Astro components (props, slots, `<style>`): https://docs.astro.build/en/basics/astro-components/
- Lucide icons: https://lucide.dev/icons/
- js-confetti: https://github.com/loonywizard/js-confetti
