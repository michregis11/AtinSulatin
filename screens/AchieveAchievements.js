import React from 'react';
import { View, Text, StatusBar,
    Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';

import MenuContainer from './images/MenuIcon.png';

import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';
import BackIcon from './images/Back-Icon.png';

// Achievements List
import FiveAchieve from './images/achievements/FiveAchievements.png';
import TenAchieve from './images/achievements/TenAchievements.png';
import FifteenAchieve from './images/achievements/FifteenAchievements.png';
import TwentyAchieve from './images/achievements/TwentyAchievements.png';

import ParangalLima from './images/achievements/ParangalLima.png';
import ParangalSampu from './images/achievements/ParangalSampu.png';
import ParangalKinse from './images/achievements/ParangalKinse.png';
import ParangalBente from './images/achievements/ParangalBente.png';



import CoinIcon from './images/Star-icon.png';
import LockIcon from './images/Lock-icon.png';

import PesoIcon from './images/Coin-icon.png';

import {sound, success} from './introScreen';
import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;

class AchieveAchievements extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state ={
            tada: '',
            language: '',
            nextPressed: false,
            prevPressed: false,
            firstQuizList: true,
            secondQuizList: false,
            rewards: 0,
            pesoCoin: 0,
            traceScripts: 0,
            setMessage: false,
            achieveFive: false,
            achieveTen: false,
            achieveFifteen: false,
            achieveTwenty: false,
            totalAchieved: 0,
        };

        this.sound = success;
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
                this.setState({language: GameData[0].language, pesoCoin: GameData[0].pesoCoin, });
            }
        });
        realm = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm.objects('AchieveData');
        realm.write(()=> {
            if(!AchieveData[0]) {
                realm.create('AchieveData', {
                    rewards: 0,
                });
            } else {
                //AchieveData[0].taskRewards = 0;
                this.setState({rewards: AchieveData[0].taskRewards, totalAchieved: AchieveData[0].achieve, 
                    achieveFive: !AchieveData[0].achieveFive, achieveTen: !AchieveData[0].achieveTen, 
                    achieveFifteen: !AchieveData[0].achieveFifteen, 
                    achieveTwenty: !AchieveData[0].achieveTwenty,});
            }
        });
    }

    coinReward = (index, reward) => {
        realm = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm.objects('AchieveData');
        
        if(index == 1) {
            realm.write(()=> {
                AchieveData[0].achieveFive = true;
            });
            this.setState({achieveFive: false});
        } else if(index == 2) {
            realm.write(()=> {
                AchieveData[0].achieveTen = true;
            });
            this.setState({achieveTen: false});
        } else if(index == 3) {
            realm.write(()=> {
                AchieveData[0].achieveFifteen = true;
            });
            this.setState({achieveFifteen: false});
        } else if(index == 4) {
            realm.write(()=> {
                AchieveData[0].achieveTwenty = true;
            });
            this.setState({achieveTwenty: false});
        }
        realm.write(()=> {
            AchieveData[0].taskRewards = AchieveData[0].taskRewards - 1;
            AchieveData[0].achieve = AchieveData[0].achieve + 1;
            if(AchieveData[0].achieve >= 5 && !AchieveData[0].achieveFive) {
                AchieveData[0].taskRewards = AchieveData[0].taskRewards + 1;
            } else if(AchieveData[0].achieve >= 10 && !AchieveData[0].achieveTen) {
                AchieveData[0].taskRewards = AchieveData[0].taskRewards + 1;
            } else if(AchieveData[0].achieve >= 15 && !AchieveData[0].achieveFifteen) {
                AchieveData[0].taskRewards = AchieveData[0].taskRewards + 1;
            } else if(AchieveData[0].achieve >= 20 && !AchieveData[0].achieveTwenty) {
                AchieveData[0].taskRewards = AchieveData[0].taskRewards + 1;
            }
            if(AchieveData[0].taskRewards <= 0) {
                this.setState({rewards: 0});
            } else {
                this.setState({rewards: AchieveData[0].taskRewards});
            }
        });

        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
            GameData[0].pesoCoin = GameData[0].pesoCoin + reward;
        });
        this.setState({pesoCoin: GameData[0].pesoCoin});
        this.tada();
    }

    // nextPressed = () => {
    //     if(this.state.firstQuizList) {
    //         this.setState({secondQuizList: true, nextPressed: false, prevPressed: true, 
    //             firstQuizList: false,});
    //     }
    // }

    // prevPressed = () => {
    //     if(this.state.secondQuizList) {
    //         this.setState({firstQuizList: true, nextPressed: true, prevPressed: false, secondQuizList: false});
    //     }
    // }

    // gotoHome = () => {
    //     sound.play();
    //     this.props.navigation.replace('Home');
    // }

    tada = () => {
        this.setState({tada: 'tada'});
        this.sound.stop();
        this.sound.play();
        setTimeout(()=> {
            this.setState({tada: ''});
        }, 700);
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={{position: 'absolute', top: '8%', left: '0%',
                width: '100%', height: '100%'}}>

                    { this.state.rewards != 0 &&
                        <Text style={{
                            textAlign: 'center',
                            fontSize: screenWidth * 0.018,
                            color: 'white',
                            position: 'absolute',
                            top: '8%',
                            left: '15%',
                            width: '70%',
                        }}>
                            { this.state.language == 'Filipino' ? 'Kunin mo na ang iyong gantimpala!' : 'Claim your rewards!' }
                        </Text>
                    }

                    <Animatable.View style={{
                        position: 'absolute',
                        top: '3%',
                        left: '84%',
                        width: '15%',
                        height: '17%',
                    }} animation={this.state.tada}> 
                        <Image source={CoinContainer} style={style.CoinContainerStyle}>
                        </Image>
                        <Image source={PesoIcon} style={style.CoinStyle}>
                        </Image>
                        <View style={style.pesoCoin}>
                            <Text style={{
                                color: 'white',
                                fontSize: screenWidth * 0.018,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}>{this.state.pesoCoin}</Text>
                        </View>
                    </Animatable.View>

                    { this.state.firstQuizList && 

                        <View style={style.storeList}>
                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? ParangalLima :
                                    FiveAchieve} style={style.image}></Image>
                                
                                { this.state.totalAchieved < 5 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.achieveFive && this.state.totalAchieved >= 5) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]} 
                                    onPress={()=> {
                                        this.coinReward(1, 15);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={PesoIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x15'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? ParangalSampu :
                                    TenAchieve} style={style.image}></Image>
                                
                                { this.state.totalAchieved < 10 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.achieveTen && this.state.totalAchieved >= 10) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]} 
                                    onPress={()=> {
                                        this.coinReward(2, 25);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={PesoIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x25'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '100%', height: '10%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? ParangalKinse :
                                    FifteenAchieve} style={style.image}></Image>
                                
                                { this.state.totalAchieved < 15 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.achieveFifteen && this.state.totalAchieved >= 15) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]} 
                                    onPress={()=> {
                                        this.coinReward(3, 35);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={PesoIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x35'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? ParangalBente :
                                    TwentyAchieve} style={style.image}></Image>
                                
                                { this.state.totalAchieved < 20 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.achieveTwenty && this.state.totalAchieved >= 20) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]} 
                                    onPress={()=> {
                                        this.coinReward(4, 50);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={PesoIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x50'}</Text>
                                        </View>
                                    </TouchableOpacity>
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
        width: '40%',
        height: '55%',
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


export default withNavigation(AchieveAchievements);