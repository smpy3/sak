Portfolio Website — S. Adityakumar & Co.

Premium scroll-driven Next.js + Tailwind site for a diamond seller specializing in Light Brown diamonds (30+ years in business).

Local Setup

1) Install deps

  npm install

2) Configure contact email notifications

- Copy `.env.example` → `.env.local`
- Fill in SMTP creds (for Gmail: enable 2FA, then create an “App Password”)

  copy .env.example .env.local

3) Run the dev server

  npm run dev

Open http://localhost:3000

Contact Form

- UI: `src/components/ContactSection.tsx`
- API: `src/app/api/contact/route.ts`
- Email sender: `src/lib/sendContactEmail.ts`

If SMTP env vars are missing, the API returns an error telling you to configure `.env.local`.
