import {Dimensions} from 'react-native';

export const colors = {
    BASE: {
        light:    '#FFFFFF',
        dark:     '#0b1323',
    },
    SECOND: {
        light:    '#5b7bbc',
        dark:     '#5b7bbc',
    },
    THIRD: {
        light:    '#0fc4c1',
        dark:     '#0fc4c1',
    },
    TEXT: {
        dark:     '#FFFFFF',
        light:    '#0b1323',
    },
    BUTTON_TEXT: {
        light:    '#FFFFFF',
        dark:     '#0b1323',
    },
    SELECTED_TEXT:{
        light:    '',
        dark:     '',
    },
    MAIN: '#5b7bbc',
    FRAME: '#5b7bbc',

    WHITE: '#FFFFFF',
    PINK_50: '#FCE4EC',
    PINK_100: '#F8BBD0',
    PINK_200: '#F48FB1',
    PINK_300: '#F06292',
    PINK_400: '#EC407A',
    PINK_500: '#E91E63',
    ORANGE: '#ffa366',
    SOFT:   '#ffce99'
};

export const images = {
    LOADING_SCREEN_IMAGE: require('./../../assets/images/loading_screen.png'),
    HEADER_DARK: require('./../../assets/images/muz_header_dark.png'),
    HEADER_LIGHT: require('./../../assets/images/muz_header_white.png'),
};

export const fonts = {
    EACH: 'eachFont',
    MURRAY: 'murray',
};

export const languages = {
    'en': 'English',
    'ru': 'Русский',
};

export const MAX_COMMENT_INPUT_LENGTH = 250;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const HeaderHeight = SCREEN_HEIGHT*0.8/10.5;
export const TabBarHeight = SCREEN_HEIGHT*0.8/10.5;
export const SlidingPanelHeight = SCREEN_HEIGHT*0.8/10.5;
export const StatusBarHeight = 45;
export const TabLabelFontSize = 12;
export const HeaderLabelWidth = SCREEN_WIDTH*1.9/5.9;
export const HeaderLabelHeight = SCREEN_WIDTH*0.4/10.5;

export const DESC_BLOCK_HEIGHT = SCREEN_HEIGHT*1.2/10.5;
export const ARROW_IMG_HEIGHT = 0.3/10.5*SCREEN_HEIGHT;
export const ARROW_IMG_WIDTH = 1.2/5.9*SCREEN_WIDTH;

export const ICON_SIZE = 1/10.9*SCREEN_HEIGHT;
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const storage = {
    THEME: 'THEME',
    LOCALE: 'LOCALE',
};
