# Fly Sunnah Backend API

A small Express 5 service foundation for Fly Sunnah.

## Current endpoints

- `GET /health` — service health and version.
- `GET /api` — API name and currently available route list.
- Unknown routes return a JSON 404 response.

## Run locally

```sh
npm install
npm start
```

The default port is `8780`; set `PORT` to override it.

## Tests

```sh
npm test
```

The Node.js built-in test runner exercises the HTTP endpoints without requiring a separate test framework.

## Current scope

This repository currently contains an API foundation only. It does **not** yet implement booking, customer, visa-case, payment, authentication, database persistence, MongoDB integration, or production business workflows. Those capabilities must be designed and implemented before the service is described or deployed as a complete travel-business backend.

No customer data or credentials should be committed to this repository.
