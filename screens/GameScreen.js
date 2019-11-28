import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, BackHandler, AppState,
    Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';
import LockedLevel from './images/Locked-Button-icon.png';
import LockIcon from './images/Lock-icon.png';

import CoinIcon from './images/Coin-icon.png';
import HeartIcon from './images/Heart-icon.png';
import BlueHeartIcon from './images/BlueHeartIcon.png';
import BackIcon from './images/Back-Icon.png';
import ExitIcon from './images/Exit-Icon.png';
import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';

import SciptsButton from './images/ScriptsButton.png';

import MenuFrame from './images/GreenFrameBlank.png';

import MenuIcon from './images/MenuIcon.png';

import QuizTitle from './images/QuizTitle.png';
import ScriptTitle from './images/screenTitle/ScriptScreenTitle.png';
import WordTitle from './images/screenTitle/WordScreenTitle.png';

import SubokScreen from './images/filipino/Subok.png';
import PagbaybayScreen from './images/screenTitle/PagbaybayScreenTitle.png';
import PagbasaScreen from './images/screenTitle/PagbasaScreenTitle.png';

import Letter from './images/Letter.png';
import Word from './images/Word.png';
import Letra from './images/filipino/Letra.png';
import Salita from './images/filipino/Salita.png';

import Level1 from './images/MenuTitles/Level1.png';
import Level2 from './images/MenuTitles/Level2.png';
import Level3 from './images/MenuTitles/Level3.png';

import levelOne from './images/screenTitle/LevelOneTitle.png';
import levelTwo from './images/screenTitle/LevelTwoTitle.png';
import levelThree from './images/screenTitle/LevelThreeTitle.png';

import Baitang1 from './images/screenTitle/Baitang1ScreenTitle.png';
import Baitang2 from './images/screenTitle/Baitang2ScreenTitle.png';
import Baitang3 from './images/screenTitle/Baitang3ScreenTitle.png';

import LetterMode from './images/frameTitle/LetterModeTitle.png';
import WordMode from './images/frameTitle/WordModeTitle.png';
import PagbaybayFrame from './images/frameTitle/PagbaybayFrameTitle.png';
import PagbasaFrame from './images/frameTitle/PagbasaFrameTitle.png';

import ScriptLevelOne from './quiz/script/ScriptLevelOne';
import ScriptLevelTwo from './quiz/script/ScriptLevelTwo';
import ScriptLevelThree from './quiz/script/ScriptLevelThree';

import WordLevelOne from './quiz/word/WordLevelOne';
import WordLevelTwo from './quiz/word/WordLevelTwo';
import WordLevelThree from './quiz/word/WordLevelThree';

import StoreIcon from './images/Store-icon.png';
import MenuContainer from './images/MenuIcon.png';

import BaybayinScripts from './BaybayinScripts';
import OkayIcon from './images/Accept-Icon.png';
import Store from './Store';

import Sound from 'react-native-sound';

import { sound, error, success, soundPress } from './introScreen';

const screenWidth = Dimensions.get('screen').width;
var Realm = require('realm');
let realm;

class GameScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    scriptsPressed = () => {
        this.soundPress.play();
        this.setState({scripts: true});
    }
    scriptsClosePressed = () => {
        this.soundPress.play();
        this.setState({scripts: false});
        this.setState({firstScripts: true, 
            secondScripts: false});
    }

    constructor() {
        super();
        this.state = {
            volume: false,
            scripts: false,
            firstScripts: true,
            secondScripts: false,
            showMode: false,
            letterMode: false,
            wordMode: false,
            modePicked: LetterMode,
            pesoCoin: '',
            heartCoin: '',
            modeMenu: true,
            ScriptLevelOne: false,
            ScriptLevelTwo: false,
            ScriptLevelTwoLocked: null,
            ScriptLevelThreeLocked: null,
            scriptsHidden: true,
            WordLevelOne: false,
            WordLevelTwo: false,
            WordLevelThree:false,
            WordLevelTwoLocked: null,
            WordLevelThreeLocked: null,
            wordModeLocked: true, 
            showLevelTitle: false,
            levelTitle: null,
            prevLevel: true,
            nextLevel: false,
            titleScreen: QuizTitle,
            menuPressed: false,
            storeMenu: true,
            store: false,
            showInGameMessage: false,
            setInGameMessage: null,
            language: '',
            wordPesoCoin: false,
            setUnlockLevelThree: 'Kinakailangan mong buksan ang pangalawang lebel',
            tada: '',
            tada2: '',
            tada3: '',
            tada4: '',
            tada5: '',
            tada6: '',
            tada7: '',
            tada8: '',
            tada9: '',
            tada10: '',
            tada11: '',
            setMessageLevel3: '',
            firstQuiz: false,
            appState: AppState.currentState,
        },
        this.soundPress = soundPress;
        this.error = error;
        this.success = success;
        this.inGameMessageENG = 'Sure you want to leave the quiz?';
        this.inGameMessageFIL = 'Umalis kahit nasa pagsusulit pa?';
        this.unlockLevelThreeMessage = '';
        this.noHeart = null;
        this.sound = null;
    }

    tada = (tada) => {
        if(tada == 0) {
            this.success.play();
        } else {
            if(tada == 1) {
                this.setState({tada: 'tada'});
            } else if(tada == 2) {
                this.setState({tada2: 'tada'});
            } else if(tada == 3) {
                this.setState({tada3: 'tada'});
            } else if(tada == 4) {
                this.setState({tada4: 'tada'});
            } else if(tada == 5) {
                this.setState({tada5: 'tada'});
            } else if(tada == 6) {
                this.setState({tada6: 'tada'});
            } else if(tada == 7) {
                this.setState({tada7: 'tada'});
            } else if(tada == 8) {
                this.setState({tada8: 'tada'});
            } else if(tada == 9) {
                this.setState({tada9: 'tada'});
            } else if(tada == 10) {
                this.setState({tada10: 'tada'});
             }else if(tada == 11) {
                this.setState({tada11: 'tada'});
            }
            this.error.play();
            setTimeout(()=>{
                this.sound = null;
                this.setState({tada: '', tada2: '', tada3: '',tada4: '' ,tada5: '',
                    tada6: '', tada7: '', tada8: '',tada9: '' ,tada10: '',tada11: ''});
            }, 700);
        }
    }

    componentDidMount() {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
            if(!GameData[0]) {
                realm.create('GameData', {
                    game: 'Created',
                });
                this.setState({pesoCoin: GameData[0].pesoCoin});
                // alert('Created!    ' + GameData[0].pesoCoin);
            } else {
                // alert(GameData[0].pesoCoin);
                this.setState({pesoCoin: GameData[0].pesoCoin, 
                    ScriptLevelTwoLocked: !GameData[0].quizScriptTwo,
                    heartCoin: GameData[0].heart, wordModeLocked: !GameData[0].quizWord, 
                    ScriptLevelThreeLocked: !GameData[0].quizScriptThree, firstQuiz: !GameData[0].firstQuizOpen,
                    WordLevelTwoLocked: !GameData[0].quizWordTwo, WordLevelThreeLocked: !GameData[0].quizWordThree,
                    volume: GameData[0].unlockTraceMode});
                    if(GameData[0].unlockTraceMode) {
                        sound.play();
                        sound.setVolume(0.3);
                    } else {
                        sound.setVolume(0);
                        sound.stop();
                    }
                    sound.setNumberOfLoops(-1);
                if(GameData[0].language == 'Filipino') {
                    this.setState({setInGameMessage: this.inGameMessageFIL, language: 'Filipino',
                    setUnlockLevelThree: 'Buksan muna ang pangalawang baitang.', 
                    noBlueHeartMessage: 'Di sapat ang asul na puso para makapasok sa baitang na ito.\n'});
                    this.setState({titleScreen: SubokScreen});
                } else {
                    this.setState({setInGameMessage: this.inGameMessageENG, language: 'English',
                        setUnlockLevelThree: 'You have to unlock level 2 first.',
                        noBlueHeartMessage: 'You do not have Blue Hearts left to enter this level.'});
                    this.setState({titleScreen: QuizTitle});
                }
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

    goBack = async () => {
        this.soundPress.play();
        this.props.navigation.replace('Home');
    }

    closeMessage = () => {
        if(this.state.firstQuiz) {
            realm = new Realm({ path: 'AtinDatabase.realm'});
            let GameData = realm.objects('GameData');
            realm.write(()=> {
                GameData[0].firstQuizOpen = true;
                this.setState({firstQuiz: false,});
            });
        }
        this.soundPress.play();
        this.setState({showInGameMessage: false,});
    }

    menuClosePressed = () => {
        this.soundPress.play();
        this.props.navigation.replace('Games');
    }

    storePressed = () => {
        this.soundPress.play();
        this.setState({store: true, menuPressed: true, showMode: false,});
    }

    closeMode = () => {
        this.soundPress.play();
        this.setState({showMode: false, letterMode: false, wordMode: false, modePicked: null, 
            prevLevel: true, nextLevel: false, noHeartLeft: false});
    }

    gotoHome = () => {
        if((this.state.ScriptLevelOne || this.state.ScriptLevelTwo) ||
            this.state.ScriptLevelThree) {
            this.setState({showInGameMessage: true});
        } else if((this.state.WordLevelOne || this.state.WordLevelTwo) ||
        this.state.WordLevelThree) {
            this.setState({showInGameMessage: true});
        } else {
            this.soundPress.play();
            this.props.navigation.replace('Home');
        }
        this.soundPress.play();
    }

    confirmedBackQuizMennu = () => {
        this.soundPress.play();
        sound.play();
        this.props.navigation.replace('Games');
    }

    deductHeart = (index, level) => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
            GameData[0].heart = GameData[0].heart - index;
            this.setState({heartCoin: GameData[0].heart});
        });
    }

    letterPressed = () => {
        this.soundPress.play();
        this.setState({showMode: true, letterMode: true, 
            modePicked: this.state.language == 'Filipino' ? PagbaybayFrame : LetterMode});
    }

    wordPressed = () => {
        this.soundPress.play();
        this.setState({showMode: true, wordMode: true, 
            modePicked: this.state.language == 'Filipino' ? PagbasaFrame : WordMode});
    }

    setMessageLevel3 = (message) => {
        if(message == 1) {
            this.setState({setMessageLevel3: this.state.language == 'Filipino' ? 'Buksan muna ang pangalawang baitang.' :
            'You have to unlock level 2 first.'});
        } else {
            this.setState({setMessageLevel3: this.state.language == 'Filipino' ? 'Ang pera mo ay hindi sapat.' :
            'You do not have enough peso coins.'});
        }
        setTimeout(()=> {
            this.setState({setMessageLevel3: ''});
        }, 3000);
    }

    LevelOnePressed = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(this.state.wordMode) {
            if(GameData[0].heart < 1) {
                this.setState({noHeartLeft: true, wordMode: false});
                this.noHeart = true;
                this.tada(6);
            } else {
                this.setState({WordLevelOne: true, 
                    titleScreen: this.state.language == 'Filipino' ? PagbasaScreen : WordTitle, 
                WordLevelTwo: false, WordLevelThree: false,});
                this.setState({ScriptLevelOne: false,
                    ScriptLevelTwo: false, ScriptLevelThree: false,});
                this.noHeart = false;
                this.noHeart = false;
                this.deductHeart(1, 1);
                sound.stop();
            }
        } else if(this.state.letterMode) {
            if(GameData[0].heart < 1) {
                this.setState({noHeartLeft: true, letterMode: false});
                this.noHeart = true;
                this.tada(9);
            } else {
                this.setState({ScriptLevelOne: true, 
                    titleScreen: this.state.language == 'Filipino' ? PagbaybayScreen : ScriptTitle, 
                    ScriptLevelTwo: false, ScriptLevelThree: false,});
                    this.setState({WordLevelOne: false,
                        WordLevelTwo: false, WordLevelThree: false,});
                    this.noHeart = false;
                    this.deductHeart(1, 1);
                sound.stop();
            }
        }
        if(!this.noHeart) {
            this.setState({showLevelTitle: true, levelTitle: this.state.language == 'Filipino' ? Baitang1 : levelOne,
                showMode: false, modeMenu: false, storeMenu: false, scriptsHidden: false, });
        }
        this.soundPress.play();
    }

    LevelTwoPressed = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(this.state.wordMode) {
            if(GameData[0].heart < 2) {
                this.setState({noHeartLeft: true, wordMode: false});
                this.noHeart = true;
                this.tada(7);
            } else {
                this.setState({WordLevelTwo: true, 
                    titleScreen: this.state.language == 'Filipino' ? PagbasaScreen : WordTitle, 
                    WordLevelOne: false, WordLevelThree: false,});
                this.setState({ScriptLevelTwo: false,
                        ScriptLevelOne: false, ScriptLevelThree: false,});
                this.noHeart = false;
                this.noHeart = false;
                this.deductHeart(2, 2);
                sound.stop();
            }
        } else if(this.state.letterMode) {
            if(GameData[0].heart < 2) {
                this.setState({noHeartLeft: true, letterMode: false});
                this.noHeart = true;
                this.tada(10);
            } else {
                this.setState({ScriptLevelTwo: true, 
                    titleScreen: this.state.language == 'Filipino' ? PagbaybayScreen : ScriptTitle, 
                    ScriptLevelOne: false, ScriptLevelThree: false,});
                    this.setState({WordLevelOne: false,
                        WordLevelTwo: false, WordLevelThree: false,});
                    this.noHeart = false;
                    this.deductHeart(1, 2);
                    sound.stop();
            }
        }
        if(!this.noHeart) {
            this.setState({showLevelTitle: true, levelTitle: this.state.language == 'Filipino' ? Baitang2 : levelTwo,
                showMode: false, modeMenu: false, storeMenu: false, scriptsHidden: false, });
        }
        this.soundPress.play();
    }

    LevelThreePressed = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(this.state.wordMode) {
            if(GameData[0].heart < 2) {
                this.setState({noHeartLeft: true, wordMode: false});
                this.noHeart = true;
                this.tada(8);
            } else {
                this.setState({WordLevelThree: true, 
                    titleScreen: this.state.language == 'Filipino' ? PagbasaScreen : WordTitle, 
                    WordLevelOne: false, WordLevelTwo: false,});
                    this.setState({ScriptLevelTwo: false,
                        ScriptLevelOne: false, ScriptLevelThree: false,});
                this.noHeart = false;
                this.deductHeart(2, 3);
                sound.stop();
            }
        } else if(this.state.letterMode) {
            if(GameData[0].heart < 2) {
                this.setState({noHeartLeft: true, letterMode: false});
                this.noHeart = true;
                this.tada(11);
            } else {
                this.setState({ScriptLevelThree: true, 
                    titleScreen: this.state.language == 'Filipino' ? PagbaybayScreen : ScriptTitle, 
                    ScriptLevelOne: false, ScriptLevelTwo: false,});
                    this.setState({WordLevelThree: false,
                        WordLevelOne: false, WordLevelTwo: false,});
                this.noHeart = false;
                this.deductHeart(2, 3);
                sound.stop();
            }
        }

        if(!this.noHeart) {
            this.setState({showLevelTitle: true, levelTitle: this.state.language == 'Filipino' ? Baitang3 : levelThree, 
                showMode: false, modeMenu: false, storeMenu: false, scriptsHidden: false, });
        }
        this.soundPress.play();
    }

    unlockWordMode = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(GameData[0].pesoCoin >= 55) {
            if(GameData[0].quizScriptThree) {
                realm.write(()=> {
                    GameData[0].pesoCoin = GameData[0].pesoCoin - 55;
                    GameData[0].quizWord = true;
                    GameData[0].heart = GameData[0].heart + 5;
                    this.setState({pesoCoin: GameData[0].pesoCoin, wordModeLocked: !GameData[0].quizWord , 
                        heartCoin: GameData[0].heart});
                });
                this.tada(0);
            } else {
                this.setState({setMessageLevel3: this.state.language == 'Filipino' ? 
                    'Buksan muna ang pangatlong baitang sa Pagbaybay.': 
                    'You have to unlock script-level 3 first.'});
                this.tada(5);
                setTimeout(()=> {
                    this.setState({setMessageLevel3: ''});
                }, 3000);
            }
            
        } else {
            this.setMessageLevel3(2);
            this.tada(5);
        }
    }

    unlockModeLevelTwo = ()=> {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(this.state.letterMode) {
            if(GameData[0].pesoCoin >= 25) {
                realm.write(()=> {
                    GameData[0].pesoCoin = GameData[0].pesoCoin - 25;
                    GameData[0].quizScriptTwo = true;
                    GameData[0].heart = GameData[0].heart + 2;
                    this.setState({pesoCoin: GameData[0].pesoCoin, heartCoin: GameData[0].heart,
                        ScriptLevelTwoLocked: !GameData[0].quizScriptTwo});
                });
                this.tada(0);
            } else {
                this.tada(1);
            }
        } else if(this.state.wordMode) {
            if(GameData[0].pesoCoin >= 45) {
                realm.write(()=> {
                    GameData[0].pesoCoin = GameData[0].pesoCoin - 45;
                    GameData[0].quizWordTwo = true;
                    GameData[0].heart = GameData[0].heart + 5;
                    this.setState({pesoCoin: GameData[0].pesoCoin, WordLevelTwoLocked: !GameData[0].quizWordTwo,
                        heartCoin: GameData[0].heart,});
                });
                this.tada(0);
            } else {
                this.tada(3);
            }
        }
    }


    unlockModeLevelThree = ()=> {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(this.state.letterMode) {
            if(GameData[0].pesoCoin >= 35) {
                if(GameData[0].quizScriptTwo) {
                    realm.write(()=> {
                        GameData[0].pesoCoin = GameData[0].pesoCoin - 35;
                        GameData[0].quizScriptThree = true;
                        GameData[0].heart = GameData[0].heart + 5;
                        this.setState({pesoCoin: GameData[0].pesoCoin, heartCoin: GameData[0].heart,
                            ScriptLevelThreeLocked: !GameData[0].quizScriptThree});
                    });
                    this.tada(0);
                } else {
                    this.setMessageLevel3(1);
                    this.tada(2);
                }
                
            } else {
                this.setMessageLevel3(2);
                this.tada(2);
            }
        } else if(this.state.wordMode) {
            if(GameData[0].pesoCoin >= 55) {
                if(GameData[0].quizWordTwo) {
                    realm.write(()=> {
                        GameData[0].pesoCoin = GameData[0].pesoCoin - 55;
                        GameData[0].quizWordThree = true;
                        GameData[0].heart = GameData[0].heart + 8;
                        this.setState({pesoCoin: GameData[0].pesoCoin, heartCoin: GameData[0].heart,
                            WordLevelThreeLocked: !GameData[0].quizWordThree});
                    });
                    this.tada(0);
                } else {
                    this.setMessageLevel3(1);
                    this.tada(4);
                }
                
            } else {
                this.setMessageLevel3(2);
                this.tada(4);
            }
        }
    }


    nextLevelPressed = ()=> {
        this.soundPress.play();
        this.setState({prevLevel: false, nextLevel: true})
    }

    prevLevelPressed = ()=> {
        this.soundPress.play();
        this.setState({prevLevel: true, nextLevel: false})
    }

    render() {
        StatusBar.setHidden(true);
        return (
        <ImageBackground source={ChalkBoard} style={{flex: 1}}>
            <View style={style.backView}>
                    <Image source={ChalkBoard} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                    </Image>
            </View>

            <Image source={this.state.titleScreen} style={this.state.titleScreen == SubokScreen ? {
                position: 'absolute', bottom: '5%', left: '3.5%', width: '15%', height: '8%', resizeMode: 'contain',
                
            } : this.state.titleScreen == PagbaybayScreen ? {
                position: 'absolute', bottom: '5%', left: '2.5%', width: '20%', height: '10%', resizeMode: 'contain',

            } : this.state.titleScreen == PagbasaScreen ? {
                position: 'absolute', bottom: '5%', left: '0.5%', width: '20%', height: '10%', resizeMode: 'contain',

            } : {
                position: 'absolute', bottom: '6%', left: '1%', width: '15%', height: '8%', resizeMode: 'contain',
            }}></Image>

            {this.state.showLevelTitle &&
                <Image source={this.state.levelTitle} style={{
                    position: 'absolute', bottom: '5%', right: '3%', width: '17%', height: '10%', resizeMode: 'contain',
                    //position: 'absolute', bottom: '6%', right: '3%', width: '12.5%', height: '8%', resizeMode: 'contain',
                }}></Image>
            }

            {/* Peso Coins */}
            <View style={style.CoinBankStyle}> 
                <Image source={CoinContainer} style={style.CoinContainerStyle}>
                </Image>
                <Image source={CoinIcon} style={style.CoinStyle}>
                </Image>
                {this.state.modeMenu &&
                    <View style={style.pesoCoin}>
                        <Text style={{
                            color: 'white',
                            fontSize: screenWidth * 0.025,
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}>{this.state.pesoCoin}</Text>
                    </View>
                }
            </View>

            {/* Heart Icon */}
            { this.state.modeMenu &&
                <View style={[style.CoinBankStyle, {top: '20%'}]}> 
                    <Image source={CoinContainer} style={style.CoinContainerStyle}>
                    </Image>
                    <Image source={BlueHeartIcon} style={style.HeartStyle}>
                    </Image>
                    {this.state.modeMenu &&
                        <View style={style.pesoCoin}>
                            <Text style={{
                                color: 'white',
                                fontSize: screenWidth * 0.025,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}>{this.state.heartCoin}</Text>
                        </View>
                    }
                </View>
            }
            
            {/* Back to Home Button */}
            <TouchableOpacity style={style.BackStyle} onPress={this.gotoHome}>
                <Image source={BackIcon} style={style.SettingIconStyle}>
                </Image>
            </TouchableOpacity>

            {/* Script List Button */}
            {this.state.scriptsHidden &&
                <TouchableOpacity style={style.scriptBtn} onPress={this.scriptsPressed}>
                    <Image source={SciptsButton} style={style.CoinContainerStyle}>
                    </Image>
                </TouchableOpacity>
            }

            { this.state.modeMenu && 
                <View style={style.middleBtnView}>
                    <TouchableOpacity style={style.middleBtn} onPress={this.letterPressed}> 
                        <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                        </Image>
                        <Image source={this.state.language == 'Filipino' ? Letra : Letter} style={this.state.language == 'Filipino' ? {
                            position: 'absolute',
                            top: '15%',
                            left: '15%',
                            width: '70%',
                            height: '70%',
                            resizeMode: 'contain',
                        } : {
                            position: 'absolute',
                            top: '15%',
                            left: '22.5%',
                            width: '55%',
                            height: '70%',
                            resizeMode: 'contain',
                        }}></Image>
                    </TouchableOpacity>
                    <View style={{width: '5%', height: '100%'}}></View>
                    <TouchableOpacity disabled={this.state.wordModeLocked} style={style.middleBtn} onPress={this.wordPressed}> 
                        <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                        </Image>
                        <Image source={this.state.language == 'Filipino' ? Salita : Word} style={this.state.language == 'Filipino' ? {
                            position: 'absolute',
                            top: '15%',
                            left: '15%',
                            width: '70%',
                            height: '70%',
                            resizeMode: 'contain',
                        } : {
                            position: 'absolute',
                            top: '15%',
                            left: '22.5%',
                            width: '55%',
                            height: '70%',
                            resizeMode: 'contain',
                        }}></Image>
                        {this.state.wordModeLocked &&
                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                <Image source={LockedLevel} style={{ position: 'absolute', top: '-1.5%', left: '-1%',
                                    width: '102%', height: '103%', resizeMode: 'stretch'}}>
                                </Image>

                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', right: '11.5%',
                                    width: '12.5%', height: '21%', resizeMode: 'stretch'}}>
                                </Image>
                                
                                <TouchableOpacity style={{ position: 'absolute', top: '70%', right: '0%', 
                                    width: '30%', height: '30%', }} onPress={this.unlockWordMode}> 
                                    <Animatable.View style={{wdith: '100%', height: '100%'}} animation={this.state.tada5}>
                                        <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={CoinIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{ color: 'white', fontSize: screenWidth * 0.02,
                                                justifyContent: 'center', alignContent: 'center', }}>55</Text>
                                        </View>
                                    </Animatable.View>
                                </TouchableOpacity>
                            </View>
                        }

                            <Text numberOfLines={3} style={{
                                position: 'absolute',
                                bottom: '-35%',
                                left: '0%',
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: '100%',
                                fontSize: screenWidth * 0.016,
                                color: 'white',
                            }}>{!this.state.wordMode ? this.state.setMessageLevel3: ''}</Text>

                    </TouchableOpacity>
                </View>
            }

            { this.state.ScriptLevelOne &&
                <ScriptLevelOne />
            }

            { this.state.ScriptLevelTwo &&
                <ScriptLevelTwo />
            }

            { this.state.ScriptLevelThree &&
                <ScriptLevelThree />
            }

            { this.state.WordLevelOne &&
                <WordLevelOne />
            }

            { this.state.WordLevelTwo &&
                <WordLevelTwo />
            }

            { this.state.WordLevelThree &&
                <WordLevelThree />
            }

            { this.state.storeMenu &&
                <TouchableOpacity style={[style.SideMenuStyle, {top: '60%'}]} 
                    onPress={this.storePressed}> 
                    <Image source={MenuContainer} style={style.ImageStyle}>
                    </Image>
                    <Image source={StoreIcon} style={{
                        width: '60%', height: '50%', position: 'absolute', top: '25%', left: '20%', resizeMode: 'contain'
                    }}></Image>
                </TouchableOpacity>
            }

            { this.state.store &&
                <View style={{
                    position: 'absolute',
                    top: '0%',
                    width: '100%',
                    height: '100%',
                }}>
                    <TouchableWithoutFeedback style={{
                        position: 'absolute',
                        top: '0%',
                        width: '100%',
                        height: '100%',
                    }}
                        onPress={this.menuClosePressed}> 
                        <View style={style.background}></View>
                    </TouchableWithoutFeedback>

                    <Store />

                    {/* Exit Menu Icon Button */}
                    <View style={{
                        position: 'absolute',
                        top: '12.5%',
                        right: '17%',
                        width: '6%',
                        height: '8%',
                    }}>
                        {/* Exit Menu Icon Button */}
                        <TouchableOpacity onPress={this.menuClosePressed}>
                            <Image source={ExitIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            

            {/* Scripts List Button Pressed */}
            { this.state.scripts && 
                <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                    <TouchableWithoutFeedback onPress={this.scriptsClosePressed}>
                        <View style={style.background}>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Baybayin Script List Frame */}
                    <BaybayinScripts />

                    {/* Script List Exit Icon */}
                    <View style={style.ExitIcon}>
                        <TouchableOpacity onPress={this.scriptsClosePressed}>
                            <Image source={ExitIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            }

            {/* Show Quiz Mode Menu Levels */}
            {this.state.showMode &&
                <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                    <TouchableWithoutFeedback style={style.background} onPress={this.closeMode}>
                        <View style={style.background}></View>
                    </TouchableWithoutFeedback>
                    <View style={{ position: 'absolute', top: '15%', left: '25%', width: '50%', height: '70%', }}>
                        <Image source={MenuFrame} style={style.image}>
                        </Image>
                        <Image source={this.state.modePicked} style={style.titleFrame}></Image>

                        { this.state.noHeartLeft && 
                            <View style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                            }}>
                                <Text numberOfLines={3} style={{
                                    position: 'absolute',
                                    top: '22.5%',
                                    left: '5%',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    width: '90%',
                                    fontSize: screenWidth * 0.03,
                                    color: 'white',
                                }}>{this.state.noBlueHeartMessage}</Text>

                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    bottom: '12.5%',
                                    left: '40%',
                                    width: '20%',
                                    height: '20%',
                                }} 
                                    onPress={this.storePressed}> 
                                    <Image source={MenuContainer} style={style.ImageStyle}>
                                    </Image>
                                    <Image source={StoreIcon} style={{
                                        width: '75%', height: '75%', position: 'absolute', 
                                        top: '12.5%', left: '12.5%', resizeMode: 'contain'
                                    }}></Image>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* Script Mode */}
                        { this.state.letterMode &&
                            <View style={style.levelMode}>

                                {/* Prev Script Level, One Two */}
                                {this.state.prevLevel &&
                                    <View style={style.containerCenter}>
                                        <TouchableOpacity style={{ position: 'absolute', top: '2.5%', left: '15%', width: '70%', height: '45%', }} 
                                            onPress={this.LevelOnePressed}> 
                                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada6}>
                                                <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                                                </Image>
                                                <Image source={Level1} style={style.middleTitle}></Image>
                                            </Animatable.View>
                                        </TouchableOpacity>
                                        <View style={{width: '5%', height: '100%'}}></View>

                                        <TouchableOpacity disabled={this.state.ScriptLevelTwoLocked} style={{ position: 'absolute', top: '52.5%', 
                                            left: '15%', width: '70%', height: '45%', }} 
                                            onPress={this.LevelTwoPressed}> 
                                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada7}>
                                                <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                                                </Image>
                                                <Image source={Level2} style={style.middleTitle}></Image>
                                            </Animatable.View>
                                            
                                            {/* If Script Level Two is locked */}
                                            {this.state.ScriptLevelTwoLocked &&
                                                <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                    <Image source={LockedLevel} style={{ position: 'absolute', top: '-1.5%', left: '-1%',
                                                        width: '102%', height: '104%', resizeMode: 'stretch'}}>
                                                    </Image>

                                                    <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                        width: '12.5%', height: '30%', resizeMode: 'stretch'}}>
                                                    </Image>
                                                    
                                                    <TouchableOpacity style={{ position: 'absolute', top: '60%', right: '0%', 
                                                        width: '30%', height: '40%', }} onPress={this.unlockModeLevelTwo}> 
                                                        <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada}>
                                                            <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                            </Image>
                                                            <Image source={CoinIcon} style={style.CoinStyle}>
                                                            </Image>
                                                            {this.state.modeMenu &&
                                                                <View style={style.pesoCoin}>
                                                                    <Text style={{ color: 'white', fontSize: screenWidth * 0.018,
                                                                        justifyContent: 'center', alignContent: 'center', }}>25</Text>
                                                                </View>
                                                            }
                                                        </Animatable.View>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                }

                                {/* Next Button, Mode Levels */}
                                {this.state.prevLevel &&
                                    <TouchableOpacity style={{right: '-15%', bottom: '0%', position: 'absolute', 
                                        width: '17.5%', height: '17.5%'}}
                                        onPress={this.nextLevelPressed}>
                                        <Image source={NextIcon} style={style.ImageStyle}></Image>
                                    </TouchableOpacity>
                                }

                                {/* Prev Button, Mode Levels */}
                                {this.state.nextLevel &&
                                    <TouchableOpacity style={{left: '-15%', bottom: '0%', position: 'absolute', 
                                        width: '17.5%', height: '17.5%'}}
                                        onPress={this.prevLevelPressed}>
                                        <Image source={PrevIcon} style={style.ImageStyle}></Image>
                                    </TouchableOpacity>
                                }

                                {/* Script Next Level, Three */}
                                {this.state.nextLevel && 
                                
                                    <View style={{position: 'absolute', top: '0%', width: '100%', height: '100%'}}>
                                        <TouchableOpacity disabled={this.state.ScriptLevelThreeLocked} style={{ position: 'absolute', top: '17.5%', width: '70%', 
                                            left: '15%', height: '45%', }} 
                                            onPress={this.LevelThreePressed}> 
                                            <Animatable.View style={{width:'100%', height: '100%'}} animation={this.state.tada8}>
                                                <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                                                </Image>
                                                <Image source={Level3} style={style.middleTitle}></Image>
                                            </Animatable.View>
                                            
                                            {/* If Script Level Three is locked */}
                                            {this.state.ScriptLevelThreeLocked &&
                                                <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                    <Image source={LockedLevel} style={{ position: 'absolute', top: '-1.5%', left: '-1%',
                                                        width: '102%', height: '104%', resizeMode: 'stretch'}}>
                                                    </Image>

                                                    <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                        width: '12.5%', height: '30%', resizeMode: 'stretch'}}>
                                                    </Image>
                                                    
                                                    <TouchableOpacity style={{ position: 'absolute', top: '60%', right: '0%', 
                                                        width: '30%', height: '40%', }} onPress={this.unlockModeLevelThree}> 
                                                        <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada2}>
                                                            <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                            </Image>
                                                            <Image source={CoinIcon} style={style.CoinStyle}>
                                                            </Image>
                                                            <View style={style.pesoCoin}>
                                                                <Text style={{ color: 'white', fontSize: screenWidth * 0.018,
                                                                    justifyContent: 'center', alignContent: 'center', }}>35</Text>
                                                            </View>
                                                        </Animatable.View>
                                                    </TouchableOpacity>
                                                    <Text style={{
                                                        position: 'absolute',
                                                        textAlign: 'center',
                                                        bottom: '-37.5%',
                                                        left: '-5%',
                                                        width: '110%',
                                                        fontSize: screenWidth * 0.015,
                                                        color: 'white',
                                                    }} numberOfLines={2}>{this.state.setMessageLevel3}</Text>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        }

                        {/* Word Mode Pressed */}
                        { this.state.wordMode &&
                            <View style={style.levelMode}>

                                {/* Prev Script Level, One Two */}
                                {this.state.prevLevel &&
                                    <View style={style.containerCenter}>
                                        <TouchableOpacity style={{ position: 'absolute', top: '2.5%', left: '15%', width: '70%', height: '45%', }} 
                                            onPress={this.LevelOnePressed}> 
                                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada9}>
                                                <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                                                </Image>
                                                <Image source={Level1} style={style.middleTitle}></Image>
                                            </Animatable.View>
                                        </TouchableOpacity>
                                        <View style={{width: '5%', height: '100%'}}></View>

                                        <TouchableOpacity disabled={this.state.WordLevelTwoLocked} style={{ position: 'absolute', top: '52.5%', 
                                            left: '15%', width: '70%', height: '45%', }} 
                                            onPress={this.LevelTwoPressed}> 
                                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada10}>
                                                <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                                                </Image>
                                                <Image source={Level2} style={style.middleTitle}></Image>
                                            </Animatable.View>
                                            
                                            {/* If Script Level Two is locked */}
                                            {this.state.WordLevelTwoLocked &&
                                                <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                    <Image source={LockedLevel} style={{ position: 'absolute', top: '-1.5%', left: '-1%',
                                                        width: '102%', height: '104%', resizeMode: 'stretch'}}>
                                                    </Image>

                                                    <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                        width: '12.5%', height: '30%', resizeMode: 'stretch'}}>
                                                    </Image>
                                                    
                                                    <TouchableOpacity style={{ position: 'absolute', top: '60%', right: '0%', 
                                                        width: '30%', height: '40%', }} onPress={this.unlockModeLevelTwo}> 
                                                        <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada3}>
                                                            <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                            </Image>
                                                            <Image source={CoinIcon} style={style.CoinStyle}>
                                                            </Image>
                                                            <View style={style.pesoCoin}>
                                                                <Text style={{ color: 'white', fontSize: screenWidth * 0.018,
                                                                    justifyContent: 'center', alignContent: 'center', }}>45</Text>
                                                            </View>
                                                        </Animatable.View>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                }

                                {/* Next Button, Mode Levels */}
                                {this.state.prevLevel &&
                                    <TouchableOpacity style={{right: '-15%', bottom: '0%', position: 'absolute', 
                                        width: '17.5%', height: '17.5%'}}
                                        onPress={this.nextLevelPressed}>
                                        <Image source={NextIcon} style={style.ImageStyle}></Image>
                                    </TouchableOpacity>
                                }

                                {/* Prev Button, Mode Levels */}
                                {this.state.nextLevel &&
                                    <TouchableOpacity style={{left: '-15%', bottom: '0%', position: 'absolute', 
                                        width: '17.5%', height: '17.5%'}}
                                        onPress={this.prevLevelPressed}>
                                        <Image source={PrevIcon} style={style.ImageStyle}></Image>
                                    </TouchableOpacity>
                                }

                                {/* Script Next Level, Three */}
                                {this.state.nextLevel && 
                                
                                    <View style={{position: 'absolute', top: '0%', width: '100%', height: '100%'}}>
                                        <TouchableOpacity disabled={this.state.WordLevelThreeLocked} style={{ position: 'absolute', top: '17.5%', width: '70%', 
                                            left: '15%', height: '45%', }} 
                                            onPress={this.LevelThreePressed}> 
                                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada11}>
                                                <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                                                </Image>
                                                <Image source={Level3} style={style.middleTitle}></Image>
                                            </Animatable.View>
                                            
                                            {/* If Script Level Three is locked */}
                                            {this.state.WordLevelThreeLocked &&
                                                <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                    <Image source={LockedLevel} style={{ position: 'absolute', top: '-1.5%', left: '-1%',
                                                        width: '102%', height: '104%', resizeMode: 'stretch'}}>
                                                    </Image>

                                                    <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                        width: '12.5%', height: '30%', resizeMode: 'stretch'}}>
                                                    </Image>
                                                    
                                                    <TouchableOpacity style={{ position: 'absolute', top: '60%', right: '0%', 
                                                        width: '30%', height: '40%', }} onPress={this.unlockModeLevelThree}> 
                                                        <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada4}>
                                                            <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                            </Image>
                                                            <Image source={CoinIcon} style={style.CoinStyle}>
                                                            </Image>
                                                            <View style={style.pesoCoin}>
                                                                <Text style={{ color: 'white', fontSize: screenWidth * 0.018,
                                                                    justifyContent: 'center', alignContent: 'center', }}>55</Text>
                                                            </View>
                                                        </Animatable.View>
                                                    </TouchableOpacity>
                                                    <Text style={{
                                                        position: 'absolute',
                                                        textAlign: 'center',
                                                        bottom: '-37.5%',
                                                        left: '-5%',
                                                        width: '110%',
                                                        fontSize: screenWidth * 0.015,
                                                        color: 'white',
                                                    }} numberOfLines={2}>{this.state.setMessageLevel3}</Text>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        }
                        <TouchableOpacity style={style.ExitStyle} onPress={this.closeMode}>
                            <Image source={ExitIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            { this.state.showInGameMessage && 
                <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                    <TouchableWithoutFeedback style={style.background}>
                        <View style={style.background}></View>
                    </TouchableWithoutFeedback>
                    <View style={{ position: 'absolute', top: '15%', left: '25%', 
                    width: '50%', height: '60%', justifyContent: 'center'}}>
                        <Image source={MenuFrame} style={style.image}>
                        </Image>
                    <Text numberOfLines={3} style={style.inGameMessage}>{this.state.setInGameMessage}</Text>
                    </View>

                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: '32.5%',
                        right: '36.25%',
                        width: '8%',
                        height: '12.5%',
                    }} onPress={this.confirmedBackQuizMennu}>
                        <Image source={MenuContainer} style={[style.ImageStyle, {resizeMode: 'stretch'}]}>
                        </Image>
                        <Image source={OkayIcon} style={[style.ImageStyle, style.confirmBtn]}>
                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: '32.5%',
                        left: '36.25%',
                        width: '8%',
                        height: '12.5%',
                    }} onPress={this.closeMessage}>
                        <Image source={MenuContainer} style={[style.ImageStyle, {resizeMode: 'stretch'}]}>
                        </Image>
                        <Image source={ExitIcon} style={[style.ImageStyle, style.confirmBtn]}>
                        </Image>
                    </TouchableOpacity>
                </View>
            }


            { this.state.closeMessage && 
                <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                    <TouchableWithoutFeedback style={style.background} onPress={this.closeMessage}>
                        <View style={style.background}></View>
                    </TouchableWithoutFeedback>
                    <View style={{ position: 'absolute', top: '15%', left: '25%', 
                    width: '50%', height: '60%', justifyContent: 'center'}}>
                        <Image source={MenuFrame} style={style.image}>
                        </Image>
                        <Text numberOfLines={3} style={{
                            position: 'absolute',
                            top: '25%',
                            left: '5%',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '90%',
                            fontSize: screenWidth * 0.032,
                            color: 'white',
                        }}>{this.state.lostMessage}</Text>
                    </View>

                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: '30%',
                        left: '46%',
                        width: '8%',
                        height: '12.5%',
                    }} onPress={this.closeMessage}>
                        <Image source={CoinContainer} style={[style.ImageStyle, {resizeMode: 'stretch'}]}>
                        </Image>
                        <Image source={OkayIcon} style={[style.ImageStyle, {
                            position: 'absolute', 
                            width: '70%', 
                            height:'70%',
                            top: '15%',
                            left: '15%',
                        }]}>
                        </Image>
                    </TouchableOpacity>
                </View>
            }


            { this.state.firstQuiz && 
                <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                    <TouchableWithoutFeedback style={style.background}>
                        <View style={style.background}></View>
                    </TouchableWithoutFeedback>
                    <View style={{ position: 'absolute', top: '15%', left: '25%', 
                    width: '50%', height: '70%', justifyContent: 'center'}}>
                        <Image source={MenuFrame} style={style.image}>
                        </Image>
                        <Text numberOfLines={7} style={{
                            position: 'absolute',
                            top: '20%',
                            left: '5%',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '90%',
                            fontSize: screenWidth * 0.022,
                            color: 'white',
                        }}>{this.state.language == 'Filipino' ? 
                        'Maligayang Bati!\n\nDito masusukat kung gaano mo na kabisado ang sulating Baybayin!\nBawat baitang ay may katumbas na Asul na Puso upang maka pasok rito.' 
                        : 'Welcome!\n\nHere you can measure how well you know the ancient script, Baybayin!\nEach level is equivalent to 1 to 3 \nBlue Hearts.'}</Text>
                    </View>
                    
                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '46%',
                        width: '8%',
                        height: '10%',
                    }} onPress={this.closeMessage}>
                        <Image source={CoinContainer} style={[style.ImageStyle, {resizeMode: 'stretch'}]}>
                        </Image>
                        <Image source={OkayIcon} style={[style.ImageStyle, {
                            position: 'absolute', 
                            width: '70%', 
                            height:'70%',
                            top: '15%',
                            left: '15%',
                        }]}>
                        </Image>
                    </TouchableOpacity>
                </View>
            }

        </ImageBackground>
        );
    }
}

