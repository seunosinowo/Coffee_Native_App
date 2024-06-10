import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { COLORS } from '../theme/theme';
import { ScrollView } from 'react-native';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const DetailsScreen = ({navigation, route}: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
    )[route.params.index];

  return (
    <View style = {styles.ScreenContainer}>
        <StatusBar backgroundColor = {COLORS.primaryBlackHex} />
        <ScrollView
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {styles.ScrollViewFlex}
        >

          <ImageBackgroundInfo 
              EnableBackHandler = {true}
              imagelink_portrait = {ItemOfIndex.imagelink_portrait}
              type = {ItemOfIndex.type}
              id = {ItemOfIndex.id}
              favourite = {ItemOfIndex.favourite}
              name = {ItemOfIndex.name}
              special_ingredient = {ItemOfIndex.special_ingredient}
              ingredient = {ItemOfIndex.ingredient}
              average_rating = {ItemOfIndex.average_rating }
              ratings_count = {ItemOfIndex.ratings_count}
              roasted = {ItemOfIndex.roasted}
              BackHandler = {() => {}}
              ToggleFavourite = {() => {}}
          />

        </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
    ScreenContainer: {
      flex: 1,
      backgroundColor: COLORS.primaryBlackHex,
    },

    ScrollViewFlex: {
      flexGrow: 1,
    }


})