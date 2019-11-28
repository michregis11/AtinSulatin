import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, BackHandler, AppState,
    Image, TouchableOpacity, StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation';

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';
import CoinIcon from './images/Coin-icon.png';
import BackIcon from './images/Back-Icon.png';
import Eraser from './images/ERASER.png';
import Undo from './images/UNDO.png';

import whiteTrace from './images/tracedScripts/trace_White.png';
import blueTrace from './images/tracedScripts/trace_Blue.png';
import redTrace from './images/tracedScripts/trace_Red.png';
import yellowTrace from './images/tracedScripts/trace_Yellow.png';

import MenuContainer from './images/MenuIcon.png';

import ChalkBoardTitle from './images/screenTitle/ChalkBoardScreenTitle.png';
import PisaraScreenTitle from './images/screenTitle/PisaraScreenTitle.png';

import SciptsButton from './images/ScriptsButton.png';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

import Sound from 'react-native-sound';
import {sound, soundPress} from './introScreen';

const screenWidth = Dimensions.get('screen').width;

class ChalkBoardScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            colorTrace: null,
            strokeColor: '#FFFFFF',
            language: '',
            appState: AppState.currentState,
        },
        this.sound = soundPress;

        this.strokeColorList = ['#FFFFFF', '#FFEA00', '#3DD9FA', '#DA2626'];
        this.index = 0;
        this.traceColorList = [whiteTrace, yellowTrace, blueTrace, redTrace];
        this.colorList =[true, false, false, false];
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
                this.setState({colorTrace: this.traceColorList[GameData[0].traceColorIndex], 
                    language: GameData[0].language,
                    strokeColor: this.strokeColorList[GameData[0].traceColorIndex]});
                    this.colorList[1] = GameData[0].chalkYellow;
                    this.colorList[2] = GameData[0].chalkBlue;
                    this.colorList[3] = GameData[0].chalkRed;
                    this.traceIndex = GameData[0].traceColorIndex;
            }
        });this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
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

    changeTraceColor = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        for(i = GameData[0].traceColorIndex + 1; i <= 4; i++) {
            if(i >= 4) {
                realm.write(()=> {
                    GameData[0].traceColorIndex = 0;
                });
                this.setState({colorTrace: whiteTrace, strokeColor: this.strokeColorList[0]});
                break;
            } else {
                if(this.colorList[i]) {
                    realm.write(()=> {
                        GameData[0].traceColorIndex = i;
                    });
                    this.setState({colorTrace: this.traceColorList[i], strokeColor: this.strokeColorList[i]});
                    break;
                }
            }
        }
        this.sound.play();
    }

    render() {
        StatusBar.setHidden(true);
        return (
        <ImageBackground source={ChalkBoard} style={{flex: 1}}>
            <View style={{position: 'absolute', top: '0%', left: '0%',
                width: '100%', height: '100%', borderWidth: 1}}>
                    <Image source={ChalkBoard} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                    </Image>
            </View>

            <Image source={this.state.language == 'Filipino' ? PisaraScreenTitle : ChalkBoardTitle} style={
                this.state.language == 'Filipino' ? {
                    position: 'absolute', bottom: '5%', left: '0%', width: '20%', height: '10%', resizeMode: 'contain',
                }: {
                    position: 'absolute', bottom: '3.5%', left: '3%', width: '25%', height: '12.5%', resizeMode: 'contain',
                }}></Image>

            {/* <Image source={Blue} style={{
                position: 'absolute',
                top: '20%',
                width: '50%',
                height: '50%',
            }}></Image> */}

            <View style={style.canvas} >
                <RNSketchCanvas
                    user={'noClear'}
                    containerStyle={{position: 'absolute', 
                        width: '100%',
                        height: '100%',
                        }}
                    canvasStyle={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                    strokeColor={this.state.strokeColor}
                    defaultStrokeIndex={0}
                    defaultStrokeWidth={screenWidth * 0.028}
                    onStrokeChanged={(X, Y)=>{
                        
                    }}
                    
                    onStrokeEnd={()=>{
                        
                    }}
                    undoComponent={<Image source={Eraser} style={{
                        width: '100%', height: '100%', resizeMode: 'stretch',
                            }}></Image>}
                    clearComponent={<Image source={Undo} style={{
                        width: '100%', height: '100%', resizeMode: 'stretch',
                            }}></Image>}
                        />
            </View>

            <TouchableOpacity style={style.BackStyle} onPress={this.gotoHome}>
                <Image source={BackIcon} style={style.SettingIconStyle}>
                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={[style.CoinBankStyle, {top: '7%', width: '8%', right: '4%', 
                justifyContent: 'center',
                alignItems: 'center',}]}
                onPress={this.changeTraceColor}> 
                <Image source={MenuContainer} style={style.CoinContainerStyle}>
                </Image>
                <View style={style.traceColor}>
                    <Image source={this.state.colorTrace} style={style.ImageStyle}></Image>
                </View>
            </TouchableOpacity>
        </ImageBackground>
        );
    }
}

const style = StyleSheet.create({
    CoinBankStyle: {
        position: 'absolute',
        top: '6%',
        right: '3%',
        width: '12.5%',
        height: '12.5%',
    },
    CoinContainerStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    traceColor: {
        position: 'absolute',
        width: '60%',
        height: '60%',
    },
    canvas: { 
        position: 'absolute',
        top: '5.1%',
        left: '2.52%',
        width: '95%',
        height: '90%',
    },
    BaybayinStyle: {
        position: 'absolute',
        top: '15%',
        left: '25%',
        width: '50%',
        height: '70%',
    },
    CoinBankStyle: {
        position: 'absolute',
        top: '6%',
        right: '3%',
        width: '12.5%',
        height: '12.5%',
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

export default withNavigation(ChalkBoardScreen);