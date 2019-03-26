import {Dimensions, Platform} from 'react-native';
import {Constants} from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

    HEADERS:{
        light:    '#FFFFFF',
        dark:     '#0b1323',
    },

    ACTIVE: {
        light:    '#5b7bbc',
        dark:     '#5b7bbc',
    },
    LOADING_SCREEN: '#5b7bbc',
    MAIN: '#5b7bbc',
    FRAME: '#5b7bbc',
    ACCEPTED:   '#37FF33',
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

export const user_agreement_url = 'http://museeach.ru/user_agreement';

export const bug_report_url = 'https://goo.gl/forms/FERJd241NqaOx8EH2';

export const backend_api_url = 'http://museeach.ru:4200';

export const images = {
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
export const StatusBarHeight = Constants.statusBarHeight;
export const CAMERA_ASPECT_RATIO = Dimensions.get('window').height / Dimensions.get('window').width;
export const ASPECT_RATIO = (hp('100%')-StatusBarHeight) / wp('100%');

export const MAX_COMMENT_INPUT_LENGTH = 250;
export const SCREEN_WIDTH = wp('100%');
export const SCREEN_HEIGHT = hp('100%');


export const PureHeaderHeight = hp('8%');
export const HeaderPadding = hp('2.5%');
export const HeaderHeight = StatusBarHeight + PureHeaderHeight;
export const TabBarHeight = hp('9%');
export const HeaderLabelWidth = wp('40%');
export const HeaderLabelHeight = hp('2.25%');

export const SlidingPanelHeight = hp('8%');
export const SlidingPanelTopPos = SCREEN_HEIGHT;
export const SlidingPanelBottomPos = TabBarHeight + HeaderHeight + SlidingPanelHeight + ((ASPECT_RATIO <= 1.8) ? StatusBarHeight : 0);
export const TabLabelFontSize = 12;


export const BACK_ICON_SIZE = wp('6.5%');
export const DESC_BLOCK_HEIGHT = hp('12%');
export const ARROW_IMG_HEIGHT = 0.3/10.5*SCREEN_HEIGHT;
export const ARROW_IMG_WIDTH = 1.2/5.9*SCREEN_WIDTH;

export const ICON_SIZE = 1/10.9*SCREEN_HEIGHT;
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const storage = {
    THEME: 'THEME',
    LOCALE: 'LOCALE',
    AUTH: 'AUTH',
};
