import React, { useState,useEffect } from 'react'
import { View, StyleSheet,ToastAndroid,Platform } from 'react-native'
import { TextInput, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { Loading } from '../components/Loading'
import { UserContext } from '../contexts/UserContext'
import NoteService from '../hooks/useAllCommon'
export function UpdateNote({route,navigation}) {
  const { token } = React.useContext(UserContext);

    const [noteTitle, setNoteTitle] = useState('')
    const [noteValue, setNoteValue] = useState('')
    const [loading, setLoading] = React.useState(false);
    const {noteId} = route.params
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          retrieveNotes();
        });
        return unsubscribe;
      }, [navigation]);
      const retrieveNotes = () => {
        setLoading(true);
        NoteService.getAll(`/api/api/v1/note/${noteId}/`, token)
          .then(response => {
            console.log(response.data);
            setNoteValue(response.data.description);
            setNoteTitle(response.data.title);
            setLoading(false);
          })
          .catch(e => {
            console.log(e);
            setLoading(false);
          });
      };
    function onUpdateNote() {
        setLoading(true);
        updateNote()
      }
      const updateNote = () => {
        const payload = {
          title: noteTitle,
          description: noteValue
        }
        NoteService.update(`/api/api/v1/note/${noteId}/`,token,payload)
        .then(response => {
          
          console.log(response.data);
          setLoading(false);
          if (Platform.OS != 'android') {
            ToastAndroid.show("Note Updated Successfully", ToastAndroid.SHORT);
  
          } else {
            ToastAndroid.show("Note Updated Successfully", ToastAndroid.SHORT);
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
        <Header titleText='Update a new note'  iconButton="close-circle-outline" onPress={()=>{navigation.pop()}}/>
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
          onPress={() => {onUpdateNote()}}
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

