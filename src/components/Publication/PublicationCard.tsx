
import { Image, Input, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Title } from 'react-native-paper';
import { SIZES } from '../../config/Sizes';
import { commonStyles, stylesRicyclerList } from '../../config/Styles';
import { Publication } from '../../data/model/toteco/Publication';
import { publicationStyles } from './PublicationStyles';

export interface PublicationProps {
    colorScheme: any
    publication: Publication
    styles?: any
    onPressIcon?: () => void
    onPressLink?: () => void
}

export default function PublicationCard(props: PublicationProps) {
    const color = props.colorScheme
    let comment = ''
    let establishmentFontSize = 0
    let establishmentPaddingSize = 0

    if (props.publication.establishment!.name!.length <= 25) {
        establishmentFontSize = SIZES.subtitle
        establishmentPaddingSize = 15
    } else if (props.publication.establishment!.name!.length <= 35) {
        establishmentFontSize = SIZES.subtitleMini
        establishmentPaddingSize = 10
    } else {
        establishmentFontSize = SIZES.text
        establishmentPaddingSize = 5
    }

    return <>
        <Card elevation={3} mode={"elevated"} style={[stylesRicyclerList.card, props.styles, {
            height: (props.publication.comment !== undefined && props.publication.comment !== '') ? 350 : 320,
            backgroundColor: color.background,
            borderColor: color.shadow,
            shadowColor: color.shadow,
            borderWidth: 0.2
        }]}>
            <Card.Content>
                <View style={[publicationStyles.titleContainer, { borderColor: color.shadowToolbar }]}>
                    <TouchableOpacity onPress={props.onPressIcon}>
                        {props.publication.user?.photo ?
                            <Image size={10} borderRadius={100} source={{ uri: props.publication.user!.photo }} alt={props.publication.user!.username ?? ''} />
                            :
                            <Image size={10} borderRadius={100} source={require("../../assets/images/default-user.png")} alt={props.publication.user?.username ?? ''} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '100%' }} onPress={props.onPressLink}>
                        <Title style={[commonStyles.title, publicationStyles.title, { color: color.text, fontSize: establishmentFontSize, paddingTop: establishmentPaddingSize }]}>
                            {props.publication.establishment?.name ?? ''}
                        </Title>
                    </TouchableOpacity>
                </View>
                <View style={publicationStyles.card}>
                    <View style={{ height: 200, width: 150 }}>
                        <Image size={200} borderRadius={5} source={{ uri: props.publication.photo }} alt={props.publication.establishment?.name ?? ''} />
                    </View>
                    <View style={publicationStyles.productsContainer}>
                        {props.publication.products!.map((product, index) => {
                            if (index === props.publication.products!.length - 1) {
                                comment = comment + `- ${product.name}\n  (${Math.round(product.price! * 100) / 100} €, ${Math.round(product.score * 100) / 100} ☆)`
                                return (
                                    <Input
                                        key={'products'}
                                        style={[commonStyles.text, { color: color.text, paddingBottom: 20, maxHeight: 200 }]}
                                        defaultValue={comment}
                                        multiline={true}
                                        editable={false}
                                        borderWidth={0}
                                    />
                                )
                            }
                            comment = comment + `- ${product.name}\n  (${Math.round(product.price! * 100) / 100} €, ${Math.round(product.score * 100) / 100} ☆)\n\n`
                        })}
                    </View>
                </View>
                {(props.publication.comment !== undefined && props.publication.comment !== '') ?
                    <Input
                        key={'comment'}
                        style={{ height: 35, fontSize: SIZES.text, color: color.text }}
                        defaultValue={props.publication.comment}
                        multiline={true}
                        editable={false}
                        borderWidth={0}
                    />
                    : null
                }
                <View style={[publicationStyles.totalContainer, { borderColor: color.shadowToolbar }]}>
                    <Text style={[commonStyles.text, { color: color.text }]}>{`PRICE: ${Math.round(props.publication.total_price * 100) / 100} €`}</Text>
                    <Text style={[commonStyles.text, { color: color.text }]}>{`SCORE: ${Math.round(props.publication.total_score * 100) / 100} ☆`}</Text>
                </View>
            </Card.Content>
        </Card>
    </>

}
