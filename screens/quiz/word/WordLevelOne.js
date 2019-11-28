import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, BackHandler,
    Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

import CoinContainer from '../../images/MenuIcon.png';
import HeartIcon from '../../images/Heart-icon.png';

import bb_isa from '../../images/wordBB/Numbers/bb_isa.png';
import bb_dalawa from '../../images/wordBB/Numbers/bb_dalawa.png';
import bb_tatlo from '../../images/wordBB/Numbers/bb_tatlo.png';
import bb_apat from '../../images/wordBB/Numbers/bb_apat.png';
import bb_lima from '../../images/wordBB/Numbers/bb_lima.png';
import bb_anim from '../../images/wordBB/Numbers/bb_anim.png';
import bb_pito from '../../images/wordBB/Numbers/bb_pito.png';
import bb_walo from '../../images/wordBB/Numbers/bb_walo.png';
import bb_siyam from '../../images/wordBB/Numbers/bb_siyam.png';
import bb_sampu from '../../images/wordBB/Numbers/bb_sampu.png';

const toAnswerList = [bb_isa, bb_dalawa, bb_tatlo, bb_apat, bb_lima, bb_anim, bb_pito,
    bb_walo, bb_siyam, bb_sampu, ];

import word_isa from '../../images/word/Number/word_isa.png';
import word_dalawa from '../../images/word/Number/word_dalawa.png';
import word_tatlo from '../../images/word/Number/word_tatlo.png';
import word_apat from '../../images/word/Number/word_apat.png';
import word_lima from '../../images/word/Number/word_lima.png';
import word_anim from '../../images/word/Number/word_anim.png';
import word_pito from '../../images/word/Number/word_pito.png';
import word_walo from '../../images/word/Number/word_walo.png';
import word_siyam from '../../images/word/Number/word_siyam.png';
import word_sampu from '../../images/word/Number/word_sampu.png';

import MenuFrame from '../../images/GreenFrameBlank.png';

import OkayIcon from '../../images/Accept-Icon.png';
import BackIcon from '../../images/Back-Icon.png';

import Sound from 'react-native-sound';
import {sound, error, success, soundPress} from '../../introScreen';

const romanList = [word_isa, word_dalawa, word_tatlo, word_apat, word_lima, word_anim, word_pito,
    word_walo, word_siyam, word_sampu, ];

const screenWidth = Dimensions.get('screen').width;
var Realm = require('realm');
let realm;
let realm2;

class WordLevelOne extends React.Component {
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

    tada = (tada) => {
        if(tada == 1) {
            this.setState({tada: 'tada'});
        } else if(tada == 2) {
            this.setState({tada2: 'tada'});
        } else if(tada == 3) {
            this.setState({tada3: 'tada'});
        }
        setTimeout(()=>{
            this.setState({tada: '', tada2: '', tada3: ''});
        }, 700);
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
                    this.finishedTenMessage = 'Natapos mo na ang unang baitang ng pagbasa.\nMaaring subukan ulit.';
                    this.lostMessage = 'Nakatatlong maling sagot kana. Huwag magalala, maaring subukan ulit!';
                } else if(GameData[0].language == 'English') {
                    this.finishedTenMessage ='You have finished the level 1 word quiz set.\nYou can try again';
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


    // fiveWrong: { type: 'int', default: 0},
    // tenWrong: { type: 'int', default: 0},
    // twentyWrong: { type: 'int', default: 0},
    // fiftyWrong: { type: 'int', default: 0},
    // fiveCorrect: { type: 'int', default: 0},
    // tenCorrect: { type: 'int', default: 0},
    // twentyCorrect: { type: 'int', default: 0},
    // fiftyCorrect: { type: 'int', default: 0},

    
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
            this.setState({toAnswerScript: toAnswerList[this.index], answerScript: romanList[this.index]});
            this.index2 = parseInt(Math.random() * 3);
            this.script1 = null;
            this.script2 = null;
            this.script3 = null;
            if(this.index2 == 0) {
                this.setState({answerScript1: romanList[this.index]});
                this.script1 = this.index;
            } else if(this.index2 == 1) {
                this.setState({answerScript2: romanList[this.index]});
                this.script2 = this.index;
            } else if(this.index2 == 2) {
                this.script3 = this.index;
                this.setState({answerScript3: romanList[this.index]});
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
                    this.setState({answerScript1: romanList[this.script1]});
                    this.setState({answerScript2: romanList[this.script2]});
                    this.setState({answerScript3: romanList[this.script3]});
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
                GameData[0].pesoCoin = GameData[0].pesoCoin + 1;
                GameData[0].coinEarned = GameData[0].coinEarned + 1;
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
                    <View style={{ width: '110%', height: '120%', top: '-20%',}}>
                        <Image source={this.state.toAnswerScript} style={style.ImageStyle}></Image>
                    </View>

                    <View style={style.answerScriptList}>
                        <TouchableOpacity style={style.answerScriptContainer} onPress={()=>{
                            this.answerPickPressed(1);
                        }}>
                            <Animatable.View style={{width: '100%', height: '100%',}} animation={this.state.tada}>
                                <Image source={CoinContainer} style={style.ImageStyle}>
                                </Image>
                                <View style={style.answerScript}>
                                    <Image source={this.state.answerScript1} style={style.ImageStyle}>
                                    </Image>
                                </View>
                            </Animatable.View>
                        </TouchableOpacity>
                        <View style={{width: '2.5%', height: '100%'}}></View>
                        <TouchableOpacity style={style.answerScriptContainer} onPress={()=>{
                            this.answerPickPressed(2);
                        }}>
                            <Animatable.View style={{width: '100%', height: '100%',}} animation={this.state.tada2}>
                                <Image source={CoinContainer} style={style.ImageStyle}>
                                </Image>
                                <View style={style.answerScript}>
                                    <Image source={this.state.answerScript2} style={style.ImageStyle}>
                                    </Image>
                                </View>
                            </Animatable.View>
                            
                        </TouchableOpacity>
                        <View style={{width: '2.5%', height: '100%'}}></View>
                        <TouchableOpacity style={style.answerScriptContainer} onPress={()=>{
                            this.answerPickPressed(3);
                        }}>
                            <Animatable.View style={{width: '100%', height: '100%',}} animation={this.state.tada3}>
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
        top: '20%',
        left: '15%',
        width: '70%',
        height: '60%',
        //borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    answerScriptContainer: {
        width: '30%',
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

export default withNavigation(WordLevelOne);