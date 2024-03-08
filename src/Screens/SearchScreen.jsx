import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, SPACING } from '../themes/theme';
import { getSearch, getSingleSearch } from '../api/apiCalls';
import InputHeader from '../components/InputHeader';
import SubMovieCard from '../components/SubMovieCard';
import CategoryHeader from '../components/CategoryHeader';

const { width, height } = Dimensions.get('window')
const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState()
  const [singleSearch, setSingleSearch] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const searchFunction = async (name) => {
    setIsLoading(true)
    let response = await getSearch(name)
    setSearch(response)
    setIsLoading(false)
  }

  const singleSearchFunction = async (name) => {
    setIsLoading(true)
    let response = await getSingleSearch(name)
    setSingleSearch(response)
    setIsLoading(false)
    console.log(singleSearch, 'singlesearch')
  }

  return (
    <ScrollView style={{backgroundColor:COLOR.Black}}>
    <View style={styles.container}>
      <View>
        {isLoading ?
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLOR.Orange} />
          </View>
          :
          <View>
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchFunction} singleSearchFunction={singleSearchFunction} />
            </View>
            {singleSearch &&
              <View>
                <CategoryHeader title="Search" />
                <SubMovieCard
                  shoudlMarginatedAtEnd={false}
                  shouldMarginatedAround={true}
                  cardFunction={() => {
                    navigation.push('Details', { id: singleSearch.id });
                  }}
                  cardWidth={width / 2 - SPACING.space_12 * 2}
                  title={singleSearch.name}
                  imagePath={singleSearch?.image?.original || singleSearch?.image?.medium}
                />
              </View>
            }
            {search  &&
              <ScrollView horizontal={true} contentContainerStyle={{justifyContent:'space-around'}} style={{backgroundColor: COLOR.Black}}>
                <FlatList
                  nestedScrollEnabled
                  data={search}
                  keyExtractor={(item) => item.show.id}
                  bounces={false}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:width}}>
                      <CategoryHeader title="Similar Search" />
                      <View style={{width:10}}></View>
                    </View>
                  }
                  contentContainerStyle={styles.centerContainer}
                  renderItem={({ item, index }) => (
                    <View key={index}>
                      <SubMovieCard
                        shoudlMarginatedAtEnd={false}
                        shouldMarginatedAround={true}
                        cardFunction={() => {
                          navigation.push('Details', { id: item.show.id });
                        }}
                        cardWidth={width / 2 - SPACING.space_12 * 2}
                        title={item.show.name}
                        imagePath={item?.show?.image?.original ? item?.show?.image?.original : item?.show?.image?.medium}
                      />
                    </View>
                  )}
                />
              </ScrollView>
            }
          </View>
        }
      </View>
    </View>
    </ScrollView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: width,
    alignItems: 'center',
    backgroundColor: COLOR.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer: {
    alignItems: 'center',
  },

  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});