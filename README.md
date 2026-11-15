# NJ's Business Marketing

A Next.js App Router marketing site for a human-led web development studio serving commercial food equipment and refrigeration companies.

## Local development

```sh
npm install
cp .env.example .env.local
npm run dev
```

The contact form requires `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. The sender defaults to Resend’s temporary `NJ's Business Marketing <onboarding@resend.dev>` sender. Until key and recipient are configured, the API returns an explicit unavailable response. `NEXT_PUBLIC_SITE_URL` is an optional override; otherwise canonical URL resolution uses Vercel production/deployment URLs.

## Vercel

Import the Git repository in Vercel and use the default Next.js build settings. Add the contact variables separately to Preview and Production environments. Set `NEXT_PUBLIC_SITE_URL` to the appropriate canonical URL in each environment. Deploy a Preview first and review it before promoting to Production. A custom domain is optional.

Vercel Analytics and Speed Insights are installed. Review Vercel analytics and privacy settings before launch. The site has no verified customer evidence, business address, phone number, testimonials, or case studies, so none are claimed.
