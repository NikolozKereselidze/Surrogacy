# Production deployment

The current deployment architecture is:

- Next.js frontend on Vercel
- Express API on a Render Free web service
- PostgreSQL on Neon

## Neon

Create two connection strings from the Neon **Connect** dialog:

- `DATABASE_URL`: enable connection pooling. The hostname should contain
  `-pooler`. This is used by the running API.
- `DIRECT_URL`: disable connection pooling. This is used only by Prisma
  migrations during a deployment.

Choose a Neon region close to the Render region. Do not put either connection
string in Vercel unless the frontend begins querying the database directly.

## Render Free

Manage the existing service in the Render dashboard. There is intentionally no
`render.yaml` Blueprint while the service remains on the Free plan, to avoid
accidentally selecting paid compute. Render's pre-deploy command is also not
available on a Free web service.

Set all variables from `backend/.env.example` in the Render dashboard. At a
minimum, set `DATABASE_URL`, `DIRECT_URL`, `FRONTEND_ORIGIN`, authentication
secrets, S3 credentials, and SMTP credentials.

The two health endpoints have different purposes:

- `/healthz` verifies that the API process is alive without querying Neon.
- `/readyz` performs a database query and is intended for manual diagnostics.

Do not configure frequent external checks against `/readyz`, because those
checks prevent an idle Neon database from scaling to zero.

Use these dashboard settings:

- Build: `npm ci && npm run build && npm run deploy:migrate`
- Start: `npm start`
- Health check path: `/healthz`

Running migrations in the build phase is the Free-plan compromise. It keeps
migrations out of the runtime start command, so a Render cold start does not
run Prisma migrations before accepting traffic.

## Vercel

Set `NEXT_PUBLIC_API_BASE_URL` to the Render service URL and
`NEXT_PUBLIC_CLOUDFRONT_DOMAIN` to the existing CloudFront domain. Set
`FRONTEND_ORIGIN` on Render to the canonical production frontend origin.

After deploying, verify `/healthz` first and `/readyz` second. The first route
isolates Render startup latency; the second includes the Neon connection and a
database round trip.
