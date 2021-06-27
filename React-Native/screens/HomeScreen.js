import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (props) => {
    const [email,setEmail] = useState("loading")
    const Boiler = async ()=>{
       const token = await AsyncStorage.getItem("token")
     fetch('http://10.0.2.2:3000/',{
     headers:new Headers({
       Authorization:"Bearer "+token
     })
     }).then(res=>res.json())
     .then(data=>{
       console.log(data)
       setEmail(data.email)
     }
     )
    }
 useEffect(()=>{
    Boiler()
 },[])
 

    const logout=(props)=>{
        AsyncStorage.removeItem("token").then(()=>{
            props.navigation.replace("login")
        })
    }
  return (
    <View style={styles.container}>
      
      <Text style={{fontSize:18}}>Your email is {email}</Text>
      
      <Button 
      mode="contained" 
      stlye={{marginLeft:18, marginRight:18, marginTop:50}}
      onPress={() => logout(props)} >
          Logout
        </Button>

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

export default HomeScreen;