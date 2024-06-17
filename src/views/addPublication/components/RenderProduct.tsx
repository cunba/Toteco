import { Text, TouchableOpacity } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import { Card } from "react-native-paper"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import { SIZES } from "../../../config/Sizes"
import { stylesRicyclerList } from "../../../config/Styles"
import { ProductDTO } from "../../../data/model/toteco/Product"
import { addPublicationStyles } from "../AddPublicationStyles"

export interface RenderProductProps {
    product: ProductDTO
    index: number
    onPressTrashIcon: (index: number) => void
    onPressEditIcon: (product: ProductDTO, index: number) => void
    swipableRowRef: (ref: any) => void
    colorScheme: any
}

const renderLeftSwipe = (progress: any, dragX: any, props: RenderProductProps) => {
    const color = props.colorScheme
    const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-5, 0, 0, 1],
    });

    return (
        <>
            <TouchableOpacity
                style={[stylesRicyclerList.containerOptions, { backgroundColor: color.delete, translateX: trans, marginRight: 20, borderEndEndRadius: 5, borderTopEndRadius: 5 }]}
                onPress={() => props.onPressTrashIcon(props.index)}
            >
                <EvilIcons name='trash' size={50} color={color.text_touchable} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[stylesRicyclerList.containerOptions, { backgroundColor: color.modify, translateX: trans, marginLeft: -20 }]}
                onPress={() => props.onPressEditIcon(props.product, props.index)}
            >
                <Feather name='edit' size={SIZES.icons} color={color.text_touchable} />
            </TouchableOpacity>
        </>
    )
}

export const RenderProduct = (props: RenderProductProps) => {
    const color = props.colorScheme
    return (
        <Swipeable
            renderRightActions={(progress, dragX) => renderLeftSwipe(progress, dragX, props)}
            ref={props.swipableRowRef}
        >
            <Card elevation={3} mode={"elevated"} style={[stylesRicyclerList.card, { backgroundColor: color.background, shadowColor: color.shadow, borderColor: color.shadow, borderWidth: 0.2 }]}>
                <Card.Content style={addPublicationStyles.card}>
                    <Text style={{ color: color.text, fontSize: SIZES.text }}>{props.product.name + ' (' + Math.round(props.product.price! * 100) / 100 + '€, ' + Math.round(props.product.score! * 10) / 10 + '/5 ☆)'}</Text>
                </Card.Content>
            </Card>
        </Swipeable>
    )
}