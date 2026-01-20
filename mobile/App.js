import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import './src/i18n'; // Import i18n config

import Mandir from './src/screens/Mandir';
import Music from './src/screens/Music';
import MyDevotee from './src/screens/MyDevotee';
import PanditJi from './src/screens/PanditJi';
import Profile from './src/screens/Profile';
import Status from './src/screens/Status';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            initialRouteName="Mandir"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'My Devotee') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Music') {
                        iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                    } else if (route.name === 'Mandir') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Status') {
                        iconName = focused ? 'play-circle' : 'play-circle-outline';
                    } else if (route.name === 'Pandit Ji') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#ff9933', // Saffron
                tabBarInactiveTintColor: 'gray',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarLabel: t(`tabs.${route.name === 'My Devotee' ? 'myDevotee' :
                    route.name === 'Music' ? 'music' :
                        route.name === 'Mandir' ? 'mandir' :
                            route.name === 'Status' ? 'status' :
                                'panditJi'
                    }`),
                headerTitle: t(`tabs.${route.name === 'My Devotee' ? 'myDevotee' :
                    route.name === 'Music' ? 'music' :
                        route.name === 'Mandir' ? 'mandir' :
                            route.name === 'Status' ? 'status' :
                                'panditJi'
                    }`),
            })}
        >
            <Tab.Screen name="My Devotee" component={MyDevotee} />
            <Tab.Screen name="Music" component={Music} />
            <Tab.Screen name="Mandir" component={Mandir} />
            <Tab.Screen name="Status" component={Status} />
            <Tab.Screen name="Pandit Ji" component={PanditJi} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator>
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: 'Profile' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
