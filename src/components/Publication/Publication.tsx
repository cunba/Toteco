
import { Image, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { SIZES } from '../../config/Sizes';
import { commonStyles, stylesRicyclerList } from '../../config/Styles';
import { PublicationData } from '../../data/model/toteco/Publication';
import { publicationStyles } from './PublicationStyles';

export interface PublicationProps {
    colorScheme: any
    publication: PublicationData
}

export default function Publication(props: PublicationProps) {
    const color = props.colorScheme

    return <>
        <Card elevation={3} mode={"elevated"} style={[stylesRicyclerList.card, { height: 320, backgroundColor: color.background, borderColor: color.shadowToolbar }]}>
            <Card.Content>
                <View style={[publicationStyles.titleContainer, { borderColor: color.shadowToolbar }]}>
                    <Image size={10} borderRadius={100} source={{ uri: props.publication.user.photo }} alt={props.publication.user.username ?? ''} />
                    <Title style={[commonStyles.title, { color: color.text, fontSize: SIZES.subtitle, paddingBottom: 10 }]}>{props.publication.establishment.name}</Title>
                </View>
                <View style={publicationStyles.card}>
                    <View style={{ height: 200, width: 150 }}>
                        <Image size={200} borderRadius={5} source={{ uri: props.publication.photo }} alt={props.publication.establishment.name} />
                    </View>
                    <View style={publicationStyles.productsContainer}>
                        {props.publication.products!.map(product => {
                            return <Text style={[commonStyles.text, { color: color.text, paddingBottom: 20 }]}>
                                {`- ${product.name}\n  (${Math.round(product.price! * 100) / 100} €, ${Math.round(product.score * 100) / 100} ☆)`}
                            </Text>
                        })}
                    </View>
                </View>
                <View style={[publicationStyles.totalContainer, { borderColor: color.shadowToolbar }]}>
                    <Text style={[commonStyles.text, { color: color.text }]}>{`PRICE: ${props.publication.totalPrice} €`}</Text>
                    <Text style={[commonStyles.text, { color: color.text }]}>{`SCORE: ${props.publication.totalScore} ☆`}</Text>
                </View>
            </Card.Content>
        </Card>
    </>
}