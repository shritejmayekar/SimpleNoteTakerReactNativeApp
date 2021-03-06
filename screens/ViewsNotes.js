import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, ToastAndroid, FlatList, Image, TouchableOpacity } from 'react-native'
import { Text, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { IconButton } from '../components/IconButton'
import { Loading } from '../components/Loading'
import { SearchBar } from '../components/SearchBar'
import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import NoteService from '../hooks/useAllCommon';
export function ViewNotes({ navigation }) {

  const [notes, setNotes] = useState([])
  const { logout } = React.useContext(AuthContext);
  const { token } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [searchparam, setSearch] = useState('');
  let newNoteList = "";
  if (searchparam != "") {
    newNoteList = notes.filter(note => note.title.toLowerCase().includes(searchparam.toLowerCase()))
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      retrieveNotes();
    });
    return unsubscribe;
  }, [navigation]);
  const retrieveNotes = () => {
    setLoading(true);
    NoteService.getAll(`/api/api/v1/note/`, token)
      .then(response => {
        setNotes(response.data.results);
        console.log(response.data.results);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };


  const deleteNote = (id) => {

    const newList = notes.filter((item) => item.id !== id);
    NoteService.removeData(`/api/api/v1/note/${id}/`, token)
      .then(response => {
        console.log(response.data);
        setNotes(newList);
        if (Platform.OS != 'android') {
          ToastAndroid.show("Note is Successfully Deleted", ToastAndroid.SHORT);

        } else {
          ToastAndroid.show("Note is Successfully Deleted", ToastAndroid.SHORT);
        }
      })
      .catch(e => {
        console.log(e);
      })
  };


  const createTwoButtonAlert = (id) =>
    Alert.alert(
      "Delete Note",
      "Do you really want to delete note ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => { deleteNote(id) } }
      ]
    );

  function renderDashBoard({ item: note }) {

    return (<TouchableOpacity onPress={() => { navigation.navigate("UpdateNote", { "noteId": note.id }) }} >
      <View style={[styles.listItem, styles.shadow]}>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{note.title}</Text>
          <Text numberOfLines={4} ellipsizeMode='tail'>{note.description}</Text>
        </View>
        <TouchableOpacity onPress={
          () => {
            createTwoButtonAlert(note.id)
          }
        }
          style={[{ backgroundColor: '#60DBC5', borderRadius: 10, width: 30, height: 30, alignItems: 'center' }]}>
          <Image source={require('../assets/trash.png')} style={{ width: 20, height: 20, margin: 5 }} />

        </TouchableOpacity>
      </View>
    </TouchableOpacity>

    )

  }
  return (
    <>
      <Header titleText='My Note Taker' iconButton='log-out-outline' onPress={logout} />

      <View style={styles.container}>
        {notes.length === 0 ? (<View />) : (<SearchBar
          placeholder="Search Note"
          value={searchparam}
          onChangeText={(searchparam) => setSearch(searchparam)}

        />)
        }

        {notes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any notes</Text>
          </View>
        ) : (<FlatList
          data={searchparam == "" ? notes : newNoteList}
          renderItem={renderDashBoard}
          keyExtractor={note => `${note.id}`}



        />
        )}
        <Loading loading={loading} />

        <FAB
          style={styles.fab}
          small
          icon='plus'
          label='Add new note'
          onPress={() =>
            navigation.navigate('AddNotes')
          }
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4, },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },

  listItem: {
    margin: 10,
    padding: 10,
    maxHeight: 300,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  }
})

