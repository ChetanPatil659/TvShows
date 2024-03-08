import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { BORDERRADIUS, COLOR, FONTSIZE, SPACING } from '../themes/theme';

const CastCard = (props) => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_24}
            : props.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
        {maxWidth: props.cardWidth, marginBottom: 28},
      ]}>
      <Image
        source={{uri: props.imagePath}}
        style={[styles.cardImage, {width: props.cardWidth}]}
      />
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {props.subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  title: {
    alignSelf: 'stretch',
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLOR.White,
    textAlign: 'center'
  },
  subtitle: {
    alignSelf: 'stretch',
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLOR.Orange,
    textAlign:'center'
  },
});

export default CastCard;