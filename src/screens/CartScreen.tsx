import { StatusBar, StyleSheet, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PaymentFooter from '../components/PaymentFooter';

const CartScreen = () => {
  const CartList = useStore((state: any) => state.CartList)
  const CartPrice = useStore((state: any) => state.CartPrice)

  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );

  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );

  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)

  const tabBarHeight = useBottomTabBarHeight();

  console.log("CartList = ", CartList.length)

  return (
    <View style = {styles.ScreenContainer}>
      <StatusBar backgroundColor = {COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {styles.ScrollViewFlex}
      >
        <View style = {[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style = {styles.ItemContainer}>
              <HeaderBar title = 'Cart' />
              
              {CartList.length == 0 ? (
                <EmptyListAnimation title = {'Cart is Empty'} />
              ) : (
                <View style = {styles.ListItemContainer}>
                    {CartList.map((data:any) => (
                      <TouchableOpacity 
                        onPress = {() => {}}
                        key = {data.id}>

                      </TouchableOpacity>
                    ))}
                </View>
                  
              )}
          </View> 
              
              
        </View>
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

    ScrollViewInnerView: {
      flex: 1,
      justifyContent: 'space-between',
    },

    ItemContainer: {
      flex: 1,
    },

    ListItemContainer: {
      paddingHorizontal: SPACING.space_20,
      gap: SPACING.space_20,
    },
})

export default CartScreen;