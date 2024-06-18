import { ImageProps, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import GradientBGIcon from './GradientBGIcon';

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
    return(
        <View>
            <ImageBackground
                source = {imagelink_portrait}
                style = {styles.ItemBackgroundImage}>

                {EnableBackHandler ? (
                    <View style = {styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity onPress = {() => {
                            BackHandler()
                        }}>
                            <GradientBGIcon 
                                name = 'left'
                                color = {COLORS.primaryLightGreyHex}
                                size = {FONTSIZE.size_16}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {() => {
                            ToggleFavourite(favourite, type, id);
                        }}>
                            <GradientBGIcon 
                                name = 'like'
                                color = {
                                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                                }
                                size = {FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                    </View>
                ): (
                    <View style = {styles.ImageHeaderBarContainerWithoutBack}>
                        
                        <TouchableOpacity onPress = {() => {
                            ToggleFavourite(favourite, type, id)
                        }}>
                            <GradientBGIcon 
                                name = 'like'
                                color = {
                                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                                }
                                size = {FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                    </View>
                )}

            </ImageBackground>
        </View>
    )
     
};

const styles = StyleSheet.create({

    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },

    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    ImageHeaderBarContainerWithoutBack: {

    },

    
})

export default ImageBackgroundInfo