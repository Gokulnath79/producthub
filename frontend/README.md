# ProductHub

A clean, responsive product inventory dashboard built with React, TypeScript, and Vite.

ProductHub provides a simple interface for managing products, monitoring inventory status, searching products, and tracking stock levels. The application is production-build ready and containerized with Docker and Nginx for consistent local startup.

---

## Features

- Clean and responsive inventory dashboard
- Add new products
- Edit existing products
- Delete products
- Search products by:
  - Product name
  - SKU
  - Category
- Dynamic inventory statistics
- Automatic stock status calculation
- Product inventory table
- Responsive user interface
- Production build with Vite
- Multi-stage Docker production build
- Nginx production server
- SPA routing support through Nginx

---

## Dashboard Overview

The dashboard provides four inventory metrics:

- **Total Products** — Total number of products
- **In Stock** — Products with more than 10 units
- **Low Stock** — Products with 1–10 units
- **Out of Stock** — Products with 0 units

These statistics automatically update whenever products are added, edited, or deleted.

---

## Stock Status Logic

ProductHub automatically determines product availability from the stock quantity.

| Stock Quantity | Status |
| --- | --- |
| More than 10 | In Stock |
| 1–10 | Low Stock |
| 0 | Out of Stock |

Users do not need to manually select a stock status.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- Lucide React

### Production & Containerization

- Docker
- Node.js Alpine
- Nginx Alpine

---

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── products/
│   │   └── ui/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── utils/
├── .dockerignore
├── Dockerfile
├── nginx.conf
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

The frontend is organized into reusable components and dedicated CSS files to keep the UI architecture maintainable and easy to extend.

---

## Prerequisites

For normal local development, install:

- Node.js
- npm

For containerized startup, install:

- Docker Desktop

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

### 2. Enter the frontend directory

```bash
cd frontend
```

> If this repository contains the frontend files directly at the repository root, skip this command.

### 3. Install dependencies

```bash
npm ci
```

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

---

## Production Build

Create an optimized production build with:

```bash
npm run build
```

The generated production files are written to:

```text
dist/
```

The build command performs TypeScript validation before Vite creates the production bundle.

To preview the production build locally:

```bash
npm run preview
```

---

## Run with Docker

Docker provides a consistent production-style local environment without requiring the application dependencies to be installed manually on the host machine.

### Build the Docker image

From the directory containing the `Dockerfile`:

```bash
docker build -t producthub-frontend .
```

### Start the application

```bash
docker run -d --name producthub -p 8080:80 producthub-frontend
```

Open the application in your browser at:

```text
http://localhost:8080
```

### Stop the container

```bash
docker stop producthub
```

### Start the existing container again

```bash
docker start producthub
```

### Remove the container if required

```bash
docker rm producthub
```

---

## Docker Architecture

ProductHub uses a multi-stage Docker build.

### Stage 1 — Build

The Node.js Alpine image:

1. Installs dependencies with `npm ci`
2. Copies the application source
3. Runs the production build
4. Generates the `dist` directory

### Stage 2 — Production Server

The Nginx Alpine image:

1. Receives only the compiled production files
2. Uses the custom Nginx configuration
3. Serves the application through port 80

This keeps development dependencies out of the final runtime stage.

---

## Nginx Configuration

Nginx serves the compiled frontend from:

```text
/usr/share/nginx/html
```

The configuration includes SPA fallback behavior:

```nginx
try_files $uri $uri/ /index.html;
```

This allows frontend routes to resolve correctly when accessed directly.

---

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create the production build |
| `npm run preview` | Preview the production build locally |

---

## Product Management

### Add Product

Select **Add Product** and enter:

- Product Name
- SKU
- Category
- Price
- Stock

The inventory status is calculated automatically.

### Edit Product

Select the edit action for a product.

The existing product information is pre-filled in the form. After saving, the product table and dashboard statistics update automatically.

### Delete Product

Select the delete action to remove a product from the current inventory.

The dashboard statistics automatically recalculate after deletion.

### Search Products

Use the dashboard search field to filter products by:

- Name
- SKU
- Category

Search is case-insensitive and updates the product table immediately.

---

## Data Persistence

The current portfolio version manages product data in React state.

This means products added, edited, or deleted during a session reset to the initial sample inventory after the page is refreshed.

The application architecture can later be extended with a REST API and persistent database without requiring a redesign of the dashboard UI.

---

## Clean Setup Verification

To verify the project from a clean environment:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd <REPOSITORY-NAME>
```

If the frontend is stored inside a `frontend` directory:

```bash
cd frontend
```

Then run:

```bash
npm ci
npm run build
```

For Docker:

```bash
docker build -t producthub-frontend .
docker run -d --name producthub -p 8080:80 producthub-frontend
```

The application should then be available on port `8080`.

---

## Production Checklist

- [x] Responsive dashboard UI
- [x] Reusable component architecture
- [x] Add Product functionality
- [x] Edit Product functionality
- [x] Delete Product functionality
- [x] Product search
- [x] Dynamic inventory statistics
- [x] Automatic stock status
- [x] TypeScript production validation
- [x] Vite production build
- [x] Multi-stage Dockerfile
- [x] Nginx production server
- [x] Docker container verified locally
- [x] Setup documentation

---

## Future Improvements

Potential extensions include:

- REST API integration
- Database persistence
- Authentication
- Pagination
- Advanced filtering
- Product image uploads
- Inventory activity history
- Automated testing
- CI/CD pipeline

---

## License

This project is intended for educational and portfolio purposes.