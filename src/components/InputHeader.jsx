import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { BORDERRADIUS, COLOR, FONTSIZE, SPACING } from '../themes/theme';
import Icon from 'react-native-vector-icons/FontAwesome'
import search from '../assets/search.png'

const InputHeader = (props) => {
  const [searchText, onChangeText] = useState(undefined)
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => onChangeText(textInput)}
        placeholder='Search'
        placeholderTextColor={COLOR.WhiteRGBA32}
        value={searchText}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => {
            props.searchFunction(searchText)
            props.singleSearchFunction(searchText)
          }
        }
      >
        <Image source={search} />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLOR.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },

  textInput: {
    width: '90%',
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White
  },

  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10
  }
});
