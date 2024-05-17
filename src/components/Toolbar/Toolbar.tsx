import { Box, HStack, Icon, NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { toolbarStyles } from './ToolbarStyles';

export enum IconTypes {
  ANT_DESIGN = 'AntDesign',
  ENTYPO = "Entypo",
  EVIL_ICONS = "EvilIcons",
  FEATHER = "Feather",
  FONT_AWESOME = "FontAwesome",
  FONT_AWESOME_5 = "FontAwesome5",
  FOUNDATION = "Foundation",
  IONICONS = "Ionicons",
  MATERIAL_COMMUNITY_ICONS = "MaterialCommunityIcons",
  MATERIAL_ICONS = "MaterialIcons",
  OCTICONS = "Octicons",
  SIMPLE_LINE_ICONS = "SimpleLineIcons",
  ZOCIAL = "Zocial"
}

export interface IconProps {
  type: IconTypes
  name: string,
  style?: any,
  onPress: () => void
}

export interface ToolbarProps {
  title?: string;
  color?: string;
  textStyle?: any;
  iconLeft?: IconProps
  isIconLeft: boolean
  isIconRight: boolean
  iconRight?: IconProps
}

export const Toolbar = (props: ToolbarProps) => {
  return (
    <>
      <NativeBaseProvider>
        <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
        <Box safeAreaTop bg="violet.600" />
        <HStack style={props.color ? { backgroundColor: props.color, elevation: 3 } : toolbarStyles.headerHome}>
          <HStack style={toolbarStyles.position}>
            {props.isIconLeft ?
              <TouchableOpacity
                onPress={() => props.iconLeft!.onPress()}>
                {getIcon(props.iconLeft!.type, props.iconLeft!.name ? props.iconLeft!.name : "left", props.iconLeft!.style ? props.iconLeft?.style : 'white')}
              </TouchableOpacity>
              : null
            }
          </HStack>
          <HStack style={toolbarStyles.textPosition}>
            <Text style={props.textStyle}>{props.title} </Text>
          </HStack>
          <HStack style={toolbarStyles.position}>
            {props.isIconRight ?
              <TouchableOpacity
                onPress={() => props.iconRight!.onPress()}>
                {getIcon(props.iconRight!.type, props.iconRight!.name ? props.iconRight!.name : "left", props.iconRight!.style ? props.iconRight?.style : 'white')}
              </TouchableOpacity>
              : null
            }
          </HStack>
        </HStack>
      </NativeBaseProvider>
    </>
  );
};

export default Toolbar;

const getIcon = (type: IconTypes, name: string, color: string) => {
  switch (type) {
    case IconTypes.ANT_DESIGN:
      return (<Icon as={<AntDesign name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.ENTYPO:
      return (<Icon as={<Entypo name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.EVIL_ICONS:
      return (<Icon as={<EvilIcons name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.FEATHER:
      return (<Icon as={<Feather name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.FONT_AWESOME:
      return (<Icon as={<FontAwesome name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.FONT_AWESOME_5:
      return (<Icon as={<FontAwesome5 name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.FOUNDATION:
      return (<Icon as={<Foundation name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.IONICONS:
      return (<Icon as={<Ionicons name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.MATERIAL_COMMUNITY_ICONS:
      return (<Icon as={<MaterialCommunityIcons name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.MATERIAL_ICONS:
      return (<Icon as={<MaterialIcons name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.OCTICONS:
      return (<Icon as={<Octicons name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.SIMPLE_LINE_ICONS:
      return (<Icon as={<SimpleLineIcons name={name} />} size={5} mr="2" color={color} />)
    case IconTypes.ZOCIAL:
      return (<Icon as={<Zocial name={name} />} size={5} mr="2" color={color} />)
  }
}