import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions,
    Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { withNavigation } from 'react-navigation';

import CoinContainer from '../../images/MenuIcon.png';
import HeartIcon from '../../images/Heart-icon.png';
import MenuFrame from '../../images/GreenFrameBlank.png';
import OkayIcon from '../../images/Accept-Icon.png';
import BackIcon from '../../images/Back-Icon.png';

import BB_A from '../../images/planeScripts/BB_A.png';
import BB_EI from '../../images/planeScripts/BB_EI.png';
import BB_OU from '../../images/planeScripts/BB_OU.png';
import BB_BA from '../../images/planeScripts/BB_BA.png';
import BB_KA from '../../images/planeScripts/BB_KA.png';
import BB_DA from '../../images/planeScripts/BB_DA.png';
import BB_GA from '../../images/planeScripts/BB_GA.png';
import BB_HA from '../../images/planeScripts/BB_HA.png';
import BB_LA from '../../images/planeScripts/BB_LA.png';
import BB_MA from '../../images/planeScripts/BB_MA.png';
import BB_NA from '../../images/planeScripts/BB_NA.png';
import BB_NGA from '../../images/planeScripts/BB_NGA.png';
import BB_PA from '../../images/planeScripts/BB_PA.png';
import BB_SA from '../../images/planeScripts/BB_SA.png';
import BB_TA from '../../images/planeScripts/BB_TA.png';
import BB_WA from '../../images/planeScripts/BB_WA.png';
import BB_YA from '../../images/planeScripts/BB_YA.png';

import BB_BEI from '../../images/planeScripts/BB_BEI.png';
import BB_BOU from '../../images/planeScripts/BB_BOU.png';
import BB_KEI from '../../images/planeScripts/BB_KEI.png';
import BB_KOU from '../../images/planeScripts/BB_KOU.png';
import BB_DEI from '../../images/planeScripts/BB_DEI.png';
import BB_DOU from '../../images/planeScripts/BB_DOU.png';
import BB_GEI from '../../images/planeScripts/BB_GEI.png';
import BB_GOU from '../../images/planeScripts/BB_GOU.png';
import BB_HEI from '../../images/planeScripts/BB_HEI.png';
import BB_HOU from '../../images/planeScripts/BB_HOU.png';
import BB_LEI from '../../images/planeScripts/BB_LEI.png';
import BB_LOU from '../../images/planeScripts/BB_LOU.png';
import BB_MEI from '../../images/planeScripts/BB_MEI.png';
import BB_MOU from '../../images/planeScripts/BB_MOU.png';
import BB_NEI from '../../images/planeScripts/BB_NEI.png';
import BB_NOU from '../../images/planeScripts/BB_NOU.png';
import BB_NGEI from '../../images/planeScripts/BB_NGEI.png';
import BB_NGOU from '../../images/planeScripts/BB_NGOU.png';
import BB_PEI from '../../images/planeScripts/BB_PEI.png';
import BB_POU from '../../images/planeScripts/BB_POU.png';
import BB_SEI from '../../images/planeScripts/BB_SEI.png';
import BB_SOU from '../../images/planeScripts/BB_SOU.png';
import BB_TEI from '../../images/planeScripts/BB_TEI.png';
import BB_TOU from '../../images/planeScripts/BB_TOU.png';
import BB_WEI from '../../images/planeScripts/BB_WEI.png';
import BB_WOU from '../../images/planeScripts/BB_WOU.png';
import BB_YEI from '../../images/planeScripts/BB_YEI.png';
import BB_YOU from '../../images/planeScripts/BB_YOU.png';

