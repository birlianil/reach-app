import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import Welcome from '../screens/Auth/Welcome'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import OnboardingLinkedIn from '../screens/Auth/OnboardingLinkedIn'
import HomeGuest from '../screens/Home/HomeGuest'
import HomeAuthed from '../screens/Home/HomeAuthed'
import Explore from '../screens/Explore/Explore'
import Search from '../screens/Explore/Search'
import ExpertProfile from '../screens/Explore/ExpertProfile'
import BookingMode from '../screens/Booking/BookingMode'
import SlotPicker from '../screens/Booking/SlotPicker'
import RequestForm from '../screens/Booking/RequestForm'
import Checkout from '../screens/Booking/Checkout'
import BookingSuccess from '../screens/Booking/BookingSuccess'
import MyBookings from '../screens/Booking/MyBookings'
import Conversations from '../screens/Messages/Conversations'
import Chat from '../screens/Messages/Chat'
import CallRoom from '../screens/Calls/CallRoom'
import CallHistory from '../screens/Calls/CallHistory'
import Contacts from '../screens/Contacts/Contacts'
import MyProfile from '../screens/Profile/MyProfile'
import EditProfile from '../screens/Profile/EditProfile'
import Settings from '../screens/Profile/Settings'
import StripeOnboarding from '../screens/Profile/StripeOnboarding'
import MyAvailability from '../screens/Admin/MyAvailability'
import RequestsQueue from '../screens/Admin/RequestsQueue'
import { useAuthStore } from '../store/auth.store'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeAuthed" component={HomeAuthed} options={{ title: 'Home' }} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Conversations" component={Conversations} options={{ title: 'Messages' }} />
      <Tab.Screen name="MyProfile" component={MyProfile} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  )
}

function Startup() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ReachApp is starting…</Text>
    </View>
  )
}

export default function RootNavigator() {
  const { isLoadingSession, session } = useAuthStore()

  if (isLoadingSession) return <Startup />

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OnboardingLinkedIn" component={OnboardingLinkedIn} />
          <Stack.Screen name="HomeGuest" component={HomeGuest} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ExpertProfile" component={ExpertProfile} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ExpertProfile" component={ExpertProfile} />
          <Stack.Screen name="BookingMode" component={BookingMode} />
          <Stack.Screen name="SlotPicker" component={SlotPicker} />
          <Stack.Screen name="RequestForm" component={RequestForm} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
          <Stack.Screen name="MyBookings" component={MyBookings} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="CallRoom" component={CallRoom} />
          <Stack.Screen name="CallHistory" component={CallHistory} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="StripeOnboarding" component={StripeOnboarding} />
          <Stack.Screen name="MyAvailability" component={MyAvailability} />
          <Stack.Screen name="RequestsQueue" component={RequestsQueue} />
        </>
      )}
    </Stack.Navigator>
  )
}