const style = StyleSheet.create({
    inGameMessage: {
        position: 'absolute',
        top: '25%',
        left: '5%',
        justifyContent: 'center',
        textAlign: 'center',
        width: '90%',
        fontSize: screenWidth * 0.035,
        color: 'white',
    },
    confirmBtn: {
        position: 'absolute', 
        width: '60%', 
        height:'60%',
        top: '20%',
        left: '20%',
    },
    SideMenuStyle: {
        position: 'absolute',
        top: '25%',
        right: '4.3%',
        width: '10%',
        height: '20%',
    },
    containerCenter: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    pesoCoin: {
        position: 'absolute',
        top: '-3%',
        left: '35%',
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    titleFrame: {
        position: 'absolute',
        top: '0.75%',
        left: '22.5%',
        width: '55%',
        height: '15%',
        resizeMode: 'stretch',
    },
    ExitStyle: {
        position: 'absolute',
        top: '3.5%',
        right: '4%',
        width: '6%',
        height: '9%',
    },
    levelMode: {
        position: 'absolute',
        top: '22.5%',
        left: '15%',
        width: '70%',
        height: '70%',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    middleBtn: {
        width: '35%',
        height: '100%',
    },
    middleTitle: {
        position: 'absolute',
        top: '15%',
        left: '22.5%',
        width: '55%',
        height: '70%',
        resizeMode: 'contain',
    },
    middleBtnView: {
        position: 'absolute',
        top: '32.5%',
        left: '10%',
        height: '35%',
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
    },
    menu: {
        position: 'absolute',
        top: '25%',
        left: '20%',
        width: '50%',
        height: '50%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    scriptNextPrevBtn: {
        position: 'absolute',
        bottom: '5%',
        width: '20%',
        height: '20%',
    },
    scriptListRow: {
//        borderWidth: 1,
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    scriptList: {
        position: 'absolute',
        top: '5%',
        left: '10%',
        flexDirection: 'row',
//        borderWidth: 1,
        width: '80%',
        height: '90%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
    },
    scriptListContainer: {
        position: 'absolute',
        top: '16%',
        left: '2%',
        width: '96%',
        height: '80%',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    scriptIcon: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    scriptBtn: {
        position: 'absolute',
        bottom: '6%',
        right: '3%',
        width: '12.5%',
        height: '12.5%',
    },
    background: {
        position: 'absolute',
        top: '0%',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ExitIcon: {
        position: 'absolute',
        top: '12.5%',
        right: '17%',
        width: '6%',
        height: '8%',
    },
    menu: {
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '70%',
        height: '80%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    BaybayinStyle: {
        position: 'absolute',
        top: '15%',
        left: '25%',
        width: '50%',
        height: '70%',
    },
    CoinBankStyle: {
        position: 'absolute',
        top: '6%',
        right: '3%',
        width: '12.5%',
        height: '12.5%',
    },
    CoinStyle: {
        position: 'absolute',
        top: '30%',
        left: '15%',
        width: '25%',
        height: '40%',
        resizeMode: 'contain',
    },
    HeartStyle: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        width: '35%',
        height: '42.5%',
        resizeMode: 'contain',
    },
    CoinContainerStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    BackStyle: {
        position: 'absolute',
        top: '6%',
        left: '2%',
        width: '10%',
        height: '15%',
    },
    SettingIconStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default withNavigation(GameScreen);