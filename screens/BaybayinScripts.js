import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions,
    Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { withNavigation } from 'react-navigation';

import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';

import BaybayinFrame from './images/Baybayin-Frame.png';

import A from './images/scripts/A.png';
import EI from './images/scripts/EI.png';
import OU from './images/scripts/OU.png';
import BA from './images/scripts/BA.png';
import KA from './images/scripts/KA.png';
import DA from './images/scripts/DA.png';
import GA from './images/scripts/GA.png';
import HA from './images/scripts/HA.png';
import LA from './images/scripts/LA.png';
import MA from './images/scripts/MA.png';
import NA from './images/scripts/NA.png';
import NGA from './images/scripts/NGA.png';
import PA from './images/scripts/PA.png';
import SA from './images/scripts/SA.png';
import TA from './images/scripts/TA.png';
import WA from './images/scripts/WA.png';
import YA from './images/scripts/YA.png';

import {soundPress} from './introScreen';

class BaybayinScriptScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    scriptsPressed = () => {
        this.setState({scripts: true});
    }
    scriptsClosePressed = () => {
        this.soundPress.play();
        this.setState({scripts: false});
        this.setState({firstScripts: true, 
            secondScripts: false});
    }

    nextScriptListPressed = () => {
        this.soundPress.play();
        this.setState({firstScripts: this.state.firstScripts ? false : true, 
            secondScripts: this.state.secondScripts ? false : true});
    }

    constructor() {
        super();
        this.state = {
            scripts: false,
            firstScripts: true,
            secondScripts: false,
        },
        this.soundPress = soundPress;
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={style.menu}>
            <Image source={BaybayinFrame} style={[style.image, {position: 'absolute'}]}>
            </Image>

            {/* Script List, First List*/}
            { this. state.firstScripts && 
                <View style={style.scriptListContainer}>
                    <View style={style.scriptList}>
                        <View style={style.scriptListRow}>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={A} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>
                                <Image source={EI} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={OU} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={[style.scriptListRow,]}>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={BA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>
                                <Image source={KA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={DA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={style.scriptListRow}>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={GA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>
                                <Image source={HA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={LA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* First Script, Next Icon */}
                    <TouchableOpacity style={[style.scriptNextPrevBtn, {right: '-3%'}]}
                        onPress={this.nextScriptListPressed}>
                        <Image source={NextIcon} style={style.ImageStyle}></Image>
                    </TouchableOpacity>
                </View>
            }

            {/* Script List, Second List*/}
            { this. state.secondScripts && 
                <View style={style.scriptListContainer}>
                    <View style={style.scriptList}>
                        <View style={style.scriptListRow}>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={MA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>
                                <Image source={NA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={NGA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={[style.scriptListRow,]}>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={PA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%', marginRight: '5%',}}>
                                <Image source={SA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={TA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={[style.scriptListRow,]}>
                            <TouchableOpacity style={{ width: '20%', height: '100%', }}>
                                <Image source={WA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '20%', height: '100%', marginLeft: '5%'}}>
                                <Image source={YA} style={style.scriptIcon}></Image>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    {/* Second Script, Prev Icon */}
                    <TouchableOpacity style={[style.scriptNextPrevBtn, {left: '-3%'}]}
                        onPress={this.nextScriptListPressed}>
                        <Image source={PrevIcon} style={style.ImageStyle}></Image>
                    </TouchableOpacity>
                </View>
            }
        </View>
        );
    }
}

const style = StyleSheet.create({
    scriptNextPrevBtn: {
        position: 'absolute',
        bottom: '5%',
        width: '20%',
        height: '20%',
    },
    scriptListRow: {
//        borderWidth: 1,
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    scriptList: {
        position: 'absolute',
        top: '5%',
        left: '10%',
        flexDirection: 'row',
//        borderWidth: 1,
        width: '80%',
        height: '90%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
    },
    scriptListContainer: {
        position: 'absolute',
        top: '16%',
        left: '2%',
        width: '96%',
        height: '80%',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    scriptIcon: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    scriptBtn: {
        position: 'absolute',
        bottom: '6%',
        right: '3%',
        width: '12.5%',
        height: '12.5%',
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
    BaybayinStyle: {
        position: 'absolute',
        top: '15%',
        left: '25%',
        width: '50%',
        height: '70%',
    },
    
    ImageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default withNavigation(BaybayinScriptScreen);