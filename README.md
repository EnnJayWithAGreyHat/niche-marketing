# Service Standard

A Next.js App Router marketing site for a human-led web development studio serving commercial food equipment and refrigeration companies.

## Local development

```sh
npm install
cp .env.example .env.local
npm run dev
```

The contact form requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Until configured, the API returns an explicit unavailable response and the UI does not report success. Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL before deployment. Configure a real business contact method in the contact page before launch; none was provided for this project.

## Vercel

Import the Git repository in Vercel and use the default Next.js build settings. Add the contact variables separately to Preview and Production environments. Set `NEXT_PUBLIC_SITE_URL` to the appropriate canonical URL in each environment. Configure the custom domain in Project Settings → Domains and follow Vercel's DNS instructions. Deploy a Preview first and review it before promoting to Production.

Vercel Analytics and Speed Insights are not installed; add them after deciding on privacy/consent requirements. No analytics or third-party tracking runs by default. The site has no verified customer evidence, business address, phone number, testimonials, or case studies, so none are claimed.
