import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLOR, FONTSIZE, SPACING } from '../themes/theme';


const CategoryHeader = (props) => {
  return (
    <Text style={styles.text}>{props.title}</Text>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
    text : {
        // fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLOR.White,
        paddingHorizontal: SPACING.space_36,
        paddingVertical: SPACING.space_28
    }
})