const toAnswerList = [BB_A, BB_EI, BB_OU, BB_BA, BB_KA, BB_DA, BB_GA, BB_HA, BB_LA, BB_MA, BB_NA,
    BB_NGA, BB_PA, BB_SA, BB_TA, BB_WA, BB_YA, BB_BEI, BB_BOU, BB_KEI, BB_KOU, BB_DEI, BB_DOU, BB_GEI, BB_GOU, BB_HEI, BB_HOU, BB_LEI, BB_LOU, 
    BB_MEI, BB_MOU, BB_NEI, BB_NOU, BB_NGEI, BB_NGOU, BB_PEI, BB_POU, BB_SEI, BB_SOU, BB_TEI, BB_TOU, BB_WEI, BB_WOU,
    BB_YEI, BB_YOU,  ];

import script_A from '../../images/planeScripts/script_A.png';
import script_EI from '../../images/planeScripts/script_EI.png';
import script_OU from '../../images/planeScripts/script_OU.png';
import script_BA from '../../images/planeScripts/script_BA.png';
import script_KA from '../../images/planeScripts/script_KA.png';
import script_DA from '../../images/planeScripts/script_DARA.png';
import script_GA from '../../images/planeScripts/script_GA.png';
import script_HA from '../../images/planeScripts/script_HA.png';
import script_LA from '../../images/planeScripts/script_LA.png';
import script_MA from '../../images/planeScripts/script_MA.png';
import script_NA from '../../images/planeScripts/script_NA.png';
import script_NGA from '../../images/planeScripts/script_NGA.png';
import script_PA from '../../images/planeScripts/script_PA.png';
import script_SA from '../../images/planeScripts/script_SA.png';
import script_TA from '../../images/planeScripts/script_TA.png';
import script_WA from '../../images/planeScripts/script_WA.png';
import script_YA from '../../images/planeScripts/script_YA.png';

import script_BEI from '../../images/planeScripts/script_BEI.png';
import script_BOU from '../../images/planeScripts/script_BOU.png';
import script_KEI from '../../images/planeScripts/script_KEI.png';
import script_KOU from '../../images/planeScripts/script_KOU.png';
import script_DEI from '../../images/planeScripts/script_DEI.png';
import script_DOU from '../../images/planeScripts/script_DOU.png';
import script_GEI from '../../images/planeScripts/script_GEI.png';
import script_GOU from '../../images/planeScripts/script_GOU.png';
import script_HEI from '../../images/planeScripts/script_HEI.png';
import script_HOU from '../../images/planeScripts/script_HOU.png';
import script_LEI from '../../images/planeScripts/script_LEI.png';
import script_LOU from '../../images/planeScripts/script_LOU.png';
import script_MEI from '../../images/planeScripts/script_MEI.png';
import script_MOU from '../../images/planeScripts/script_MOU.png';
import script_NEI from '../../images/planeScripts/script_NEI.png';
import script_NOU from '../../images/planeScripts/script_NOU.png';
import script_NGEI from '../../images/planeScripts/script_NGEI.png';
import script_NGOU from '../../images/planeScripts/script_NGOU.png';
import script_PEI from '../../images/planeScripts/script_PEI.png';
import script_POU from '../../images/planeScripts/script_POU.png';
import script_SEI from '../../images/planeScripts/script_SEI.png';
import script_SOU from '../../images/planeScripts/script_SOU.png';
import script_TEI from '../../images/planeScripts/script_TEI.png';
import script_TOU from '../../images/planeScripts/script_TOU.png';
import script_WEI from '../../images/planeScripts/script_WEI.png';
import script_WOU from '../../images/planeScripts/script_WOU.png';
import script_YEI from '../../images/planeScripts/script_YEI.png';
import script_YOU from '../../images/planeScripts/script_YOU.png';

import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';
import {sound, error, success, soundPress} from '../../introScreen';

const romanList = [script_A, script_EI, script_OU, script_BA, script_KA, script_DA, script_GA, script_HA, script_LA, script_MA, script_NA,
    script_NGA, script_PA, script_SA, script_TA, script_WA, script_YA, script_BEI, script_BOU, script_KEI, script_KOU, script_DEI, script_DOU, script_GEI, script_GOU, script_HEI, script_HOU, script_LEI, script_LOU, 
    script_MEI, script_MOU, script_NEI, script_NOU, script_NGEI, script_NGOU, script_PEI, script_POU, script_SEI, script_SOU, script_TEI, script_TOU, script_WEI, script_WOU,
    script_YEI, script_YOU, ];

