import React, { memo } from 'react';
import { Text, View, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native';
import { BORDERRADIUS, COLOR, FONTSIZE, SPACING } from '../themes/theme';
import Icon from 'react-native-vector-icons/FontAwesome'
import search from '../assets/search.png'

const SubMovieCard = (props) => {
    return (
        <TouchableOpacity onPress={()=>props.cardFunction()}>
          <View style={[styles.container, 
              props.shouldMarginatedAtEnd 
                  ? props.isFirst 
                      ? {marginLeft: SPACING.space_36} 
                      : props.isLast 
                      ? {marginRight: SPACING.space_36} 
                      :{}
              : {},
              props.shouldMarginatedAround ? {margin: SPACING.space_12}
              : {maxWidth: props.cardWidth}
          ]}>
              <Image style={[styles.cardImage,{width:props.cardWidth}]} source={{uri:props.imagePath || 'https://news.aut.ac.nz/__data/assets/image/0006/92328/placeholder-image10.jpg'}}/>
              <Text numberOfLines={1} style={[styles.textStyle, {width: props.cardWidth}]}>{props.title}</Text>
          </View>
        </TouchableOpacity>
    );
};

export default memo(SubMovieCard);

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    backgroundColor: COLOR.Black
  },

  cardImage: {
    aspectRatio: 2/3,
    borderRadius: BORDERRADIUS.radius_10,
  },

  textStyle: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color:COLOR.White,
    textAlign:'center',
    paddingVertical: SPACING.space_10
  },

});
