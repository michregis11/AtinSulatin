import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions,
    Image, TouchableOpacity, StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation';

import StoreFrame from './images/BGBaybayinMenu.png';
import TindahanFrame from './images/TindahanBG.png';

import MenuIcon from './images/MenuIcon.png';
import CoinContainer from './images/Button-icon.png';

import BlueHeartContainer from './images/store/BlueHeartStore.png';
import BlueChalkContainer from './images/store/BlueChalkStore.png';
import RedChalkContainer from './images/store/RedChalkStore.png';
import YellowChalkContainer from './images/store/YellowChalkStore.png';

import AsulPusoStore from './images/store/AsulPusoStore.png';
import AsulTisaStore from './images/store/AsulTisaStore.png';
import PulaTisaStore from './images/store/PulaTisaStore.png';
import DilawTisaStore from './images/store/DilawTisaStore.png';

import MenuContainer from './images/MenuIcon.png';
import CoinIcon from './images/Coin-icon.png';
import LockIcon from './images/Star-icon.png';

import BlueHeartIcon from './images/BlueHeartIcon.png';
import * as Animatable from 'react-native-animatable';
import {success, error,} from './introScreen';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;

class StoreScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            pesoCoin: '0',
            blueHeart: '',
            tada: '',
            message: '',
            language: 'Filipino',
            redChalk: null,
            blueChalk: null,
            yellowChalk: null,
        };

        this.error = error;
        this.success = success;
    }

    tada = (tada) => {
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
        }
        
        if(tada != 2 && tada != 1) {
            this.error.stop();
            this.error.play();
        } else {
            this.success.stop();
            this.success.play();
        }

        setTimeout(()=>{
            this.setState({tada: '', tada2: '', tada3: '', tada4: '', tada5: '', tada6: ''});
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
                this.setState({pesoCoin: GameData[0].pesoCoin, blueHeart: GameData[0].heart,
                    redChalk: !GameData[0].chalkRed, blueChalk: !GameData[0].chalkBlue, 
                    yellowChalk: !GameData[0].chalkYellow, language: GameData[0].language});
            }
        });
    }


    buyItem = (item) => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        let realm2 = new Realm({ path: 'AchievementDatabase.realm'});
        let AchieveData = realm2.objects('AchieveData');
        
        if(item == 1) {
            if(GameData[0].pesoCoin >= 5) {
                realm.write(()=> {
                    GameData[0].pesoCoin = GameData[0].pesoCoin - 5;
                    GameData[0].heart = GameData[0].heart + 3;
                    this.setState({pesoCoin: GameData[0].pesoCoin, blueHeart: GameData[0].heart});
                });
                this.tada(2);
            } else {
                
                this.setMessage(1);
                this.tada(3);
            }
        } else if(GameData[0].tracing) {
                if(item == 2) {
                    if( GameData[0].pesoCoin >= 55) {
                        realm.write(()=> {
                            GameData[0].pesoCoin = GameData[0].pesoCoin - 55;
                            GameData[0].chalkYellow = true;
                            this.setState({pesoCoin: GameData[0].pesoCoin, yellowChalk: false,});
                        });
                        realm2.write(()=> {
                            AchieveData[0].traceRewards = AchieveData[0].traceRewards + 1;
                        });
                        this.tada(1);
                    } else {
                        this.setMessage(1);
                        this.tada(4);
                    }
                } else if(item == 3) {
                    if( GameData[0].pesoCoin >= 45) {
                        realm.write(()=> {
                            GameData[0].pesoCoin = GameData[0].pesoCoin - 45;
                            GameData[0].chalkRed = true;
                            this.setState({pesoCoin: GameData[0].pesoCoin, redChalk: false,});
                        });
                        realm2.write(()=> {
                            AchieveData[0].traceRewards = AchieveData[0].traceRewards + 1;
                        });
                        this.tada(1);
                    } else {
                        this.setMessage(1);
                        this.tada(5);
                    }
                } else if(item == 4) {
                    if( GameData[0].pesoCoin >= 35) {
                        realm.write(()=> {
                            GameData[0].pesoCoin = GameData[0].pesoCoin - 35;
                            GameData[0].chalkBlue = true;
                            this.setState({pesoCoin: GameData[0].pesoCoin, blueChalk: false,});
                        });
                        realm2.write(()=> {
                            AchieveData[0].traceRewards = AchieveData[0].traceRewards + 1;
                        });
                        this.tada(1);
                    } else {
                        this.setMessage(1);
                        this.tada(6);
                    }
                } 
        } else {
            this.tada(item + 2);
            this.setMessage(2);
        }
    }

    setMessage = (message) => {
        if(message == 1) {
            this.setState({message: this.state.language == 'Filipino' ? 'Ang pera mo ay hindi sapat.' 
            : 'You do not have enough peso coins.'});
        } else {
            this.setState({message: this.state.language == 'Filipino' ? 'Buksan muna ang Sulat na baitang.' 
            : 'You have to unlock Tracing level first.'});
        }
        setTimeout(()=>{
            this.setState({message: ''});
        }, 2000);
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={style.menu}>
                <Image source={this.state.language == 'Filipino' ? TindahanFrame : StoreFrame} style={style.image}>
                </Image>
                <View style={{
                    position: 'absolute',
                    top: '16%',
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

                    <Animatable.View style={[style.CoinBankStyle, {left: '1%'}]} animation={this.state.tada}> 
                        <Image source={CoinContainer} style={style.CoinContainerStyle}>
                        </Image>
                        <Image source={CoinIcon} style={style.CoinStyle}>
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

                    <Animatable.View style={[style.CoinBankStyle, {right: '1%'}]} animation={this.state.tada2}> 
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

                    <View style={style.storeList}>
                        
                        <View style={style.storeItem}>
                            <Image source={this.state.language == 'Filipino' ? AsulPusoStore :
                                BlueHeartContainer} style={style.image}></Image>
                            <TouchableOpacity style={{ position: 'absolute', top: '67.5%', right: '-12.5%', 
                                width: '35%', height: '45%', }} onPress={()=>{
                                    this.buyItem(1);
                                }}> 
                                <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada3}>
                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                    </Image>
                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                    </Image>
                                    <View style={style.pesoCoin}>
                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.018,
                                            justifyContent: 'center', alignContent: 'center', }}>5</Text>
                                    </View>
                                </Animatable.View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '10%', height: '42%', }}></View>

                        <View style={style.storeItem}>
                            <Image source={this.state.language == 'Filipino' ? DilawTisaStore :
                                YellowChalkContainer} style={style.image}></Image>
                            
                            { this.state.yellowChalk &&
                                <TouchableOpacity style={{ position: 'absolute', top: '67.5%', right: '-12.5%', 
                                width: '35%', height: '45%', }} onPress={()=>{
                                    this.buyItem(2);
                                }}> 
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
                            }

                            { !this.state.yellowChalk &&
                                <View style={style.soldView}>
                                    <Image source={LockIcon} style={style.lockIcon}></Image>
                                </View>
                            }
                        </View>

                        <View style={{ width: '100%', height: '10%', }}></View>

                        <View style={style.storeItem}>
                            <Image source={this.state.language == 'Filipino' ? PulaTisaStore :
                                RedChalkContainer} style={style.image}></Image>
                            
                            { this.state.redChalk && 
                                <TouchableOpacity style={{ position: 'absolute', top: '67.5%', right: '-12.5%', 
                                width: '35%', height: '45%', }} onPress={()=>{
                                    this.buyItem(3);
                                }}> 
                                    <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada5}>
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
                            }

                            { !this.state.redChalk &&
                                <View style={style.soldView}>
                                    <Image source={LockIcon} style={style.lockIcon}></Image>
                                </View>
                            }
                        </View>

                        <View style={{ width: '10%', height: '42%', }}></View>

                        <View style={style.storeItem}>
                            <Image source={this.state.language == 'Filipino' ? AsulTisaStore :
                                BlueChalkContainer} style={[style.image, {
                                //opacity: 0.7,
                            }]}></Image>

                            { this.state.blueChalk && 
                                <TouchableOpacity style={{ position: 'absolute', top: '67.5%', right: '-12.5%', 
                                width: '35%', height: '45%', }} onPress={()=>{
                                    this.buyItem(4);
                                }}> 
                                    <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada6}>
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
                            }

                            { !this.state.blueChalk &&
                                <View style={style.soldView}>
                                    <Image source={LockIcon} style={style.lockIcon}></Image>
                                </View>
                            }
                        </View>
                        </View>

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
    }
});

export default withNavigation(StoreScreen);