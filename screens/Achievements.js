import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions,
    Image, TouchableOpacity, StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation';


import QuizAchievements from './QuizAchievements';
import TraceAchievements from './TraceAchievements';
import CoinAchievements from './CoinAchievements';
import AchieveAchievements from './AchieveAchievements';


import MenuFrame from './images/BGBaybayinAchievement.png';
import ParangalFrame from './images/ParangalBG.png';

import MenuIcon from './images/MenuIcon.png';
import CoinContainer from './images/Button-icon.png';


// Achievement Lists
import EarnedPesoCoins from './images/achievements/EarnedPesoCoins.png';
import QuizAttempts from './images/achievements/QuizAttempts.png';
import TracingScriptsAchieve from './images/achievements/TracingScriptsAchieve.png';
import TotalAchieved from './images/achievements/TotalAchieved.png';

import NakuhangPiso from './images/achievements/NakuhangPiso.png';
import BesesSumubok from './images/achievements/BesesSumubok.png';
import PagsulatBaybayin from './images/achievements/PagsulatBaybayin.png';
import MgaParangal from './images/achievements/MgaParangal.png';

import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';
import BackIcon from './images/Back-Icon.png';

import MenuContainer from './images/MenuIcon.png';
import CoinIcon from './images/Star-icon.png';
import LockIcon from './images/Lock-icon.png';

import BlueHeartIcon from './images/BlueHeartIcon.png';
import * as Animatable from 'react-native-animatable';

import Sound from 'react-native-sound';
import {soundPress} from './introScreen';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;

class AchievementScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            stars: 0,
            blueHeart: '',
            tada: '',
            message: '',
            language: 'Filipino',
            itemList: true,
            itemPressed: false,
            nextPressed: false,
            earnedCoinPressed: false,
            tracingPressed: false,
            quizPressed: false,
            achievePressed: false,
            earnedCoin: 0,
            totalAchieved: 0,
            totalAttemps: 0,
            nextQuizPressed: false,
            correctNumber: 0,
            wrongNumber: 0,

            redChalk: false,
            blueChalk: false,
            yellowChalk: false,
        };
        this.achieved = 0;
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
                //this.setState({stars: GameData[0].stars});
                // alert('Created!    ' + GameData[0].pesoCoin);
            } else {
            }
        });
    }

    earnedCoinPressed = () => {
        this.soundPress.play();
        this.setState({itemList: false, earnedCoinPressed: true, itemPressed: true});
    }

    tracingPressed = ()=> {
        this.soundPress.play();
        this.setState({itemList: false, tracingPressed: true, itemPressed: true});
    }

    quizPressed = ()=> {
        this.soundPress.play();
        this.setState({itemList: false, quizPressed: true, itemPressed: true, nextQuizPressed: false});
    }

    achievePressed = ()=> {
        this.soundPress.play();
        this.setState({itemList: false, achievePressed: true, itemPressed: true});
    }

    backList = () => {
        this.soundPress.play();
        this.setState({itemList: true, earnedCoinPressed: false, itemPressed: false, 
            tracingPressed: false, quizPressed: false, achievePressed: false, nextQuizPressed: false,
            nextPressed: false, prevPressed: false,});
    }


    render() {
        StatusBar.setHidden(true);
        return (
            <View style={style.menu}>
                <Image source={this.state.language == 'Filipino' ? ParangalFrame : MenuFrame} style={style.image}>
                </Image>
                <View style={{
                    position: 'absolute',
                    top: '10%',
                    left: '2.5%',
                    width: '95%',
                    height: '80%',
                    //borderWidth: 1,
                }}>

                    <Text style={{
                        position: 'absolute',
                        top: '6%',
                        left: '20%',
                        width: '60%',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: screenWidth * 0.018,
                    }}>{this.state.message}</Text>

                    {/* { this.state.quizPressed && 
                        <TouchableOpacity style={[style.scriptNextPrevBtn, {right: '-3%'}]}
                            onPress={this.nextQuizList}>
                            <Image source={NextIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    }

                    { this.state.nextQuizPressed &&
                        <TouchableOpacity style={[style.scriptNextPrevBtn, {left: '-3%'}]}
                            onPress={this.quizPressed}>
                            <Image source={PrevIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    } */}

                    { this.state.itemList && 
                        <View style={style.storeList}>
                            <TouchableOpacity style={style.storeItem} onPress={this.earnedCoinPressed}>
                                <Image source={this.state.language == 'Filipino' ? NakuhangPiso :
                                    EarnedPesoCoins} style={style.image}></Image>

                                {/* { !this.state.yellowChalk &&
                                    <View style={style.soldView}>
                                        <Text style={style.soldText}>
                                            {this.state.language == 'Filipino' ? 'UBOS NA' : 'SOLD'}
                                        </Text>
                                    </View>
                                } */}
                            </TouchableOpacity>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <TouchableOpacity style={style.storeItem} onPress={this.quizPressed}>
                                <Image source={this.state.language == 'Filipino' ? BesesSumubok :
                                    QuizAttempts} style={style.image}></Image>
                                
                                {/* { !this.state.yellowChalk &&
                                    <View style={style.soldView}>
                                        <Text style={style.soldText}>
                                            {this.state.language == 'Filipino' ? 'UBOS NA' : 'SOLD'}
                                        </Text>
                                    </View>
                                } */}
                            </TouchableOpacity>

                            <View style={{ width: '100%', height: '10%', }}></View>

                            <TouchableOpacity style={style.storeItem} onPress={this.tracingPressed}>
                                <Image source={this.state.language == 'Filipino' ? PagsulatBaybayin :
                                    TracingScriptsAchieve} style={style.image}></Image>
                                
                                {/* { !this.state.redChalk &&
                                    <View style={style.soldView}>
                                        <Text style={style.soldText}>
                                            {this.state.language == 'Filipino' ? 'UBOS NA' : 'SOLD'}
                                        </Text>
                                    </View>
                                } */}
                            </TouchableOpacity>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <TouchableOpacity style={style.storeItem} onPress={this.achievePressed}>
                                <Image source={this.state.language == 'Filipino' ? MgaParangal :
                                    TotalAchieved} style={[style.image, {
                                    //opacity: 0.7,
                                }]}></Image>

                                {/* { !this.state.blueChalk &&
                                    <View style={style.soldView}>
                                        <Text style={style.soldText}>
                                            {this.state.language == 'Filipino' ? 'UBOS NA' : 'SOLD'}
                                        </Text>
                                    </View>
                                } */}
                            </TouchableOpacity>
                        </View>
                    }



                    { this.state.earnedCoinPressed && 
                        <CoinAchievements />
                    }


                    { this.state.tracingPressed && 
                        <TraceAchievements />
                    }


                    { this.state.achievePressed && 
                        <AchieveAchievements />
                    }


                    { this.state.quizPressed && 
                        <QuizAchievements />
                    }


                    { this.state.itemPressed && 
                        <TouchableOpacity style={[style.CoinBankStyle, {left: '-2%', top: '11%'}]}
                            onPress={this.backList}>
                            <Image source={BackIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    }
                </View>
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
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default withNavigation(AchievementScreen);