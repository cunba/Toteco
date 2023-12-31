import { Icon, Input, NativeBaseProvider, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Appearance, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { AuthContext } from "../../App";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { commonStyles } from "../../config/Styles";
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

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const { signUp } = React.useContext(AuthContext)

    useEffect(() => {
        vm.constructorFunctions()
    }, [])

    const doSignUp = async () => {
        const yearNumber = parseInt(year)
        const monthNumber = parseInt(month)
        const dayNumber = parseInt(day)

        if (vm.isValid()) {
            setHideErrorMessage(true)
            if (yearNumber <= new Date().getFullYear() && monthNumber <= 12 && dayNumber <= 31) {
                if (vm.password === vm.repeatPassword) {
                    if (vm.passwordLength()) {
                        setShowSpinner(true)
                        try {
                            vm.setUser()
                            await signUp('');
                            setShowSpinner(false);
                            Alert.alert(i18n.t('sign_up.success'))
                            navigate(ROUTES.LOGIN, null)
                        } catch (w: any) {
                            setErrorMessage(i18n.t('sign_up.error.udefined')!);
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

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <TouchableOpacity onPress={() => back()} style={{ alignSelf: 'flex-start' }}>
                        <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                    </TouchableOpacity>
                    <Text style={[signUpStyles.title, { color: COLORS.text }]}>{i18n.t('sign_up.title')}</Text>
                    <Stack space={4} w="100%" alignItems="center" style={{ marginBottom: 10 }}>
                        <Input
                            style={[signUpStyles.textinput, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.username.label').toString()}
                            onChangeText={(name) => vm.setName(name)}
                            borderRadius={10}
                        />
                        <Input
                            style={[signUpStyles.textinput, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.name.label').toString()}
                            onChangeText={(name) => vm.setName(name)}
                            borderRadius={10}
                        />
                        <Input
                            style={[signUpStyles.textinput, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.surname.label').toString()}
                            onChangeText={(surname) => vm.setSurname(surname)}
                            borderRadius={10}
                        />
                        <Input
                            style={[signUpStyles.textinput, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.email.label').toString()}
                            onChangeText={(email) => vm.setEmail(email)}
                            borderRadius={10}
                        />
                        <Input
                            style={[signUpStyles.textinput, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.password.label').toString()}
                            onChangeText={(password) => vm.setPassword(password)}
                            borderRadius={10}
                        />
                        <Input
                            style={[signUpStyles.textinput, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('sign_up.repeat_password.label').toString()}
                            onChangeText={(password) => vm.setRepeatPassword(password)}
                            borderRadius={10}
                        />
                    </Stack>
                    <View style={signUpStyles.containerInputDate}>
                        <Input
                            style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50, color: COLORS.text }]}
                            w={{ base: "25%", md: "25%" }}
                            placeholder={i18n.t('sign_up.day.label').toString()}
                            onChangeText={(day) => setDay(day)}
                            borderRadius={10}
                            keyboardType="numeric"
                            dataDetectorTypes={'calendarEvent'}
                            borderWidth={0}
                        />
                        <Text style={[commonStyles.title, { paddingTop: 10, paddingBottom: 5, color: COLORS.text }]}>/</Text>
                        <Input
                            style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50, color: COLORS.text }]}
                            w={{ base: "25%", md: "25%" }}
                            placeholder={i18n.t('sign_up.month.label').toString()}
                            onChangeText={(month) => setMonth(month)}
                            borderRadius={10}
                            keyboardType="numeric"
                            dataDetectorTypes={'calendarEvent'}
                            borderWidth={0}
                        />
                        <Text style={[commonStyles.title, { paddingTop: 10, paddingBottom: 5, color: COLORS.text }]}>/</Text>
                        <Input
                            style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50, color: COLORS.text }]}
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
                        <TouchableOpacity style={[signUpStyles.button, { backgroundColor: COLORS.touchable }]} onPress={doSignUp} >
                            <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('sign_up.title')}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </NativeBaseProvider>
        </>
    )
}