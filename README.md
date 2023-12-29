This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Database Schema

```sql
CREATE TYPE semester AS ENUM ('1', '2', '3', '4', '5', '6', '7', '8');

CREATE TABLE beasiswa (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  no_hp VARCHAR(255) NOT NULL,
  smt_saat_ini semester NOT NULL,
  ipk_terakhir NUMERIC(3, 2) NOT NULL,
  pilihan_beasiswa VARCHAR(255) NOT NULL,
  status_ajuan VARCHAR(50) DEFAULT 'Belum Diverifikasi' NOT NULL,
  created_at TIMESTAMP NOT NULL,
  file_upload_url VARCHAR(255) NOT NULL
);

INSERT INTO beasiswa (nama, email, no_hp, smt_saat_ini, ipk_terakhir, pilihan_beasiswa, status_ajuan, created_at, file_upload_url)
VALUES ('John Doe', 'john.doe@example.com', '081234567890', '2', 3.75, 'Beasiswa Non-Akademik', 'Sudah Diverifikasi', NOW(), 'https://xrquhcubmruwlncd.public.blob.vercel-storage.com/vG9Cn9P-hCFlA5oSUsAKglfvq9KoyOll2lFXys.png');

```