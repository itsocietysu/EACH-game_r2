import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
} from 'react-navigation';
import {Text} from 'react-native';
import WelcomeScreen from './containers/WelcomePage/Welcome';
import FeedScreen from './containers/FeedPage/FeedPage';
import FeedItemScreen from "./containers/FeedPage/FeedItem";
import MapScreen from './containers/MapPage/MapPage';
import MuseumsScreen from './containers/MuseumPage/MuseumPage';
import MuseumItemScreen from './containers/MuseumPage/MuseumItem';
import SettingsScreen from './containers/SettingsPage/Settings';
import QuestInfoScreen from "./containers/QuestInfoPage/QuestInfoScreen";
import PlayQuestScreen from "./containers/PlayQuestPage/PlayQuestScreen";
import ResultScreen from "./containers/ResultPage/ResultScreen";
import LoginScreen from "./containers/AuthPage/Login";
import ProfileScreen from "./containers/AuthPage/Profile"
import AuthLoadingScreen from "./containers/AuthPage/AuthLoading"

import BackIcon from './components/Icons/Back';
import SettingsIcon from './components/Icons/Settings';

import TabIconContent from "./components/TabBar/TabIconContent";
import CustomTabBar from "./components/TabBar/CustomTabBar";
import LogoTitle from "./components/Header/CustomHeader";
import { colors, HeaderHeight, TabLabelFontSize } from './utils/constants';
import CustomCamera from "./containers/Question/CustomCamera";
import QuestFinalScreen from "./containers/QuestFinalPage/QuestFinalScreen";
import TabBarLabels from "./components/TabBar/TabBarLabels";

const FeedStack = createStackNavigator(
    {
        Feeds: {screen: FeedScreen},
        FeedItem: {screen: FeedItemScreen},
    },
    {
        navigationOptions: ({navigation})=> {
            let content;

            if (navigation.state.routeName !== 'Feeds') {
              content = <BackIcon onPress={() => navigation.goBack(null)}/>;
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
        navigationOptions: ()=>({
            headerBackground: <LogoTitle/>,
            headerStyle: {
                height: HeaderHeight,
            }
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
        Finish: {screen: QuestFinalScreen},
    },
    {
        navigationOptions: ({navigation})=> {
            let content = null;
            if (navigation.state.routeName !== 'Museums') {
              if (navigation.state.params) {
                  const key = navigation.state.params.page;

                  if (key === 'Maps' || key === 'Museums') {
                      content = <BackIcon onPress={() => navigation.navigate(key)}/>;
                  } else {
                      content = <BackIcon onPress={() => navigation.goBack(null)}/>;
                  }
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

/* const ProfileStack = createStackNavigator(
  {
    Profile: {screen: ProfileScreen},
    Settings: {screen: SettingsScreen}
  },
  {
    navigationOptions: ({navigation})=> {
      let content = null;
      let rightContent = null;

      if(navigation.state.routeName === 'Profile') {
        rightContent =  <SettingsIcon onPress={() => navigation.navigate('Settings')}/>
      }
      else {
        content = <BackIcon onPress={() => navigation.goBack(null)}/>;
      }
      return ({
        headerBackground: <LogoTitle/>,
        headerStyle: {
          height: HeaderHeight,
        },
        headerLeft: content,
        headerRight: rightContent,
      });
    }
  }
);

const LoginStack = createStackNavigator(
  {LoginScreen: {screen: LoginScreen}},
  {
    navigationOptions: ({navigation})=> {
      const content = null;
      const rightContent = null;

      return ({
        headerBackground: <LogoTitle/>,
        headerStyle: {
          height: HeaderHeight,
        },
        headerLeft: content,
        headerRight: rightContent,
      });
    }
  }
);*/

const AuthLoadingStack = createSwitchNavigator(
    {
        AuthProvider: {screen: AuthLoadingScreen},
        Login: {screen: LoginScreen},
        Profile: {screen: ProfileScreen},
    },
    /*{
        navigationOptions: ({navigation})=> {
            const content = null;
            const rightContent = null;

            return ({
                headerBackground: <LogoTitle/>,
                headerStyle: {
                    height: HeaderHeight,
                },
                headerLeft: content,
                headerRight: rightContent,
            });
        }
    }*/
);

const ProfileAndAuth = createStackNavigator(
    {
        Auth: AuthLoadingStack,
        Settings: SettingsScreen,
    },
    {
        navigationOptions: ({navigation}) => {
            let content = null;
            const rightContent = <SettingsIcon onPress={() => navigation.navigate('Settings')}/>;

            if(navigation.state.routeName === 'Settings') {
                content = <BackIcon onPress={() => navigation.goBack(null)}/>;
            }
            return ({
                headerBackground: <LogoTitle/>,
                headerStyle: {
                    height: HeaderHeight,
                },
                headerLeft: content,
                headerRight: rightContent,
            });
        }
    }
);

// Bottom tab containing 4 main stacks
const  AppBottomTab = createBottomTabNavigator(
    {
        Feeds: {screen: FeedStack},
        Maps: {screen: MapStack},
        Museums: {screen: MuseumStack},
        Profile: {screen: ProfileAndAuth},
    },
    {
        navigationOptions: ({navigation})=>({
            tabBarIcon: ({tintColor,focused})=>(
                <TabIconContent navigation={navigation} tintColor={tintColor} focused={focused}/>),
            tabBarLabel: ({tintColor,focused})=>(
                <TabBarLabels navigation={navigation} tintColor={tintColor} focused={focused}/>),

        }),
        tabBarComponent: CustomTabBar,
        tabBarOptions:{
            labelStyle:{ fontSize: TabLabelFontSize},
        }
    }
);

// separated Auth stack + application tabs
const MainAppStack = createStackNavigator(
    {
        Home: {screen: AppBottomTab},
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
