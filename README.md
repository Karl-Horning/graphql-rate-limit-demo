# GraphQL Rate Limit Demo

## Table of Contents

- [GraphQL Rate Limit Demo](#graphql-rate-limit-demo)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Demo](#demo)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Scripts](#scripts)
  - [Project Structure](#project-structure)
  - [Testing](#testing)
  - [📄 Licence](#-licence)
  - [FAQ](#faq)
  - [👤 Author](#-author)

---

## Overview

A lightweight demonstration of **field-level rate limiting** in a GraphQL API using `graphql-rate-limit-directive` and **Apollo Server**, built with **ES modules** and a modular structure.

Originally created as a proof of concept for exploring GraphQL rate limiting strategies.
Both `apollo-server` and `rate-limiter-flexible` are now out of date but retained here for historical reference.

---

## Demo

Run locally to see output such as:

```bash
Apollo Server started at http://localhost:4000 🚀
```

Example response after exceeding a rate limit:

```json
{
  "errors": [
    {
      "message": "Too many requests, please try again in 15 seconds.",
      "extensions": { "code": "RATE_LIMITED" }
    }
  ]
}
```

---

## Tech Stack

- **GraphQL Server:** Apollo Server *(deprecated)*
- **Rate Limiting:** graphql-rate-limit-directive *(proof of concept)*
- **Limiter Library:** rate-limiter-flexible *(deprecated)*
- **Schema Tools:** @graphql-tools/schema
- **Runtime:** Node.js (ESM)
- **Config:** dotenv

---

## Installation

```bash
git clone https://github.com/Karl-Horning/graphql-rate-limit-demo.git
cd graphql-rate-limit-demo
npm install
echo "PORT=4000" > .env
```

---

## Configuration

This project requires a `.env` file with the following variable:

| Variable | Default | Description             |
| -------- | ------- | ----------------------- |
| `PORT`   | `4000`  | Port used by the server |

---

## Scripts

| Command        | Description                            |
| -------------- | -------------------------------------- |
| `npm start`    | Start the GraphQL server               |
| `npm run test` | Run Jest tests for rate limiting logic |

---

## Project Structure

```bash
src/
├── __tests__/
│   └── rateLimit.test.js   # Jest tests
├── directives/
│   └── rateLimit.js        # Directive setup
├── schema/
│   ├── index.js            # TypeDefs + schema + directive
│   └── resolvers.js        # Query resolvers
├── utils/
│   └── context.js          # Extract IP/auth from request
├── server.js               # Apollo Server config
└── index.js                # Entry point
```

---

## Testing

Tests use **Jest** to validate rate limiting behaviour:

- First query → allowed
- Second query → rate limited

Run tests:

```bash
npm run test
```

---

## 📄 Licence

MIT © 2025 Karl Horning

---

## FAQ

**Why am I seeing a "PORT variable not provided" error?**
Ensure `.env` includes a `PORT=4000` line.

**How do I customise limits per field?**
Add `@rateLimit(limit: X, duration: Y)` to that field in the schema.

**Why are queries being blocked?**
You're exceeding the configured rate limit for your IP/auth header.

**Can I disable rate limiting on some fields?**
Yes — omit the directive on that field.

**Are there any known limitations?**
Yes:

- IP detection via `req.connection.remoteAddress` may fail behind proxies.
- Rate limiting applies per IP/auth — per-user JWT logic is not implemented.
- Dependencies (`apollo-server`, `rate-limiter-flexible`) are deprecated and not recommended for production use.

---

## 👤 Author

Made with ❤️ by [Karl Horning](https://github.com/Karl-Horning)
