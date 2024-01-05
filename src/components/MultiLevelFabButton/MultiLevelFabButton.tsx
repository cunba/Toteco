import React from "react";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleButton from "./CircleButton";
import CircleButtonItem from "./CircleButtonItem";
import { COLORS } from "./config/Colors";
import { multiLevelFabButtonStyles } from "./config/MultiLevelFabButtonStyles";
import { SIZES } from "./config/Sizes";

export enum ItemPosition {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
    TOPLEFT = "topleft",
    TOPCENTER = "topcenter",
    TOPRIGHT = "topright"
}

export enum MultiLevelFabButtonType {
    LINEAR = "linear",
    CIRCULAR = "circular",
    SINGLE = "single"
}

export interface MultiLevelFabButtonInnerItem {
    icon: any,
    title: string,
    color: string,
    onPress: () => void,
    position?: ItemPosition
    style?: any
}

export interface MultiLevelFabButton {
    startDegree?: number;
    endDegree?: number;
    onOverlayPress?: () => void
    onLongPress?: () => void
    type?: MultiLevelFabButtonType,
    color?: string,
    onPress?: () => void,
    children?: MultiLevelFabButtonInnerItem[]
    size?: number,
    icon?: any,
    bgColor?: string,
    position?: ItemPosition
    btnOutRange?: string
}

export interface JsMap<T> {
    [key: string]: T;
}

export const defaultOptions: MultiLevelFabButton = {
    type: MultiLevelFabButtonType.CIRCULAR,
    color: COLORS.movicodersBlue,
    onPress: () => { console.log("close") },
    onLongPress: () => { console.log("") },
    children: [
        {
            icon: <Icon name={"md-star"} size={SIZES.h1} style={multiLevelFabButtonStyles.actionButtonIcon} />,
            title: "Favourites",
            color: COLORS.primary_light,
            position: ItemPosition.CENTER,
            onPress: () => { console.log("Favourites") }
        },
        {
            icon: <Icon name={"md-close-outline"} size={SIZES.h1} style={multiLevelFabButtonStyles.actionButtonIcon} />,
            title: "Close",
            color: COLORS.primary_light,
            position: ItemPosition.CENTER,
            onPress: () => { console.log("Close") }
        },
        {
            icon: <Icon name={"md-close-outline"} size={SIZES.h1} style={multiLevelFabButtonStyles.actionButtonIcon} />,
            title: "Close",
            color: COLORS.primary_light,
            position: ItemPosition.CENTER,
            onPress: () => { console.log("close") }
        },
    ]
}

/**
 * Icons: https://oblador.github.io/react-native-vector-icons/
 */
export const MultiLevelFabButton = (config?: MultiLevelFabButton) => {

    const props = config ? config : defaultOptions

    const renderLinearChild = (child: MultiLevelFabButtonInnerItem, index: number) => {
        return (
            <ActionButton.Item
                key={'action-item-' + index}
                buttonColor={child.color}
                title={child.title}
                onPress={child.onPress}>
                {child.icon}

            </ActionButton.Item>
        )
    }

    const renderSingle = () => <ActionButton buttonColor={props.color} onPress={props.onPress}></ActionButton>

    const renderLinear = () => <ActionButton buttonColor={props.color} onPress={props.onPress}>
        {props.children?.map((item, index) => renderLinearChild(item, index))}
    </ActionButton>

    const renderCircular = () => <CircleButton buttonColor={props.bgColor} icon={props.icon} size={props.size} offset={15} onLongPress={props.onLongPress} onPress={props.onPress} btnOutRange={'red'} > {

        props.children?.map((item, index) => {

            return (
                <CircleButtonItem key={'circle-item-' + index} buttonColor={'transparent'} title={item.title} onPress={item.onPress}>
                    {item.icon}
                </CircleButtonItem>
            )
        })
    }
    </CircleButton>

    const fabButton = () => {
        switch (props.type) {
            case MultiLevelFabButtonType.LINEAR: return renderLinear()
            case MultiLevelFabButtonType.SINGLE: return renderSingle()
            case MultiLevelFabButtonType.CIRCULAR: return renderCircular()
            default: return renderSingle()
        }
    }

    return fabButton()
}
