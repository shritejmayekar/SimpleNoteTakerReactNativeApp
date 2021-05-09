import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { UserContext } from '../contexts/UserContext'
import NoteService from '../hooks/useAllCommon'
export function AddNotes({navigation,props}) {
  const { token } = React.useContext(UserContext);

    const [noteTitle, setNoteTitle] = useState('')
    const [noteValue, setNoteValue] = useState('')
    
    function onSaveNote() {
        addNote()
        navigation.goBack()
      }
      const addNote = () => {
        const payload = {
          title: noteTitle,
          description: noteValue
        }
        NoteService.createAdd(`/api/api/v1/note/`,token,payload)
        .then(response => {

          console.log(response.data);
         
        })
        .catch(e => {
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
        <FAB
          style={styles.fab}
          small
          icon='check'
          disabled={noteTitle == '' ? true : false}
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

