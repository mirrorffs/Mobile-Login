import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = (props) => {

    const detectLogin=async()=>{
        const token = await AsyncStorage.getItem('token')
        if(token){
          props.navigation.replace("home")
        }
        else{
            props.navigation.replace("login")
        }
    }
    useEffect(()=>{

        detectLogin()
        
      },[])

  return (
    <View style={styles.container}>
      
      <ActivityIndicator size="large" color="blue"/>
      <StatusBar style="auto" />
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent:"center",
      alignItems:"center"
      
    }
  })

  export default LoadingScreen;


