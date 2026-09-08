# AK Technologies

## Project structure

- `src/` is the Vite/React frontend. It talks to the backend through `src/lib/api.ts`.
- `backend/` is the Express + MongoDB API. It owns authentication, contact leads, and email notification.
- `backend/.env.example` contains the server configuration required to run the API.
- `.env.example` contains the frontend API URL.

## Run locally

Install dependencies in the root and in `backend`, configure both `.env` files, then run `npm run dev` in each directory. MongoDB must be available at the `MONGODB_URI` configured for the backend.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-xkr2slw7)
