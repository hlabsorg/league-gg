This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

> Make sure you have `Node v20^` and `redis` installed before proceeding

1.  In the root of the project, create your `.env` file from existing `.env.example`

```bash
cp .env.example .env
```

2. Add all required fields to your `.env` file

```env
# client envs
NEXT_PUBLIC_R2_HOST=(paste url here)

# server envs
RIOT_API_KEY=(paste key here)
UPSTASH_REDIS_REST_URL=(paste url here)
UPSTASH_REDIS_REST_TOKEN=(paste token here)
```

**Please reach out to team members for the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`**. You will need this for the application to work.

3. Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
