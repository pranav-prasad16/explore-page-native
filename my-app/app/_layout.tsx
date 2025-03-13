import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#35A700',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#000',
          paddingBottom: 10,
          height: 60,
          borderColor: '#000',
        },
        headerStyle: { backgroundColor: '#141414', borderBottomWidth: 0 },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 25,
          fontWeight: 'bold',
          fontFamily: 'KronaOne-Regular',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Explore.',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
          headerRight: () => <HeaderIcons />,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="trophy-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const HeaderIcons = () => {
  return (
    <View style={{ flexDirection: 'row', marginRight: 15 }}>
      <TouchableOpacity onPress={() => console.log('Plus Icon Pressed')}>
        <MaterialCommunityIcons
          name="plus-box-outline"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Align Right Icon Pressed')}>
        <MaterialCommunityIcons
          name="format-align-right"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
