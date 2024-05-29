import { Icon, Image, Input, NativeBaseProvider, Stack } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Appearance, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../App";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { back, navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { SignUpViewModel } from "../../viewmodels/SignUpViewModel";
import { signUpStyles } from "./SignUpStyles";

export const SignUpView: FunctionalView<SignUpViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [day, setDay] = useState('01')
    const [month, setMonth] = useState('01')
    const [year, setYear] = useState('2022')
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [imageUri, setImageUri] = useState('')

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const { signUp } = React.useContext(AuthContext)

    const doSignUp = async () => {
        const yearNumber = parseInt(year)
        const monthNumber = parseInt(month)
        const dayNumber = parseInt(day)

        if (vm.isValid()) {
            setHideErrorMessage(true)
            if (yearNumber <= new Date().getFullYear() && monthNumber <= 12 && dayNumber <= 31) {
                vm.setBirthday(new Date(yearNumber, monthNumber, dayNumber).getTime())

                if (vm.samePassword()) {
                    if (vm.passwordLength()) {
                        setShowSpinner(true)
                        try {
                            vm.setUser()
                            await signUp(vm.user);
                            setShowSpinner(false);
                            Alert.alert(i18n.t('sign_up.success'))
                            navigate(ROUTES.LOGIN, null)
                        } catch (w: any) {
                            console.log(w)
                            setErrorMessage(i18n.t('sign_up.error.undefined')!);
                        }
                        setHideErrorMessage(false);
                        setShowSpinner(false)
                    } else {
                        setErrorMessage(i18n.t('sign_up.error.password_length')!);
                        setHideErrorMessage(false);
                    }
                } else {
                    setErrorMessage(i18n.t('sign_up.error.password')!);
                    setHideErrorMessage(false);
                }
            } else {
                setErrorMessage(i18n.t('sign_up.error.birthday')!);
                setHideErrorMessage(false);
            }
        }
        else {
            setErrorMessage(i18n.t('sign_up.error.fields')!);
            setHideErrorMessage(false);
        }
    }

    const camera = async () => {
        const result = await launchCamera({
            mediaType: 'photo',
            cameraType: 'front',
            includeBase64: false,
            saveToPhotos: true
        })
        if (result.assets) {
            setImageUri(result.assets[0].uri!)
            vm.setImage(result.assets[0].uri!)
        }
        console.log(result)
    }

    const gallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 1
        })
        if (result.assets) {
            setImageUri(result.assets![0].uri!)
            vm.setImage(result.assets[0].uri!)
        }
    }

    const pickImageAlert = () => {
        Alert.alert(
            i18n.t('sign_up.alert.title'),
            '',
            [
                {
                    text: i18n.t('sign_up.alert.camera'),
                    onPress: camera,
                    style: 'default'
                },
                {
                    text: i18n.t('sign_up.alert.gallery'),
                    onPress: gallery
                },
                {
                    text: i18n.t('sign_up.alert.cancel'),
                    style: 'cancel'
                },
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderBottomColor: COLORS.shadowToolbar }]}>
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.title, { color: COLORS.text }]}>{i18n.t('sign_up.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={pickImageAlert}>
                        {imageUri === '' ?
                            <Image size={150} borderRadius={100} source={require("../../assets/images/default-user.png")} alt="Default user" />
                            :
                            <Image size={150} borderRadius={100} source={{ uri: imageUri }} alt="Alternate Text" />
                        }
                    </TouchableOpacity>
                    <Stack space={4} w="100%" alignItems="center" style={{ marginBottom: 10 }}>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.username.label').toString()}
                            onChangeText={(username) => vm.setUsername(username)}
                            borderRadius={10}
                            autoCapitalize="none"
                        />
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.name.label').toString()}
                            onChangeText={(name) => vm.setName(name)}
                            borderRadius={10}
                            autoCapitalize="none"
                        />
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.surname.label').toString()}
                            onChangeText={(surname) => vm.setSurname(surname)}
                            borderRadius={10}
                            autoCapitalize="none"
                        />
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.email.label').toString()}
                            onChangeText={(email) => vm.setEmail(email)}
                            borderRadius={10}
                            autoCapitalize="none"
                        />
                    </Stack>
                    <View style={signUpStyles.containerInputDate}>
                        <Input
                            style={[formStyles.input, { paddingLeft: 5, textAlign: 'center', width: 50, color: COLORS.text }]}
                            w={{ base: "25%", md: "25%" }}
                            placeholder={i18n.t('sign_up.day.label').toString()}
                            onChangeText={(day) => setDay(day)}
                            borderRadius={10}
                            keyboardType="numeric"
                            dataDetectorTypes={'calendarEvent'}
                            borderWidth={0}
                            autoCapitalize="none"
                        />
                        <Text style={[commonStyles.title, { textAlign: 'center', color: COLORS.text }]}>/</Text>
                        <Input
                            style={[formStyles.input, { paddingLeft: 5, textAlign: 'center', width: 50, color: COLORS.text }]}
                            w={{ base: "25%", md: "25%" }}
                            placeholder={i18n.t('sign_up.month.label').toString()}
                            onChangeText={(month) => setMonth(month)}
                            borderRadius={10}
                            keyboardType="numeric"
                            dataDetectorTypes={'calendarEvent'}
                            borderWidth={0}
                        />
                        <Text style={[commonStyles.title, { textAlign: 'center', color: COLORS.text }]}>/</Text>
                        <Input
                            style={[formStyles.input, { paddingLeft: 5, textAlign: 'center', width: 50, color: COLORS.text }]}
                            w={{ base: "25%", md: "25%" }}
                            placeholder={i18n.t('sign_up.year.label').toString()}
                            onChangeText={(year) => setYear(year)}
                            borderRadius={10}
                            keyboardType="numeric"
                            dataDetectorTypes={'calendarEvent'}
                            borderWidth={0}
                        />
                        <Text ></Text>
                    </View>
                    <Stack space={4} w="100%" alignItems="center" style={{ marginBottom: 10 }}>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.password.label').toString()}
                            onChangeText={(password) => vm.setPassword(password)}
                            borderRadius={10}
                            type={showPassword ? "text" : "password"}
                            autoCapitalize="none"
                            InputRightElement={
                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                </Pressable>
                            }
                        />
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.repeat_password.label').toString()}
                            onChangeText={(password) => vm.setRepeatPassword(password)}
                            borderRadius={10}
                            type={showRepeatPassword ? "text" : "password"}
                            autoCapitalize="none"
                            InputRightElement={
                                <Pressable onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
                                    <Icon as={<MaterialIcons name={showRepeatPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                </Pressable>
                            }
                        />
                    </Stack>

                    {!hideErrorMessage ? (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ marginBottom: 5, color: 'red' }}>
                                {errorMessage}
                            </Text>
                        </View>
                    ) : null}

                    {showSpinner ?
                        <ActivityIndicator style={commonStyles.spinner} size='large' animating={true} color={COLORS.touchable} />
                        :
                        <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.touchable }]} onPress={doSignUp} >
                            <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('sign_up.title')}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </NativeBaseProvider>
        </>
    )
}