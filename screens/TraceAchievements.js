import React from 'react';
import { View, Text, StatusBar, 
    Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';

import CoinContainer from './images/Button-icon.png';

import MenuContainer from './images/MenuIcon.png';

import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';
import BackIcon from './images/Back-Icon.png';

// Used Blue Hearts List
import FiveBlueHeart from './images/achievements/UsedFiveBlueHearts.png';
import TenBlueHeart from './images/achievements/UsedTenBlueHearts.png';
import TwentyBlueHeart from './images/achievements/UsedTwentyBlueHearts.png';
import FiftyBlueHeart from './images/achievements/UsedFiftyBlueHearts.png';

// Tracing List
import BlueChalk from './images/store/BlueChalkStore.png';
import RedChalk from './images/store/RedChalkStore.png';
import YellowChalk from './images/store/YellowChalkStore.png';
import CollectedAll from './images/achievements/CollectedScripts.png';

import AsulTisaStore from './images/store/AsulTisaStore.png';
import PulaTisaStore from './images/store/PulaTisaStore.png';
import DilawTisaStore from './images/store/DilawTisaStore.png';
import LahatSulatin from './images/achievements/LahatSulatin.png';

import SampuTama from './images/achievements/SampuTamangSagot.png';
import DalawampuTama from './images/achievements/DalawampuTamangSagot.png';
import LimampuTama from './images/achievements/LimampuTamangSagot.png';
import DaanTama from './images/achievements/DaanTamangSagot.png';

import TenTraced from './images/achievements/TenTraced.png';
import TwentyFiveTraced from './images/achievements/TwentyFiveTraced.png';
import FiftyTraced from './images/achievements/FiftyTraced.png';
import HundredTraced from './images/achievements/HundredTraced.png';

import CoinIcon from './images/Star-icon.png';
import LockIcon from './images/Lock-icon.png';

import PesoIcon from './images/Coin-icon.png';
import BlueHeartIcon from './images/BlueHeartIcon.png';

import {sound, success, soundPress} from './introScreen';
import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;

class TraceAchievement extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state ={
            tada: '',
            language: '',
            nextPressed: true,
            prevPressed: false,
            firstQuizList: true,
            secondQuizList: false,
            thirdQuizList: false,
            rewards: 0,
            pesoCoin: 0,
            traceScripts: 0,
            setMessage: false,
            redChalk: false,
            blueChalk: false,
            yellowChalk: false,
            yellowReward: false,
            blueReward: false,
            redReward: false,
            blueHeart: 0,
            scriptTraced: 0,
            tenTraced: false,
            twentyFiveTraced: false,
            fiftyTraced: false,
            hundredTraced: false,
        };

        this.sound = success;
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
            } else {
                this.setState({language: GameData[0].language, redChalk: GameData[0].chalkRed, blueChalk: GameData[0].chalkBlue, 
                    yellowChalk: GameData[0].chalkYellow, blueHeart: GameData[0].heart, traceScripts: GameData[0].traceScripts,});
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
                this.setState({rewards: AchieveData[0].traceRewards, redReward: !AchieveData[0].chalkRed, 
                    blueReward: !AchieveData[0].chalkBlue, yellowReward: !AchieveData[0].chalkYellow, 
                    scriptTraced: AchieveData[0].traced, tenTraced: !AchieveData[0].tracedFifty, 
                    twentyFiveTraced: !AchieveData[0].tracedHundred, fiftyTraced: !AchieveData[0].tracedTwoHundred,
                    hundredTraced: !AchieveData[0].tracedFiveHundred});
                    //AchieveData[0].traceRewards = 0;
                    if(AchieveData[0].traceRewards < 0) {
                        AchieveData[0].traceRewards = 0;
                        this.setState({rewards: 0});
                    }
            }
        });
    }

    nextPressed = () => {
        this.soundPress.stop();
        this.soundPress.play();
        if(this.state.firstQuizList) {
            this.setState({secondQuizList: true, nextPressed: false, prevPressed: true, 
                firstQuizList: false,});
        }
    }

    prevPressed = () => {
        this.soundPress.stop();
        this.soundPress.play();
        if(this.state.secondQuizList) {
            this.setState({firstQuizList: true, nextPressed: true, prevPressed: false, secondQuizList: false});
        }
    }

    gotoHome = () => {
        sound.play();
        this.soundPress.stop();
        this.soundPress.play();
        this.props.navigation.replace('Home');
    }

    tada = () => {
        this.setState({tada: 'tada'});
        this.sound.stop();
        this.sound.play();
        setTimeout(()=> {
            this.setState({tada: ''});
        }, 700);
    }

    traceReward = (index, reward) => {
        realm = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm.objects('AchieveData');
        let realm2 = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm2.objects('GameData');
        if(index == 1) {
            realm2.write(()=> {
                GameData[0].traceScripts = 18;
            });
            this.setState({traceScripts: 18});
        } else if(index == 2) {
            realm.write(()=> {
                AchieveData[0].chalkYellow = true;
            });
            this.setState({yellowReward: false});
        } else if(index == 3) {
            realm.write(()=> {
                AchieveData[0].chalkRed = true;
            });
            this.setState({redReward: false});
        } else if(index == 4) {
            realm.write(()=> {
                AchieveData[0].chalkBlue = true;
            });
            this.setState({blueReward: false});
        } else if(index == 5) {
            realm.write(()=> {
                AchieveData[0].tracedFifty = true;
            });
            this.setState({tenTraced: false});
        } else if(index == 6) {
            realm.write(()=> {
                AchieveData[0].tracedHundred = true;
            });
            this.setState({twentyFiveTraced: false});
        } else if(index == 7) {
            realm.write(()=> {
                AchieveData[0].tracedTwoHundred = true;
            });
            this.setState({fiftyTraced: false});
        } else if(index == 8) {
            realm.write(()=> {
                AchieveData[0].tracedFiveHundred = true;
            });
            this.setState({hundredTraced: false});
        }
        realm.write(()=> {
            AchieveData[0].traceRewards = AchieveData[0].traceRewards - 1;
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
            if(AchieveData[0].traceRewards <= 0) {
                this.setState({rewards: 0});
            } else {
                this.setState({rewards: AchieveData[0].traceRewards});
            }
            
        });

        realm2.write(()=> {
            GameData[0].heart = GameData[0].heart + reward;
        });
        this.setState({blueHeart: GameData[0].heart});
        this.tada();
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
                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                        </Image>
                        <View style={style.pesoCoin}>
                            <Text style={{
                                color: 'white',
                                fontSize: screenWidth * 0.018,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}>{this.state.blueHeart}</Text>
                        </View>
                    </Animatable.View>

                    { this.state.firstQuizList && 
                        <View style={style.storeList}>
                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? LahatSulatin :
                                    CollectedAll} style={style.image}></Image>

                                { this.state.traceScripts < 17 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.traceScripts == 17) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}  
                                    onPress={()=> {
                                        this.traceReward(1, 5);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x 5'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? DilawTisaStore :
                                    YellowChalk} style={style.image}></Image>
                                
                                { !this.state.yellowChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.yellowReward && this.state.yellowChalk) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}  
                                    onPress={()=> {
                                        this.traceReward(2, 5);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x 5'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '100%', height: '10%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? PulaTisaStore :
                                    RedChalk} style={style.image}></Image>
                                
                                { !this.state.redChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.redReward  && this.state.redChalk) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}  
                                    onPress={()=> {
                                        this.traceReward(3, 5);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x 5'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? AsulTisaStore :
                                    BlueChalk} style={[style.image, {
                                    //opacity: 0.7,
                                }]}></Image>

                                { !this.state.blueChalk &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.blueReward && this.state.blueChalk) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}  
                                    onPress={()=> {
                                        this.traceReward(4, 5);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x 5'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    }

                    { this.state.secondQuizList && 
                        <View style={style.storeList}>
                            <View style={style.storeItem}>
                                <Image source={//this.state.language == 'Filipino' ? SampuTama :
                                    TenTraced} style={style.image}></Image>

                                { this.state.scriptTraced < 10 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.tenTraced && this.state.scriptTraced >= 10) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}  
                                    onPress={()=> {
                                        this.traceReward(5, 3);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x 3'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={//this.state.language == 'Filipino' ? DalawampuTama :
                                    TwentyFiveTraced} style={style.image}></Image>
                                
                                { this.state.scriptTraced < 25 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.twentyFiveTraced && this.state.scriptTraced >= 25) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}   
                                    onPress={()=> {
                                        this.traceReward(6, 7);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x 7'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '100%', height: '10%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={//this.state.language == 'Filipino' ? LimampuTama :
                                    FiftyTraced} style={style.image}></Image>
                                
                                { this.state.scriptTraced < 50 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.fiftyTraced && this.state.scriptTraced >= 50) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}   
                                    onPress={()=> {
                                        this.traceReward(7, 10);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
                                        </Image>
                                        <View style={style.pesoCoin}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: screenWidth * 0.018,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}>{' x10'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={//this.state.language == 'Filipino' ? DaanTama :
                                    HundredTraced} style={[style.image, {
                                    //opacity: 0.7,
                                }]}></Image>

                                { this.state.scriptTraced < 100 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.hundredTraced && this.state.scriptTraced >= 100) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}   
                                    onPress={()=> {
                                        this.traceReward(8, 15);
                                    }}> 
                                        <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                        </Image>
                                        <Image source={BlueHeartIcon} style={style.CoinStyle}>
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


export default withNavigation(TraceAchievement);