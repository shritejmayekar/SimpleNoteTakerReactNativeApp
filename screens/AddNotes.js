import React, { useState } from 'react'
import { View, StyleSheet,ToastAndroid,Platform } from 'react-native'
import { TextInput, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { Loading } from '../components/Loading'
import { UserContext } from '../contexts/UserContext'
import NoteService from '../hooks/useAllCommon'
export function AddNotes({navigation,props}) {
  const { token } = React.useContext(UserContext);

    const [noteTitle, setNoteTitle] = useState('')
    const [noteValue, setNoteValue] = useState('')
    const [loading, setLoading] = React.useState(false);

    
    function onSaveNote() {
        setLoading(true);
        addNote()
      }
      const addNote = () => {
        const payload = {
          title: noteTitle,
          description: noteValue
        }
        NoteService.createAdd(`/api/api/v1/note/`,token,payload)
        .then(response => {
          
          console.log(response.data);
          setLoading(false);
          if (Platform.OS != 'android') {
            ToastAndroid.show("Note Added Successfully", ToastAndroid.SHORT);
  
          } else {
            ToastAndroid.show("Note Added Successfully", ToastAndroid.SHORT);
          }
          navigation.goBack()

         
        })
        .catch(e => {
          setLoading(false);
          if (Platform.OS != 'android') {
            ToastAndroid.show("There is an problem", ToastAndroid.SHORT);
  
          } else {
            ToastAndroid.show("There is an problem", ToastAndroid.SHORT);
          }
          console.log(e);
        });

    }


    return (
        <>
        <Header titleText='Add a new note'  iconButton="close-circle-outline" onPress={()=>{navigation.pop()}}/>
      <View style={styles.container}>
        <TextInput
          label='Add Note Title'
          value={noteTitle}
          mode='outlined'
          onChangeText={setNoteTitle}
          style={styles.title}
        />
        <TextInput
          label='Add Note Description'
          value={noteValue}
          onChangeText={setNoteValue}
          mode='flat'
          multiline={true}
          style={styles.text}
          scrollEnabled={true}
          returnKeyType='done'
          blurOnSubmit={true}
        />
        <Loading loading={loading} />

        <FAB
          style={styles.fab}
          small
          icon='check'
          disabled={noteTitle == '' || noteValue == '' ? true : false}
          onPress={() => {onSaveNote()}}
        />
      </View>            
       </>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    iconButton: {
      backgroundColor: 'rgba(46, 113, 102, 0.8)',
      position: 'absolute',
      right: 0,
      top: 40,
      margin: 10
    },
    title: {
      fontSize: 24,
      marginBottom: 20
    },
    text: {
      height: 300,
      fontSize: 16
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0
    }
  })

