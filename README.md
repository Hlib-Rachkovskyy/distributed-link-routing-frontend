# 🔗 LinkShrink - Premium URL Shortener Frontend

An ultra-modern, high-performance, and visually stunning frontend interface for a distributed URL shortening service. Built with **React 19**, **Vite 8**, **TypeScript**, and **Tailwind CSS v4**, this application provides a premium user experience featuring sleek glassmorphism, dynamic glowing ambient backgrounds, smooth micro-interactions, and real-time state feedback.

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [💻 Tech Stack](#-tech-stack)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 Getting Started](#-getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Backend Configuration](#3-backend-configuration)
  - [4. Start Development Server](#4-start-development-server)
  - [5. Build for Production](#5-build-for-production)
- [🏗️ Architecture Overview](#️-architecture-overview)
  - [Directory Structure](#directory-structure)
  - [Data Flow & Request Lifecycle](#data-flow--request-lifecycle)
  - [Core File Breakdown](#core-file-breakdown)
- [🌐 Local Proxy & Environment Variables](#-local-proxy--environment-variables)
  - [Vite Proxy Setup](#vite-proxy-setup)
  - [Production Variables](#production-variables)
- [🛠️ Available Scripts](#️-available-scripts)
- [🧪 Testing Strategy](#-testing-strategy)
- [🚢 Deployment Guide](#-deployment-guide)
  - [Recommended: Docker & Nginx](#recommended-docker--nginx)
  - [Cloud Platforms (Vercel / Netlify / Cloudflare Pages)](#cloud-platforms-vercel--netlify--cloudflare-pages)
- [🔍 Troubleshooting](#-troubleshooting)

---

## ✨ Key Features

- 🌌 **Ambient Glassmorphism UI**: Beautiful dark-mode interface with dynamic pulsing glowing spheres that layer behind container cards.
- ⚡ **Blazing Fast Shortening**: Dynamic form submission that makes asynchronous API requests to generate short links instantly.
- 📋 **Interactive Clipboard Integration**: One-click copy-to-clipboard action with green visual success state feedback (tick icon and styling transitions).
- 🛡️ **Robust Validation & Handling**: Built-in input validation requesting standard web addresses, backed by structured error handlers.
- 🚦 **Rate Limit Feedback**: Contextual alert banners that specifically notify users if they have been rate-limited (HTTP `429 Too Many Requests`).
- ⚡ **Optimized Core & Styling**: Tailored using the brand new **Tailwind CSS v4** engine for compiled stylesheet efficiency and speed.

---

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) (Functional components, hooks-based state management)
- **Tooling/Bundler**: [Vite 8](https://vite.dev/) (Next-generation lightning-fast frontend tooling)
- **Language**: [TypeScript 6.0](https://www.typescriptlang.org/) (Strict type-safety across components and configurations)
- **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration with the `@theme` directive and `@apply` rules)
- **Icons**: [Lucide React](https://lucide.dev/) (Fully tree-shaken and scalable clean SVG icon components)
- **Utilities**: [Clsx](https://github.com/lukeed/clsx) & [Tailwind Merge](https://github.com/dcastil/tailwind-merge) (Conditional class merging without conflicts)
- **Linter**: [ESLint 10](https://eslint.org/) (Modern Flat Config style validation)

---

## ⚙️ Prerequisites

Before you get started, ensure you have the following installed on your machine:

- **Node.js**: Version `20.x` or higher (LTS recommended)
- **Package Manager**: `npm` (recommended, includes lockfile) or `pnpm` / `yarn`
- **Backend API**: A functional URL shortener backend service running locally (usually on port `8080`).

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-short-frontend.git
cd url-short-frontend
```

### 2. Install Dependencies

Install the node modules using `npm`:

```bash
npm install
```

### 3. Backend Configuration

By default, the Vite dev server is configured to proxy all API requests starting with `/api` to `http://localhost:8080`. Make sure your backend API server is running on port `8080` before starting the frontend, or adjust the proxy settings in `vite.config.ts`.

### 4. Start Development Server

Run the development command:

```bash
npm run dev
```

The app will start running on [http://localhost:5173](http://localhost:5173). Open it in your web browser.

### 5. Build for Production

Compile static HTML, CSS, and JS assets optimized for production deployment:

```bash
npm run build
```

The compiled output will be generated inside the `/dist` directory, ready to be served by any static host or web server.

---

## 🏗️ Architecture Overview

### Directory Structure

Below is an outline of the frontend project structure:

```
url-short-frontend/
├── .antigravitycli/      # AI environment assistant configurations
├── .git/                 # Git version control files
├── .github/              # GitHub configurations (CI/CD templates)
├── dist/                 # Production compiled assets (created after build)
├── node_modules/         # Installed node packages
├── public/               # Static public assets
│   ├── favicon.svg       # Browser tab shortcut icon
│   └── icons.svg         # SVG sprite collection
├── src/                  # Main React application source code
│   ├── assets/           # Local media assets
│   ├── App.tsx           # Primary application logic, state, and UI skeleton
│   ├── index.css         # Tailwind directives and custom theme configuration
│   ├── main.tsx          # React application entry point (binds to DOM)
│   └── vite-env.d.ts     # TypeScript environment declarations
├── eslint.config.js      # ESLint static analysis configuration (Flat Config style)
├── index.html            # Core entry HTML document
├── package.json          # Project metadata and dependencies list
├── package-lock.json     # Deterministic node module resolution lockfile
├── tsconfig.json         # Master TypeScript configuration
├── tsconfig.app.json     # App compiler configurations
├── tsconfig.node.json    # Bundler/Node environments TypeScript options
└── vite.config.ts        # Vite configuration file including backend proxy routes
```

### Data Flow & Request Lifecycle

The application acts as a client that submits a long URL to the backend, receives a short URL key, and displays it back to the user:

```
[ User Input ] 
       │
       ▼
 [ App.tsx Form State ] ──( Validate Input URL )
       │
       ▼
 [ Async HTTP POST ] ──▶ [ Vite Proxy (/api) ] ──▶ [ Local Backend (:8080) ]
                                                            │
                                                            ▼
[ Render Shortened Link ] ◀── [ JSON Payload ] ◀─── [ 201 Created Status ]
```

### Core File Breakdown

#### 1. `src/App.tsx`
The primary single-page component. It orchestrates:
- **State Management**: Tracks input URLs, shortened URLs, loading states, error logs, and temporary copy confirmation feedback.
- **API Form Submission**: Handles the asynchronous `fetch('/api/v1/urls')` call with specific request headers, request payload, and precise error handling (e.g., matching HTTP status `429` for rate limits).
- **Glassmorphic Layout**: Renders the dynamic glowing backdrops and the responsive interface card containing the input fields and reactive copy action buttons.

#### 2. `src/index.css`
Sets up **Tailwind CSS v4**. It features:
- `@import "tailwindcss";` directive.
- New `@theme` block specifying customized corporate brand color overrides for dynamic violet classes (`bg-brand-500`, `text-brand-300`, etc.).
- Global base rules styling the HTML body for rich aesthetics using `@apply bg-neutral-950 text-white font-sans antialiased;`.

#### 3. `vite.config.ts`
Vite bundler configuration equipped with `@tailwindcss/vite` plugin and a server proxy rule mapping all `/api` calls directly to the local backend to avoid CORS conflicts during local development.

---

## 🌐 Local Proxy & Environment Variables

### Vite Proxy Setup

To allow seamless communication with the backend service during development without encountering CORS (Cross-Origin Resource Sharing) restrictions, a proxy is configured in `vite.config.ts`:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Replace with your backend server URL
        changeOrigin: true,
      },
    },
  },
})
```

### 🔐 Environment Variables

The application comes pre-equipped with environment variable support. You can configure them in the `.env` file in the root directory. An `.env.example` file is provided as a template.

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL for the URL shortener backend API. Leave blank in local development to route requests through Vite's local dev proxy server, avoiding CORS issues. | `https://api.yourdomain.com` |
| `PORT` | Custom port on which the local Vite development server should listen. | `5173` |

### Setting Up Environment Variables

1. Copy the example template to create your `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in the values according to your environment.

Vite loads environment variables in your React components via `import.meta.env`:
```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
const response = await fetch(`${apiBaseUrl}/api/v1/urls`, { ... });
```

Vite also loads the custom port in `vite.config.ts` dynamically utilizing `loadEnv`:
```typescript
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: parseInt(env.PORT || '5173', 10),
      // ...
    }
  }
})
```

---

## 🛠️ Available Scripts

In the project directory, you can run the following package scripts:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local dev server at `http://localhost:5173` with fast hot-reloading (HMR). |
| `npm run build` | Runs the TypeScript compiler and packages production-optimized static files in `/dist`. |
| `npm run lint` | Inspects the source code using ESLint rules to identify syntax and standard styling problems. |
| `npm run preview` | Spins up a local web server hosting the compiled production `/dist` directory to test performance locally. |

---

## 🧪 Testing Strategy

While this project is primarily focused on a visual presentation, we recommend implementing a robust testing architecture using **Vitest** and **React Testing Library**.

### Recommended Testing Packages

To set up unit tests, install these packages:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

### Sample Unit Test (`src/App.test.tsx`)

Here is an example test showcasing how to test component structure and behavior:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

describe('LinkShrink App Component', () => {
  it('renders the header title and description', () => {
    render(<App />);
    expect(screen.getByText('Shorten Your Links')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://example.com/very/long/url')).toBeInTheDocument();
  });

  it('updates the input field when typed into', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('https://example.com/very/long/url') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'https://google.com' } });
    expect(input.value).toBe('https://google.com');
  });
});
```

---

## 🚢 Deployment Guide

### Recommended: Docker & Nginx

The most reliable way to package and deploy this static frontend is using an **Nginx** Docker container. It packages the built assets and proxies API calls securely.

#### 1. Create a `Dockerfile` in the root:

```dockerfile
# Step 1: Build the React Application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Create `nginx.conf` in the root to handle client-side routing and API proxying:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to the backend service
    location /api {
        proxy_pass http://backend-service-host:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 3. Build and Run the Container:

```bash
docker build -t url-short-frontend .
docker run -p 80:80 url-short-frontend
```

---

### Cloud Platforms (Vercel / Netlify / Cloudflare Pages)

Because this app compiles to plain static assets (`HTML`, `JS`, `CSS`), you can deploy it for free on modern static hosting platforms:

#### 🪐 Deploy to Vercel
1. Install the Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root.
3. Configure your API rewrite proxy in a `vercel.json` file to route `/api` traffic correctly:
   ```json
   {
     "rewrites": [
       { "source": "/api/:path*", "destination": "https://your-api-domain.com/api/:path*" }
     ]
   }
   ```

#### ⚡ Deploy to Netlify
1. Connect your repository to Netlify.
2. Configure **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set up redirects in a `netlify.toml` file in the root to resolve proxy rules:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://your-api-domain.com/api/:splat"
     status = 200
     force = true
   ```

---

## 🔍 Troubleshooting

### 🛑 API Requests return 404 or fails to fetch
- **Reason**: The Vite proxy targets `http://localhost:8080` by default. If your backend service is running on another port or host, Vite cannot forward the request.
- **Solution**: Open `vite.config.ts`, locate `server.proxy['/api'].target`, and replace `http://localhost:8080` with your active backend server address (e.g., `http://127.0.0.1:5000` or `https://api.shortener.com`).

### ⏳ 429 Too Many Requests Error
- **Reason**: The API backend has a rate limiter active to protect against spam, and you have sent too many requests.
- **Solution**: Wait 60 seconds for the cooldown period to expire. If you are developing locally, you can modify the backend's rate-limiting rules or config parameters.

### 🚫 Typescript/Build Errors
- **Reason**: Discrepancies between React 19 types, Vite types, or out-of-sync node_modules.
- **Solution**: Clear cache and rebuild:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npm run build
  ```

### 🎨 Tailwind V4 Styles not reloading or updating
- **Reason**: Tailwind CSS v4 relies on native build engine structures and caching inside `@tailwindcss/vite`.
- **Solution**: Clear Vite's temporary compilation cache by deleting `.vite` directory, then restart the server:
  ```bash
  rm -rf node_modules/.vite
  npm run dev
  ```
