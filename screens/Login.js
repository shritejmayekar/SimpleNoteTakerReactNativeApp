import React, { useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity,SafeAreaView,Image } from 'react-native'
import { Text, FAB, List } from 'react-native-paper'
import { Error } from '../components/Error';
import { FilledButton } from '../components/FilledButton';
import Header from '../components/Header'
import {Input} from '../components/Input';
import { Loading } from '../components/Loading';
import { TextButton } from '../components/TextButton';
import {AuthContext} from '../contexts/AuthContext';

export function LoginScreen({ navigation }) {
  const {login} = React.useContext(AuthContext);
  const [emailId, setEmailId] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');



  return (
    <SafeAreaView style={styles.container}>
      
      <Image style={styles.image} source = {require("../assets/icon.png")}/>
      <View style={{alignItems: "center"}}>
             <Text>Note Taking App By Shritej</Text>
      </View>
      <View style={{alignItems: "center"}}>
              <Error error={error} />
      </View>
      <View style={styles.inputView}>
      <Input
        style={styles.TextInput}
        placeholder={'Email Address'}
        keyboardType={'email-address'}
        value={emailId}
        onChangeText={setEmailId}
      />
       
      </View>
      <View style={styles.inputView}>
      <Input
        style={styles.TextInput}
        placeholder={'Password'}
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
       
      </View>
      <FilledButton
        title={'Login'}
        // style={styles.loginButton}
        onPress={async () => {
          try {
            setLoading(true);
            await login(emailId, password);
          } catch (e) {
            console.log(e)
            setError(JSON.stringify(e.message));
            setLoading(false);
          }
        }}
      />
      <TextButton
        title={'Join Now'}
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
      <Loading loading={loading} />

     
    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  },
  listTitle: {
    fontSize: 20,
  },
  card: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRightColor: 'blue'

  },
  image: {
    marginBottom: 40,
    width:100, height:100
  },
  inputView: {
    backgroundColor: "#00ffcc",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    color:'grey',
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
})

