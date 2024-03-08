import { Image, ScrollView, StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/Octicons'
import { getMovies } from '../api/apiCalls'
import InputHeader from '../components/InputHeader'
import CategoryHeader from '../components/CategoryHeader'
import { COLOR, FONTSIZE, SPACING } from '../themes/theme'
import MovieCard from '../components/MovieCard'

const {width, height} = Dimensions.get('window')
const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([])
  const [tvSeries, setTvSeries] = useState([])
  
  useEffect(()=>{
    const data = async()=>{
      let response = await getMovies()
      await setMovies(response.splice(0,10))
      await setTvSeries(response.splice(10,20))
      console.log(movies[0].id)
    }
    data()
  },[])

  if (!movies && !tvSeries) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />

        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchAnimeFunction} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLOR.Orange} />
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}
    >

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={()=>{}}/>
      </View>

      <CategoryHeader title={'Popular Shows'} />
      <FlatList
        horizontal
        bounces={true}
        data={movies}
        // snapToInterval={width * 0.7 + SPACING.space_36}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.containerGap36}
        // decelerationRate={0}
        renderItem={
          ({ item, index }) => {
            return (
              <View key={index}>
              <MovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('Details', { id: item.id })
                }}
                cardWidth={width * 0.7}
                isFirst={index == 0 ? true : false}
                isLast={index == 10 - 1 ? true : false}
                title={item.name}
                imagePath={item.image.original}
                genre={item.genres}
                isGenres={true}
                fontSize={FONTSIZE.size_24}
                vote_average={item.rating.average}
                // vote_count={item.popularity}
              />
              </View>
            )
          }
        }
      />

      <CategoryHeader title={'Trending Shows'} />
      <FlatList
        horizontal
        bounces={false}
        data={tvSeries}
        snapToInterval={width * 0.7 + SPACING.space_36}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.containerGap36}
        decelerationRate={0}
        renderItem={
          ({ item, index }) => {
            return (
              <View key={index}>
              <MovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('Details', { id: item.id })
                }}
                cardWidth={width / 3}
                isFirst={index == 0 ? true : false}
                isLast={index == 10 - 1 ? true : false}
                title={item.name}
                imagePath={item.image.original}
                genre={item.genres}
                isGenres={false}
                fontSize={FONTSIZE.size_18}
                vote_average={item.rating.average}
              />
              </View>
            )
          }
        }
      />

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.Black,
    // display: 'flex',
    // flexWrap: 'nowrap'
  },

  scrollViewContainer: {
    flex: 0,
  },

  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28
  },

  containerGap36: {
    gap: SPACING.space_36,
  }
});