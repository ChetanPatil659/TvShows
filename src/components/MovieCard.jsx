import React, { memo } from 'react';
import { Text, View, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native';
import { BORDERRADIUS, COLOR, FONTSIZE, SPACING } from '../themes/theme';
import Icon from 'react-native-vector-icons/FontAwesome'
import star from '../assets/star-fill.png'

const MovieCard = (props) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View style={[styles.container,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? { marginLeft: SPACING.space_36 }
            : props.isLast
              ? { marginRight: SPACING.space_36 }
              : {}
          : {},
        props.shouldMarginatedAround ? { margin: SPACING.space_12 }
          : { maxWidth: props.cardWidth }
      ]}>
        <Image style={[styles.cardImage, { width: props.cardWidth }]} source={{uri: props.imagePath}} />
        <View>
          <View style={styles.rateContainer}>
            <Image source={star}/>
            <Text style={styles.voteText}>
              {props.vote_average}
            </Text>
          </View>
          <Text numberOfLines={1} style={[styles.textStyle, {fontSize: props.fontSize}]}>{props.title}</Text>
          {props.isGenres &&
            <View style={styles.genreContainer}>
                {
                props.genre.map((item, index) => {
                    return (
                    <View key={index} style={styles.genreBox}>
                        <Text style={styles.genreText}>
                        {item}
                        </Text>
                    </View>
                    )
                })
                }
            </View>
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MovieCard);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLOR.Black
  },

  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },

  textStyle: {
    // fontFamily: FONTFAMILY.poppins_regular,
    color: COLOR.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10
  },

  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10
  },

  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLOR.Yellow
  },

  voteText: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White
  },

  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  genreBox: {
    borderColor: COLOR.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
  },

  genreText: {
    color: COLOR.WhiteRGBA75,
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14
  }
});
