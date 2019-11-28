import React from 'react';
import { View, Text, StatusBar, ImageBackground,
    Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';

import MenuContainer from './images/MenuIcon.png';

import AboutIcon from './images/About-icon.png';
import AtinSulatin from './images/AtinSulatinIntro.png';
import MenuFrame from './images/GreenFrameBlank.png';

import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';
import BackIcon from './images/Back-Icon.png';


// Tracing List
import BlueChalk from './images/store/BlueChalkStore.png';
import RedChalk from './images/store/RedChalkStore.png';
import YellowChalk from './images/store/YellowChalkStore.png';
import CollectedAll from './images/achievements/CollectedScripts.png';

import AsulTisaStore from './images/store/AsulTisaStore.png';
import PulaTisaStore from './images/store/PulaTisaStore.png';
import DilawTisaStore from './images/store/DilawTisaStore.png';
import LahatSulatin from './images/achievements/LahatSulatin.png';


import {sound} from './HomeScreen';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;

class IntroScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state ={
            language: '',
            nextPressed: true,
            prevPressed: false,
            firstQuizList: true,
            secondQuizList: false,
            thirdQuizList: false,
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
                this.setState({language: GameData[0].language});
            }
        });
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
        this.setState({stars: GameData[0].stars, earnedCoin: GameData[0].coinEarned, traceScripts: GameData[0].traceScripts,
            language: GameData[0].language, redChalk: !GameData[0].chalkRed, correctNumber: GameData[0].correctAnswer,
            totalAchieved: GameData[0].achievemenEarned, wrongNumber: GameData[0].wrongAnwser,
            blueChalk: !GameData[0].chalkBlue, yellowChalk: !GameData[0].chalkYellow});
        
            if(GameData[0].coinEarned >= 50) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].coinEarned >= 100) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].coinEarned >= 200) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].coinEarned >= 500) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].wrongAnwser >= 5) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].wrongAnwser >= 10) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].wrongAnwser >= 20) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].wrongAnwser >= 50) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].correctAnswer >= 10) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].correctAnswer >= 20) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].correctAnswer >= 50) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].correctAnswer >= 100) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].chalkBlue) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].chalkRed) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].chalkYellow) {
                this.achieved = this.achieved + 1;
            }
            if(GameData[0].traceScripts >= 17) {
                this.achieved = this.achieved + 1;
            }
            this.setState({totalAchieved: this.achieved, stars: this.achieved});
            GameData[0].stars = this.achieved;
    }

    nextPressed = () => {
        if(this.state.firstQuizList) {
            this.setState({secondQuizList: true, nextPressed: true, prevPressed: true, 
                firstQuizList: false, thirdQuizList: false});
        } else if(this.state.secondQuizList) {
            this.setState({thirdQuizList: true, nextPressed: false, prevPressed: true, secondQuizList: false});
        }
    }

    prevPressed = () => {
        if(this.state.thirdQuizList) {
            this.setState({secondQuizList: true, nextPressed: true, prevPressed: true, 
                firstQuizList: false, thirdQuizList: false});
        } else if(this.state.secondQuizList) {
            this.setState({firstQuizList: true, nextPressed: true, prevPressed: false, secondQuizList: false});
        }
    }

    gotoHome = () => {
        sound.play();
        this.props.navigation.replace('Home');
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={{position: 'absolute', top: '0%', left: '0%',
                width: '100%', height: '100%'}}>

                    { this.state.firstTraceList && 
                        <View style={style.storeList}>
                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? LahatSulatin :
                                    CollectedAll} style={style.image}></Image>

                                { this.state.traceScripts < 17 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? DilawTisaStore :
                                    YellowChalk} style={style.image}></Image>
                                
                                { this.state.yellowChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>

                            <View style={{ width: '100%', height: '10%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? PulaTisaStore :
                                    RedChalk} style={style.image}></Image>
                                
                                { this.state.redChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? AsulTisaStore :
                                    BlueChalk} style={[style.image, {
                                    //opacity: 0.7,
                                }]}></Image>

                                { this.state.blueChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>
                        </View>
                    }

                    { this.state.secondQuizList && 
                        <View style={style.storeList}>
                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? LahatSulatin :
                                    CollectedAll} style={style.image}></Image>

                                { this.state.traceScripts < 17 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? DilawTisaStore :
                                    YellowChalk} style={style.image}></Image>
                                
                                { this.state.yellowChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>

                            <View style={{ width: '100%', height: '10%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? PulaTisaStore :
                                    RedChalk} style={style.image}></Image>
                                
                                { this.state.redChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? AsulTisaStore :
                                    BlueChalk} style={[style.image, {
                                    //opacity: 0.7,
                                }]}></Image>

                                { this.state.blueChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                            </View>
                        </View>
                    }

                { this.state.nextPressed && 
                    <TouchableOpacity style={[style.scriptNextPrevBtn, {right: '-3%'}]}
                        onPress={this.nextPressed}>
                        <Image source={NextIcon} style={style.ImageStyle}></Image>
                    </TouchableOpacity>
                }

                { this.state.prevPressed &&
                    <TouchableOpacity style={[style.scriptNextPrevBtn, {left: '-3%'}]}
                        onPress={this.prevPressed}>
                        <Image source={PrevIcon} style={style.ImageStyle}></Image>
                    </TouchableOpacity>
                }
                
            </View>
        );
    }
}


const style = StyleSheet.create({
    lockIcon: {
        position: 'absolute',
        right: '2%',
        top: '6%',
        width: '20%',
        height: '40%',
        resizeMode: 'contain',
    },
    scriptNextPrevBtn: {
        position: 'absolute',
        bottom: '5%',
        width: '16%',
        height: '16%',
    },
    soldText: {
        position: 'absolute',
        bottom: '0%',
        right: '2.5%',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.025,
        color: 'white',
    },
    soldView: {
        position: 'absolute',
        top: '6.5%', left: '2.5%',
        width: '94%', height: '88%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: screenWidth * 0.005,
    },
    storeItem: {
        width: '42%',
        height: '42%',
        //borderWidth: 1, 
    },
    storeList: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '80%',
        height: '75%',
        //borderWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    CoinBankStyle: {
        position: 'absolute',
        top: '3%',
        width: '15%',
        height: '17%',
    },
    CoinStyle: {
        position: 'absolute',
        top: '27.5%',
        left: '15%',
        width: '30%',
        height: '45%',
        resizeMode: 'contain',
    },
    CoinContainerStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    menu: {
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '70%',
        height: '80%',
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