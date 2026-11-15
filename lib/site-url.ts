function normalizeHost(value: string): string {
  const trimmed = value.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  return trimmed ? `https://${trimmed}` : '';
}

/** Canonical URL for indexing and sharing: explicit override, then Vercel production domain. */
export function canonicalSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit?.trim()) return normalizeHost(explicit);
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return normalizeHost(production);
  const deployment = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL;
  if (deployment) return normalizeHost(deployment);
  return 'http://localhost:3000';
}

/** URL for links referring to this specific deployment, useful in Preview. */
export function deploymentSiteUrl(): string {
  const deployment = process.env.VERCEL_URL || process.env.VERCEL_BRANCH_URL;
  return deployment ? normalizeHost(deployment) : canonicalSiteUrl();
}
