import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet,Alert, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen =(props)=> {
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const sendCred= async (props)=>{
        fetch("http://10.0.2.2:3000/signin",{
            method: "POST", 
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "email":email,
                "password":password
            })
        })
        .then(res=>res.json())
        .then(async(data)=>{
            try {
                await AsyncStorage.setItem('token', data.token)
                props.navigation.replace("home")
              } catch (e) {
                  console.log("error",e)
                  Alert(e)
              }
        
    })
}
  return (
    <View>
      <KeyboardAvoidingView behavior="position">
      <StatusBar backgroundColor="blue" barStyle="light-content"/>
      <Text style={{fontSize:40,marginLeft: 18, marginTop:25, color:"#3b3b3b"}}>Welcome</Text>
      <Text style={{fontSize:25,marginLeft: 18, color:"blue"}}>User</Text>
      <View 
      style={{
      borderBottomColor:"blue",
      borderBottomWidth:4,
      borderRadius:10,
      marginRight:179,
      marginLeft: 18,
      marginTop:4
      }}
      />
      <Text style={{fontSize: 20,marginLeft: 18, marginTop:18,marginBottom:18, color:"black"}}>Login</Text>
      <TextInput
      label='Email'
      mode="outlined"
      value={email}
      stlye={{marginLeft:18, marginRight:18, marginTop:18}}
      theme={{colors:{primary:"blue"}}}
      onChangeText={(text)=>setEmail(text)}
      />
      <TextInput
      label='Password'
      mode="outlined"
      secureTextEntry={true}
      value={password}
      stlye={{marginLeft:18, marginRight:18, marginTop:18, marginBottom:18}}
      theme={{colors:{primary:"blue"}}}
      onChangeText={(text)=>setPassword(text)}
      />

      <Button 
      mode="contained" 
      stlye={{marginLeft:18, marginRight:18, marginTop:50}}
      onPress={() => sendCred(props)} >
          Login
        </Button>
      <TouchableOpacity>
        <Text style={{fontSize: 20,marginLeft: 18, marginTop:18,marginBottom:18, color:"black"}}
         onPress={()=>props.navigation.replace("signup")}
         >Don't have an account?</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
      
    </View>
  );
}


export default LoginScreen;