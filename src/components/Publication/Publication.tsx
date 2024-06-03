
import { Image, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import { commonStyles, stylesRicyclerList } from '../../config/Styles';
import { ProductData } from '../../data/model/toteco/Product';
import { PublicationData } from '../../data/model/toteco/Publication';
import { publicationStyles } from './PublicationStyles';

export interface PublicationProps {
    text: string
    onPress: Function
    colorScheme: any
    title: string
    publication: PublicationData
    products: ProductData[]
}

export default function Publication(props: PublicationProps) {
    const color = props.colorScheme

    const onPress = () => {
        props.onPress()
    }

    return <>
        <Card elevation={3} mode={"elevated"} style={[stylesRicyclerList.card, { backgroundColor: color.background, borderColor: color.shadowToolbar }]}>
            <Card.Title title={props.title} style={publicationStyles.titleSeparator} />
            <Card.Content style={[publicationStyles.card, { borderColor: color.shadowToolbar }]}>
                <Image size={200} borderRadius={10} source={{ uri: props.publication.photo }} alt="Alternate Text" />
                <View style={publicationStyles.productsContainer}>
                    {props.products.map(product => {
                        <Text style={[commonStyles.text, { color: color.text, paddingBottom: 20 }]}>
                            {`- ${product.name}\n  (${Math.round(product.price! * 100) / 100} €, ${Math.round(product.score * 100) / 100} ☆`}
                        </Text>
                    })}
                </View>
            </Card.Content>
            <Card.Content style={publicationStyles.totalContainer}>
                <Text style={[commonStyles.text, { color: color.text }]}>{`TOTAL PRICE: ${props.publication.totalPrice} €`}</Text>
                <Text style={[commonStyles.text, { color: color.text }]}>{`TOTAL SCORE: ${props.publication.totalScore} ☆`}</Text>
            </Card.Content>
        </Card>
    </>
}