import { supabase } from './supabase'

export async function searchExperts(query: string, minCents?: number, maxCents?: number) {
  let builder = supabase
    .from('profiles')
    .select('*')
    .or("role.eq.expert,role.eq.both")

  if (query) {
    builder = builder.textSearch('search_tsv', query, { type: 'plain' }) as any
  }
  if (typeof minCents === 'number') builder = builder.gte('hourly_rate_cents', minCents)
  if (typeof maxCents === 'number') builder = builder.lte('hourly_rate_cents', maxCents)

  const { data, error } = await builder
  if (error) throw error
  return data
}
