import { createAppContainer } from 'react-navigation';
import { createStackNavigator,  } from 'react-navigation-stack';

import TracingScreen from './screens/TracingScreen';
import ChalkBoardScreen from './screens/ChalkBoardScreen';
import BaybayinScreen from './screens/BaybayinScreen';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import IntroScreen from './screens/introScreen';
import AboutScreen from './screens/About';

const AppNavigator = createStackNavigator( {
    Intro: {
        screen: IntroScreen,
    },
    Home: {
        screen: HomeScreen,
    },
    Trace: {
        screen: TracingScreen,
    },
    ChalkBoard: {
        screen: ChalkBoardScreen,
    },
    Baybayin: {
        screen: BaybayinScreen,
    },
    About: {
        screen: AboutScreen,
    },
    Games: {
        screen: GameScreen,
    }
}, 
    {
        initialRouteName: 'Intro',
    }
);

export default createAppContainer(AppNavigator);