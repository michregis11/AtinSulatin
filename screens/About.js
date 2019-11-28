import React from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, BackHandler, AppState,
    Image, TouchableOpacity, StyleSheet} from 'react-native';

import { withNavigation } from 'react-navigation'; 

import ChalkBoard from './images/BGBaybayin5.png';
import BackIcon from './images/Back-Icon.png';

import About from './images/AboutDescription.png';
import aboutTitle from './images/screenTitle/AboutScreenTitle.png';
import tungkolTitle from './images/screenTitle/TungkolScreenTitle.png';
import { sound, soundPress } from './introScreen';
let Realm = require('realm');
let realm;

class AboutScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            language: '',
            appState: AppState.currentState,
        },
        this.sound = soundPress;
    }

    gotoHome = () => {
        realm = new Realm({ path: 'NavigationDatabase.realm'});
        let NavigationData = realm.objects('NavigationData');
        this.sound.play();
        if(NavigationData[0].fromScreen == 'IntroScreen') {
            this.props.navigation.replace('Intro');
        } else {
            this.props.navigation.replace('Home');
        }
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
                this.setState({language: GameData[0].language});
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
        this.props.navigation.pop();
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

            <Image source={this.state.language == 'Filipino' ? tungkolTitle : aboutTitle} style={{
                position: 'absolute', bottom: '5%', left: '3%', width: '13%', height: '10%', resizeMode: 'contain',
            }}></Image>
            
            <Image source={About} style={{
                position: 'absolute',
                top: '5%',
                left: '12.5%',
                height: '90%',
                width: '75%',
                resizeMode: 'contain',
            }}>
            </Image>

            <TouchableOpacity style={style.BackStyle} onPress={this.gotoHome}>
                <Image source={BackIcon} style={style.SettingIconStyle}>
                </Image>
            </TouchableOpacity>
        </ImageBackground>
        );
    }
}

const style = StyleSheet.create({
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

export default withNavigation(AboutScreen);