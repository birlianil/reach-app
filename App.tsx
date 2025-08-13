import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar, View, Text, TouchableOpacity, Alert, ScrollView, Image, TextInput, Linking, Platform, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { supabase, isFake } from './src/lib/supabase'
import { WebView } from 'react-native-webview'

const COLORS = {
  light: {
    primary: '#7C3AED',
    primarySoft: '#A78BFA',
    background: '#F8FAFC',
    card: '#FFFFFF',
    subtle: '#EEF2FF',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    accent: '#EC4899'
  },
  dark: {
    primary: '#A78BFA',
    primarySoft: '#C4B5FD',
    background: '#111827',
    card: '#1F2937',
    subtle: '#374151',
    text: '#F9FAFB',
    muted: '#9CA3AF',
    border: '#4B5563',
    success: '#34D399',
    warning: '#FBBF24',
    accent: '#F472B6'
  }
}



type Screen = 'home' | 'explore' | 'expert' | 'confirm' | 'payment' | 'success' | 'profile' | 'login' | 'book' | 'call' | 'earnings'

interface Expert {
  name: string
  role: string
  avatar: string
  rating: number
  years: number
  consultations: number
  about: string
  linkedin: string
  twitter: string
  bio: string
}



export default function App() {
  const [screen, setScreen] = React.useState<Screen>('home')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All')
  const [query, setQuery] = React.useState('')
  const [selectedExpert, setSelectedExpert] = React.useState<Expert | null>(null)
  const [selectedSlot, setSelectedSlot] = React.useState<string>('')
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
  const [userEmail, setUserEmail] = React.useState<string>('')
  const [activeTab, setActiveTab] = React.useState<'home' | 'explore' | 'book' | 'profile'>('home')
  const [callInfo, setCallInfo] = React.useState<{ room: string; token: string } | null>(null)
  const [history, setHistory] = React.useState<Screen[]>([])
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false)
  
  const theme = isDarkMode ? COLORS.dark : COLORS.light


  function Rating({ value }: { value: number }) {
    const full = Math.floor(value)
    const stars = Array.from({ length: 5 }, (_, i) => (
      <Ionicons key={i} name={i < full ? 'star' : 'star-outline'} size={14} color={theme.warning} />
    ))
    return <View style={{ flexDirection: 'row', gap: 2 as any }}>{stars}</View>
  }

  function Stat({ icon, label, value, color, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string; color: string; onPress?: () => void }) {
    return (
      <TouchableOpacity onPress={onPress} style={{ flex: 1, backgroundColor: theme.card, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={{ marginTop: 8, fontWeight: '800', color: theme.text, fontSize: 16 }}>{value}</Text>
        <Text style={{ marginTop: 4, color: theme.muted, fontSize: 12 }}>{label}</Text>
      </TouchableOpacity>
    )
  }

  function Chip({ label, icon, active, onPress }: { label: string; icon: keyof typeof Ionicons.glyphMap; active?: boolean; onPress?: () => void }) {
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: active ? theme.primary : theme.subtle, marginRight: 12, marginBottom: 12, borderWidth: 1, borderColor: active ? theme.primary : theme.border }}>
        <Ionicons name={icon} size={16} color={active ? '#fff' : theme.primary} />
        <Text style={{ marginLeft: 8, color: active ? '#fff' : theme.primary, fontWeight: '700', fontSize: 14 }}>{label}</Text>
      </TouchableOpacity>
    )
  }

  function ExpertCard({ e, onPress }: { e: Expert; onPress: () => void }) {
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border }}>
        <Image source={{ uri: e.avatar }} style={{ width: 56, height: 56, borderRadius: 28, marginRight: 16 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '800', fontSize: 18, color: theme.text }}>{e.name}</Text>
          <Text style={{ color: theme.muted, marginTop: 4, fontSize: 14 }}>{e.role}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Rating value={e.rating} />
            <Text style={{ marginLeft: 8, color: theme.muted, fontSize: 12 }}>{e.consultations}+ consults</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.muted} />
      </TouchableOpacity>
    )
  }

  function navigate(next: Screen) {
    setHistory(prev => [...prev, screen])
    setScreen(next)
  }

  function goBack() {
    setHistory(prev => {
      if (prev.length === 0) { setScreen('home'); return prev }
      const prevScreen = prev[prev.length - 1]
      setScreen(prevScreen)
      return prev.slice(0, -1)
    })
  }

  const touchStart = React.useRef<{ x: number; y: number } | null>(null)
  function handleResponderGrant(e: any) {
    const { pageX, pageY } = e.nativeEvent
    touchStart.current = pageX <= 24 ? { x: pageX, y: pageY } : null
  }
  function handleResponderRelease(e: any) {
    const start = touchStart.current
    if (!start) return
    const { pageX, pageY } = e.nativeEvent
    const dx = pageX - start.x
    const dy = Math.abs(pageY - start.y)
    if (dx > 60 && dy < 40) goBack()
    touchStart.current = null
  }

  const experts: Expert[] = [
    { name: 'Alex Thompson', role: 'Business Strategy', avatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=200&auto=format&fit=crop', rating: 4, years: 8, consultations: 150, about: 'Helps founders craft GTM and investor storytelling.', linkedin: 'https://linkedin.com/in/alexthompson', twitter: '@alexthompson', bio: 'Former VP at TechCorp, helped 50+ startups scale. Expert in go-to-market strategies and fundraising.' },
    { name: 'Dr. Michael Chen', role: 'Health & Wellness', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop', rating: 5, years: 12, consultations: 320, about: 'Sustainable, science-backed routines.', linkedin: 'https://linkedin.com/in/drmichaelchen', twitter: '@dr_mchen', bio: 'Board-certified physician with 12 years in preventive medicine. Specializes in sustainable health optimization.' },
    { name: 'Emily Rodriguez', role: 'Career Coaching', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop', rating: 5, years: 10, consultations: 410, about: 'Interview prep and promotion planning.', linkedin: 'https://linkedin.com/in/emilyrodriguez', twitter: '@emily_career', bio: 'Ex-Google recruiter turned career coach. Helped 200+ professionals land roles at FAANG.' },
    { name: 'James Park', role: 'Software Development', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop', rating: 4, years: 9, consultations: 200, about: 'Frontend systems and performance guidance.', linkedin: 'https://linkedin.com/in/jamespark', twitter: '@jamespark_dev', bio: 'Senior engineer at Meta. Expert in React, TypeScript, and scalable frontend architecture.' },
    { name: 'Lisa Wang', role: 'UX Design', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', rating: 5, years: 7, consultations: 180, about: 'Design systems and portfolio reviews.', linkedin: 'https://linkedin.com/in/lisawang', twitter: '@lisawang_design', bio: 'Lead designer at Figma. Specializes in design systems and user research methodologies.' }
  ]

  const filtered = experts.filter(e => (selectedCategory === 'All' || e.role.toLowerCase().includes(selectedCategory.toLowerCase())) && e.name.toLowerCase().includes(query.toLowerCase()))

  React.useEffect(() => {
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setLoggedIn(true)
        setUserEmail(data.user.email || '')
      }
    })()
  }, [])

  React.useEffect(() => {
    if (!loggedIn && screen !== 'login') setScreen('login')
  }, [loggedIn])

  function Button({ title, onPress, variant }: { title: string; onPress?: () => void; variant?: 'primary' | 'secondary' }) {
    const bg = variant === 'secondary' ? theme.border : theme.primary
    const color = variant === 'secondary' ? theme.text : '#ffffff'
    return (
      <TouchableOpacity onPress={onPress} style={{ backgroundColor: bg, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ color, fontWeight: '600' }}>{title}</Text>
      </TouchableOpacity>
    )
  }

  function Footer() {
    const Item = ({ icon, label, tab }: { icon: keyof typeof Ionicons.glyphMap; label: string; tab: typeof activeTab }) => (
      <TouchableOpacity onPress={() => { setActiveTab(tab); setHistory([]); setScreen(tab === 'home' ? 'home' : tab === 'explore' ? 'explore' : tab === 'profile' ? 'profile' : 'book') }} style={{ alignItems: 'center' }}>
        <Ionicons name={icon} size={20} color={activeTab === tab ? theme.primary : theme.muted} />
        <Text style={{ fontSize: 12, color: activeTab === tab ? theme.primary : theme.muted }}>{label}</Text>
      </TouchableOpacity>
    )
    return (
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, borderTopWidth: 1, borderColor: theme.border, backgroundColor: theme.card, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Item icon="home" label="Home" tab="home" />
        <Item icon="compass" label="Explore" tab="explore" />
        <Item icon="call" label="Book" tab="book" />
        <Item icon="person" label="Profile" tab="profile" />
      </View>
    )
  }

  function Home() {
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, backgroundColor: theme.background }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.muted }}>{loggedIn ? 'Welcome back,' : 'Welcome,'}</Text>
            <Text style={{ fontSize: 26, fontWeight: '800', color: theme.text }}>{loggedIn ? (userEmail || 'User') : 'Guest'}</Text>
          </View>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=200&auto=format&fit=crop' }} style={{ width: 36, height: 36, borderRadius: 18 }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 14, backgroundColor: theme.card }}>
          <Ionicons name="search" size={18} color={theme.muted} />
          <TextInput placeholder="Search experts" value={query} onChangeText={setQuery} placeholderTextColor={theme.muted} style={{ marginLeft: 8, flex: 1, color: theme.text }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 as any, marginBottom: 18 }}>
          <Stat icon="logo-usd" label="Earnings" value={loggedIn ? "$1,240.50" : "$0.00"} color="#10B981" onPress={() => navigate('earnings')} />
          <Stat icon="call" label="Total Calls" value={loggedIn ? "42" : "0"} color="#7C3AED" onPress={() => setActiveTab('book')} />
          <Stat icon="star" label="Rating" value={loggedIn ? "4.8" : "0.0"} color="#F59E0B" onPress={() => setActiveTab('profile')} />
        </View>
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 8 }}>Explore categories</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' as any }}>
            {[
              { label: 'All', icon: 'grid' as const },
              { label: 'Health', icon: 'heart' as const },
              { label: 'Sports', icon: 'barbell' as const },
              { label: 'Software', icon: 'code-slash' as const },
              { label: 'Veterinary', icon: 'paw' as const },
              { label: 'Education', icon: 'school' as const }
            ].map((c) => (
              <Chip key={c.label} label={c.label} icon={c.icon} active={selectedCategory === c.label} onPress={() => { setSelectedCategory(c.label); setActiveTab('explore'); navigate('explore') }} />
            ))}
          </View>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 10 }}>My Contacts</Text>
          {filtered.map((e, i) => (
            <ExpertCard key={i} e={e} onPress={() => { setSelectedExpert(e); navigate('expert') }} />
          ))}
        </View>
      </ScrollView>
    )
  }

  function Explore() {
    const results = filtered
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, backgroundColor: theme.background }}>
        <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 10, color: theme.text }}>Explore</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12, backgroundColor: theme.card }}>
          <Ionicons name="search" size={18} color={theme.muted} />
          <TextInput placeholder="Search experts" value={query} onChangeText={setQuery} placeholderTextColor={theme.muted} style={{ marginLeft: 8, flex: 1, color: theme.text }} />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' as any, marginBottom: 12 }}>
          {['All','Health','Sports','Software','Veterinary','Education'].map(label => (
            <Chip key={label} label={label} icon={label==='All'?'grid':label==='Health'?'heart':label==='Sports'?'barbell':label==='Software'?'code-slash':label==='Veterinary'?'paw':'school'} active={selectedCategory===label} onPress={() => setSelectedCategory(label)} />
          ))}
        </View>
        {results.map((e,i)=> (
          <ExpertCard key={i} e={e} onPress={()=>{ setSelectedExpert(e); navigate('expert') }} />
        ))}
      </ScrollView>
    )
  }

  function ExpertDetail() {
    if (!selectedExpert) return null
    const e = selectedExpert
    const morning = ['09:00','09:30','10:00','10:30']
    const afternoon = ['13:00','13:30','14:00','15:00']
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, backgroundColor: theme.background }}>
        <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: 12 }}>
          <Ionicons name="chevron-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: e.avatar }} style={{ width: 72, height: 72, borderRadius: 36, marginRight: 14 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 22, fontWeight: '800' }}>{e.name}</Text>
              <Text style={{ color: theme.muted }}>{e.role}</Text>
              <View style={{ marginTop: 6 }}><Rating value={e.rating} /></View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 as any, marginTop: 14 }}>
            <Stat icon="call" label="Consults" value={`${e.consultations}+`} color={theme.primary} />
            <Stat icon="briefcase" label="Experience" value={`${e.years} yrs`} color={theme.primary} />
            <Stat icon="star" label="Rating" value={`${e.rating}.0`} color={theme.warning} />
          </View>
          <Text style={{ color: theme.text, marginTop: 14, lineHeight: 20 }}>{e.about}</Text>
        </View>
        
        {/* Professional Bio */}
        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border, marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 12 }}>Professional Bio</Text>
          <Text style={{ color: theme.text, lineHeight: 20 }}>{e.bio}</Text>
        </View>
        
        {/* Social Media */}
        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border, marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 12 }}>Connect</Text>
          <TouchableOpacity onPress={() => Linking.openURL(e.linkedin)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="logo-linkedin" size={20} color={theme.primary} />
            <Text style={{ marginLeft: 12, color: theme.primary, fontWeight: '600' }}>LinkedIn Profile</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name="open-outline" size={16} color={theme.muted} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${e.twitter.replace('@', '')}`)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="logo-twitter" size={20} color={theme.primary} />
            <Text style={{ marginLeft: 12, color: theme.primary, fontWeight: '600' }}>{e.twitter}</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name="open-outline" size={16} color={theme.muted} />
          </TouchableOpacity>
        </View>
        
        <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 16, marginBottom: 6 }}>Morning Slots</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' as any }}>
          {morning.map(t => (
            <TouchableOpacity key={t} onPress={() => setSelectedSlot(t)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: selectedSlot === t ? theme.primary : theme.subtle, marginRight: 8, marginBottom: 8 }}>
              <Text style={{ color: selectedSlot===t?'#fff':theme.primary, fontWeight:'600' }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 8, marginBottom: 6 }}>Afternoon Slots</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' as any }}>
          {afternoon.map(t => (
            <TouchableOpacity key={t} onPress={() => setSelectedSlot(t)} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: selectedSlot === t ? theme.primary : theme.subtle, marginRight: 8, marginBottom: 8 }}>
              <Text style={{ color: selectedSlot===t?'#fff':theme.primary, fontWeight:'600' }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button title={selectedSlot ? `Get Appointment · ${selectedSlot}` : 'Select a time'} onPress={() => selectedSlot && navigate('confirm')} />
        <Button title="Call Now" variant="secondary" onPress={() => navigate('call')} />
      </ScrollView>
    )
  }

  function Confirm() {
    if (!selectedExpert) return null
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, alignItems: 'center', backgroundColor: theme.background }}>
        <Ionicons name="thumbs-up" size={72} color={theme.primary} />
        <Text style={{ marginTop: 12, fontSize: 22, fontWeight: '800', color: theme.text }}>Appointment Created</Text>
        <Text style={{ color: theme.muted, marginTop: 8, textAlign: 'center' }}>You booked a session with {selectedExpert.name} at {selectedSlot} (demo).</Text>
        <View style={{ height: 16 }} />
        <Button title="Proceed to Payment" onPress={() => navigate('payment')} />
        <Button title="Back" variant="secondary" onPress={() => goBack()} />
      </ScrollView>
    )
  }

  function Payment() {
    const url = process.env.EXPO_PUBLIC_STRIPE_PAYMENT_LINK || ''
    const [method, setMethod] = React.useState('Credit Card')
    const [showWeb, setShowWeb] = React.useState<boolean>(Boolean(url))
    if (!url) {
      return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, backgroundColor: theme.background }}>
          <TouchableOpacity onPress={() => setScreen('confirm')} style={{ marginBottom: 12 }}>
            <Ionicons name="chevron-back" size={22} color={theme.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 12, color: theme.text }}>Payment</Text>
          <Text style={{ color: theme.muted, marginBottom: 12 }}>Payment link not configured. Please add EXPO_PUBLIC_STRIPE_PAYMENT_LINK to your env.</Text>
          <Button title="Back" variant="secondary" onPress={() => setScreen('confirm')} />
        </ScrollView>
      )
    }
    if (showWeb) {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}
            originWhitelist={['*']}
            javaScriptEnabled
            domStorageEnabled
            setSupportMultipleWindows={false}
            onNavigationStateChange={(nav) => {
              const u = (nav?.url || '').toLowerCase()
              if (u.includes('success') || u.includes('return') || u.includes('thank')) setScreen('success')
            }}
            onError={() => {
              Alert.alert('Payment', 'Failed to load payment page. Open in browser?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open', onPress: () => Linking.openURL(url) }
              ])
            }}
          />
          <View style={{ position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => goBack()} style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Back</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      )
    }
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, backgroundColor: theme.background }}>
        <TouchableOpacity onPress={() => setScreen('confirm')} style={{ marginBottom: 12 }}>
          <Ionicons name="chevron-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 12, color: theme.text }}>Payment</Text>
        <TouchableOpacity onPress={() => setMethod('Credit Card')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.subtle, borderWidth: 1, borderColor: theme.border, borderRadius: 12, padding: 12, marginBottom: 10 }}>
          <Ionicons name={'card' as any} size={20} color={theme.primary} />
          <Text style={{ marginLeft: 10, fontWeight: '600', color: theme.text }}>Credit Card</Text>
          <View style={{ flex: 1 }} />
          <Ionicons name="checkmark-circle" size={18} color={theme.primary} />
        </TouchableOpacity>
        <Button title="Continue to pay" onPress={() => setShowWeb(true)} />
      </ScrollView>
    )
  }

  function Success() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, backgroundColor: theme.background }}>
        <Ionicons name="checkmark-circle" size={64} color={theme.success} />
        <Text style={{ marginTop: 12, fontSize: 22, fontWeight: '800', color: theme.text }}>Payment Completed</Text>
        <Text style={{ color: theme.muted, marginTop: 6 }}>Thank you! See you soon.</Text>
        <View style={{ height: 16 }} />
          <Button title="Go Home" onPress={() => { setHistory([]); setScreen('home'); setActiveTab('home') }} />
      </View>
    )
  }

  function Profile() {
    if (!loggedIn) {
      return (
        <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
          <Ionicons name="person-circle" size={80} color={theme.muted} />
          <Text style={{ fontSize: 24, fontWeight: '800', marginTop: 16, marginBottom: 8, color: theme.text }}>Sign In Required</Text>
          <Text style={{ color: theme.muted, textAlign: 'center', marginBottom: 32, lineHeight: 20 }}>
            Please sign in to view your profile and manage your account settings.
          </Text>
          <Button title="Sign In" onPress={() => navigate('login')} />
        </View>
      )
    }

    const name = userEmail || 'User'
    const headline = 'Product Manager · Marketplace Growth'
    const bio = 'Helping early-stage founders validate ideas, craft narratives, and scale marketplaces. Previously at ExampleCo and StartupX.'
    const linkedin = 'https://www.linkedin.com/in/example-profile'
    const stats = { earningsUsd: 1240.5, totalCalls: 42, rating: 4.8 }
    
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80, backgroundColor: theme.background }}>
        <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 12, color: theme.text }}>My Profile</Text>
        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=200&auto=format&fit=crop' }} style={{ width: 72, height: 72, borderRadius: 36, marginRight: 14 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: theme.text }}>{name}</Text>
                          <Text style={{ color: theme.muted }}>{headline}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 as any, marginTop: 14 }}>
          <Stat icon="logo-usd" label="Earnings" value={`$${stats.earningsUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} color={theme.success} />
          <Stat icon="call" label="Total Calls" value={`${stats.totalCalls}`} color={theme.primary} />
          <Stat icon="star" label="Rating" value={`${stats.rating}`} color={theme.warning} />
        </View>
      </View>
      <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border, marginBottom: 16 }}>
        <Text style={{ fontWeight: '800', marginBottom: 8 }}>About</Text>
        <Text style={{ color: theme.text, lineHeight: 20 }}>{bio}</Text>
      </View>
      <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border, marginBottom: 16 }}>
        <Text style={{ fontWeight: '800', marginBottom: 8 }}>LinkedIn</Text>
        <TouchableOpacity onPress={() => Linking.openURL(linkedin)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="logo-linkedin" size={20} color={theme.primary} />
          <Text style={{ marginLeft: 8, color: theme.primary, fontWeight: '600' }}>{linkedin.replace('https://', '')}</Text>
        </TouchableOpacity>
              </View>
        
        {/* Dark Mode Toggle */}
        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.border, marginBottom: 16 }}>
          <Text style={{ fontWeight: '800', marginBottom: 12 }}>Appearance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={20} color={theme.primary} />
              <Text style={{ marginLeft: 12, color: theme.text }}>Dark Mode</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setIsDarkMode(!isDarkMode)}
              style={{ 
                backgroundColor: isDarkMode ? theme.primary : theme.border,
                width: 50,
                height: 28,
                borderRadius: 14,
                padding: 2,
                justifyContent: isDarkMode ? 'flex-end' : 'flex-start'
              }}
            >
              <View style={{ 
                backgroundColor: '#fff', 
                width: 24, 
                height: 24, 
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2
              }} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Button title="Manage Availability" variant="secondary" onPress={() => Alert.alert('Demo', 'Availability screen in full build.')} />
        <Button title="Stripe Payouts" variant="secondary" onPress={() => Alert.alert('Demo', 'Payout onboarding in full build.')} />
        <Button title="Logout" onPress={() => {
          setLoggedIn(false)
          setUserEmail('')
          navigate('home')
        }} />
      </ScrollView>
    )
  }

  function Login() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    return (
      <View style={{ flex: 1 }}>
        {/* Background Image */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop' }} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            opacity: 0.3
          }} 
        />
        
        {/* Content */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => goBack()} style={{ position: 'absolute', top: 60, left: 20 }}>
            <Ionicons name="chevron-back" size={22} color={theme.text} />
          </TouchableOpacity>
          
          <View style={{ backgroundColor: isDarkMode ? 'rgba(31,41,55,0.95)' : 'rgba(255,255,255,0.95)', borderRadius: 24, padding: 32, width: '100%', maxWidth: 400, alignItems: 'center' }}>
            <Ionicons name="people" size={64} color={theme.primary} style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 32, fontWeight: '800', marginBottom: 8, textAlign: 'center', color: theme.text }}>Welcome to ReachApp</Text>
            <Text style={{ color: theme.muted, textAlign: 'center', marginBottom: 32, lineHeight: 20 }}>
              Connect with experts and grow your network through meaningful conversations
            </Text>
            
            <View style={{ borderWidth: 1, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, width: '100%', backgroundColor: isDarkMode ? theme.card : '#fff' }}>
              <TextInput 
                placeholder="Enter your email" 
                placeholderTextColor={theme.muted}
                autoCapitalize="none" 
                keyboardType="email-address" 
                value={email} 
                onChangeText={setEmail}
                style={{ fontSize: 16, color: theme.text }}
              />
            </View>
            
            <Button
              title="Send Magic Link"
              onPress={async () => {
                if (!email) { Alert.alert('Login', 'Enter your email'); return }
                if (isFake) {
                  setLoggedIn(true)
                  setUserEmail(email)
                  setHistory([])
                  setActiveTab('home')
                  setScreen('home')
                  return
                }
                const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8081') } })
                if (error) Alert.alert('Login', error.message)
                else Alert.alert('Login', 'Check your email for the magic link.')
              }}
            />
            <Button 
              title="Continue as Demo" 
              variant="secondary" 
              onPress={() => { 
                setLoggedIn(true); 
                setUserEmail(email || 'demo@reach.app'); 
                setHistory([]); 
                setActiveTab('home'); 
                setScreen('home') 
              }} 
            />
          </View>
        </View>
      </View>
    )
  }

  function Book() {
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 80 }}>
        <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 10 }}>Book</Text>
        {experts.map((e, i) => (
          <ExpertCard key={i} e={e} onPress={() => { setSelectedExpert(e); navigate('expert') }} />
        ))}
        <Button title="Start Quick Call" onPress={() => navigate('call')} />
      </ScrollView>
    )
  }

  function buildMeetUrl(token: string): string {
    const baseRaw = process.env.EXPO_PUBLIC_LIVEKIT_MEET_URL || 'https://meet.livekit.io'
    const base = baseRaw.endsWith('/') ? baseRaw.slice(0, -1) : baseRaw
    return `${base}/?token=${encodeURIComponent(token)}&hideLogo=1&prejoinPage=0`
  }

  async function startCall() {
    try {
      const identity = `user-${Math.random().toString(36).slice(2, 8)}`
      const roomName = 'reachapp-demo'
      
      // For demo mode, create a fake token
      if (isFake) {
        const token = 'demo-token'
        setCallInfo({ room: roomName, token })
        return
      }
      
      const { data, error } = await supabase.functions.invoke('livekit-token', { body: { roomName, identity, name: identity } })
      if (error) throw new Error(error.message)
      const token = data?.token as string
      if (!token) throw new Error('No token returned')
      setCallInfo({ room: roomName, token })
    } catch (e: any) {
      Alert.alert('Call', e.message || 'Failed to start call')
    }
  }

  function CallScreen() {
    const staticMeetUrl = process.env.EXPO_PUBLIC_LIVEKIT_MEET_URL || ''
    // If a static meet URL is provided, just open that URL in-app without any token logic
    if (staticMeetUrl) {
      const webRef = React.useRef<any>(null)
      return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <WebView
            ref={webRef}
            source={{ uri: staticMeetUrl }}
            style={{ flex: 1 }}
            originWhitelist={['*']}
            allowsInlineMediaPlayback
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            automaticallyAdjustContentInsets={false}
            renderLoading={() => (
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                <Ionicons name="hourglass" size={32} color="#fff" />
                <Text style={{ marginTop: 8, color: '#ccc' }}>Loading…</Text>
              </View>
            )}
          />
          <View style={{ position: 'absolute', top: 40, left: 16 }}>
            <TouchableOpacity onPress={() => goBack()} style={{ backgroundColor: 'rgba(0,0,0,0.7)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    React.useEffect(() => { startCall() }, [])
    if (!callInfo) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
          <Ionicons name="videocam" size={48} color={theme.primary} />
          <Text style={{ marginTop: 12, fontSize: 18, fontWeight: '700', color: theme.text }}>Preparing room…</Text>
          <View style={{ height: 16 }} />
          <Button title="Back" variant="secondary" onPress={() => goBack()} />
        </View>
      )
    }
    // In-app WebView call UI
    const webRef = React.useRef<any>(null)
    const meetBaseRaw = process.env.EXPO_PUBLIC_LIVEKIT_MEET_URL || 'https://meet.livekit.io'
    const joinUrl = buildMeetUrl(callInfo.token)
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <WebView
          ref={webRef}
          source={{ uri: joinUrl }}
          style={{ flex: 1 }}
          originWhitelist={['*']}
          allowsInlineMediaPlayback
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          setSupportMultipleWindows={false}
          automaticallyAdjustContentInsets={false}
          renderLoading={() => (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
              <Ionicons name="hourglass" size={32} color="#fff" />
              <Text style={{ marginTop: 8, color: '#ccc' }}>Connecting to call...</Text>
            </View>
          )}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent
            console.warn('WebView error: ', nativeEvent)
            Alert.alert('Call Error', 'Failed to load video call. Please try again.')
          }}
        />
        <View style={{ position: 'absolute', top: 40, left: 16 }}>
          <TouchableOpacity onPress={() => goBack()} style={{ backgroundColor: 'rgba(0,0,0,0.7)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>End Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function EarningsDetail() {
    const earnings = [
      { date: '2024-01-15', amount: 150.00, expert: 'Alex Thompson', type: 'Business Strategy' },
      { date: '2024-01-12', amount: 200.00, expert: 'Dr. Michael Chen', type: 'Health & Wellness' },
      { date: '2024-01-10', amount: 180.00, expert: 'Emily Rodriguez', type: 'Career Coaching' },
      { date: '2024-01-08', amount: 120.00, expert: 'James Park', type: 'Software Development' },
      { date: '2024-01-05', amount: 160.00, expert: 'Lisa Wang', type: 'UX Design' },
      { date: '2024-01-03', amount: 140.00, expert: 'Alex Thompson', type: 'Business Strategy' },
      { date: '2024-01-01', amount: 190.00, expert: 'Dr. Michael Chen', type: 'Health & Wellness' },
    ]
    
    return (
              <View style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 }}>
          <TouchableOpacity onPress={() => goBack()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>Earnings Timeline</Text>
        </View>
        
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' }}>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>Total Earnings</Text>
            <Text style={{ fontSize: 32, fontWeight: '800', color: '#10B981' }}>$1,240.50</Text>
            <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Last 30 days</Text>
          </View>
          
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 }}>Recent Sessions</Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {earnings.map((earning, index) => (
              <View key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>${earning.amount.toFixed(2)}</Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>{earning.date}</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 }}>{earning.expert}</Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>{earning.type}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }

  return (
      <SafeAreaProvider>
        <View
          style={{ flex: 1, backgroundColor: theme.background }}
          onStartShouldSetResponderCapture={(e: any) => e.nativeEvent.pageX <= 24}
          onResponderGrant={handleResponderGrant}
          onResponderRelease={handleResponderRelease}
        >
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          {screen === 'home' && <Home />}
          {screen === 'explore' && <Explore />}
          {screen === 'expert' && <ExpertDetail />}
          {screen === 'confirm' && <Confirm />}
          {screen === 'payment' && <Payment />}
          {screen === 'success' && <Success />}
          {screen === 'profile' && <Profile />}
          {screen === 'login' && <Login />}
          {screen === 'book' && <Book />}
          {screen === 'call' && <CallScreen />}
          {screen === 'earnings' && <EarningsDetail />}
          <Footer />
        </View>
      </SafeAreaProvider>
  )
}
