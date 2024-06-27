# Ecommerce project

Eberto Polo Zambrano [`GITHUB`](https://github.com/ebertopz3).

## Indications for Project

To initialize the project consider the following

## Node version

`20.13.1`

### Run the following commands to start the project

Being in the project directory, install dependencies with

```bash
npm ci
```

(or `pnpm install` or `yarn`)

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

***

## Considerations for execution

### _Creation file .env to run the fetch:_

> VITE_BASE_URL=http://localhost:**port**

> VITE_API_URL=http://localhost:**port**/api

> VITE_API_V1_URL=http://localhost:**port**/api/v1

_Change the port in the .env file to the port where the backend is running._

***

### Home

_In the initial view the products are loaded._

***

### Login to the application

_Use email and password, according to the backend instructions_

_By logging in you will enter product administration_

***

### Produc administration

In this part the products are displayed in a list and you can delete, create and update the products.

***

# For this project we used

### _This project was carried out with TypeScript, Tailwindcss_

---

## Tailwindcss

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p --ts
```

## Building

To create a production version of your app:

```bash
npm run build
```

