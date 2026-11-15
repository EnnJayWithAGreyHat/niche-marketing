import {canonicalSiteUrl} from '@/lib/site-url';
export const brand = {
  name: "Service Standard",
  descriptor: "Websites & service workflows",
  get siteUrl() { return canonicalSiteUrl(); },
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "How it works", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ],
};
