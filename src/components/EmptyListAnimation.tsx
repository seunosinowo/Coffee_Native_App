import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';

//Definging Types
interface EmptyListAnimation{
    title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimation> = ({title}) => {
  return (
    <View style = {styles.EmptyCartContainer}>
       <LottieView
            style = {styles.LottieStyle}
            source = {require('../lottie/coffeecup.json')} 
            autoPlay
            loop
        />
        <Text style = {styles.LottieText}>{title}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    LottieStyle: {
        height: 300,
    },

    LottieText: {
        color: COLORS.primaryOrangeHex,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        textAlign: 'center',
    },
})

export default EmptyListAnimation