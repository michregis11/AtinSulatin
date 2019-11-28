import React from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableWithoutFeedback, BackHandler, AppState,
    Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import { withNavigation } from 'react-navigation';
import * as Animatable from 'react-native-animatable';

handleViewRef = ref => this.view = ref;
  
  bounce = () => this.view.bounce(800);

import ChalkBoard from './images/BGBaybayin5.png';
import CoinContainer from './images/Button-icon.png';

import MenuContainer from './images/MenuIcon.png';
import CoinIcon from './images/Coin-icon.png';
import SettingIcon from './images/Setting-icon.png';

import ExitIcon from './images/Exit-Icon.png';
import StarIcon from './images/Star-icon.png';
import StoreIcon from './images/Store-icon.png';
import AboutIcon from './images/About-icon.png';
import AtinSulatin from './images/AtinSulatin.png';

import MenuFrame from './images/GreenFrameBlank.png';

import Learn from './images/Learn.png';
import Quiz from './images/Quiz.png';
import Trace from './images/Trace.png';
import ChalkBoardTitle from './images/ChalkBoard.png';

import Aralin from './images/filipino/Aralin.png';
import Subok from './images/filipino/SubokMenuTitle.png';
import Sulat from './images/filipino/Sulat.png';
import Pisara from './images/filipino/Pisara.png';

import LockedLevel from './images/Locked-Button-icon.png';
import LockIcon from './images/Lock-icon.png';
import MenuIcon from './images/MenuIcon.png';

import Achievement from './Achievements';
import Setting from './Settings';
import Store from './Store';

import NextIcon from './images/Next-icon.png';
import PrevIcon from './images/Prev-icon.png';

import Sound from 'react-native-sound';
import { sound, error, success, soundPress } from './introScreen';

const screenWidth = Dimensions.get('screen').width;
let Realm = require('realm');
let realm;

class HomeScreen extends React.Component {
    static navigationOptions = {
        header:null,
    }

    constructor() {
        super();
        this.state = {
            menuPressed: false,
            setting: false,
            achievement: false,
            store: false,
            pesoCoin: '',
            lockedTraced: null,
            lockedChalkBoard: null,
            infoNext: true,
            infoPrev: false,
            infoImage: null,
            modeinfoPressed: false,
            tada: '',
            tada2: '',
            setMessage: '',
            language: '',
            appState: AppState.currentState,
            volume: false,
        },

        this.success = success;
        this.error = error;
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
                this.setState({pesoCoin: GameData[0].pesoCoin});
                // alert('Created!    ' + GameData[0].pesoCoin);
            } else {
                // alert(GameData[0].pesoCoin);
                this.setState({pesoCoin: GameData[0].pesoCoin, lockedTraced: !GameData[0].tracing,
                    lockedChalkBoard: !GameData[0].chalkBoard, language: GameData[0].language, 
                    volume: GameData[0].unlockTraceMode});
                    if(GameData[0].unlockTraceMode) {
                        sound.play();
                        sound.setVolume(0.3);
                    } else {
                        sound.setVolume(0);
                        sound.stop();
                    }
                    sound.setNumberOfLoops(-1);
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
        this.soundPress.play();
        this.props.navigation.replace('Intro');
    }


    menuClosePressed = () => {
        this.soundPress.play();
        if(this.state.store || this.state.setting) {
            this.props.navigation.replace('Home');
        } else {
            this.setState({menuPressed: false, setting: false, achievement: false, store: false});
        }
    }

    achievementPressed = () => {
        this.soundPress.play();
        this.setState({achievement: true, menuPressed: true});
    }
    
    settingPressed = () => {
        this.soundPress.play();
        this.setState({setting: true, menuPressed: true});
    }

    storePressed = () => {
        this.soundPress.play();
        this.setState({store: true, menuPressed: true});
    }

    aboutPressed = () => {
        realm = new Realm({ path: 'NavigationDatabase.realm'});
        let NavigationData = realm.objects('NavigationData');
        realm.write(()=> {
            NavigationData[0].fromScreen = 'HomeScreen';
        });
        this.soundPress.play();
        this.props.navigation.push('About');
    }

    gotoTracing = () => {
        this.soundPress.play();
        this.props.navigation.replace('Trace');
    }
    
    gotoChalkBoard = () => {
        this.soundPress.play();
        this.props.navigation.replace('ChalkBoard');
    }

