# Dev Insights — Mini Blog

An internal "Mini Blog" platform for the fictional startup *Dev Insights*, where employees share quick tips and insights about web development.

Built as **Formative 1** to demonstrate React, TypeScript, Vite, component design, styling techniques, optimization, and Higher-Order Components (HOCs).

## Tech Stack

- **React 18** — UI library (all functional components)
- **TypeScript** — type safety for components and post data
- **Vite 8** — build tool and dev server (not Create React App)
- **CSS Modules + inline styles** — the two styling methods used
- **Oxlint** — linter (Vite 8 scaffold default)

## Getting Started

> ⚠️ This project uses **Vite**, not Create React App. All commands below assume Vite.

### Prerequisites

- Node.js v18 or higher
- npm (bundled with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/Rwema01/dev-insights-mini-blog.git
cd dev-insights-mini-blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app is served at **http://localhost:5173/**.

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

### 6. Testing the application

There are no automated unit tests in this formative. Verify manually:

1. Start the dev server (`npm run dev`).
2. Open http://localhost:5173/ — you should see three sample posts.
3. Open DevTools → Console — you should see `[withMountLog] App mounted` (twice with a brief "unmounted" between is expected in React 18 StrictMode).
4. Confirm Priya's post (the newest) has a light-blue background and a green **MOST RECENT** badge.
5. Confirm Marcus's post (longest content) has a purple left border and a purple **LONGEST READ** badge.

## Project Structure

```
dev-insights-mini-blog/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx / Header.module.css
│   │   ├── Post.tsx / Post.module.css
│   │   └── PostList.tsx / PostList.module.css
│   ├── data/
│   │   └── posts.ts
│   ├── hocs/
│   │   └── withMountLog.tsx
│   ├── types/
│   │   └── Post.ts
│   ├── utils/
│   │   └── postUtils.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Components

| Component     | Type                 | Purpose                                                                 |
| ------------- | -------------------- | ----------------------------------------------------------------------- |
| `App`         | Functional           | Root component; renders `Header` and `PostList`.                        |
| `Header`      | Functional           | Renders the "Dev Insights" text logo and a "New Post" nav link.         |
| `PostList`    | Functional           | Maps over sample posts; passes conditional props to each `Post`.        |
| `Post`        | Functional (memoized) | Renders a single post: title, author, date, content, badges.           |
| `withMountLog`| HOC                  | Logs mount/unmount of the wrapped component. Applied to `App`.          |

## Styling

Two methods are used (the rubric requires at least two):

1. **CSS Modules** — `Header.module.css`, `Post.module.css`, `PostList.module.css`. Class names are locally scoped, which avoids global collisions.
2. **Inline styles** — the `Post` component applies a dynamic `borderLeft` via a `React.CSSProperties` object based on the `isLongest` prop.

### Conditional styling (two rules)

- **Most recent post** — tinted light-blue background + green **MOST RECENT** badge.
- **Longest post** — purple left border + purple **LONGEST READ** badge.

Both flags are computed once in `PostList` using helpers from `utils/postUtils.ts` (`getMostRecentPostId`, `getLongestPostId`), so each `Post` stays dumb and reusable.

## Optimization

- **`React.memo`** wraps the `Post` component. When `PostList` re-renders, posts whose props are unchanged skip rendering entirely.
- **Stable `key` prop** — `key={post.id}` is used on every item in the map. Using array indices instead would cause subtle bugs when the list order changes.
- **Computation lifted to the parent** — `getMostRecentPostId` and `getLongestPostId` run once in `PostList`, not once per post.

## Higher-Order Component — `withMountLog`

`withMountLog` is a generic HOC (`<P extends object>`) that wraps any component and logs:

- `[withMountLog] <ComponentName> mounted` on mount
- `[withMountLog] <ComponentName> unmounted` on unmount

It uses `useEffect` with a cleanup function, mimicking the class-component lifecycle methods `componentDidMount` / `componentWillUnmount`.

It is applied to `App` inside `src/main.tsx`:

```tsx
const AppWithLogging = withMountLog(App);
```

Applying the HOC at the entry point (rather than inside `App.tsx`) avoids a circular import and wraps the root component itself.

## Design Decisions

### Functional vs. class components

I chose **functional components** throughout. They are the modern React standard, integrate naturally with hooks and `React.memo`, and are more concise than class equivalents. A class component would have added boilerplate with no benefit for a purely presentational tree like this one.

### Styling choice

I combined **CSS Modules** (for static layout, typography, and theming) with **inline styles** (for dynamic prop-driven values). CSS Modules give locally scoped class names, so component styles cannot leak. Inline styles handle one-off dynamic values — like a colored left border driven by a boolean prop — without generating a class for every possible state.

### Optimization strategy

`React.memo` on `Post` prevents re-renders when its `post`, `isMostRecent`, and `isLongest` props haven't changed. Combined with stable `key={post.id}`, this keeps list reconciliation efficient.

## External Libraries & Packages

- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`
- `typescript`
- `@types/react`, `@types/react-dom`

No third-party state management, routing, or CSS-in-JS libraries were used.

## Challenges & Reflection

See the reflection section on Canvas for the graded write-up.

## Git Workflow

The project was built incrementally with meaningful commits:

- `chore: scaffold Vite React TypeScript project`
- `chore: remove Vite demo assets and reset App placeholder`
- `feat(types): add Post type definition`
- `feat(data): add sample blog posts`
- `feat(utils): add date and length helper functions`
- `feat(components): add Header component with CSS module`
- `feat(components): add Post component with React.memo and conditional styling`
- `feat(components): add PostList with keys and conditional prop passing`
- `feat(hoc): add withMountLog HOC`
- `feat(app): wire up Header and PostList, apply withMountLog HOC`
- `style: add global styles for root layout and typography`
- `docs: add README with setup, decisions, and reflection`

`node_modules` is excluded via `.gitignore` and is not tracked.