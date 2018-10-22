import React from 'react';
import { View, Text, Image } from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    DrawerNavigator,
    HeaderBackButton,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/Welcome';
import FeedScreen from './containers/HomePage/FeedPage';

import MapScreen from './screens/MapPage';
import MuseumsScreen from './containers/MuseumPage/MuseumPage';
import MuseumItemScreen from './containers/MuseumPage/MuseumItem';
import SettingsScreen from './screens/Settings';

import { HamburgerIcon, SettingsIcon, BackIcon } from './components/icons';

import DrawerContent from './components/DrawerContent';
import { colors } from './utils/constants';
import LoginScreen from "./screens/Login";
import RegistrationScreen from "./screens/Registration"
import FeedItemScreen from "./containers/HomePage/FeedItem";
import LogoTitle from "./components/LogoTitle";
import Button from "./components/Button";
import TabIconContent from "./components/TabIconContent";




const HeaderHeight = 40;
const HeaderColor = '#ffffff';

const TabColor = '#ffa366';
const TabLabelFontSize = 12;
const TabBGColor = '#ffffff';

const FeedTabStack = createStackNavigator(
    {
        Feeds: {screen: FeedScreen},
        FeedPage: {screen: FeedItemScreen},
    },
    {
        navigationOptions: {
            headerBackground: <LogoTitle/>,
            headerStyle: {
                height: HeaderHeight,
                backgroundColor: HeaderColor,
            },
        },
    }
);

const MapTabStack = createStackNavigator(
    {
        Maps: {screen: MapScreen},
    },
    {
        navigationOptions:
        {
            headerBackground: <LogoTitle/>,
            headerStyle: {
                height: HeaderHeight,
                backgroundColor: HeaderColor,
            },
        }
    }
);

const MuseumTabStack = createStackNavigator(
    {
        Museums: {screen: MuseumsScreen},
        MuseumPage: {screen: MuseumItemScreen},
    },
    {
        navigationOptions:
        {
            headerBackground: <LogoTitle/>,
            headerStyle: {
                height: HeaderHeight,
                backgroundColor: HeaderColor,
            },
        }
    }
);


const  MainAppTab = createBottomTabNavigator(
    {
        Feeds: {screen: FeedTabStack},
        Maps: {screen: MapTabStack},
        Museums: {screen: MuseumTabStack},
    },
    {
        navigationOptions: ({navigation})=>({
            tabBarIcon: ({tintColor,focused})=>(
                <TabIconContent props={{navigation:navigation, tintColor:tintColor, focused:focused}}/>),

        }),
        tabBarOptions:{
            activeTintColor: TabColor,
            labelStyle:{ fontSize: TabLabelFontSize},
            style: {backgroundColor: TabBGColor},
        }
    }
);

// Drawer navigation styled by CustomDrawerComponent
const Drawer = createDrawerNavigator(
    {
        Home: {screen: MainAppTab}
    },
    {
        contentComponent: props =>
            (<DrawerContent
                {...props}
            />),
    }
);

// Main navigator loading screen and main app window
const Navigator = createSwitchNavigator({
        Welcome: {screen: WelcomeScreen},
        Home: {screen: Drawer},
    }
);


/*
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
    FeedItem: { screen: FeedItemScreen },
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
*/
export default Navigator;
