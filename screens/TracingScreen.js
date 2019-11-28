import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, BackHandler, AppState,
    Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { withNavigation } from 'react-navigation';

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';
import CoinIcon from './images/Coin-icon.png';
import BackIcon from './images/Back-Icon.png';
import Eraser from './images/ERASER.png';
import ExitIcon from './images/Exit-Icon.png';
import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';
import MenuIcon from './images/MenuIcon.png';

import SciptsButton from './images/ScriptsButton.png';
import BaybayinFrame from './images/Baybayin-Frame.png';

import LockedLevel from './images/LockedMenuIcon.png';
import LockIcon from './images/Lock-icon.png';

import TracingA from './tracing/tracingA';
import TracingEI from './tracing/tracingEI';
import TracingOU from './tracing/tracingOU';
import TracingBA from './tracing/tracingBA';
import TracingKA from './tracing/tracingKA';
import TracingDA from './tracing/tracingDA';
import TracingGA from './tracing/tracingGA';
import TracingHA from './tracing/tracingHA';
import TracingLA from './tracing/tracingLA';
import TracingMA from './tracing/tracingMA';
import TracingNA from './tracing/tracingNA';
import TracingNGA from './tracing/tracingNGA';
import TracingPA from './tracing/tracingPA';
import TracingSA from './tracing/tracingSA';
import TracingTA from './tracing/tracingTA';
import TracingWA from './tracing/tracingWA';
import TracingYA from './tracing/tracingYA';

const tracingScript = [TracingA, TracingEI, TracingOU, TracingBA, TracingKA, TracingDA, TracingGA, TracingHA, TracingLA,
    TracingMA, TracingNA, TracingNGA, TracingPA, TracingSA, TracingTA, TracingWA, TracingYA];

import A from './images/scripts/A.png';
import EI from './images/scripts/EI.png';
import OU from './images/scripts/OU.png';
import BA from './images/scripts/BA.png';
import KA from './images/scripts/KA.png';
import DA from './images/scripts/DA.png';
import GA from './images/scripts/GA.png';
import HA from './images/scripts/HA.png';
import LA from './images/scripts/LA.png';
import MA from './images/scripts/MA.png';
import NA from './images/scripts/NA.png';
import NGA from './images/scripts/NGA.png';
import PA from './images/scripts/PA.png';
import SA from './images/scripts/SA.png';
import TA from './images/scripts/TA.png';
import WA from './images/scripts/WA.png';
import YA from './images/scripts/YA.png';

import script_A from './images/planeScripts/script_A.png';
import script_EI from './images/planeScripts/script_EI.png';
import script_OU from './images/planeScripts/script_OU.png';
import script_BA from './images/planeScripts/script_BA.png';
import script_KA from './images/planeScripts/script_KA.png';
import script_DA from './images/planeScripts/script_DARA.png';
import script_GA from './images/planeScripts/script_GA.png';
import script_HA from './images/planeScripts/script_HA.png';
import script_LA from './images/planeScripts/script_LA.png';
import script_MA from './images/planeScripts/script_MA.png';
import script_NA from './images/planeScripts/script_NA.png';
import script_NGA from './images/planeScripts/script_NGA.png';
import script_PA from './images/planeScripts/script_PA.png';
import script_TA from './images/planeScripts/script_TA.png';
import script_WA from './images/planeScripts/script_WA.png';
import script_YA from './images/planeScripts/script_YA.png';
import script_SA from './images/planeScripts/script_SA.png';

import whiteTrace from './images/tracedScripts/trace_White.png';
import blueTrace from './images/tracedScripts/trace_Blue.png';
import redTrace from './images/tracedScripts/trace_Red.png';
import yellowTrace from './images/tracedScripts/trace_Yellow.png';

import MenuContainer from './images/MenuIcon.png';

import Tracing from './images/Tracing.png';
import Sound from 'react-native-sound';

import { sound, error, success, soundPress } from './introScreen';

const screenWidth = Dimensions.get('screen').width;
var Realm = require('realm');
let realm;

const romanList = [script_A, script_EI, script_OU, script_BA, script_KA, script_DA, script_GA, script_HA, script_LA, script_MA, script_NA,
        script_NGA, script_PA, script_SA, script_TA, script_WA, script_YA,];



class TracingScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    scriptsPressed = () => {
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({scripts: this.state.scripts ? false : true});
    }
    scriptsClosePressed = () => {
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({scripts: this.state.scripts ? false : true});
        this.setState({firstScripts: true, 
            secondScripts: false});
    }

    constructor() {
        super();
        this.state = {
            scripts: false,
            firstScripts: true,
            secondScripts: false,
            nextTraced: true,
            prevTraced: true,
            tracingScript: tracingScript[0],
            traceIndex: 0,
            roman: romanList[0],
            toTraceScripts: true, 
            lockScript1: true,
            lockScript2: true,
            lockScript3: true,
            lockScript4: true,
            lockScript5: true,
            lockScript6: true,
            lockScript7: true,
            lockScript8: true,
            lockScript9: true,
            lockScript10: true,
            colorTrace: null,
            appState: AppState.cuurentState,
        }

        this.scriptList = [true, true, true, true, true, true, true, false, false, false, false, false,
            false, false, false, false, false,];

        this.index = 0;
        this.traceIndex = 0;
        this.traceColorList = [whiteTrace, yellowTrace, blueTrace, redTrace];
        this.colorList =[true, false, false, false];
        this.soundPress = soundPress;
        this.success = success;
        this.error = error;
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
                this.setState({pesoCoin: GameData[0].pesoCoin, lockScript1: !GameData[0].script1
                    , lockScript2: !GameData[0].script2 , lockScript3: !GameData[0].script3
                    , lockScript4: !GameData[0].script4 , lockScript5: !GameData[0].script5
                    , lockScript6: !GameData[0].script6 , lockScript7: !GameData[0].script7
                    , lockScript8: !GameData[0].script8 , lockScript9: !GameData[0].script9
                    , lockScript10: !GameData[0].script10, 
                    colorTrace: this.traceColorList[GameData[0].traceColorIndex]});
                this.scriptList[7] = GameData[0].script1;
                this.scriptList[8] = GameData[0].script2;
                this.scriptList[9] = GameData[0].script3;
                this.scriptList[10] = GameData[0].script4;
                this.scriptList[11] = GameData[0].script5;
                this.scriptList[12] = GameData[0].script6;
                this.scriptList[13] = GameData[0].script7;
                this.scriptList[14] = GameData[0].script8;
                this.scriptList[15] = GameData[0].script9;
                this.scriptList[16] = GameData[0].script10;
                    this.colorList[1] = GameData[0].chalkYellow;
                    this.colorList[2] = GameData[0].chalkBlue;
                    this.colorList[3] = GameData[0].chalkRed;
                    this.traceIndex = GameData[0].traceColorIndex;

                    if(GameData[0].unlockTraceMode) {
                        sound.stop();
                        sound.play();
                        sound.setVolume(0.3);
                    } else {
                        sound.setVolume(0);
                        sound.stop();
                    }
                    sound.setNumberOfLoops(-1);
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
            sound.stop();
            sound.play(); 
        } else {
            sound.stop();
        }
        this.setState({appState: nextAppState});
    }

    goBack = async () => {
        this.soundPress.stop();
        this.soundPress.play();
        this.props.navigation.replace('Home');
    }

    changeTraceColor = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        for(i = GameData[0].traceColorIndex + 1; i <= 4; i++) {
            if(i >= 4) {
                realm.write(()=> {
                    GameData[0].traceColorIndex = 0;
                });
                this.setState({colorTrace: whiteTrace,});
                break;
            } else {
                if(this.colorList[i]) {
                    realm.write(()=> {
                        GameData[0].traceColorIndex = i;
                    });
                    this.setState({colorTrace: this.traceColorList[i],});
                    break;
                }
            }
        }
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({toTraceScripts: false});
        setTimeout(()=>{
            this.setState({toTraceScripts: true});
        }, 50);
    }

    scriptPicked = (index) => {
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({tracingScript: tracingScript[index], traceIndex: index, roman: romanList[index]});
        this.scriptsClosePressed();
    }

    nextScriptListPressed = () => {
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({firstScripts: this.state.firstScripts ? false : true, 
            secondScripts: this.state.secondScripts ? false : true});
    }

    nextTracePressed = () => {
        this.index = this.state.traceIndex + 1;
        while(!this.scriptList[this.index]) {
            this.index++;
            if(this.index > 16) {
                this.index = 0;
                break;
            }
        }

        if(this.index >= 16) {
            this.setState({tracingScript: tracingScript[0], traceIndex: 0, roman: romanList[0],});
        } else {
            let index2 = this.index;
            this.setState({tracingScript: tracingScript[index2], traceIndex: index2, roman: romanList[index2],});
        }
        this.soundPress.stop();
        this.soundPress.play();
        //this.closeNextPrevBtn();
    }

    prevTracePressed = () => {
        this.index = this.state.traceIndex - 1;
        while(!this.scriptList[this.index]) {
            this.index--;
            if(this.index < 0) {
                
                break;
            }
        }
        if(this.index < 0) {
            this.index = 16;
            while(!this.scriptList[this.index]) {
                this.index--;
            }
        }
        if(this.index == 0) {
            if(!this.scriptList[this.index]) {
                this.index = 16;
                while(!this.scriptList[this.index]) {
                    this.index--;
                }
            }
            this.setState({tracingScript: tracingScript[this.index], traceIndex: this.index, roman: romanList[this.index],});
        } else {
            let index2 = this.index;
            this.setState({tracingScript: tracingScript[index2], traceIndex: index2, roman: romanList[index2],});
        }
        this.soundPress.stop();
        this.soundPress.play();
        //this.closeNextPrevBtn();
    }

    closeNextPrevBtn = () => {
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({prevTraced: false, nextTraced: false, });
    }

    clearTrace = () => {
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({toTraceScripts: false,});
        setTimeout(()=> {
            this.setState({toTraceScripts: true,});
        }, 50);
    }

    gotoHome = () => {
        sound.play();
        this.soundPress.stop();
        this.soundPress.play();
        this.props.navigation.replace('Home');
    }


    unlockScript = (index) => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        let realm2 = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm2.objects('AchieveData');
        
        if(index == 7 && GameData[0].pesoCoin >= 10) {
            realm.write(()=> {
                GameData[0].script1 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 10;
                this.setState({lockScript1: !GameData[0].script1, pesoCoin: GameData[0].pesoCoin});
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        } 
        
        
        if(index == 8 && GameData[0].pesoCoin >= 15) {
            realm.write(()=> {
                GameData[0].script2 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 15;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript2: !GameData[0].script2, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        } 
        
        if(index == 9 && GameData[0].pesoCoin >= 15) {
            realm.write(()=> {
                GameData[0].script3 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 15;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript3: !GameData[0].script3, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }

        if(index == 10 && GameData[0].pesoCoin >= 15) {
            realm.write(()=> {
                GameData[0].script4 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 15;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript4: !GameData[0].script4, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }
        
        if(index == 11 && GameData[0].pesoCoin >= 15) {
            realm.write(()=> {
                GameData[0].script5 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 15;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript5: !GameData[0].script5, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }

        if(index == 12 && GameData[0].pesoCoin >= 10) {
            realm.write(()=> {
                GameData[0].script6 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 10;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript6: !GameData[0].script6, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }

        if(index == 13 && GameData[0].pesoCoin >= 15) {
            realm.write(()=> {
                GameData[0].script7 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 15;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript7: !GameData[0].script7, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }
        
        if(index == 14 && GameData[0].pesoCoin >= 10) {
            realm.write(()=> {
                GameData[0].script8 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 10;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript8: !GameData[0].script8, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }

        if(index == 15 && GameData[0].pesoCoin >= 10) {
            realm.write(()=> {
                GameData[0].script9 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 10;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript9: !GameData[0].script9, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }
        
        if(index == 16 && GameData[0].pesoCoin >= 15) {
            realm.write(()=> {
                GameData[0].script10 = true;
                GameData[0].pesoCoin = GameData[0].pesoCoin - 15;
                GameData[0].traceScripts = GameData[0].traceScripts + 1;
                this.setState({lockScript10: !GameData[0].script10, pesoCoin: GameData[0].pesoCoin});
            });
            this.scriptList[index] = true;
            this.success.stop();
            this.success.play();
        } else {
            this.error.stop();
            this.error.play();
        }

    }

    render() {
        StatusBar.setHidden(true);
        return (
        <ImageBackground source={ChalkBoard} style={{flex: 1}}>
            <View style={style.backView}>
                    <Image source={ChalkBoard} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                    </Image>
            </View>

            <Image source={Tracing} style={{
                position: 'absolute', bottom: '4%', left: '3%', width: '15%', height: '10%', resizeMode: 'contain',
            }}></Image>

            {/* Peso Coins */}
            <View style={style.CoinBankStyle}> 
                <Image source={CoinContainer} style={style.CoinContainerStyle}>
                </Image>
                <Image source={CoinIcon} style={style.CoinStyle}>
                </Image>
                {/* <View style={style.pesoCoin}>
                    <Text style={{
                        color: 'white',
                        fontSize: screenWidth * 0.025,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>{this.state.pesoCoin}</Text>
                </View> */}
            </View>

            {/* Tracing Script */}
            {this.state.toTraceScripts &&
                <this.state.tracingScript />
            }

            
            
            {/* Back to Home Button */}
            <TouchableOpacity style={style.BackStyle} onPress={this.gotoHome}>
                <Image source={BackIcon} style={style.SettingIconStyle}>
                </Image>
            </TouchableOpacity>

            {/* Script List Button */}
            <TouchableOpacity style={style.scriptBtn} onPress={this.scriptsPressed}>
                
                <Image source={SciptsButton} style={style.CoinContainerStyle}>
                </Image>
            </TouchableOpacity>

            <Image source={this.state.roman} style={{
                    position: 'absolute',
                    bottom: '17%',
                    right: '4.5%',
                    width: '10%',
                    height: '10%',
                    resizeMode: 'contain',
                }}>
            </Image>


            {/* Next Trace Pressed */}
            { this.state.nextTraced && 
                <View style={style.backView}>
                    {/* NextTrace Icon */}
                    <TouchableOpacity style={[style.nextPrevTrace, {right: '5%',}]} onPress={this.nextTracePressed}> 
                        <Image source={NextIcon} style={style.CoinContainerStyle}>
                        </Image>
                    </TouchableOpacity>
                </View>
            }

            {/* Prev Trace Pressed */}
            { this.state.prevTraced && 
                <View style={style.backView}>
                    {/* NextTrace Icon */}
                    <TouchableOpacity style={[style.nextPrevTrace, {left: '5%',}]} onPress={this.prevTracePressed}> 
                        <Image source={PrevIcon} style={style.CoinContainerStyle}>
                        </Image>
                    </TouchableOpacity>
                </View>
            }

            <TouchableOpacity style={{
                position: 'absolute',
                bottom: '7%',
                right: '17%',
                width: '6%',
                height: '12%',
            }} onPress={this.clearTrace}>
                <Image source={Eraser} style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                }}></Image>
            </TouchableOpacity>

            {/* Scripts List Button Pressed */}
            { this.state.scripts && 
                <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                    <TouchableWithoutFeedback onPress={this.scriptsClosePressed}>
                    <View style={style.background}>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Baybayin Script List Frame */}
                    <View style={style.menu}>
                        <Image source={BaybayinFrame} style={[style.image, {position: 'absolute'}]}>
                        </Image>

                        {/* Script List, First List*/}
                        { this. state.firstScripts && 
                            <View style={style.scriptListContainer}>
                                <View style={style.scriptList}>
                                    <View style={style.scriptListRow}>
                                        <TouchableOpacity style={{ width: '20%', height: '100%', }} onPress={()=> {
                                            this.scriptPicked(0);
                                        }}>
                                            <Image source={A} style={style.scriptIcon}></Image>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}} onPress={()=> {
                                            this.scriptPicked(1);
                                        }}>
                                            <Image source={EI} style={style.scriptIcon}></Image>
                                        </TouchableOpacity>
                                        
                                        <View style={{ width: '20%', height: '100%', }} >
                                            <TouchableOpacity style={{ width: '100%', height: '100%', }} onPress={()=> {
                                                this.scriptPicked(2);
                                            }}>
                                                <Image source={OU} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View style={[style.scriptListRow,]}>
                                        <TouchableOpacity style={{ width: '20%', height: '100%', }} onPress={()=> {
                                            this.scriptPicked(3);
                                        }}>
                                            <Image source={BA} style={style.scriptIcon}></Image>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}} onPress={()=> {
                                            this.scriptPicked(4);
                                        }}>
                                            <Image source={KA} style={style.scriptIcon}></Image>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: '20%', height: '100%', }} onPress={()=> {
                                            this.scriptPicked(5);
                                        }}>
                                            <Image source={DA} style={style.scriptIcon}></Image>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={style.scriptListRow}>
                                        <TouchableOpacity style={{ width: '20%', height: '100%', }} onPress={()=> {
                                            this.scriptPicked(6);
                                        }}>
                                            <Image source={GA} style={style.scriptIcon}></Image>
                                        </TouchableOpacity>
                                        <View style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>

                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(7);
                                            }}>
                                                <Image source={HA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript1 && 
                                                <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                    <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                        width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                    </Image>

                                                    <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                        width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                    </Image>
                                                    
                                                    <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                        width: '65%', height: '45%', }} onPress={()=>{
                                                            this.unlockScript(7);
                                                        }}> 
                                                        <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                        </Image>
                                                        <Image source={CoinIcon} style={style.CoinStyle}>
                                                        </Image>
                                                        <View style={style.pesoCoin}>
                                                            <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                                justifyContent: 'center', alignContent: 'center', }}>10</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                        
                                        <View style={{ width: '20%', height: '100%',}}>

                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(8);
                                            }}>
                                                <Image source={LA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript2 && 
                                                <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                    <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                        width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                    </Image>

                                                    <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                        width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                    </Image>
                                                    
                                                    <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                        width: '65%', height: '45%', }} onPress={()=>{
                                                            this.unlockScript(8);
                                                        }}> 
                                                        <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                        </Image>
                                                        <Image source={CoinIcon} style={style.CoinStyle}>
                                                        </Image>
                                                        <View style={style.pesoCoin}>
                                                            <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                                justifyContent: 'center', alignContent: 'center', }}>15</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                                {/* First Script, Next Icon */}
                                <TouchableOpacity style={[style.scriptNextPrevBtn, {right: '-3%'}]}
                                    onPress={this.nextScriptListPressed}>
                                    <Image source={NextIcon} style={style.ImageStyle}></Image>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* Script List, Second List*/}
                        { this. state.secondScripts && 
                            <View style={style.scriptListContainer}>
                                <View style={style.scriptList}>
                                    <View style={style.scriptListRow}>

                                    <View style={{ width: '20%', height: '100%',}}>
                                        <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                            this.scriptPicked(9);
                                        }}>
                                        <Image source={MA} style={style.scriptIcon}></Image>
                                        </TouchableOpacity>

                                        { this.state.lockScript3 && 
                                        <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                            <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                            </Image>

                                            <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                            </Image>
                                            
                                            <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                width: '65%', height: '45%', }} onPress={()=>{
                                                    this.unlockScript(9);
                                                }}> 
                                                <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                </Image>
                                                <Image source={CoinIcon} style={style.CoinStyle}>
                                                </Image>
                                                <View style={style.pesoCoin}>
                                                    <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                        justifyContent: 'center', alignContent: 'center', }}>15</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        }
                                    </View>

                                        <View style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>
                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(10);
                                            }}>
                                            <Image source={NA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript4 && 
                                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                    width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                </Image>

                                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                    width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                </Image>
                                                
                                                <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                    width: '65%', height: '45%', }} onPress={()=>{
                                                        this.unlockScript(10);
                                                    }}> 
                                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                    </Image>
                                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                                    </Image>
                                                    <View style={style.pesoCoin}>
                                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                            justifyContent: 'center', alignContent: 'center', }}>15</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        </View>

                                        <View style={{ width: '20%', height: '100%',}}>
                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(11);
                                            }}>
                                            <Image source={NGA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript5 && 
                                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                    width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                </Image>

                                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                    width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                </Image>
                                                
                                                <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                    width: '65%', height: '45%', }} onPress={()=>{
                                                        this.unlockScript(11);
                                                    }}> 
                                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                    </Image>
                                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                                    </Image>
                                                    <View style={style.pesoCoin}>
                                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                            justifyContent: 'center', alignContent: 'center', }}>15</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        </View>
                                    </View>

                                    <View style={[style.scriptListRow,]}>
                                        <View style={{ width: '20%', height: '100%',}}>
                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(12);
                                            }}>
                                            <Image source={PA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript6 && 
                                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                    width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                </Image>

                                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                    width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                </Image>
                                                
                                                <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                    width: '65%', height: '45%', }} onPress={()=>{
                                                        this.unlockScript(12);
                                                    }}> 
                                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                    </Image>
                                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                                    </Image>
                                                    <View style={style.pesoCoin}>
                                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                            justifyContent: 'center', alignContent: 'center', }}>10</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        </View>
                                        <View style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>
                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(13);
                                            }}>
                                            <Image source={SA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript7 && 
                                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                    width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                </Image>

                                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                    width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                </Image>
                                                
                                                <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                    width: '65%', height: '45%', }} onPress={()=>{
                                                        this.unlockScript(13);
                                                    }}> 
                                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                    </Image>
                                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                                    </Image>
                                                    <View style={style.pesoCoin}>
                                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                            justifyContent: 'center', alignContent: 'center', }}>15</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        </View>
                                      
                                        <View style={{ width: '20%', height: '100%', }}>
                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(14);
                                            }}>
                                            <Image source={TA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript8 && 
                                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                    width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                </Image>

                                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                    width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                </Image>
                                                
                                                <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                    width: '65%', height: '45%', }} onPress={()=>{
                                                        this.unlockScript(14);
                                                    }}> 
                                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                    </Image>
                                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                                    </Image>
                                                    <View style={style.pesoCoin}>
                                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                            justifyContent: 'center', alignContent: 'center', }}>10</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        </View>
                                        
                                    </View>

                                    <View style={[style.scriptListRow,]}>
                                        <View style={{ width: '20%', height: '100%', }}>
                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(15);
                                            }}>
                                            <Image source={WA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript9 && 
                                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                    width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                </Image>

                                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                    width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                </Image>
                                                
                                                <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                    width: '65%', height: '45%', }} onPress={()=>{
                                                        this.unlockScript(15);
                                                    }}> 
                                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                    </Image>
                                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                                    </Image>
                                                    <View style={style.pesoCoin}>
                                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                            justifyContent: 'center', alignContent: 'center', }}>10</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        </View>
                                        
                                        <View style={{ width: '20%', height: '100%', marginLeft: '5%', }}>
                                            <TouchableOpacity style={{wdith: '100%', height: '100%'}} onPress={()=> {
                                                this.scriptPicked(16);
                                            }}>
                                            <Image source={YA} style={style.scriptIcon}></Image>
                                            </TouchableOpacity>

                                            { this.state.lockScript10 && 
                                            <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                                                <Image source={LockedLevel} style={{ position: 'absolute', top: '4%', left: '-5%',
                                                    width: '110%', height: '90%', resizeMode: 'stretch'}}>
                                                </Image>

                                                <Image source={LockIcon} style={{ position: 'absolute', top: '15%', left: '10%',
                                                    width: '23%', height: '30%', resizeMode: 'stretch'}}>
                                                </Image>
                                                
                                                <TouchableOpacity style={{ position: 'absolute', top: '55%', right: '-15%', 
                                                    width: '65%', height: '45%', }} onPress={()=>{
                                                        this.unlockScript(16);
                                                    }}> 
                                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                                    </Image>
                                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                                    </Image>
                                                    <View style={style.pesoCoin}>
                                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.015,
                                                            justifyContent: 'center', alignContent: 'center', }}>15</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        </View>
                                    </View>
                                    
                                </View>
                                {/* Second Script, Prev Icon */}
                                <TouchableOpacity style={[style.scriptNextPrevBtn, {left: '-3%'}]}
                                    onPress={this.nextScriptListPressed}>
                                    <Image source={PrevIcon} style={style.ImageStyle}></Image>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                    {/* Script List Exit Icon */}
                    <View style={style.ExitIcon}>
                        <TouchableOpacity onPress={this.scriptsClosePressed}>
                            <Image source={ExitIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            }

            <TouchableOpacity style={[style.CoinBankStyle, {top: '20%', width: '8%', right: '5.25%', 
                justifyContent: 'center',
                alignItems: 'center',}]}
                onPress={this.changeTraceColor}> 
                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                </Image>
                <View style={style.traceColor}>
                    <Image source={this.state.colorTrace} style={style.ImageStyle}></Image>
                </View>
            </TouchableOpacity>
        </ImageBackground>
        );
    }
}

const style = StyleSheet.create({
    traceColor: {
        position: 'absolute',
        width: '60%',
        height: '60%',
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
    backView: { 
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%'
    },
    nextPrevTrace: {
        position: 'absolute',
        top: '43%',
        width: '6.5%',
        height: '14%',
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

export default withNavigation(TracingScreen);