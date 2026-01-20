import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import './src/i18n'; // Import i18n config

import MyDevotee from './src/screens/MyDevotee';
import Music from './src/screens/Music';
import Mandir from './src/screens/Mandir';
import Status from './src/screens/Status';
import PanditJi from './src/screens/PanditJi';

const Tab = createBottomTabNavigator();

export default function App() {
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
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
        </NavigationContainer>
    );
}
