import { ImageProps, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredient: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredient,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground 
            source = {imagelink_portrait}
            style = {styles.ItemBackgroundImage}
            >
        </ImageBackground>
        <Text  style = {styles.Ite}>ghfdfghj</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: "space-between"
    },

    Ite: {
        color: '#fff',
    }
})

export default ImageBackgroundInfo