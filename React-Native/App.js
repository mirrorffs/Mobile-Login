import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
const Stack = createStackNavigator();

const App=({navigation})=> {
  const [isloggedin,setLogged] = useState(null)
  const detectLogin=async()=>{
    const token = await AsyncStorage.getItem('token')
    if(token){
      setLogged(true)
      console.log('hello')
    }
    else{
      setLogged(false)
    }
  }
  
  useEffect(()=>{
  detectLogin()
  
  },[])
    
  
  return (
    
    <NavigationContainer>
    <Stack.Navigator
    headerMode="none">

      <Stack.Screen name="loading" component={LoadingScreen}/>
      <Stack.Screen name="home" component={HomeScreen}/>
      <Stack.Screen name="login" component={LoginScreen}/>
      <Stack.Screen name="signup" component={SignupScreen}/>
      </Stack.Navigator>
  </NavigationContainer>
  
     );
};

export default App;

