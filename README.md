# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

# Reusable snippets I guess

```js
// Simulate a delay to see loading states
await new Promise((resolve) => setTimeout(resolve, 1500));

// Simulate an error
throw new Error('Simulated fetch error');
```

---

# Dark Mode Toggle Implementation Guide

The dark mode toggle works by adding or removing a “dark” class to the main HTML of the page. When activated, it tells Tailwind CSS to switch all elements that have dark-mode styles, like backgrounds or text, to their dark colors. Tailwind only applies these when the `darkMode: 'class'` is present on the tailwind config, because by default it only rely on your computer’s theme settings.

```js
// tailwind.config.js

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Table of Contents

1. [Tailwind's Dark Variant](#tailwinds-dark-variant)
2. [CSS Variables Approach](#css-variables-approach)
3. [Flowbite Components](#flowbite-components)

---

### 1. Tailwind's Dark Variant

```jsx
// Example At InventoryManagement.jsx


<TableBody className="text-content divide-y bg-white dark:bg-black">

```

**Key Points**

- Works with our toggle by adding dark classes on HTML elements
- Fast, direct and explicit, but requires duplicate classes
- Good for simple tests or few color changes
- Not as good when changes are needed, you would have to update everything

---

### 2. CSS Variables approach

```css
/* At index.css */

:root {
  --color-neutral: #fffcf9;
}

.dark {
  --color-neutral: oklch(0.25 0.01 270);
}
```

_How to use in components_

```jsx
// At LoginPage.jsx

<section className="bg-neutral min-h-screen pb-50">

```

**Key Points**

- Single source of truth, change in css applies to all using that color
- Easier to maintain and update
- Apparently better performance
- Suggested by tailwind and component libraries
- More readable, You can also define your own color hex & oklch

---

### 3. Flowbite Components

```jsx
// At AccountManagement.jsx

import { Button } from 'flowbite-react';

<Button
    outline
    color="gray"
    onClick={() =>
        navigate(`/Admin/AdminUserEdit/${user.id}`)
    }
>

```

- Most flowbite components have built in colors, design, and dark mode you don't have to do anything
- There are some that won't have a predefined color which you can use the 2 techniques above to add colors to
- Examples are table content and text, flowbite let's you define the colors for that

---
