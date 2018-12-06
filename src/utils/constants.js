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

export const HeaderHeight = 40;
export const TabLabelFontSize = 12;

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const storage = {
    THEME: 'THEME',
    LOCALE: 'LOCALE',
};
