import { StatusBar, StyleSheet, Text, View, ScrollView, Touchable, TouchableOpacity, TextInput, FlatList, Animated, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import BeansData from '../data/BeansData';


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

const HomeScreen = ({navigation}: any) => {
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
  const ListRef: any = useRef<FlatList>();
  //console.log("sorted coffee = ", sortedCoffee.length)

  const searchCoffee = (search: string) => {
    if (search != ''){
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item: any) => 
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  }

  
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

          <TextInput 
            placeholder='Find Your Coffee '
            value = {searchText}
            onChangeText = {text => {
              setSearchText(text)
              searchCoffee(text)
            }}
            placeholderTextColor = {COLORS.primaryLightGreyHex}
            style = {styles.TextInputContainer}
          />

          {searchText.length > 0 ? (
            <TouchableOpacity onPress = {() => {
              resetSearchCoffee();
            }}>
              <CustomIcon 
                  style = {styles.InputIcon}
                  name = "close"
                  size = {FONTSIZE.size_16}
                  color = {COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}

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
                          ListRef?.current?.scrollToOffset({
                            animated: true,
                            offset: 0,
                          });
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
              ref = {ListRef}
              ListEmptyComponent = {
                <View style = {styles.EmptyListContainer}>
                    <Text style = {styles.CategoryText}>No Coffee Available</Text>
                </View>
              }
              showsHorizontalScrollIndicator = {false}
              data = {sortedCoffee}
              contentContainerStyle = {styles.FlatListContainer}
              keyExtractor = {item => item.id}
              renderItem = {({item}) => {
                return (
                      <TouchableOpacity onPress = {() => {
                          navigation.push('DetailsScreen', {
                            index: item.index,
                            id: item.id,
                            type: item.type,
                          })
                      }}>
                          <CoffeeCard 
                              id = {item.id}
                              index = {item.index}
                              type = {item.type}
                              rosted = {item.rosted}
                              imagelink_square = {item.imagelink_square}
                              name = {item.name}
                              special_ingredient = {item.special_ingredient}
                              average_rating = {item.average_rating}
                              price = {item.prices[2]}
                              buttonPressHandler = {() => {}}
                          />
                      </TouchableOpacity>
                );
              }}
          />

          <Text style = {styles.CoffeeBeansTitle}>Coffee Beans</Text>

          {/* Beans FlatList */}

          <FlatList 
              horizontal
              showsHorizontalScrollIndicator = {false}
              data = {BeanList}
              contentContainerStyle = {[
                  styles.FlatListContainer,
                  {marginBottom: tabBarHeight},
                  ]}
              keyExtractor = {item => item.id}
              renderItem = {({item}) => {
                return (
                      <TouchableOpacity onPress = {() => {
                        navigation.push('DetailsScreen', {
                          index: item.index,
                          id: item.id,
                          type: item.type,
                        })
                      }}>
                          <CoffeeCard 
                              id = {item.id}
                              index = {item.index}
                              type = {item.type}
                              rosted = {item.rosted}
                              imagelink_square = {item.imagelink_square}
                              name = {item.name}
                              special_ingredient = {item.special_ingredient}
                              average_rating = {item.average_rating}
                              price = {item.prices[2]}
                              buttonPressHandler = {() => {}}
                          />
                      </TouchableOpacity>
                );
              }}
          />



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

  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },

  FlatListContainer: {
    gap: SPACING.space_20,
  },

  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },





})

export default HomeScreen