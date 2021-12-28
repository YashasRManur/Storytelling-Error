import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Feed from '../screens/Feed'
import CreateStory from '../screens/CreateStory'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { RFValue } from 'react-native-responsive-fontsize'

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            style = {styles.tabStyle}
            labeled = {false}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === "Feed") {
                        iconName = focused ? 'home' : 'home-outline'
                    } 
                    else if (route.name === "CreateStory") {
                        iconName = focused ? 'add-circle' : 'add-circle-outline'
                    }
                    return <Ionicons style = {styles.icons} name = {iconName} color = {color} size = {size}/>
                }
            })}
            activeColor = 'red'
            inactiveColor = 'gray'
        >
            <Tab.Screen name = "Feed" component = { Feed }/>
            <Tab.Screen name = "CreateStory" component = { CreateStory }/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icons:{
        width: RFValue(50),
        height: RFValue(50)
    },
    tabStyle:{
        backgroundColor: 'blue',
        height: '8%',
        /*borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',*/
        overflow: 'hidden'
    }
})

export default BottomTabNavigator;