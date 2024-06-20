import { ImageProps, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
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
    ingredients: string;
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
    ingredients,
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

                <View style = {styles.ImageInfoOuterContainer}>
                    <View style = {styles.ImageInfoInnerContainer}>
                        <View style = {styles.InfoContainerRow}>
                            <View>
                                <Text style = {styles.ItemTitleText}>{name}</Text>
                                <Text style = {styles.ItemSubTitleText}>
                                    {special_ingredient}
                                </Text>
                            </View>

                            <View style = {styles.ItemPropertiesContainer}>

                                <View style = {styles.PropertiesFirst}>
                                    <CustomIcon 
                                        name = {type == 'Bean' ? 'bean' : 'beans'}
                                        size = {type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_18}
                                        color = {COLORS.primaryOrangeHex}
                                    />
                                    <Text style = {[styles.PropertyTextFirst, {
                                            marginTop: type == 'Bean'
                                            ? SPACING.space_4 + SPACING.space_2
                                            : 0,
                                        },
                                     ]}>
                                        {type}
                                    </Text>

                                </View>

                                
                                <View style = {styles.PropertiesFirst}>
                                    <CustomIcon 
                                        name = {type == 'Bean' ? 'location' : 'drop'}
                                        size = {FONTSIZE.size_16}
                                        color = {COLORS.primaryOrangeHex}
                                    />
                                    <Text style = {styles.PropertyTextLast}>{ingredients}</Text>
                                </View>
                            </View>
                        </View>
                            <View style = {styles.InfoContainerRow}>
                                <View style = {styles.RatingContainer}>
                                    <CustomIcon 
                                        name = {'star'}
                                        color = {COLORS.primaryOrangeHex}
                                        size = {FONTSIZE.size_20}
                                    />
                                    <Text style = {styles.RatingText}>{average_rating}</Text>
                                    <Text style = {styles.RatingCountText}>({ratings_count})</Text>
                                </View>

                                <View style = {styles.RoastedContainer}>
                                    <Text style = {styles.RoastedText}>{roasted}</Text>
                                </View>
                            </View>
                    </View>
                </View>

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

    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },

    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,

    },

    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },

    ItemSubTitleText: { 
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },

    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20,
    },

    PropertiesFirst: {
        height: 55,
        width: 55,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },

    PropertyTextLast: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        marginTop: SPACING.space_2 + SPACING.space_2,
    },

    RatingContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },

    RatingText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_18,
    },

    RatingCountText: {
        fontFamily: FONTFAMILY.poppins_regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
    },

    RoastedContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 55,
        width: 55 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    RoastedText: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
    },

});

export default ImageBackgroundInfo;