export interface LinkedInClaims {
  name?: string
  picture?: string
  headline?: string
  email?: string
}

export function mapLinkedInClaimsToProfile(claims: LinkedInClaims) {
  return {
    display_name: claims.name || '',
    avatar_url: claims.picture || '',
    headline: claims.headline || ''
  }
}
