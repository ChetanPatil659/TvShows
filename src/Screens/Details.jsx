import { ActivityIndicator, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BORDERRADIUS, COLOR, FONTSIZE, SPACING } from '../themes/theme'
import { getDetailsById, getEpisodesDetails } from '../api/apiCalls'
import LinearGradient from 'react-native-linear-gradient'
import AppHeader from '../components/AppHeader'
import star from '../assets/star-fill.png'
import play from '../assets/play-mini-fill.png'

const { width, height } = Dimensions.get('window')

const Details = ({ navigation, route }) => {

  const [deatils, setDetails] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [showEpisodes, setShowEpisodes] = useState(false)
  const [episodes, setEpisodes] = useState([])


  console.log(route.params.id)

  useEffect(() => {
    const data = async () => {
      setIsLoading(true)
      let response = await getDetailsById(route.params.id)
      await setDetails(response)

      let episodeList = await getEpisodesDetails(route.params.id)
      await setEpisodes(episodeList)
      // console.log(episodes[0].episodes.season)
      setIsLoading(false)
    }
    data()
  }, [])

  if (isLoading) (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={COLOR.Orange} />
    </View>
  )

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>

      <View>
        <ImageBackground
          source={{
            uri: deatils?.image?.original || 'https://news.aut.ac.nz/__data/assets/image/0006/92328/placeholder-image10.jpg'
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLOR.BlackRGB10, COLOR.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{ uri: deatils?.image?.original || 'https://news.aut.ac.nz/__data/assets/image/0006/92328/placeholder-image10.jpg' }}
          style={styles.cardImage}
        />
      </View>

      <View>
        <Text style={styles.title}>{deatils?.name}</Text>
        <View style={styles.genreContainer}>
          {deatils?.genres.map((item, index) => {
            return (
              <View style={styles.genreBox} key={index}>
                <Text style={styles.genreText}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.details}>
        <TouchableOpacity
          onPress={() => setShowEpisodes(false)}
        >
          <Text style={{ color: COLOR.White, width: width / 2, textAlign: 'center', fontSize: FONTSIZE.size_20, borderBottomWidth: showEpisodes ? 0 : 2, borderBottomColor: COLOR.Orange, padding: 10 }}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowEpisodes(true)}
        >
          <Text style={{ color: COLOR.White, width: width / 2, textAlign: 'center', fontSize: FONTSIZE.size_20, borderBottomWidth: showEpisodes ? 2 : 0, borderBottomColor: COLOR.Orange, padding: 10 }}>Episodes</Text>
        </TouchableOpacity>
      </View>

      {showEpisodes ?
        <View style={{ flexDirection: 'column', gap: 6, marginHorizontal: 6 }}>
          {episodes.map((item, index) => (
            <View style={{ backgroundColor: COLOR.WhiteRGBA15, paddingHorizontal: 10, paddingTop: 10, borderRadius: BORDERRADIUS.radius_15 }}>
              <Text style={styles.episodeHeader}>Season  {index + 1}</Text>
              {item.episodes.map((item, index) => (
                <View style={{ padding: 16, borderBottomWidth: 2, borderBottomColor: COLOR.Black, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                  <View>
                    <Text style={{ color: COLOR.WhiteRGBA50 }}>
                      Episode {item.number}
                    </Text>
                    <Text style={{ fontSize: FONTSIZE.size_18, color: COLOR.White }}>{item.name}</Text>
                  </View>
                  <Image source={play}/>
                </View>
                
              ))}
            </View>
          ))}
        </View>
        :
        <View style={styles.infoContainer}>
          <View style={styles.rateContainer}>
            <Image source={star} />
            <Text style={styles.runtimeText}>
              {deatils?.rating?.average || 'NA'}
            </Text>
          </View>
          <Text style={styles.descriptionText}>{deatils?.summary.replace('<p>', "").replace('</p>', '')}</Text>

          <View style={[{ flexDirection: 'row' }, { marginTop: 14 }]}>
            <Text style={styles.descriptionText}>Type :</Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {deatils?.type}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Language :</Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}> {deatils?.language}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Genres : </Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{deatils?.genres.join(', ')}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Status : </Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{deatils?.status}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Airing time : </Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{deatils?.schedule?.time}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Airing days : </Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{deatils?.schedule?.days.join(',')}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Average runtime : </Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{deatils?.averageRuntime}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.descriptionText}>Premiered on : </Text>
            <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{deatils?.premiered}</Text>
          </View>
          {deatils?.ended &&
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.descriptionText}>Ended on : </Text>
              <Text style={[styles.descriptionText, { color: COLOR.Orange }]}>{deatils?.premiered}</Text>
            </View>
          }
        </View>
      }

    </ScrollView>
  )
}

export default Details

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLOR.Black,
    paddingBottom: 15
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: 8
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLOR.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  title: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLOR.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLOR.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLOR.WhiteRGBA75,
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    marginVertical: 14
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLOR.Yellow,
  },
  descriptionText: {
    // fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLOR.Orange,
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  details: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    color: COLOR.White,
    paddingVertical: SPACING.space_12
  },
  episodeHeader: {
    color: COLOR.White,
    padding: 10,
    fontSize: 20,
  }
});