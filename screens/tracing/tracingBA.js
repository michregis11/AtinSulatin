import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions,
    Image, TouchableOpacity, StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation';

import BAYBAYIN_BA from '../images/toTraceScripts/BAYBAYIN_BA.png';

import TRACED_BA from '../images/tracedScripts/TRACED_BA.png';
import Blue_TRACED_BA from '../images/tracedScripts/traced_Blue/Blue_TRACED_BA.png';
import Red_TRACED_BA from '../images/tracedScripts/traced_Red/Red_TRACED_BA.png';
import Yellow_TRACED_BA from '../images/tracedScripts/traced_Yellow/Yellow_TRACED_BA.png';

import MenuContainer from '../images/MenuIcon.png';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {success} from '../introScreen';

const tracedColorFirst = [TRACED_BA, Yellow_TRACED_BA, Blue_TRACED_BA, Red_TRACED_BA];

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const scopeX = screenWidth * 0.04;
const scopeY = screenHeight * 0.05;

var Realm = require('realm');
let realm;

class TracingBAScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor(props) {
        super(props);
        this. state = {
            traced: false,
            toTrace: BAYBAYIN_BA,
            dot1: false,
            dot2: false,
            dot3: false,
            dot4: false,
            dot5: false,
            dot6: false,
            dot7: false,
            dot8: false,
            pesoCoin: '',
            strokeColor: '#FFFFFF',
        },

        this.index = 0;

        // Dots Locations
        this.line1 = [{
            x: screenWidth * 0.42,
            y: screenHeight * 0.82,
        }, {
            x: screenWidth * 0.28,
            y: screenHeight * 0.70,
        }, {
            x: screenWidth * 0.315,
            y: screenHeight * 0.40,
        }, {
            x: screenWidth * 0.395,
            y: screenHeight * 0.23,
        }, {
            x: screenWidth * 0.54,
            y: screenHeight * 0.15,
        }, {
            x: screenWidth * 0.68,
            y: screenHeight * 0.285,
        }, {
            x: screenWidth * 0.73,
            y: screenHeight * 0.58,
        }, {
            x: screenWidth * 0.61,
            y: screenHeight * 0.835,
        }];

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
                
        } else if(this.state.dot4 && !this.state.dot5) {
            this.setState({dot5: 
                ((X >= this.line1[4].x - scopeX && X <= this.line1[4].x + scopeX) && 
                (Y >= this.line1[4].y - scopeY && Y <= this.line1[4].y + scopeY)) ? true : false});
                //alert('5');
        } else if(this.state.dot5 && !this.state.dot6) {
            this.setState({dot6: 
                ((X >= this.line1[5].x - scopeX && X <= this.line1[5].x + scopeX) && 
                (Y >= this.line1[5].y - scopeY && Y <= this.line1[5].y + scopeY)) ? true : false});
                //alert('6');
        } else if(this.state.dot6 && !this.state.dot7) {
            this.setState({dot7: 
                ((X >= this.line1[6].x - scopeX && X <= this.line1[6].x + scopeX) && 
                (Y >= this.line1[6].y - scopeY && Y <= this.line1[6].y + scopeY)) ? true : false});
        
        } else if(this.state.dot7 && !this.state.dot8) {
            this.setState({dot8: 
                ((X >= this.line1[7].x - scopeX && X <= this.line1[7].x + scopeX) && 
                (Y >= this.line1[7].y - scopeY && Y <= this.line1[7].y + scopeY)) ? true : false});
               //alert('8');
        }

        //this.ifTraced();
    }

    ifTraced = () => {
        //alert('end');
        if(!this.state.traced) {
            if(this.state.dot8) {
                this.sound.stop();
                this.sound.play();
                this.setState({toTrace: tracedColorFirst[this.colorIndex], traced: true});
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
            dot6: false, dot7: false, dot8: false, traced: false, toTrace: BAYBAYIN_BA});
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
                {/* <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.82, left: screenWidth * 0.42}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.70, left: screenWidth * 0.28}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.40, left: screenWidth * 0.315}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.23, left: screenWidth * 0.395}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.15, left: screenWidth * 0.54}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.285, left: screenWidth * 0.68}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.58, left: screenWidth * 0.73}]}>
                </View>
                <View style={[style.dot, {position: 'absolute', top: screenHeight * 0.835, left: screenWidth * 0.61}]}>
                </View> */}
            
                {/*
                    this.line1 = [{
                        x: screenWidth * 0.42,
                        y: screenHeight * 0.82,
                    }, {
                        x: screenWidth * 0.28,
                        y: screenHeight * 0.70,
                    }, {
                        x: screenWidth * 0.315,
                        y: screenHeight * 0.40,
                    }, {
                        x: screenWidth * 0.395,
                        y: screenHeight * 0.23,
                    }, {
                        x: screenWidth * 0.54,
                        y: screenHeight * 0.15,
                    }, {
                        x: screenWidth * 0.68,
                        y: screenHeight * 0.285,
                    }, {
                        x: screenWidth * 0.73,
                        y: screenHeight * 0.58,
                    }, {
                        x: screenWidth * 0.61,
                        y: screenHeight * 0.835,
                    }];
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
    traceColor: {
        position: 'absolute',
        width: '70%',
        height: '70%',
    },
    CoinContainerStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    CoinBankStyle: {
        position: 'absolute',
        top: '6%',
        right: '3%',
        width: '12.5%',
        height: '12.5%',
        justifyContent: 'center',
        alignItems: 'center',
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

export default withNavigation(TracingBAScreen);