import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, BackHandler,
    Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import { withNavigation } from 'react-navigation';

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';
import LockedLevel from './images/Locked-Button-icon.png';
import LockIcon from './images/Lock-icon.png';

import CoinIcon from './images/Coin-icon.png';
import HeartIcon from './images/Heart-icon.png';
import BlueHeartIcon from './images/BlueHeartIcon.png';
import BackIcon from './images/Back-Icon.png';
import ExitIcon from './images/Exit-Icon.png';
import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';

import SciptsButton from './images/ScriptsButton.png';

import MenuFrame from './images/GreenFrameBlank.png';

import MenuIcon from './images/MenuIcon.png';
import OkayIcon from './images/Okay-icon.png';

const screenWidth = Dimensions.get('screen').width;
var Realm = require('realm');
let realm;

class GameScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            
        }

        this.setMessageFIL = 'Magandang araw! Sa pagsusulit na ito, dito masusubok kung gaano mo na';
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
                if(GameData[0].langaue == 'Filipino') {
                    this.setState({setMessage: this.setMessageFIL});
                } else if(GameData[0].langaue == 'English') {

                } else {
                    
                }
                
            }
        });
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
          });
    }

    render() {
        StatusBar.setHidden(true);
        return (
            <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                <View style={{ position: 'absolute', top: '15%', left: '25%', 
                width: '50%', height: '60%', justifyContent: 'center'}}>
                    <Image source={MenuFrame} style={style.image}>
                    </Image>
                    <Text numberOfLines={3} style={{
                        position: 'absolute',
                        top: '25%',
                        left: '5%',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '90%',
                        fontSize: screenWidth * 0.032,
                        color: 'white',
                    }}>{this.state.setMessage}</Text>
                </View>

                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: '30%',
                    left: '46%',
                    width: '8%',
                    height: '12.5%',
                }} onPress={this.closeMessage}>
                    <Image source={CoinContainer} style={[style.ImageStyle, {resizeMode: 'stretch'}]}>
                    </Image>
                    <Image source={OkayIcon} style={[style.ImageStyle, {
                        position: 'absolute', 
                        width: '70%', 
                        height:'70%',
                        top: '15%',
                        left: '15%',
                    }]}>
                    </Image>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    
    ImageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});

export default withNavigation(GameScreen);