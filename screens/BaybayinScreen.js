import React from 'react';
import { View, Text, StatusBar, ImageBackground, BackHandler, AppState,
    Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { withNavigation } from 'react-navigation';

import ChalkBoard from './images/BGBaybayin5.png';
import BackIcon from './images/Back-Icon.png';
import Eraser from './images/ERASER.png';
import ExitIcon from './images/Exit-Icon.png';
import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';

import Aralin from './images/screenTitle/AralinScreenTitle.png';
import Learn from './images/screenTitle/LearnScreenTitle.png';

import LearnFirst from './images/filipino/Aralin_first.png';
import LearnSecond from './images/filipino/Aralin_second.png';
import AralUna from './images/filipino/Aralin_panguna.png';
import AralPangawala from './images/filipino/Aralin_pangalawa.png';

import {sound, soundPress} from './introScreen';
import Scripts from './images/ScriptsButton.png';

import BaybayinScripts from './BaybayinScripts';

class BaybayinScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            prev: false,
            next: true,
            language: '',
            page: AralUna,
            showScripts: false,
            appState: AppState.currentState,
        },
        this.sound = soundPress;
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
                this.setState({language: GameData[0].language, page: GameData[0].language == 'Filipino' ? AralUna : LearnFirst});
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
            sound.play(); 
        } else {
            sound.stop();
        }
        this.setState({appState: nextAppState});
    }

    goBack = async () => {
        this.sound.play();
        this.props.navigation.replace('Home');
    }

    gotoHome = () => {
        this.sound.play();
        this.props.navigation.replace('Home');
    }

    prevPressed = () => {
        this.sound.play();
        this.setState({prev: false, next: true, page: this.state.language == 'Filipino' ? AralUna : LearnFirst});
    }

    nextPressed = () => {
        this.sound.play();
        this.setState({prev: true, next: false, page: this.state.language == 'Filipino' ? AralPangawala : LearnSecond});
    }

    closeScripts = () => {
        this.sound.play();
        this.setState({showScripts: false});
    }

    showScripts = () => {
        this.sound.play();
        this.setState({showScripts: true});
    }

    render() {
        StatusBar.setHidden(true);
        return (
        <ImageBackground source={ChalkBoard} style={{flex: 1}}>
            <View style={style.backView}>
                    <Image source={ChalkBoard} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                    </Image>
            </View>

            <Image source={this.state.language == 'Filipino' ? Aralin : Learn} style={this.state.prev ? {
                position: 'absolute', bottom: '4%', right: '-2.5%', width: '25%', height: '10%', resizeMode: 'contain',
            } : {
                position: 'absolute', bottom: '4%', left: '-2.5%', width: '25%', height: '10%', resizeMode: 'contain',
            }}></Image>

            <Image source = {this.state.page} style={{
                position: 'absolute',
                top: '5%',
                left: '10%',
                width: '80%',
                height: '90%',
                resizeMode: 'contain',
            }}></Image>

            {/* Back to Home Button */}
            <TouchableOpacity style={style.BackStyle} onPress={this.gotoHome}>
                <Image source={BackIcon} style={style.SettingIconStyle}>
                </Image>
            </TouchableOpacity>

            {this.state.prev &&
                <TouchableOpacity style={style.prevStyle} onPress={this.prevPressed}>
                    <Image source={PrevIcon} style={style.SettingIconStyle}>
                    </Image>
                </TouchableOpacity>
            }

            {this.state.next &&
                <TouchableOpacity style={style.nextStyle} onPress={this.nextPressed}>
                    <Image source={NextIcon} style={style.SettingIconStyle}>
                    </Image>
                </TouchableOpacity>
            }

                <TouchableOpacity style={{
                    position: 'absolute',
                    top: '6%',
                    right: '3%',
                    width: '12%',
                    height: '15%',
                }} onPress={this.showScripts}>
                    <Image source={Scripts} style={style.ImageStyle}></Image>
                </TouchableOpacity>
            

            { this.state.showScripts && 
                <View style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}>
                    <TouchableWithoutFeedback style={style.closeBackView} onPress={this.closeScripts}>
                        <View style={style.closeBackView}></View>
                    </TouchableWithoutFeedback>
                    
                    <BaybayinScripts/>

                    <TouchableOpacity style={{
                            position: 'absolute',
                            top: '12.5%',
                            right: '18%',
                            width: '4%',
                            height: '8%',
                            resizeMode: 'contain',
                        }} onPress={this.closeScripts}>
                        <Image source={ExitIcon} style={style.ImageStyle}></Image>
                    </TouchableOpacity>
                </View>
            }

        </ImageBackground>
        );
    }
}

const style = StyleSheet.create({
    closeBackView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    prevStyle: {
        position: 'absolute',
        bottom: '6%',
        left: '2%',
        width: '8%',
        height: '11%',
    },
    nextStyle: {
        position: 'absolute',
        bottom: '6%',
        right: '2%',
        width: '8%',
        height: '11%',
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

export default withNavigation(BaybayinScreen);