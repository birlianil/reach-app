export interface Profile {
  id: string
  role: 'seeker' | 'expert' | 'both'
  display_name?: string
  headline?: string
  bio?: string
  avatar_url?: string
  hourly_rate_cents?: number
}

export interface AvailabilitySlot {
  id: number
  expert_id: string
  start_at: string
  end_at: string
  capacity: number
  price_cents?: number
}

export interface Booking {
  id: number
  expert_id: string
  requester_id: string
  start_at: string
  end_at: string
  status: 'pending' | 'approved' | 'declined' | 'cancelled' | 'scheduled' | 'completed' | 'no_show'
  price_cents: number
  currency: string
}
