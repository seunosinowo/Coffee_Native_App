import { StatusBar, StyleSheet, Text, View, ScrollView, Touchable, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';


const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++){
    if (temp[data[i].name] == undefined){
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift("All")
  return categories;
};

const getCoffeeList = (category: string, data: any ) => {
  if (category == "All"){
    return data;
  } else{
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  };
};

const HomeScreen = () => {
  const CoffeeList = useStore ((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('')
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: categories[1],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  ); 

  const tabBarHeight = useBottomTabBarHeight();
  console.log("sorted coffee = ", sortedCoffee.length)

  
  return (
    <View style = {styles.ScreenContainer}>
      <StatusBar backgroundColor = {COLORS.primaryBlackHex} />

      <ScrollView showsVerticalScrollIndicator = {false} 
      contentContainerStyle = {styles.ScrollViewFlex} >

        {/* App Header */}
        <HeaderBar />

        <Text style = {styles.ScreenTitle}>Find the best {'\n'} coffee for you</Text>
        
        {/* Search Input */}
        <View style = {styles.InputContainerComponent}>
          <TouchableOpacity onPress = {() => {}}>
              <CustomIcon 
                  style = {styles.InputIcon}
                  name = 'search'
                  size = {FONTSIZE.size_18}
                  color = {
                    searchText.length > 0
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryLightGreyHex
                  }
              />

          </TouchableOpacity>
          <TextInput 
            placeholder='Find Your Coffee '
            value = {searchText}
            onChangeText = {text => setSearchText(text)}
            placeholderTextColor = {COLORS.primaryLightGreyHex}
            style = {styles.TextInputContainer}
          />
        </View>
 
        {/* Category Scroller */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator = {false}
          contentContainerStyle = {styles.CategoryScrollViewStyle}>

          {categories.map ((data, index) => (
              <View
                  key = {index.toString()}
                  style = {styles.CategoryScroolViewContainer}
              >
                <TouchableOpacity 
                        style = {styles.CategoryScroolViewItem}
                        onPress = {() => {
                          setCategoryIndex({index: index, category: categories[index]});
                          setSortedCoffee([
                            ...getCoffeeList(categories[index],CoffeeList),
                          ]);
                        }}>
                    <Text
                      style = {[
                        styles.CategoryText,
                        categoryIndex.index == index ? {color: COLORS.primaryOrangeHex} : {},
                      ]}>
                        {data}
                    </Text>

                {categoryIndex.index == index ? (
                  <View style = {styles.ActivityCategory} />
                ) : (
                  <></>
                )}

                </TouchableOpacity>

              </View>
          ))}
        </ScrollView>

          {/* Coffee FlatList */}
          <FlatList 
              horizontal
              showsHorizontalScrollIndicator = {false}
              data = {sortedCoffee}
              contentContainerStyle = {styles.FlatListContainer}
              keyExtractor = {item => item.id}
              renderItem = {({item}) => {
                return (
                      <TouchableOpacity>
                          <CoffeeCard 
                              id = {item.id}
                              index = {item.index}
                              type = {item.type}
                              rosted = {item.rosted}
                              imagelink_square = {item.imagelink_square}
                              name = {item.name}
                              special_ingredient = {item.special_ingredient}
                              average_rating = {item.average_rating}
                              price = {item.price}
                              buttonPressHandler = {() => {}}
                          />
                      </TouchableOpacity>
                )}}
          />

          {/* Beans FlatList */}



      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },

  ScrollViewFlex: {
    flexGrow: 1,
  },

  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },

  InputContainerComponent: {
    flexDirection: "row",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
  },

  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },

  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },

  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },

  CategoryScroolViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },

  CategoryScroolViewItem: {
    alignItems: "center",
  },

  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },

  ActivityCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },

  FlatListContainer: {
    gap: SPACING.space_20,
  },





})

export default HomeScreen