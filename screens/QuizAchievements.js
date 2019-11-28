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

import FiveMistake from './images/achievements/FiveMistakes.png';
import TenMistake from './images/achievements/TenMistakes.png';
import TwentyMistake from './images/achievements/TwentyMistakes.png';
import FiftyMistake from './images/achievements/FiftyMistakes.png';

import FivePerfect from './images/achievements/FivePerfect.png';
import TenPerfect from './images/achievements/TenPerfect.png';
import TwentyPerfect from './images/achievements/TwentyFivePerfect.png';
import FiftyPerfect from './images/achievements/FiftyPerfect.png';

import LimaPerpekto from './images/achievements/LimaPerpekto.png';
import SampuPerpekto from './images/achievements/SampuPerpekto.png';
import DalawampuPerpekto from './images/achievements/DalawampuPerpekto.png';
import LimampuPerpekto from './images/achievements/LimampuPerpekto.png';

import LimaMali from './images/achievements/LimaMalingSagot.png';
import SampuMali from './images/achievements/SampuMalingSagot.png';
import BenteMali from './images/achievements/BenteMalingSagot.png';
import LimampuMali from './images/achievements/LimampuMalingSagot.png';

import SampuTama from './images/achievements/SampuTamangSagot.png';
import DalawampuTama from './images/achievements/DalawampuTamangSagot.png';
import LimampuTama from './images/achievements/LimampuTamangSagot.png';
import DaanTama from './images/achievements/DaanTamangSagot.png';

import CoinIcon from './images/Star-icon.png';
import LockIcon from './images/Lock-icon.png';

import BlueHeartIcon from './images/BlueHeartIcon.png';

import { success, soundPress} from './introScreen';
import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;

