import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
} from 'react-navigation';

import WelcomeScreen from './containers/WelcomePage/Welcome';
import FeedScreen from './containers/HomePage/FeedPage';
import FeedItemScreen from "./containers/HomePage/FeedItem";
import MapScreen from './containers/MapPage/MapPage';
import MuseumsScreen from './containers/MuseumPage/MuseumPage';
import MuseumItemScreen from './containers/MuseumPage/MuseumItem';
import SettingsScreen from './containers/SettingsPage/Settings';
import QuestInfoScreen from "./containers/QuestInfoPage/QuestInfoScreen";
import PlayQuestScreen from "./containers/PlayQuestPage/PlayQuestScreen";
import ResultScreen from "./containers/ResultPage/ResultScreen";
import LoginScreen from "./screens/Login";
import AuthPage from "./containers/AuthPage/AuthPage";
import ProfileScreen from "./screens/Profile"

import { HamburgerIcon, BackIcon } from './components/icons';

import DrawerContent from './components/DrawerContent';
import TabIconContent from "./components/TabIconContent";
import CustomTabBar from "./components/CustomTabBar";
import LogoTitle from "./components/CustomHeader";
import { colors, HeaderHeight, TabLabelFontSize } from './utils/constants';
import CustomCamera from "./containers/Question/CustomCamera";

const FeedStack = createStackNavigator(
    {
        Feeds: {screen: FeedScreen},
        FeedItem: {screen: FeedItemScreen},
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
            },
            headerLeft: <HamburgerIcon onPress={()=>navigation.openDrawer()} color={colors.MAIN}/>
        }),
    }
);

const MuseumStack = createStackNavigator(
    {
        Museums: {screen: MuseumsScreen},
        MuseumItem: {screen: MuseumItemScreen},
        QuestInfo: {screen: QuestInfoScreen},
        QuestPlay: {screen: PlayQuestScreen},
        Result: {screen: ResultScreen},
    },
    {
        navigationOptions: ({navigation})=> {

            let content;

            if (navigation.state.routeName === 'Museums') {
                content = <HamburgerIcon onPress={() => navigation.openDrawer()}/>;
            }
            else {
              const key = navigation.state.params.page;

              if (key === 'Maps' || key === 'Museums') {
                content = <BackIcon onPress={() => navigation.navigate(key)}/>;
              }
                else {
                content = <BackIcon onPress={() => navigation.goBack(null)}/>;
              }
            }
            return ({
                headerBackground: <LogoTitle/>,
                headerStyle: {
                    height: HeaderHeight,
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
        tabBarComponent: CustomTabBar,
        tabBarOptions:{
            labelStyle:{ fontSize: TabLabelFontSize},
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

const AuthStack = createStackNavigator(
    {
        Login: {screen: LoginScreen},
        Auth: {screen: AuthPage},
        Profile: {screen: ProfileScreen},
    },
    {
        navigationOptions:{
            header: null,
        }
    }
);

// separated Auth stack + application tabs
const MainAppStack = createStackNavigator(
    {
        Home: {screen: Drawer},
        Auth: {screen: AuthStack},
        Camera: {screen: CustomCamera},
    },
    {
        navigationOptions:{
            header: null,
        }
    }
);

// Main navigator:
// loading screen + main app
const Navigator = createSwitchNavigator(
    {
        Welcome: {screen: WelcomeScreen},
        Home: {screen: MainAppStack},
    }
);

export default Navigator;