    gotoBaybayin = () => {
        this.soundPress.play();
        this.props.navigation.replace('Baybayin');
    }

    gotoGames = () => {
        this.soundPress.play();
        this.props.navigation.replace('Games');
    }

    gotoAbout = () => {
        realm = new Realm({ path: 'NavigationDatabase.realm'});
        let NavigationData = realm.objects('NavigationData');
        realm3.write(()=> {
            NavigationData[0].fromScreen = 'HomeScreen';
        });
        this.props.navigation.push('About');
    }

    setMessage = (message) => {
        if(message == 1) {
            this.setState({setMessage: this.state.language == 'Filipino' ? 'Buksan muna ang Salita na baitang.' 
            : 'You have to unlock Word mode first.'});
        } else {
            this.setState({setMessage: this.state.language == 'Filipino' ? 'Ang pera mo ay hindi sapat.' 
        : 'You do not have enough peso coins.'});
        }
        setTimeout(()=>{
            this.setState({setMessage: ''});
        }, 2000);
    }

    unlockTraceMode = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(GameData[0].pesoCoin >= 65) {
            if(GameData[0].quizWord) {
                realm.write(()=> {
                    GameData[0].pesoCoin = GameData[0].pesoCoin - 65;
                    GameData[0].tracing = true;
                    this.setState({pesoCoin: GameData[0].pesoCoin, lockedTraced: false,});
                });
                this.success.play();
            } else {
                this.tada(2);
                this.setMessage(1);
            }
            
        } else {
            this.tada(2);
            this.setMessage(2);
        }
    }

    unlockChalkMode = () => {
        realm = new Realm({ path: 'AtinDatabase.realm'});
        let GameData = realm.objects('GameData');
        if(GameData[0].pesoCoin >= 75) {
            if(GameData[0].quizWord) {
                realm.write(()=> {
                    GameData[0].pesoCoin = GameData[0].pesoCoin - 75;
                    GameData[0].chalkBoard = true;
                    this.setState({pesoCoin: GameData[0].pesoCoin, lockedChalkBoard: false,});
                });
                this.success.play();
            } else {
                this.tada(1);
                this.setMessage(1);
            }
            
        } else {
            this.tada(1);
            this.setMessage(2);
        }
    }

    tada = (index) => {
        this.error.play();
        if(index == 1) {
            this.setState({tada: 'tada'});
        } else {
            this.setState({tada2: 'tada'});
        }
        setTimeout(()=>{
            this.setState({tada: '', tada2: ''});
        }, 700);                                                                                                                                                                                                                                                                                                                                                                   
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
            <Image source={AtinSulatin} style={{
                position: 'absolute', bottom: '3%', left: '3%', width: '25%', height: '12.5%', resizeMode: 'contain',
            }}></Image>

            <View style={style.CoinBankStyle}> 
                <Image source={CoinContainer} style={style.CoinContainerStyle}>
                </Image>
                <Image source={CoinIcon} style={style.CoinStyle}>
                </Image>
                <View style={style.pesoCoin}>
                    <Text style={{
                        color: 'white',
                        fontSize: screenWidth * 0.025,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>{this.state.pesoCoin}</Text>
                </View>
            </View>

            <TouchableOpacity style={style.SettingStyle} onPress={this.settingPressed}>
                <Image source={SettingIcon} style={style.SettingIconStyle}>
                </Image>
            </TouchableOpacity>

            <View style={{
                position: 'absolute',
                top: '17.5%', left: '12.5%',
                width: '70%', height: '70%', 
                justifyContent: 'center', alignContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>

                <TouchableOpacity style={{
                    width: '38%', height: '40%',
                }} onPress={this.gotoGames}> 
                    <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                    </Image>
                    <Image source={this.state.language == 'Filipino' ? Subok : Quiz} style={this.state.language == 'Filipino' ? {
                        position: 'absolute',
                        top: '5%',
                        left: '15%',
                        width: '70%',
                        height: '90%',
                        resizeMode: 'contain',
                    } : {
                        position: 'absolute',
                        top: '15%',
                        left: '20%',
                        width: '60%',
                        height: '70%',
                        resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>

                <View style={{width: '5%', height: '45%'}}></View>

                <TouchableOpacity style={{
                    width: '38%', height: '40%',
                }} onPress={this.gotoBaybayin}> 
                    <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                    </Image>
                    <Image source={this.state.language == 'Filipino' ? Aralin : Learn} style={this.state.language == 'Filipino' ? {
                        position: 'absolute',
                        top: '25%',
                        left: '25%',
                        width: '50%',
                        height: '50%',
                        resizeMode: 'contain',
                    }: {
                        position: 'absolute',
                        top: '10%',
                        left: '20%',
                        width: '60%',
                        height: '80%',
                        resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>

                {/* <View style={{width: '10%', height: '45%'}}></View> */}

                <View style={{width: '100%', height: '10%'}}></View>

                {/* <View style={{width: '10%', height: '45%'}}></View> */}

                <View style={{
                    width: '38%', height: '40%',
                }} > 
                    <TouchableOpacity onPress={this.gotoTracing}>
                        <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                        </Image>
                        <Image source={this.state.language == 'Filipino' ? Sulat : Trace} style={this.state.language == 'Filipino' ? {
                            position: 'absolute',
                            top: '25%',
                            left: '25%',
                            width: '50%',
                            height: '50%',
                            resizeMode: 'contain',
                        } : {
                            position: 'absolute',
                            top: '10%',
                            left: '20%',
                            width: '60%',
                            height: '80%',
                            resizeMode: 'contain',
                        }}></Image>
                    </TouchableOpacity>
                    {this.state.lockedTraced &&
                        <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                            <Image source={LockedLevel} style={{ position: 'absolute', top: '-1.5%', left: '-1%',
                                width: '102%', height: '103%', resizeMode: 'stretch'}}>
                            </Image>

                            <Image source={LockIcon} style={{ position: 'absolute', top: '15%', right: '12%',
                                width: '12.5%', height: '24.5%', resizeMode: 'stretch'}}>
                            </Image>
                            
                            <TouchableOpacity style={{ position: 'absolute', top: '67.5%', right: '-2.5%', 
                                width: '35%', height: '35%', }} onPress={this.unlockTraceMode}> 
                                <Animatable.View style={{width: '100%', height: '100%'}} animation={this.state.tada2}>
                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                    </Image>
                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                    </Image>
                                    <View style={style.pesoCoin}>
                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.02,
                                            justifyContent: 'center', alignContent: 'center', }}>65</Text>
                                    </View>
                                </Animatable.View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                <View style={{width: '5%', height: '45%'}}></View>

                <View style={{
                    width: '38%', height: '40%',
                }}> 
                    <TouchableOpacity onPress={this.gotoChalkBoard}>
                        <Image source={CoinContainer} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}>
                        </Image>
                        <Image source={this.state.language == 'Filipino' ? Pisara : ChalkBoardTitle} style={{
                            position: 'absolute',
                            top: '20%',
                            left: '20%',
                            width: '60%',
                            height: '60%',
                            resizeMode: 'contain',
                        }}></Image>
                    </TouchableOpacity>
                    {this.state.lockedChalkBoard &&
                        <View style={{ position: 'absolute', width: '100%', height: '100%', }}>
                            <Image source={LockedLevel} style={{ position: 'absolute', top: '-1.5%', left: '-1%',
                                width: '102%', height: '103%', resizeMode: 'stretch'}}>
                            </Image>

                            <Image source={LockIcon} style={{ position: 'absolute', top: '15%', right: '12%',
                                width: '12.5%', height: '24.5%', resizeMode: 'stretch'}}>
                            </Image>
                            
                            <TouchableOpacity style={{ position: 'absolute', top: '67.5%', right: '-2.5%', 
                                width: '35%', height: '35%', }} onPress={this.unlockChalkMode}> 
                                <Animatable.View style={{width:'100%', height: '100%'}} animation={this.state.tada}>
                                    <Image source={MenuIcon} style={style.CoinContainerStyle}>
                                    </Image>
                                    <Image source={CoinIcon} style={style.CoinStyle}>
                                    </Image>
                                    <View style={style.pesoCoin}>
                                        <Text style={{ color: 'white', fontSize: screenWidth * 0.02,
                                            justifyContent: 'center', alignContent: 'center', }}>75</Text>
                                    </View>
                                </Animatable.View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                    
                    <View style={{width: '100%', height: '2.5%',}}></View>
                    
                </View>

            

            <TouchableOpacity style={style.SideMenuStyle} 
                onPress={this.storePressed}> 
                <Image source={MenuContainer} style={style.ImageStyle}>
                </Image>
                <Image source={StoreIcon} style={{
                    width: '60%', height: '50%', position: 'absolute', top: '25%', left: '20%', resizeMode: 'contain'
                }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={[style.SideMenuStyle, {top: '47.5%'}]}
                onPress={this.achievementPressed}> 
                <Image source={MenuContainer} style={style.ImageStyle}>
                </Image>
                <Image source={StarIcon} style={{
                    width: '60%', height: '50%', position: 'absolute', top: '25%', left: '20%', resizeMode: 'contain'
                }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={[style.SideMenuStyle, {top: '70%'}]}
                onPress={this.aboutPressed}> 
                <Image source={MenuContainer} style={style.ImageStyle}>
                </Image>
                <Image source={AboutIcon} style={{
                    width: '60%', height: '50%', position: 'absolute', top: '25%', left: '20%', resizeMode: 'contain'
                }}></Image>
            </TouchableOpacity>

            {/* Menu Buttons, Settings, Store, Achievement */}
            { this.state.menuPressed && 
                <View style={[style.achievement,]}>

                    {/* Exit Back Background Button, Black */}
                    <TouchableWithoutFeedback onPress={this.menuClosePressed}>
                        <View style={style.background}>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Achievement Menu */}
                    {this.state.achievement &&
                        <Achievement/>
                    }

                    {/* Setting Menu */}
                    {this.state.setting && 
                        <Setting />
                    }

                    {/* Store Menu */}
                    {this.state.store && 
                        <Store />
                    }

                    <View style={{
                        position: 'absolute',
                        top: '12.5%',
                        right: '17%',
                        width: '6%',
                        height: '8%',
                    }}>
                        {/* Exit Menu Icon Button */}
                        <TouchableOpacity onPress={this.menuClosePressed}>
                            <Image source={ExitIcon} style={style.ImageStyle}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            }

                    { this.state.modeinfoPressed && 
                        <View style={{ position: 'absolute', top: '0%', width: '100%', height: '100%', }}>
                            <TouchableWithoutFeedback style={style.background} onPress={this.closeMode}>
                                <View style={style.background}></View>
                            </TouchableWithoutFeedback>
                            <View style={{ position: 'absolute', top: '15%', left: '25%', width: '50%', height: '70%', }}>
                                <Image source={MenuFrame} style={style.image}>
                                </Image>
                                <Image source={this.state.infoImage} style={{
                                    position: 'absolute',
                                    width: '60%',
                                    height: '70%',
                                    top: '20%',
                                    left: '20%',
                                    resizeMode: 'stretch',
                                }}>
                                </Image>

                                { this.state.infoNext && 
                                    <TouchableOpacity style={{
                                        position: 'absolute',
                                        bottom: '7%',
                                        right: '5%',
                                        width: '8%',
                                        height: '12%',
                                    }} onPress={this.closeMode}>
                                        <Image source={NextIcon} style={style.ImageStyle}></Image>
                                    </TouchableOpacity>
                                }

                                { this.state.infoPrev && 
                                    <TouchableOpacity style={{
                                        position: 'absolute',
                                        bottom: '7%',
                                        left: '5%',
                                        width: '8%',
                                        height: '12%',
                                    }} onPress={this.closeMode}>
                                        <Image source={PrevIcon} style={style.ImageStyle}></Image>
                                    </TouchableOpacity>
                                }

                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    top: '3%',
                                    right: '5%',
                                    width: '6%',
                                    height: '9%',
                                }} onPress={this.closeMode}>
                                    <Image source={ExitIcon} style={style.ImageStyle}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                <Text style={{
                    position: 'absolute',
                    bottom: '8%',
                    left: '28%',
                    width: '40%',
                    color: 'white',
                    fontSize: screenWidth * 0.018,
                    textAlign: 'center',
                }}>
                    {this.state.setMessage}
                </Text>
        </ImageBackground>
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
    achievement: {
        position: 'absolute',
        top: '0%',
        width: '100%',
        height: '100%',
    },
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
    },
    CoinBankStyle: {
        position: 'absolute',
        top: '6%',
        left: '3%',
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
    SettingStyle: {
        position: 'absolute',
        top: '6%',
        right: '2%',
        width: '10%',
        height: '15%',
    },
    SettingIconStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    SideMenuStyle: {
        position: 'absolute',
        top: '25%',
        right: '5%',
        width: '10%',
        height: '20%',
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


export default withNavigation(HomeScreen);