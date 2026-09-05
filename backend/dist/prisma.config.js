import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
export default defineConfig({
    schema: './prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        // Use a direct connection for schema migrations when one is available.
        // The running application can use Neon's pooled DATABASE_URL independently.
        url: process.env.DIRECT_URL ?? env('DATABASE_URL'),
    },
});
