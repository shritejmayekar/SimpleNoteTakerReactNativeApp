import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

const SearchBar = (props) => {
    // const [searchQuery, setSearchQuery] = React.useState('');
    // const onChangeSearch = query => setSearchQuery(query);
    // console.log(keyword)
    return(
        <View style={styles.backgroundStyle}>
            <Feather name="search" style={styles.iconStyle}/>
            <TextInput 
                  {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below

            // placeholder="Search" 
            style={styles.inputStyle}
            // value={keyword}
            key="random1"
            // onChange={(e) => setKeyword(e.target.value)}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor:'#e6e6e6',
        height:50,
        borderRadius:30,
        marginHorizontal:15,
        flexDirection:'row',
        marginBottom:10,

        marginLeft: 45,
        marginRight: 45,
        marginVertical: 30
    },
    inputStyle: {
        flex:1,
        fontSize:18
    },
    iconStyle: {
        fontSize:30,
        alignSelf:'center',
        marginHorizontal:15,
    }
});

export {SearchBar};