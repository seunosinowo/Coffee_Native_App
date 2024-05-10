import { NativeModules, StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'
import CustomIcon from '../components/CustomIcon'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator 
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView 
                        overlayColor = ''
                        blurAmount = {15}
                        style = {styles.BlurViewStyles}
                    />
                )

            }}
        >


            <Tab.Screen name='HomeScreen' component={HomeScreen}
                options = {{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon 
                            name = 'home'
                            size = {25}
                            color = {
                                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }
                        />
                    ),
                }}
            >
            </Tab.Screen>


            <Tab.Screen name='CartScreen' component={CartScreen}
                options = {{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon 
                            name = 'cart'
                            size = {25}
                            color = {
                                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }
                        />
                    )
                }}   
            >
            </Tab.Screen>


            <Tab.Screen name='FavoritesScreen' component={FavoritesScreen}
                options = {{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon 
                            name = 'like'
                            size = {25}
                            color = {
                                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }
                        />
                    )
                }}
            >
            </Tab.Screen>


            <Tab.Screen name='OrderHistoryScreen' component={OrderHistoryScreen}
                options = {{
                    tabBarIcon: ({focused, color, size}) => (
                        <CustomIcon 
                            name = 'bell'
                            size = {25}
                            color = {
                                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }
                        />
                    )
                }}
            >

            </Tab.Screen>

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: "absolute",
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
    },

    BlurViewStyles: {
        position: "absolute",
        left: 0,
        right: 0,
        top:0,
        bottom:0,
    },
})

export default TabNavigator;