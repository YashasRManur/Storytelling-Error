import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Platform ,Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import StoryCard from './StoryCard'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { FlatList } from 'react-native-gesture-handler'

let customFonts = {
    'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')
}

let stories = require('./temp_stories.json')

export default class Feed extends Component {

    constructor () {
        super();
        this.state = {
            fontsLoaded: false
        }
    }
    componentDidMount() {
        this.loadFont();
    }

    loadFont = async() => {
        await Font.loadAsync(customFonts)
        this.setState ({
            fontsLoaded: true
        })
    }

    keyExtractor = (item, index) => {
        index.toString();
    }

    renderItem = ({item:story}) => {
        return <StoryCard 
            story = {story} 
            navigation = {this.props.navigation}/>
    }
    render() {

        if (!this.state.fontsLoaded) {
            return <AppLoading/>
        }
        else {
            return (
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeArea}/>
                        <View style = {styles.appTitle}>
                        <View style = {styles.appIcon}>
                                <Image source = {require('../assets/logo.png')} style = {styles.iconImage}/>
                            </View>
                            <View style = {styles.appTitleTextContainer}>
                                <Text style = {styles.appTitleText}>Story Telling APP</Text>
                            </View>
                            
                        </View>
                        <View style = {styles.cardContainer}>
                            <FlatList 
                                data = {stories}
                                renderItem = {this.renderItem}
                                keyExtractor = {this.keyExtractor}/>
                        </View>
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    safeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    cardContainer: {
      flex: 0.93
    }
  });
  