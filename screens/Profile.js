import React, { Component } from "react";
import { StyleSheet, Text, View, Switch, Platform, SafeAreaView, StatusBar, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      lightTheme: true,
      name:'',
      profileImage:'',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async fetchUser() {
      let theme, name, image;
      await firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
      .on("value", function(snapshot) {
          theme = snapshot.val().current_theme;
          name = `${snapshot.val().first_name} ${snapshot.val().last_name}`
          image = snapshot.val().profile_picture
      })
      this.setState({
          lightTheme: theme === 'light'? true: false,
          isEnabled: theme === 'light'? false: true,
          name: name,
          profileImage: image
      })
  }

  toggleSwitch = () => {
      const previous = this.state.isEnabled;
      const theme = this.state.isEnabled? 'light': 'dark';
      var updates = {};
      updates["/users/"+firebase.auth().currentUser.uid+'/current_theme/'] = theme;
      firebase.database().ref().update(updates);
      
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
          <Text>Profile</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});