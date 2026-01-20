import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import i18n from '../utils/i18n';

// Screens
import MeriBhaktiScreen from '../screens/MeriBhaktiScreen';
import MusicScreen from '../screens/MusicScreen';
import MandirScreen from '../screens/MandirScreen';
import StatusScreen from '../screens/StatusScreen';
import PanditJiScreen from '../screens/PanditJiScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'MeriBhakti') {
                            return <MaterialCommunityIcons name="hands-pray" size={size} color={color} />;
                        } else if (route.name === 'Music') {
                            return <Ionicons name={focused ? 'musical-notes' : 'musical-notes-outline'} size={size} color={color} />;
                        } else if (route.name === 'Mandir') {
                            return <MaterialCommunityIcons name="temple-hindu" size={size} color={color} />;
                        } else if (route.name === 'Status') {
                            return <MaterialCommunityIcons name="image-multiple" size={size} color={color} />;
                        } else if (route.name === 'PanditJi') {
                            return <MaterialCommunityIcons name="account" size={size} color={color} />;
                        }
                    },
                    tabBarActiveTintColor: '#ff8f00', // Saffron color for Hindu theme
                    tabBarInactiveTintColor: 'gray',
                    headerShown: true,
                    title: i18n.t(route.name.charAt(0).toLowerCase() + route.name.slice(1)), // Dynamic title
                })}
            >
                <Tab.Screen
                    name="MeriBhakti"
                    component={MeriBhaktiScreen}
                    options={{ title: i18n.t('meriBhakti') }}
                />
                <Tab.Screen
                    name="Music"
                    component={MusicScreen}
                    options={{ title: i18n.t('music') }}
                />
                <Tab.Screen
                    name="Mandir"
                    component={MandirScreen}
                    options={{ title: i18n.t('mandir') }}
                />
                <Tab.Screen
                    name="Status"
                    component={StatusScreen}
                    options={{ title: i18n.t('status') }}
                />
                <Tab.Screen
                    name="PanditJi"
                    component={PanditJiScreen}
                    options={{ title: i18n.t('panditJi') }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
