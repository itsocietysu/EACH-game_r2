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
import AuthPage from "./containers/AuthPage/AuthPage";
import Button from "./components/Button";
import TabIconContent from "./components/TabIconContent";




const HeaderHeight = 40;
const HeaderColor = '#ffffff';

const TabColor = '#ffa366';
const TabLabelFontSize = 12;
const TabBGColor = '#ffffff';

const FeedStack = createStackNavigator(
    {
        Feeds: {screen: FeedScreen},
        FeedPage: {screen: FeedItemScreen},
    },
    {
        navigationOptions: ({navigation})=> {
            let content = <BackIcon onPress={() => navigation.goBack(null)}/>;
            if (navigation.state.routeName === 'Feeds') {
                content = <HamburgerIcon onPress={() => navigation.openDrawer()}/>;
            }
            return ({
                headerBackground: <LogoTitle/>,
                headerStyle: {
                    height: HeaderHeight,
                    backgroundColor: HeaderColor,
                },
                headerLeft: content
            });
        }
    }
);

const MapStack = createStackNavigator(
    {
        Maps: {screen: MapScreen},
    },
    {
        navigationOptions: ({navigation})=>({
            headerBackground: <LogoTitle/>,
            headerStyle: {
                height: HeaderHeight,
                backgroundColor: HeaderColor,
            },
            headerLeft: <HamburgerIcon onPress={()=>navigation.openDrawer()}/>
        }),
    }
);

const MuseumStack = createStackNavigator(
    {
        Museums: {screen: MuseumsScreen},
        MuseumPage: {screen: MuseumItemScreen},
    },
    {
        navigationOptions: ({navigation})=> {
            let content = <BackIcon onPress={() => navigation.goBack(null)}/>;
            if (navigation.state.routeName === 'Museums') {
                content = <HamburgerIcon onPress={() => navigation.openDrawer()}/>;
            }
            return ({
                headerBackground: <LogoTitle/>,
                headerStyle: {
                    height: HeaderHeight,
                    backgroundColor: HeaderColor,
                },
                headerLeft: content
            });
        }
    }
);

const SettingsStack = createStackNavigator(
    {
        Settings: {screen: SettingsScreen},
    },
    {
        navigationOptions: ({navigation})=>({
            headerBackground: <LogoTitle/>,
            headerStyle: {
                height: HeaderHeight,
                backgroundColor: HeaderColor,
            },
            headerLeft: <HamburgerIcon onPress={()=>navigation.openDrawer()}/>
        }),
    }
);

// Bottom tab containing 4 main stacks
const  AppBottomTab = createBottomTabNavigator(
    {
        Feeds: {screen: FeedStack},
        Maps: {screen: MapStack},
        Museums: {screen: MuseumStack},
        Settings: {screen: SettingsStack},
    },
    {
        navigationOptions: ({navigation})=>({
            tabBarIcon: ({tintColor,focused})=>(
                <TabIconContent navigation={navigation} tintColor={tintColor} focused={focused}/>),

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
        Home: {screen: AppBottomTab}
    },
    {
        contentComponent: props =>
            (<DrawerContent
                {...props}
            />),
    }
);


const AuthStack = createStackNavigator({
    Login: {screen: LoginScreen},
    Auth: {screen: AuthPage},
},
{
    navigationOptions:{
        header: null,
    }
});

// separated Auth stack + application tabs
const MainAppStack = createStackNavigator({
    Home: {screen: Drawer},
    Auth: {screen: AuthStack},
},
{
    navigationOptions:{
        header: null,
    }
}
);

// Main navigator:
// loading screen + main app
const Navigator = createSwitchNavigator({
        Welcome: {screen: WelcomeScreen},
        Home: {screen: MainAppStack},
    }
);

export default Navigator;
