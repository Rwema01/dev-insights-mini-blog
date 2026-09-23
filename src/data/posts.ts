import type { PostType } from "../types/Post";

export const samplePosts: PostType[] = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    author: "Diane",
    content:
      "Hooks let you use state and lifecycle features inside functional components. Start with useState for local state, and useEffect for side effects like data fetching.",
    datePosted: "2026-09-22",
  },
  {
    id: 2,
    title: "TypeScript Interfaces vs Type Aliases",
    author: "Marcus",
    content:
      "Interfaces are great for object shapes and can be extended; type aliases are more flexible for unions and intersections. For component props, interfaces are often preferred.",
    datePosted: "2026-09-21",
  },
  {
    id: 3,
    title: "Why Vite Feels So Fast",
    author: "Priya",
    content:
      "Vite serves your source files as native ES modules during development, so it skips the bundling step entirely. That's why the dev server starts in milliseconds.",
    datePosted: "2026-09-23",
  },
];