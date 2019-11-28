import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions,
    Image, TouchableOpacity, StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation';

import Sound from 'react-native-sound';

import {sound, soundPress} from './introScreen';

import BackIcon from './images/Back-Icon.png';
import Eraser from './images/ERASER.png';
import ExitIcon from './images/Exit-Icon.png';
import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';

import CoinIcon from './images/Coin-icon.png';
import StarIcon from './images/Star-icon.png';
import BlueHeart from './images/BlueHeartIcon.png';
import HeartIcon from './images/Heart-icon.png';
import GreenHeartIcon from './images/GreenHeart-icon.png';
import TraceIcon from './images/tracedScripts/trace_Blue.png';

import MenuContainer from './images/MenuIcon.png';

import MenuFrame from './images/SettingFrame.png';
const screenWidth = Dimensions.get('screen').width;

class SettingScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            langauge: '',
            switch: false,
            statistics: false,
            star: 0,
            heart: 0,
            blueHeart: 0,
            pesoCoin: 0,
            perfectScore: 0,
            tracedScripts: 0,
        },
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
                this.setState({language: GameData[0].language, switch: GameData[0].unlockTraceMode,
                    pesoCoin: GameData[0].coinEarned,});
                    if(GameData[0].unlockTraceMode) {
                        sound.setVolume(0.3);
                        sound.play();
                    } else {
                        sound.setVolume(0);
                        sound.stop();
                    }
                    sound.setNumberOfLoops(-1);
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
                this.setState({perfectScore: AchieveData[0].perfect, star: AchieveData[0].achieve,
                tracedScripts: AchieveData[0].traced, heart: AchieveData[0].wrong, 
                blueHeart: AchieveData[0].correct, });
            }
        });
    }

    showStatistics = () => {
        this.soundPress.stop();
        this.soundPress.play();
        this.setState({statistics: !this.state.statistics});
    }

    bgSwitch = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(this.state.switch) {
            sound.setVolume(0);
            sound.stop();
            this.setState({switch: false});
            realm.write(()=> {
                GameData[0].unlockTraceMode = false;
            });
        } else {
            sound.setVolume(0.3);
            sound.stop();
            sound.play();
            this.setState({switch: true});
            realm.write(()=> {
                GameData[0].unlockTraceMode = true;
            });
        }
        this.soundPress.stop();
        this.soundPress.play();
    }

    languageSwitch = () =>{
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        this.setState({language: GameData[0].language});
        realm.write(()=> {
            GameData[0].language = this.state.language == 'Filipino' ? 'English' : 'Filipino';
            this.setState({language: GameData[0].language});
        });
        this.soundPress.stop();
        this.soundPress.play();
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={style.menu}>
                <Image source={MenuFrame} style={style.image}>
                </Image>
                
                { !this.state.statistics && 
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0%',
                    }}>
                        <Text style={style.backgroundMusic} numberOfLines={2}>
                            Background Music:
                        </Text>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            top: '26%',
                            left: '35%',
                            width: '12%',
                            height: '15%',
                            //borderWidth: 1,
                        }} onPress={this.bgSwitch}>
                            <Image source={MenuContainer} style={style.image}>
                            </Image>
                            <Text style={style.statistics} numberOfLines={2}>
                                {this.state.switch ? 'ON' : 'OFF'}
                            </Text>
                        </TouchableOpacity>
    
                        
                        
                        <Text style={[style.soundFX, {top: '55%', right: '15%', width: '30%', textAlign: 'center'}]} numberOfLines={3}>
                            ** Credits **
                        </Text>
                        <Text style={[style.soundFX, {top: '65%', right: '15%', width: '50%', textAlign: 'right',
                            fontSize: screenWidth * 0.025}]} numberOfLines={3}>
                            Music: Freesfx.co.uk
                        </Text>
                        <Text style={[style.soundFX, {top: '75%', right: '5%', width: '50%', textAlign: 'center',
                            fontSize: screenWidth * 0.025}]} numberOfLines={3}>
                            SoundFX: Orangefreesounds.com
                        </Text>
                        <Text style={style.soundFX} numberOfLines={2}>
                            {this.state.language == 'Filipino' ? 'Istatistika:' : 'Statistics:'}
                        </Text>

                        <Text style={style.soundFX} numberOfLines={2}>
                            {this.state.language == 'Filipino' ? 'Istatistika:' : 'Statistics:'}
                        </Text>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            top: '34%',
                            right: '20%',
                            width: '20%',
                            height: '16%',
                            //borderWidth: 1,
                        }} onPress={this.showStatistics}>
                            <Image source={MenuContainer} style={style.image}>
                            </Image>
                            <Text style={style.statistics} numberOfLines={2}>
                                {this.state.language == 'Filipino' ? 'Tignan' : 'View'}
                            </Text>
                            
                        </TouchableOpacity>
    
                        <Text style={style.language} numberOfLines={2}>
                            {this.state.language == 'Filipino' ? 'Linguwahe:' : 'Language:'}
                        </Text>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            bottom: '16%',
                            left: '35%',
                            width: '12%',
                            height: '15%',
                            //borderWidth: 1,
                        }} onPress={this.languageSwitch}>
                            <Image source={MenuContainer} style={style.image}>
                            </Image>
                            <Text style={style.statistics} numberOfLines={2}>
                                {this.state.language == 'Filipino' ? 'ENG' : 'FIL'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

                {this.state.statistics &&
                    <TouchableOpacity style={[style.CoinBankStyle, {left: '2%', top: '18%'}]}
                        onPress={this.showStatistics}>
                        <Image source={BackIcon} style={style.ImageStyle}></Image>
                    </TouchableOpacity>
                }

                { this.state.statistics &&
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0%',
                    }}>

                        <Text style={{
                            position: 'absolute',
                            top: '18%',
                            left: '25%',
                            width: '50%',
                            color: 'white',
                            fontSize: screenWidth * 0.035,
                            textAlign: 'center',
                        }}>{this.state.language == 'Filipino' ? 'Istatistika' : 'Statistics'}</Text>
                        <View style={{
                            position: 'absolute',
                            width: '90%',
                            height: '80%',
                            top: '16%',
                            left: '5%',
                            //borderWidth: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>

                            <View style={{ width: '100%', height: '15%', }}> 
                            </View>
                            <View style={{ width: '25%', height: '25%', }}> 
                                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                </Image>
                                <Image source={CoinIcon} style={style.CoinStyle}>
                                </Image>
                                <View style={style.pesoCoin}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: screenWidth * 0.025,
                                        textAlign: 'center',
                                    }}>{this.state.pesoCoin}</Text>
                                </View>
                            </View>

                            <View style={{ width: '25%', height: '25%', }}> 
                                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                </Image>
                                <Image source={TraceIcon} style={style.CoinStyle}>
                                </Image>
                                <View style={style.pesoCoin}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: screenWidth * 0.025,
                                        textAlign: 'center',
                                    }}>{this.state.tracedScripts}</Text>
                                </View>
                            </View>
                            
                            <View style={{ width: '25%', height: '25%', }}> 
                                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                </Image>
                                <Image source={StarIcon} style={style.CoinStyle}>
                                </Image>
                                <View style={style.pesoCoin}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: screenWidth * 0.025,
                                        textAlign: 'center',
                                    }}>{this.state.star}</Text>
                                </View>
                            </View>

                            <View style={{ width: '100%', height: '10%', }}> 
                            </View>


                            <View style={{ width: '25%', height: '25%', }}> 
                                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                </Image>
                                <Image source={GreenHeartIcon} style={style.CoinStyle}>
                                </Image>
                                <View style={style.pesoCoin}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: screenWidth * 0.025,
                                        textAlign: 'center',
                                    }}>{this.state.perfectScore}</Text>
                                </View>
                            </View>
                            
                            <View style={{ width: '25%', height: '25%', }}> 
                                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                </Image>
                                <Image source={BlueHeart} style={style.CoinStyle}>
                                </Image>
                                <View style={style.pesoCoin}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: screenWidth * 0.025,
                                        textAlign: 'center',
                                    }}>{this.state.blueHeart}</Text>
                                </View>
                            </View>

                            <View style={{ width: '25%', height: '25%', }}> 
                                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                                </Image>
                                <Image source={HeartIcon} style={style.CoinStyle}>
                                </Image>
                                <View style={style.pesoCoin}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: screenWidth * 0.025,
                                        textAlign: 'center',
                                    }}>{this.state.heart}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
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
        width: '12%',
        height: '15%',
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
    statistics: {
        position: 'absolute',
        left: '9%',
        top: '16%',
        width: '80%',
        color: 'white',
        textAlign: 'center',
        fontSize: screenWidth * 0.025,
    },
    language: {
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '25%',
        color: 'white',
        textAlign: 'right',
        fontSize: screenWidth * 0.03,
    },
    backgroundMusic: {
        position: 'absolute',
        top: '25%',
        left: '5%',
        width: '25%',
        color: 'white',
        textAlign: 'right',
        fontSize: screenWidth * 0.03,
    },
    soundFX: {
        position: 'absolute',
        width: '25%',
        top: '22%',
        right: '20%',
        color: 'white',
        textAlign: 'right',
        fontSize: screenWidth * 0.03,
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

export default withNavigation(SettingScreen);