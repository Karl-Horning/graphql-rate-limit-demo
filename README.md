# GraphQL Rate Limit Demo

> **Note:** This project is preserved for historical reference. The dependencies are deprecated and are not recommended for production use.

A proof of concept for **field-level rate limiting** in a GraphQL API, built with `graphql-rate-limit-directive` and **Apollo Server**.

Built for a legacy EdTech platform that had opened its SCORM (a standard format for e-learning content) endpoints to external content providers. The concern was that third-party integrations could send excessive requests to those endpoints — the target was **1 request per minute per client**. This POC validated the approach against the existing stack before any production changes were made.

`apollo-server` and `rate-limiter-flexible` match what was in use at the time (2023) and are kept as-is for historical reference.

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

## Tech Stack

- **GraphQL Server:** Apollo Server *(deprecated)*
- **Rate Limiting:** graphql-rate-limit-directive *(proof of concept)*
- **Limiter Library:** rate-limiter-flexible *(deprecated)*
- **Schema Tools:** @graphql-tools/schema
- **Runtime:** Node.js (ESM)
- **Config:** dotenv

## Installation

```bash
git clone https://github.com/Karl-Horning/graphql-rate-limit-demo.git
cd graphql-rate-limit-demo
npm install
echo "PORT=4000" > .env
```

## Configuration

This project requires a `.env` file with the following variable:

| Variable | Default | Description             |
| -------- | ------- | ----------------------- |
| `PORT`   | `4000`  | Port used by the server |

## Scripts

| Command        | Description                            |
| -------------- | -------------------------------------- |
| `npm start`    | Start the GraphQL server               |
| `npm run dev`  | Start with auto-restart (nodemon)      |
| `npm test`     | Run Jest tests for rate limiting logic |

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

## Testing

Tests use **Jest** to validate rate limiting behaviour:

- First query → allowed
- Second query → rate limited

The schema is configured to 15 seconds for local testing. The intended production limit was 1 request per minute (`duration: 60`).

Run tests:

```bash
npm test
```

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

## License

Released under the [MIT License](./LICENSE) by [Karl Horning](https://github.com/Karl-Horning).
