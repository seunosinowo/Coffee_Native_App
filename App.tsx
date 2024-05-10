import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./src/navigators/TabNavigator";

import DetailsScreen from "./src/screens/DetailsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PaymentScreen from "./src/screens/PaymentScreen";


const Stack = createNativeStackNavigator()

const App = () => {
  return(
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name = "TabNavigator"
                    component = {TabNavigator}
                    options = {{animation: "slide_from_bottom"}}>
                </Stack.Screen>

                <Stack.Screen
                    name = "DetailsScreen"
                    component = {DetailsScreen}
                    options = {{animation: "slide_from_bottom"}}>
                </Stack.Screen>

                <Stack.Screen
                    name = "PaymentScreen"
                    component = {PaymentScreen}
                    options = {{animation: "slide_from_bottom"}}>
                </Stack.Screen>


          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;


