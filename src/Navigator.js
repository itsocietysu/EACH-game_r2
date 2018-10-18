import React from 'react';
import { Platform } from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    DrawerNavigator,
    HeaderBackButton,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/Welcome';
import HomeScreen from './containers/HomePage/FeedPage';

import FavoritesScreen from './screens/MapPage';
import MuseumsScreen from './containers/MuseumPage/MuseumPage';
import SettingsScreen from './screens/Settings';

import { HamburgerIcon, SettingsIcon, BackIcon } from './components/icons';

import CustomDrawerContent from './components/CustomDrawerContent';
import { colors } from './utils/constants';
import LoginScreen from "./screens/Login";
import RegistrationScreen from "./screens/Registration"


const AppMainTab = TabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Sweet home',
                drawerIcon: ({ tintColor }) => (
                    <FontAwesome name="home" size={23} color={tintColor} />
                ),
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="home" size={23} color={tintColor} />
                ),
                headerStyle: {
                    backgroundColor: colors.SOFT,
                },
                headerTitle: 'Feed',
                headerTitleStyle: {
                    color: colors.WHITE,
                },
                headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
            })
        },
        Favorites: {
            screen: FavoritesScreen,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Maps',
                drawerIcon: ({ tintColor }) => (
                    <FontAwesome name="heartbeat" size={23} color={tintColor} />
                ),
                tabBarLabel: 'Maps',
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="heartbeat" size={23} color={tintColor} />
                ),
                headerStyle: {
                    backgroundColor: colors.PINK_100,
                },
                headerTitle: 'Maps',
                headerTitleStyle: {
                    color: colors.WHITE,
                },
                headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
            })
        },
        Profile: {
            screen: MuseumsScreen,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Profile',
                drawerIcon: ({ tintColor }) => (
                    <FontAwesome name="user-circle" size={23} color={tintColor} />
                ),
                tabBarLabel: 'Profile',
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name="user-circle" size={23} color={tintColor} />
                ),
                headerStyle: {
                    backgroundColor: colors.PINK_100,
                },
                headerTitle: 'Profile',
                headerTitleStyle: {
                    color: colors.WHITE,
                },
                headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
                headerRight: <SettingsIcon onPress={() => navigation.navigate('Settings')} />,
            })
        },
    },
    {
        tabBarOptions: {
            activeTintColor: colors.WHITE,
            inactiveTintColor: colors.PINK_50,
            inactiveBackgroundColor: colors.PINK_100,
            activeBackgroundColor: colors.PINK_100,
            showIcon: true,
            showLabel: Platform.OS === 'ios',
            indicatorStyle: {
                backgroundColor: colors.PINK_300,
            },
            style: {
                backgroundColor: colors.PINK_100,
            },
            upperCaseLabel: false,
        },
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
    }
);

const AppMainStack = StackNavigator({
    Home: { screen: AppMainTab },
    Settings: { screen: SettingsScreen },
}, {
    cardStyle: {
        backgroundColor: colors.PINK_50,
    },
    mode: 'modal',
});

const AppDrawer = DrawerNavigator({
    Home: { screen: AppMainStack, },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: 'Settings',
            drawerIcon: ({ tintColor }) => (
                <Ionicons name="md-settings" size={23} color={tintColor} />
            ),
            headerStyle: {
                backgroundColor: colors.PINK_100,
            },
            headerTitle: 'Settings',
            headerTitleStyle: {
                color: colors.WHITE,
            },
            headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
        }),
    },
}, {
    contentComponent: props =>
        (<CustomDrawerContent
            {...props}
        />),
    contentOptions: {
        activeBackgroundColor: colors.PINK_100,
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.PINK_200,
    },
});

const Navigator = TabNavigator(
    {
        Welcome: { screen: WelcomeScreen },
        Login: { screen: LoginScreen },
        Registration: {screen: RegistrationScreen},
        Main: { screen: AppDrawer },
    },
    {
        navigationOptions: {
            tabBarVisible: false,
        },
        swipeEnabled: false,
    }
);

export default Navigator;