const screenWidth = Dimensions.get('screen').width;
var Realm = require('realm');
let realm;
let realm2;

class ScriptLevelThree extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            toAnswerScript: null,
            answer: null,
            answerScript1: null,
            answerScript2: null,
            answerScript3: null,
            pesoCoin: '',
            heartCoin: '',
            heart1: true,
            heart2: true,
            heart3: true,
            chanceLeft: 3,
            leftToAnswer: 0,
            closeMessage: false,
            setMessage: null,
            tada: '',
            tada2: '',
            tada3: '',
        }

        this.script1 = null;
        this.script2 = null;
        this.script3 = null;
        this.index = null;
        this.index2 = 0;
        this.finishedTenMessage = null;
        this.lostMessage = null;
        this.length = toAnswerList.length;
        this.correct = null;
        this.error = error;
        this.success = success;
        this.soundPress = soundPress;
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
                this.setState({pesoCoin: GameData[0].pesoCoin,});
                if(GameData[0].language == 'Filipino') {
                    this.finishedTenMessage = 'Natapos mo ang pangatlong lebel ng pagbaybay.\nMaaring subukan ulit.';
                    this.lostMessage = 'Nakatatlong maling sagot kana. Huwag magalala, maaring subukan ulit!';
                } else if(GameData[0].language == 'English') {
                    this.finishedTenMessage ='You have finished the level 3 script quiz set.\nYou can try again';
                    this.lostMessage = 'You already have\nthree wrong answers.\n No Worries, you can try again!';
                } else {

                }
            }
        });

        this.setAnswerScriptSheet();
    }

    closeMessage = () => {
        sound.play();
        this.soundPress.stop();
        this.soundPress.play();
        this.props.navigation.replace('Games');
    }

    
    setAnswerScriptSheet = () => {
        if(this.state.leftToAnswer == 10) {
            if(this.state.chanceLeft == 3) {
                realm2 = new Realm({ path: 'AchievementDatabase.realm'});
                let AchieveData = realm2.objects('AchieveData');
                realm2.write(()=> {
                    AchieveData[0].perfect = AchieveData[0].perfect + 1;
                    if(AchieveData[0].perfect >= 5 && !AchieveData[0].perfectFive) {
                        AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    } else if(AchieveData[0].perfect >= 10 && !AchieveData[0].perfectTen) {
                        AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    } else if(AchieveData[0].perfect >= 25 && !AchieveData[0].perfectTwentyFive) {
                        AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    } else if(AchieveData[0].perfect >= 50 && !AchieveData[0].perfectFifty) {
                        AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    } 
                });
            }
            setTimeout(()=>{
                this.setState({closeMessage: true, setMessage: this.finishedTenMessage});
            }, 500);
        } else {
            this.index = parseInt(Math.random() * this.length);
            this.setState({toAnswerScript: romanList[this.index], answerScript: toAnswerList[this.index]});
            this.index2 = parseInt(Math.random() * 3);
            this.script1 = null;
            this.script2 = null;
            this.script3 = null;
            if(this.index2 == 0) {
                this.setState({answerScript1: toAnswerList[this.index]});
                this.script1 = this.index;
            } else if(this.index2 == 1) {
                this.setState({answerScript2: toAnswerList[this.index]});
                this.script2 = this.index;
            } else if(this.index2 == 2) {
                this.script3 = this.index;
                this.setState({answerScript3: toAnswerList[this.index]});
            }
    
            while(true) {
                if(this.script1 == null) {
                    let script = parseInt(Math.random() * this.length);
                    while(this.script1 == null) {
                        if(this.script2 != script 
                            && this.script3 != script) {
                                this.script1 = script;
                        } else {
                            script = parseInt(Math.random() * this.length);
                        }
                    }
                }
    
                if(this.script2 == null) {
                    let script = parseInt(Math.random() * this.length);
                    while(this.script2 == null) {
                        if(this.script1 != script 
                            && this.script3 != script) {
                                this.script2 = script;
                            break;
                        } else {
                            script = parseInt(Math.random() * this.length);
                        }
                    }
                }
    
                if(this.script3 == null) {
                    let script = parseInt(Math.random() * this.length);
                    while(this.script3 == null) {
                        if(this.script2 != script 
                            && this.script1 != script) {
                                this.script3 = script;
                            break;
                        } else {
                            script = parseInt(Math.random() * this.length);
                        }
                    }
                }
    
                if((this.script1 != null && this.script2 != null) && this.script3 != null) {
                    // alert(this.script1 + ' :  '  + this.script2 + '  :  ' + this.script3 + '  -  ' + this.index2 + '  -  '
                    // + this.index);
                    this.setState({answerScript1: toAnswerList[this.script1]});
                    this.setState({answerScript2: toAnswerList[this.script2]});
                    this.setState({answerScript3: toAnswerList[this.script3]});
                    break;
                }
            }
            this.setState({leftToAnswer: this.state.leftToAnswer + 1});
        }
    }

    answerPickPressed = (pickNumber) => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm2 = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm2.objects('AchieveData');

        if(pickNumber == 1) {
            if(this.state.answerScript == this.state.answerScript1) {
                this.correct = true;
            } else {
                this.checkChanceLeft(this.state.chanceLeft);
                this.correct = false;
            }

        } else if(pickNumber == 2) {
            if(this.state.answerScript == this.state.answerScript2) {
                this.correct = true;
            } else {
                this.checkChanceLeft(this.state.chanceLeft);
                this.correct = false;
            }

        } else if(pickNumber == 3) {
            if(this.state.answerScript == this.state.answerScript3) {
                this.correct = true;
            } else {
                this.checkChanceLeft(this.state.chanceLeft);
                this.correct = false;
            }

        }

        if(this.correct) {
            realm.write(()=> {
                GameData[0].pesoCoin = GameData[0].pesoCoin + 2;
                GameData[0].coinEarned = GameData[0].coinEarned + 2;
                GameData[0].correctAnswer = GameData[0].correctAnswer + 1;
                this.setState({pesoCoin: GameData[0].pesoCoin, });
            });
            realm2.write(()=> {
                AchieveData[0].correct = AchieveData[0].correct + 1;
                
                AchieveData[0].coin = AchieveData[0].coin + 1;
                if(AchieveData[0].coin >= 50 && !AchieveData[0].coinRewardFifty) {
                    AchieveData[0].coinRewards = AchieveData[0].coinRewards + 1;
                    AchieveData[0].coinRewardFifty = true;
                } else if(AchieveData[0].coin >= 100  && !AchieveData[0].coinRewardHundred) {
                    AchieveData[0].coinRewards = AchieveData[0].coinRewards + 1;
                    AchieveData[0].coinRewardHundred = true;
                }  else if(AchieveData[0].coin >= 250 && !AchieveData[0].coinRewardTwoHundred) {
                    AchieveData[0].coinRewards = AchieveData[0].coinRewards + 1;
                    AchieveData[0].coinRewardTwoHundred = true;
                }  else if(AchieveData[0].coin >= 500 && !AchieveData[0].coinRewardFiveHundred) {
                    AchieveData[0].coinRewards = AchieveData[0].coinRewards + 1;
                    AchieveData[0].coinRewardFiveHundred = true;
                }

                if(AchieveData[0].correct >= 10 && !AchieveData[0].correctRewardTen) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].correctRewardTen = true;
                } else if(AchieveData[0].correct >= 25 && !AchieveData[0].correctRewardTwentyFive) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].correctRewardTwentyFive = true;
                } else if(AchieveData[0].correct >= 50 && !AchieveData[0].correctRewardFifty) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].correctRewardFifty = true;
                } else if(AchieveData[0].correct >= 100 && !AchieveData[0].correctRewardHundred) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].correctRewardHundred = true;
                } 
            });
            this.success.stop();
            this.success.play();
            setTimeout(()=>{
                this.setAnswerScriptSheet();
            }, 50);
        } else {
            realm.write(()=> {
                GameData[0].wrongAnwser = GameData[0].wrongAnwser + 1;
            });
            realm2.write(()=> {
                AchieveData[0].wrong = AchieveData[0].wrong + 1;
                if(AchieveData[0].wrong >= 5 && !AchieveData[0].wrongRewardFive) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].wrongRewardFive = true;
                } else if(AchieveData[0].wrong >= 10 && !AchieveData[0].wrongRewardTen) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].wrongRewardTen = true;
                } else if(AchieveData[0].wrong >= 25 && !AchieveData[0].wrongRewardTwentyFive) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].wrongRewardTwentyFive = true;
                } else if(AchieveData[0].wrong >= 50 && !AchieveData[0].wrongRewardFifty) {
                    AchieveData[0].quizRewards = AchieveData[0].quizRewards + 1;
                    AchieveData[0].wrongRewardFifty = true;
                } 
            });
            this.error.stop();
            this.error.play();
            if(this.index2 == 0) {
                this.setState({tada: 'tada'});
            } else if(this.index2 == 1) {
                this.setState({tada2: 'tada'});
            } else if(this.index2 == 2) {
                this.setState({tada3: 'tada'});
            }
            setTimeout(()=>{
                this.setState({tada: '', tada2: '', tada3: ''});
                this.setAnswerScriptSheet();
            }, 800);
        }
    }

    checkChanceLeft = (left) => {
        if(left == 1) {
            this.setState({heart1: false});
        } else if(left == 2) {
            this.setState({heart2: false});
        } else if(left == 3) {
            this.setState({heart3: false});
        }
        let num = left - 1;
        if(num <= 0) {
            setTimeout(()=>{
                this.setState({closeMessage: true, setMessage: this.lostMessage});
            }, 500);
        }
        this.setState(({chanceLeft: left - 1}));
    }

    gotoHome = () => {
        if(this.state.leftToAnswer < 10) {
            this.setState({showMessage: true});
        }
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={{position: 'absolute', width: '100%', height: '100%'}}>

                <View style={style.CoinBankStyle}> 
                    <View style={style.pesoCoin}>
                        <Text style={{
                            color: 'white',
                            fontSize: screenWidth * 0.025,
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}>{this.state.pesoCoin}</Text>
                    </View>
                </View>
                <View style={[style.CoinBankStyle, {top: '20%', height: '10%', 
                        justifyContent: 'center', 
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }]}> 
                    <Image source={HeartIcon} style={{ width: '25%', height: '100%', resizeMode: 'contain', 
                        opacity: this.state.heart1 ? 1 : 0.3}}>
                    </Image>
                    <View style={{width: '5%', height: '100%'}}></View>
                    <Image source={HeartIcon} style={{ width: '25%', height: '100%', resizeMode: 'contain', 
                        opacity: this.state.heart2 ? 1 : 0.3,}}>
                    </Image>
                    <View style={{width: '5%', height: '100%'}}></View>
                    <Image source={HeartIcon} style={{ width: '25%', height: '100%', 
                        opacity: this.state.heart3 ? 1 : 0.3, 
                        resizeMode: 'contain', }}>
                    </Image>

                    <Text style={{
                        position: 'absolute',
                        bottom: '-80%',
                        fontSize: screenWidth * 0.03,
                        color: 'white',
                    }}>{this.state.leftToAnswer}/10</Text>
                </View>

                <View style={style.scriptQuizView}>
                    <View style={{ width: '80%', height: '75%', }}>
                        <Image source={this.state.toAnswerScript} style={style.ImageStyle}></Image></View>

                    <View style={style.answerScriptList}>
                        <TouchableOpacity style={style.answerScriptContainer} onPress={()=>{
                            this.answerPickPressed(1);
                        }}>
                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada}>
                                <Image source={CoinContainer} style={style.ImageStyle}>
                                </Image>
                                <View style={style.answerScript}>
                                    <Image source={this.state.answerScript1} style={style.ImageStyle}>
                                    </Image>
                                </View>
                            </Animatable.View>
                        </TouchableOpacity>
                        <View style={{width: '7.5%', height: '100%'}}></View>
                        <TouchableOpacity style={style.answerScriptContainer} onPress={()=>{
                            this.answerPickPressed(2);
                        }}>
                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada2}>
                                <Image source={CoinContainer} style={style.ImageStyle}>
                                </Image>
                                <View style={style.answerScript}>
                                    <Image source={this.state.answerScript2} style={style.ImageStyle}>
                                    </Image>
                                </View>
                            </Animatable.View>
                        </TouchableOpacity>
                        <View style={{width: '7.5%', height: '100%'}}></View>
                        <TouchableOpacity style={style.answerScriptContainer} onPress={()=>{
                            this.answerPickPressed(3);
                        }}>
                            <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada3}>
                                <Image source={CoinContainer} style={style.ImageStyle}>
                                </Image>
                                <View style={style.answerScript}>
                                    <Image source={this.state.answerScript3} style={style.ImageStyle}>
                                    </Image>
                                </View>
                            </Animatable.View>
                        </TouchableOpacity>
                    </View>
                </View>

                { this.state.closeMessage && 
                        <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                            <TouchableWithoutFeedback style={style.background}>
                                <View style={style.background}></View>
                            </TouchableWithoutFeedback>
                            <View style={{ position: 'absolute', top: '15%', left: '25%', 
                            width: '50%', height: '60%', justifyContent: 'center'}}>
                                <Image source={MenuFrame} style={style.image}>
                                </Image>
                                <Text numberOfLines={3} style={{
                                    position: 'absolute',
                                    top: '22.5%',
                                    left: '5%',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    width: '90%',
                                    fontSize: screenWidth * 0.03,
                                    color: 'white',
                                }}>{this.state.setMessage}</Text>
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

                    { false &&
                        <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                            <TouchableWithoutFeedback style={style.background}>
                                <View style={style.background}></View>
                            </TouchableWithoutFeedback>
                            <View style={{ position: 'absolute', top: '15%', left: '25%', 
                            width: '50%', height: '60%', justifyContent: 'center'}}>
                                <Image source={MenuFrame} style={style.image}>
                                </Image>
                                <Text numberOfLines={3} style={{
                                    position: 'absolute',
                                    top: '22.5%',
                                    left: '5%',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    width: '90%',
                                    fontSize: screenWidth * 0.03,
                                    color: 'white',
                                }}>{this.state.setMessage}</Text>
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
            </View>
        );
    }
}

const style = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
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
    CoinBankStyle: {
        position: 'absolute',
        top: '6%',
        right: '3%',
        width: '12.5%',
        height: '12.5%',
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
    scriptQuizView: {
        position: 'absolute',
        top: '5%',
        left: '25%',
        width: '50%',
        height: '90%',
        //borderWidth: 1,
        alignItems: 'center',
    },
    answerScriptList: {
        position: 'absolute',
        bottom: '2.5%',
        left: '5%',
        height: '20%',
        width: '90%',
        //borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    answerScript: {
        position: 'absolute',
        width: '70%',
        height: '60%',
        top: '20%',
        left: '15%',
        //borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    answerScriptContainer: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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

export default withNavigation(ScriptLevelThree);