class QuizAchievement extends React.Component {
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
            correctNumber: 0,
            wrongNumber: 0,
            perfectScore: 0,
            rewards: 0,
            blueHeart: 0,
            perfectFive: false,
            perfectTen: false,
            perfectTwentyFive: false,
            perfectFifty: false,
            correctTen: false,
            correctTwentyFive: false,
            correctFifty: false,
            correctHundred: false,
            wrongFive: false,
            wrongTen: false,
            wrongTwentyFive: false,
            wrongFifty: false,
            setMessage: false,
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
                this.setState({language: GameData[0].language, blueHeart: GameData[0].heart});
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
                this.setState({perfectScore: AchieveData[0].perfect, correctNumber: AchieveData[0].correct,
                    wrongNumber: AchieveData[0].wrong, perfectFive: !AchieveData[0].perfectFive,
                    perfectTen: !AchieveData[0].perfectTen, perfectTwentyFive: !AchieveData[0].perfectTwentyFive,
                    perfectFifty: !AchieveData[0].perfectFifty, wrongFive: !AchieveData[0].wrongFive,
                    wrongTen: !AchieveData[0].wrongTen, wrongTwentyFive: !AchieveData[0].wrongTwentyFive,
                    wrongFifty: !AchieveData[0].wrongFifty, correctTen: !AchieveData[0].correctTen,
                    correctTwentyFive: !AchieveData[0].correctTwentyFive, correctFifty: !AchieveData[0].correctFifty,
                    correctHundred: !AchieveData[0].correctHundred, rewards: AchieveData[0].quizRewards, });
            }
        });
    }

    nextPressed = () => {
        if(this.state.firstQuizList) {
            this.setState({secondQuizList: true, nextPressed: true, prevPressed: true, 
                firstQuizList: false, thirdQuizList: false});
        } else if(this.state.secondQuizList) {
            this.setState({thirdQuizList: true, nextPressed: false, prevPressed: true, secondQuizList: false});
        }
        this.soundPress.play();
    }

    prevPressed = () => {
        if(this.state.thirdQuizList) {
            this.setState({secondQuizList: true, nextPressed: true, prevPressed: true, 
                firstQuizList: false, thirdQuizList: false});
        } else if(this.state.secondQuizList) {
            this.setState({firstQuizList: true, nextPressed: true, prevPressed: false, secondQuizList: false});
        }
        this.soundPress.play();
    }

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

    perfectReward = (index, reward) => {
        realm = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm.objects('AchieveData');
        if(index == 1) {
            realm.write(()=> {
                AchieveData[0].perfectFive = true;
            });
            this.setState({perfectFive: !AchieveData[0].perfectFive});
        } else if(index == 2) {
            realm.write(()=> {
                AchieveData[0].perfectTen = true;
            });
            this.setState({perfectTen: !AchieveData[0].perfectTen});
        } else if(index == 3) {
            realm.write(()=> {
                AchieveData[0].perfectTwentyFive = true;
            });
            this.setState({perfectTwentyFive: !AchieveData[0].perfectTwentyFive});
        } else if(index == 4) {
            realm.write(()=> {
                AchieveData[0].perfectFifty = true;
            });
            this.setState({perfectFifty: !AchieveData[0].perfectFifty});
        }
        realm.write(()=> {
            AchieveData[0].quizRewards = AchieveData[0].quizRewards - 1;
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
            if(AchieveData[0].quizRewards == 0) {
                this.setState({rewards: 0});
            }
        });

        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
            GameData[0].heart = GameData[0].heart + reward;
        });
        this.setState({blueHeart: GameData[0].heart});
        this.tada();
    }

    wrongReward = (index, reward) => {
        realm = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm.objects('AchieveData');
        if(index == 1) {
            realm.write(()=> {
                AchieveData[0].wrongFive = true;
            });
            this.setState({wrongFive: !AchieveData[0].wrongFive});
        } else if(index == 2) {
            realm.write(()=> {
                AchieveData[0].wrongTen = true;
            });
            this.setState({wrongTen: !AchieveData[0].wrongTen});
        } else if(index == 3) {
            realm.write(()=> {
                AchieveData[0].wrongTwentyFive = true;
            });
            this.setState({wrongTwentyFive: !AchieveData[0].wrongTwentyFive});
        } else if(index == 4) {
            realm.write(()=> {
                AchieveData[0].wrongFifty = true;
            });
            this.setState({wrongFifty: !AchieveData[0].wrongFifty});
        }
        realm.write(()=> {
            AchieveData[0].quizRewards = AchieveData[0].quizRewards - 1;
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
            if(AchieveData[0].quizRewards == 0) {
                this.setState({rewards: 0});
            }
        });

        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
            GameData[0].heart = GameData[0].heart + reward;
        });
        this.setState({blueHeart: GameData[0].heart});
        this.tada();
    }

    correctReward = (index, reward) => {
        realm = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm.objects('AchieveData');
        if(index == 1) {
            realm.write(()=> {
                AchieveData[0].correctTen = true;
            });
            this.setState({correctTen: !AchieveData[0].correctTen});
        } else if(index == 2) {
            realm.write(()=> {
                AchieveData[0].correctTwentyFive = true;
            });
            this.setState({correctTwentyFive: !AchieveData[0].correctTwentyFive});
        } else if(index == 3) {
            realm.write(()=> {
                AchieveData[0].correctFifty = true;
            });
            this.setState({correctFifty: !AchieveData[0].correctFifty});
        } else if(index == 4) {
            realm.write(()=> {
                AchieveData[0].wrongFifty = true;
            });
            this.setState({correctHundred: !AchieveData[0].correctHundred});
        }
        realm.write(()=> {
            AchieveData[0].quizRewards = AchieveData[0].quizRewards - 1;
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
            if(AchieveData[0].quizRewards == 0) {
                this.setState({rewards: 0});
            } else {
                this.setState({rewards: AchieveData[0].quizRewards});
            }
            
        });

        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        realm.write(()=> {
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
                                <Image source={this.state.language == 'Filipino' ? LimaPerpekto :
                                    FivePerfect} style={style.image}></Image>

                                { (this.state.perfectFive && this.state.perfectScore < 5) &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }

                                { (this.state.perfectFive && this.state.perfectScore >= 5) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}
                                    onPress={()=> {
                                        this.perfectReward(1, 6);
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
                                            }}>{' x 6'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? SampuPerpekto :
                                    TenPerfect} style={style.image}></Image>
                                
                                { this.state.perfectScore < 10 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }

                                { (this.state.perfectTen && this.state.perfectScore >= 10) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]} 
                                    onPress={()=> {
                                        this.perfectReward(2, 8);
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
                                            }}>{' x 8'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ width: '100%', height: '10%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? DalawampuPerpekto :
                                    TwentyPerfect} style={style.image}></Image>
                                
                                { this.state.perfectScore < 25 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }

                                { (this.state.perfectTwentyFive && this.state.perfectScore >= 25) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]} 
                                    onPress={()=> {
                                        this.perfectReward(3, 10);
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
                                <Image source={this.state.language == 'Filipino' ? LimampuPerpekto :
                                    FiftyPerfect} style={[style.image, {
                                    //opacity: 0.7,
                                }]}></Image>

                                { this.state.perfectScore < 50 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }

                                { (this.state.perfectFifty && this.state.perfectScore >= 50) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]} 
                                    onPress={()=> {
                                        this.perfectReward(4, 15);
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

                    { this.state.secondQuizList && 
                        <View style={style.storeList}>
                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? SampuTama :
                                    FiveBlueHeart} style={style.image}></Image>

                                { this.state.correctNumber < 10 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.correctTen && this.state.correctNumber >= 10) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}  
                                    onPress={()=> {
                                        this.correctReward(1, 3);
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
                                <Image source={this.state.language == 'Filipino' ? DalawampuTama :
                                    TenBlueHeart} style={style.image}></Image>
                                
                                { this.state.correctNumber < 25 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.correctTwentyFive && this.state.correctNumber >= 25) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}   
                                    onPress={()=> {
                                        this.correctReward(2, 5);
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
                                <Image source={this.state.language == 'Filipino' ? LimampuTama :
                                    TwentyBlueHeart} style={style.image}></Image>
                                
                                { this.state.correctNumber < 50 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.correctFifty && this.state.correctNumber >= 50) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}   
                                    onPress={()=> {
                                        this.correctReward(3, 7);
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

                            <View style={{ width: '10%', height: '42%', }}></View>

                            <View style={style.storeItem}>
                                <Image source={this.state.language == 'Filipino' ? DaanTama :
                                    FiftyBlueHeart} style={[style.image, {
                                    //opacity: 0.7,
                                }]}></Image>

                                { this.state.correctNumber < 100 &&
                                    <View style={style.soldView}>
                                        <Image source={LockIcon} style={style.lockIcon}></Image>
                                    </View>
                                }
                                { (this.state.correctHundred && this.state.correctNumber >= 100) &&
                                    <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}   
                                    onPress={()=> {
                                        this.correctReward(4, 10);
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
                        </View>
                    }

                { this.state.thirdQuizList && 
                    
                    <View style={style.storeList}>
                        <View style={style.storeItem}>
                            <Image source={this.state.language == 'Filipino' ? LimaMali :
                                FiveMistake} style={style.image}></Image>
                            { this.state.wrongNumber < 5 &&
                                <View style={style.soldView}>
                                    <Image source={LockIcon} style={style.lockIcon}></Image>
                                </View>
                            }
                            { (this.state.wrongFive && this.state.wrongNumber >= 5) &&
                                <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}   
                                onPress={()=> {
                                    this.wrongReward(1, 3);
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
                            <Image source={this.state.language == 'Filipino' ? SampuMali :
                                TenMistake} style={style.image}></Image>
                            
                            { this.state.wrongNumber < 10 &&
                                <View style={style.soldView}>
                                    <Image source={LockIcon} style={style.lockIcon}></Image>
                                </View>
                            }
                            { (this.state.wrongTen && this.state.wrongNumber >= 10) &&
                                <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}    
                                onPress={()=> {
                                    this.wrongReward(2, 5);
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
                            <Image source={this.state.language == 'Filipino' ? BenteMali :
                                TwentyMistake} style={style.image}></Image>
                            
                            { this.state.wrongNumber < 25 &&
                                <View style={style.soldView}>
                                    <Image source={LockIcon} style={style.lockIcon}></Image>
                                </View>
                            }
                            { (this.state.wrongTwentyFive && this.state.wrongNumber >= 25) &&
                                <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}    
                                onPress={()=> {
                                    this.wrongReward(3, 7);
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

                        <View style={{ width: '10%', height: '42%', }}></View>

                        <View style={style.storeItem}>
                            <Image source={this.state.language == 'Filipino' ? LimampuMali :
                                FiftyMistake} style={[style.image, {
                                //opacity: 0.7,
                            }]}></Image>

                            { this.state.wrongNumber < 50 &&
                                <View style={style.soldView}>
                                    <Image source={LockIcon} style={style.lockIcon}></Image>
                                </View>
                            }
                            { (this.state.wrongFifty && this.state.wrongNumber >= 50) &&
                                <TouchableOpacity style={[style.CoinBankStyle, {right: '-10%', bottom: '-15%'}]}    
                                onPress={()=> {
                                    this.wrongReward(4, 10);
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


export default withNavigation(QuizAchievement);