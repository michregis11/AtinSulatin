import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions,
    Image, TouchableOpacity, StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation';

import BAYBAYIN from '../images/toTraceScripts/BAYBAYIN_HA.png';

import TRACED from '../images/tracedScripts/TRACED_HA.png';
import Blue_TRACED from '../images/tracedScripts/traced_Blue/Blue_TRACED_HA.png';
import Red_TRACED from '../images/tracedScripts/traced_Red/Red_TRACED_HA.png';
import Yellow_TRACED from '../images/tracedScripts/traced_Yellow/Yellow_TRACED_HA.png';

const tracedColorThird = [TRACED, Yellow_TRACED, Blue_TRACED, Red_TRACED];

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {success} from '../introScreen';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const scopeX = screenWidth * 0.04;
const scopeY = screenHeight * 0.05;
 
let Realm = require('realm');
let realm;

class TracingHAScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor(props) {
        super(props);
        this. state = {
            toTrace: BAYBAYIN,
            dot1: false,
            dot2: false,
            dot3: false,
            dot4: false,
            dot5: false,
            dot6: false,
            dot7: false,
            dot8: false,
            traced: false,
            pesoCoin: '',
            strokeColor: '#FFFFFF',
            sound1: false,
        },

        this.index = 0;

        // Dots Locations
        this.line1 = [{
            x: screenWidth * 0.30,
            y: screenHeight * 0.56,
        }, {
            x: screenWidth * 0.45,
            y: screenHeight * 0.57,
        }, {
            x: screenWidth * 0.60,
            y: screenHeight * 0.42,
        }, {
            x: screenWidth * 0.70,
            y: screenHeight * 0.46,
        }, ];
        
        this.colorIndex = 0;
        this.strokeColorList = ['#FFFFFF', '#FFEA00', '#3DD9FA', '#DA2626'];
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
                this.setState({pesoCoin: GameData[0].pesoCoin});
                // alert('Created!    ' + GameData[0].pesoCoin);
            } else {
                // alert(GameData[0].pesoCoin);
                this.setState({pesoCoin: GameData[0].pesoCoin,
                    strokeColor: this.strokeColorList[GameData[0].traceColorIndex],});
                    this.colorIndex = GameData[0].traceColorIndex;
            }
        });
    }

    scriptTrace =  (X, Y) => {
        if(!this.state.dot1) {
            if((X >= this.line1[0].x - scopeX && X <= this.line1[0].x + scopeX) && 
            (Y >= this.line1[0].y - scopeY && Y <= this.line1[0].y + scopeY)) {
                this.setState({dot1: true});
            }
        } else if(this.state.dot1 && !this.state.dot2) {
            this.setState({dot2: 
                ((X >= this.line1[1].x - scopeX && X <= this.line1[1].x + scopeX) && 
                (Y >= this.line1[1].y - scopeY && Y <= this.line1[1].y + scopeY)) ? true : false});
                
        } else if(this.state.dot2 && !this.state.dot3) {
            this.setState({dot3: 
                ((X >= this.line1[2].x - scopeX && X <= this.line1[2].x + scopeX) && 
                (Y >= this.line1[2].y - scopeY && Y <= this.line1[2].y + scopeY)) ? true : false});
                //alert('3');
                //alert('2' + this.state.dot2);
        } 
        
        else if(this.state.dot3 && !this.state.dot4) {
            this.setState({dot4: 
                ((X >= this.line1[3].x - scopeX && X <= this.line1[3].x + scopeX) && 
                (Y >= this.line1[3].y - scopeY && Y <= this.line1[3].y + scopeY)) ? true : false});
                
        } 
    }

    ifTraced = () => {
        //alert('end');
        if(!this.state.traced) {
            if(this.state.dot4) {
                if(!this.state.sound1) {
                    this.sound.stop();
                    this.sound.play();
                    this.setState({sound1: true});
                }
                this.setState({toTrace: tracedColorThird[this.colorIndex], traced: true});
                realm = new Realm({ path: 'AtinDatabase.realm'});
                let GameData = realm.objects('GameData');
                realm.write(()=> {
                    GameData[0].pesoCoin = GameData[0].pesoCoin + 1;
                    this.setState({pesoCoin: GameData[0].pesoCoin});
                });
                realm = new Realm({ path: 'AchievementDatabase.realm'});
                let AchieveData = realm.objects('AchieveData');
                realm.write(()=> {
                    AchieveData[0].traced = AchieveData[0].traced + 1;
                    if(AchieveData[0].traced == 10 && !AchieveData[0].tracedFifty) {
                        AchieveData[0].traceRewards = AchieveData[0].traceRewards + 1;
                    } else if(AchieveData[0].traced == 25 && !AchieveData[0].tracedHundred) {
                        AchieveData[0].traceRewards = AchieveData[0].traceRewards + 1;
                    } else if(AchieveData[0].traced == 50 && !AchieveData[0].tracedTwoHundred) {
                        AchieveData[0].traceRewards = AchieveData[0].traceRewards + 1;
                    } else if(AchieveData[0].traced == 100 && !AchieveData[0].tracedFiveHundred) {
                        AchieveData[0].traceRewards = AchieveData[0].traceRewards + 1;
                    } 
                });
                //alert('end');
            } else {
                this.clearBoard();
            }
        }
    }

    clearBoard = () => {
        this.setState({dot1: false, dot2: false, dot3: false, dot4: false, dot5: false, 
            dot6: false, dot7: false, dot8: false, toTrace: BAYBAYIN});
            //alert(this.state.dot1 + '  :  cleared');
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={style.backView}>
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
                {/* <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.56, left: screenWidth * 0.30}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.57, left: screenWidth * 0.45}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.42, left: screenWidth * 0.60}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.46, left: screenWidth * 0.70}]}>
                </View> */}
            
                {/*
                    this.line1 = [{
                        x: screenWidth * 0.30,
                        y: screenHeight * 0.56,
                    }, {
                        x: screenWidth * 0.45,
                        y: screenHeight * 0.57,
                    }, {
                        x: screenWidth * 0.60,
                        y: screenHeight * 0.42,
                    }, {
                        x: screenWidth * 0.70,
                        y: screenHeight * 0.46,
                    }, ];
                */}
                <View style={style.canvas} >
                    <View style={style.BaybayinStyle}>
                        <Image source={this.state.toTrace} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}></Image>
                    </View>
                <RNSketchCanvas
                        user={'clear'}
                        containerStyle={{position: 'absolute', 
                            width: '100%',
                            height: '100%',}}
                        canvasStyle={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                        }}
                        strokeColor={this.state.strokeColor}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={screenWidth * 0.035}
                        onStrokeChanged={(X, Y)=>{
                            this.scriptTrace(X, Y);
                        }}
                        
                        onStrokeEnd={()=>{
                            this.ifTraced();
                        }}
                            />
                </View>
            </View>
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
    backView: {
        position: 'absolute', top: '0%', width: '100%', height: '100%'
    },
    dot: {
        width: '1.5%',
        height: '3%',
        backgroundColor: 'yellow',
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
        top: '5%',
        left: '20%',
        width: '60%',
        height: '90%',
    },
    
    ImageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default withNavigation(TracingHAScreen);