import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { BORDERRADIUS, COLOR, FONTSIZE, SPACING } from '../themes/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Pagination = (props) => {
    // console.log(props.search, 'pagination.jsx')
  return (
    <View style={styles.container}>

      {props.currentPage >1 &&
        <Icon style={[styles.iconStyle]} name='arrow-left-drop-circle' onPress={async()=> await props.onPressPrevious()}/>}

      <Text style={styles.headerText}>{props.currentPage}</Text>

      {props.hasNext &&
        <Icon style={[styles.iconStyle]} name='arrow-right-drop-circle' onPress={()=>props.onPressNext()}/>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  iconStyle: {
    color: COLOR.Orange,
    fontSize: FONTSIZE.size_24 * 1.8,
  },
  headerText: {
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: COLOR.White,
    backgroundColor: COLOR.WhiteRGBA15,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8
  },
  iconBG: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLOR.Orange,
    textAlign:'center'
  },
});

export default Pagination;