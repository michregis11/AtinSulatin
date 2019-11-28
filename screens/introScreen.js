import React from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableWithoutFeedback, BackHandler, AppState,
    Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';

import MenuContainer from './images/MenuIcon.png';

import AboutIcon from './images/About-icon.png';
import AtinSulatin from './images/AtinSulatinIntro.png';
import MenuFrame from './images/GreenFrameBlank.png';

import Sound from 'react-native-sound';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;
let realm2;
let realm3;

export let sound = new Sound('bg_final.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        alert('failed to load the sound', error);
        return;
    } else {
        try{
            realm = new Realm({ path: 'AtinDatabase.realm'});
            let GameData = realm.objects('GameData');
            realm.write(()=> {
                if(!GameData[0]) {
                    realm.create('GameData', {
                        game: 'Created',
                    });
                } else {
                    this.setState({language: GameData[0].language, volume: GameData[0].unlockTraceMode});
                    if(GameData[0].unlockTraceMode) {
                        sound.play();
                        sound.setVolume(0.3);
                        GameData[0].unlockTraceMode = true;
                    } else {
                        sound.setVolume(0);
                        sound.stop();
                        GameData[0].unlockTraceMode = false;
                    }
                }
            });
            sound.setVolume(0.3);
            sound.setNumberOfLoops(-1);
        } catch(error) {
            
        }
}});

export const error = new Sound('error_final.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        alert('failed to load the sound', error);
        return;
    } else {
        try{
            error.stop();
        } catch(error) {
            
        }
}});
export const success = new Sound('success.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        alert('failed to load the sound', error);
        return;
    } else {
        try{
            success.stop();
        } catch(error) {
            
        }
}});
export const soundPress = new Sound('tiktok.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        alert('failed to load the sound', error);
        return;
    } else {
        try{
            soundPress.stop();
        } catch(error) {
            
        }
}});

class IntroScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        realm = new Realm({
            path: 'AtinDatabase.realm',
            schema: [
                {
                    name: 'GameData',
                    properties: {
                        game: {type: 'string', default: ''},
                        pesoCoin: { type: 'int', default: 20},
                        heart: { type: 'int', default: 5},
                        stars: { type: 'int', default: 0},
                        quizScriptTwo: { type: 'bool', default: false},
                        quizScriptThree: { type: 'bool', default: false},
                        quizWord: { type: 'bool', default: false},
                        quizWordTwo: { type: 'bool', default: false},
                        quizWordThree: { type: 'bool', default: false},
                        tracing: { type: 'bool', default: false},
                        chalkBoard: { type: 'bool', default: false},
                        script1: { type: 'bool', default: false},
                        script2: { type: 'bool', default: false},
                        script3: { type: 'bool', default: false},
                        script4: { type: 'bool', default: false},
                        script5: { type: 'bool', default: false},
                        script6: { type: 'bool', default: false},
                        script7: { type: 'bool', default: false},
                        script8: { type: 'bool', default: false},
                        script9: { type: 'bool', default: false},
                        script10: { type: 'bool', default: false},
                        firstGameOpen: { type: 'bool', default: false},
                        firstQuizOpen: { type: 'bool', default: false},
                        firstTraceOpen: { type: 'bool', default: false},
                        firstChalkOpen: { type: 'bool', default: false},
                        language: { type: 'string', default: 'Filipino'},
                        chalkYellow: { type: 'bool', default: false},
                        chalkBlue: { type: 'bool', default: false},
                        chalkRed: { type: 'bool', default: false},
                        correctAnswer: { type: 'int', default: 0},
                        wrongAnwser: { type: 'int', default: 0},
                        achievemenEarned: { type: 'int', default: 0},
                        coinEarned: { type: 'int', default: 20},
                        unlockTraceMode: {type: 'bool', default: true},
                        unlockTChalkMode: {type: 'bool', default: true},
                        traceScripts: {type: 'int', default: 7},
                        traceColorIndex: {type: 'int', default: 0},
                    },
                },
            ],
        });

        realm2 = new Realm({
            path: 'AchievementDatabase.realm',
            schema: [
                {
                    name: 'AchieveData',
                    properties: {
                        rewards: {type: 'int', default: 0},
                        quizRewards: { type: 'int', default: 0},
                        traceRewards: { type: 'int', default: 0},
                        coinRewards: { type: 'int', default: 0},
                        taskRewards: { type: 'int', default: 0},

                        coin: { type: 'int', default: 20},
                        coinFifty: { type: 'bool', default: false},
                        coinHundred: { type: 'bool', default: false},
                        coinTwoHundred: { type: 'bool', default: false},
                        coinFiveHundred: { type: 'bool', default: false},
                        coinRewardFifty: { type: 'bool', default: false},
                        coinRewardHundred: { type: 'bool', default: false},
                        coinRewardTwoHundred: { type: 'bool', default: false},
                        coinRewardFiveHundred: { type: 'bool', default: false},

                        traced: { type: 'int', default: 0},
                        tracedFifty: { type: 'bool', default: false},
                        tracedHundred: { type: 'bool', default: false},
                        tracedTwoHundred: { type: 'bool', default: false},
                        tracedFiveHundred: { type: 'bool', default: false},
                        traceScript: { type: 'bool', default: false},
                        chalkYellow: { type: 'bool', default: false},
                        chalkBlue: { type: 'bool', default: false},
                        chalkRed: { type: 'bool', default: false},
                        tracedRewardFifty: { type: 'bool', default: false},
                        tracedRewardHundred: { type: 'bool', default: false},
                        tracedRewardTwoHundred: { type: 'bool', default: false},
                        tracedRewardFiveHundred: { type: 'bool', default: false},

                        perfect: { type: 'int', default: 0},
                        perfectFive: { type: 'bool', default: false},
                        perfectTen: { type: 'bool', default: false},
                        perfectTwentyFive: { type: 'bool', default: false},
                        perfectFifty: { type: 'bool', default: false},
                        perfectRewardFive: { type: 'bool', default: false},
                        perfectRewardTen: { type: 'bool', default: false},
                        perfectRewardTwentyFive: { type: 'bool', default: false},
                        perfectRewardFifty: { type: 'bool', default: false},

                        wrong: { type: 'int', default: 0},
                        wrongFive: { type: 'bool', default: false},
                        wrongTen: { type: 'bool', default: false},
                        wrongTwentyFive: { type: 'bool', default: false},
                        wrongFifty: { type: 'bool', default: false},
                        wrongRewardFive: { type: 'bool', default: false},
                        wrongRewardTen: { type: 'bool', default: false},
                        wrongRewardTwentyFive: { type: 'bool', default: false},
                        wrongRewardFifty: { type: 'bool', default: false},

                        correct: { type: 'int', default: 0},
                        correctTen: { type: 'bool', default: false},
                        correctTwentyFive: { type: 'bool', default: false},
                        correctFifty: { type: 'bool', default: false},
                        correctHundred: { type: 'bool', default: false},
                        correctRewardTen: { type: 'bool', default: false},
                        correctRewardTwentyFive: { type: 'bool', default: false},
                        correctRewardFifty: { type: 'bool', default: false},
                        correctRewardHundred: { type: 'bool', default: false},
                        
                        achieve: { type: 'int', default: 0},
                        achieveFive: { type: 'bool', default: false},
                        achieveTen: { type: 'bool', default: false},
                        achieveFifteen: { type: 'bool', default: false},
                        achieveTwenty: { type: 'bool', default: false},
                        achieveRewardFive: { type: 'bool', default: false},
                        achieveRewardTen: { type: 'bool', default: false},
                        achieveRewardFifteen: { type: 'bool', default: false},
                        achieveRewardTwenty: { type: 'bool', default: false},
                    },
                },
            ],
        });

        realm3 = new Realm({
            path: 'NavigationDatabase.realm',
            schema: [
                {
                    name: 'NavigationData',
                    properties: {
                        fromScreen: {type: 'string', default: 'IntroScreen'},
                    },
                },
            ],
        });

        this.state ={
            language: '',
            appState: AppState.currentState,
            volume: false,
        }
        this.sound = soundPress;
    }

    componentDidMount() {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
            if(!GameData[0]) {
                realm.create('GameData', {
                    game: 'Created',
                });
            } else {
                this.setState({language: GameData[0].language, volume: GameData[0].unlockTraceMode});
                if(GameData[0].unlockTraceMode) {
                    sound.play();
                    sound.setVolume(0.3);
                    GameData[0].unlockTraceMode = true;
                } else {
                    sound.setVolume(0);
                    sound.stop();
                    GameData[0].unlockTraceMode = false;
                }
                sound.setNumberOfLoops(-1);
            }
        });
        realm2 = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm2.objects('AchieveData');
        realm2.write(()=> {
            if(!AchieveData[0]) {
                realm2.create('AchieveData', {
                    rewards: 0,
                });
            }
        });
        realm3 = new Realm({ path: 'NavigationDatabase.realm'});
        let NavigationData = realm3.objects('NavigationData');
        realm3.write(()=> {
            if(!NavigationData[0]) {
                realm3.create('NavigationData', {
                    fromScreen: 'IntroScreen',
                });
            }
        });
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
          });

          AppState.addEventListener('change', this.stateHandler);
    }

    stateHandler = (nextAppState) => {
        if(this.state.appState == 'inactive' || this.state.appState == 'background') {
            sound.play(); 
        } else {
            sound.stop();
        }
        this.setState({appState: nextAppState});
    }
    
    changeLanguage = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
            if(GameData[0].language == 'Filipino') {
                GameData[0].language = 'English';
            } else {
                GameData[0].language = 'Filipino';
            }
        });
        this.setState({language: GameData[0].language});
        this.sound.play();
    }

    goBack = async () => {
        sound.stop();
        this.sound.play();
        BackHandler.exitApp();
    }


    aboutPressed = () => {
        realm3 = new Realm({ path: 'NavigationDatabase.realm'});
        let NavigationData = realm3.objects('NavigationData');
        realm3.write(()=> {
            NavigationData[0].fromScreen = 'IntroScreen';
        });
        this.sound.play();
        this.props.navigation.push('About');
    }

    gotoHome = () => {
        this.sound.play();
        this.props.navigation.replace('Home');
    }

    render() {
        StatusBar.setHidden(true);
        return (
        <ImageBackground source={ChalkBoard} style={{flex: 1}}>
            <View style={{position: 'absolute', top: '0%', left: '0%',
                width: '100%', height: '100%', borderWidth: 1}}>
                    <Image source={ChalkBoard} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                    </Image>
            </View>
            <Image source={AtinSulatin} style={{
                position: 'absolute', top: '15%', left: '22.5%', width: '55%', height: '40%', resizeMode: 'contain',
            }}></Image>

            

            <TouchableOpacity style={[style.SideMenuStyle, {top: '75%'}]}
                onPress={this.aboutPressed}> 
                <Image source={MenuContainer} style={style.ImageStyle}>
                </Image>
                <Image source={AboutIcon} style={{
                    width: '60%', height: '50%', position: 'absolute', top: '25%', left: '20%', resizeMode: 'contain'
                }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{
                position: 'absolute',
                width: '22.5%',
                height: '22.5%',
                top: '60%',
                left: '37.5%',
            }}
                onPress={this.gotoHome}> 
                <Image source={CoinContainer} style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'stretch',
                }}>
                </Image>

                <Text style={{
                    position: 'absolute',
                    top: '22.5%',
                    left: '10%',
                    width: '80%',
                    height: '55%',
                    fontSize: screenWidth * 0.04,
                    textAlign: 'center',
                    color: 'white',
                }}>{this.state.language == 'Filipino' ? 'Simulan' : 'Start'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[style.SideMenuStyle, {top: '75%', left: '5%'}]}
                onPress={this.changeLanguage}> 
                <Image source={MenuContainer} style={style.ImageStyle}>
                </Image>
                <Text style={{
                    position: 'absolute',
                    top: '25%',
                    width: '60%',
                    height: '50%',
                    left: '20%',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'Tahoma',
                    fontSize: screenWidth * 0.03,
                }}>{this.state.language == 'Filipino' ? 'ENG' : 'FIL'}</Text>
            </TouchableOpacity>

        </ImageBackground>
        );
    }
}


const style = StyleSheet.create({
    SideMenuStyle: {
        position: 'absolute',
        top: '25%',
        right: '5%',
        width: '10%',
        height: '20%',
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
});


export default withNavigation(IntroScreen);