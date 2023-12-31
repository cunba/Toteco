import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Appearance, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../App";
import Toolbar from "../../components/Toolbar/Toolbar";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { COLOR_MODE, ROUTES } from "../../config/Constants";
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
    const [COLORS, setCurrentColor] = useState(COLOR_MODE === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        console.log(COLOR_MODE)
        setCurrentColor(COLOR_MODE === 'dark' ? COLORS_DARK : COLORS_LIGHT)
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

    const iconLeftProps: any = {
        onPress: () => back(),
        name: 'left',
        type: 'AntDesign'
    }

    return (
        <>
            <Toolbar
                isIconLeft={true}
                iconLeft={iconLeftProps}
                color={COLORS.touchable}
                isIconRight={false}
            />
            <View style={commonStyles.container}>
                <Text style={signUpStyles.title}>{i18n.t('sign_up.title')}</Text>
                <TextInput
                    value={vm.name}
                    autoCorrect={false}
                    placeholder={i18n.t('sign_up.name.label').toString()}
                    placeholderTextColor={COLORS.text}
                    onChangeText={(name: any) => vm.setName(name)}
                    style={signUpStyles.textinput}
                />
                <TextInput
                    value={vm.surname}
                    autoCorrect={false}
                    placeholder={i18n.t('sign_up.surname.label').toString()}
                    placeholderTextColor={COLORS.text}
                    onChangeText={(surname: any) => vm.setSurname(surname)}
                    style={signUpStyles.textinput}
                />
                <TextInput
                    value={vm.email}
                    autoCorrect={false}
                    placeholder={i18n.t('sign_up.email.label').toString()}
                    placeholderTextColor={COLORS.text}
                    onChangeText={(email: any) => vm.setEmail(email)}
                    style={signUpStyles.textinput}
                />
                <TextInput
                    value={vm.password}
                    autoCorrect={false}
                    placeholder={i18n.t('sign_up.password.label').toString()}
                    placeholderTextColor={COLORS.text}
                    secureTextEntry={true}
                    onChangeText={(password: any) => vm.setPassword(password)}
                    style={signUpStyles.textinput}
                />
                <TextInput
                    value={vm.repeatPassword}
                    autoCorrect={false}
                    placeholder={i18n.t('sign_up.repeat_password.placeholder').toString()}
                    placeholderTextColor={COLORS.text}
                    secureTextEntry={true}
                    onChangeText={(password: any) => vm.setRepeatPassword(password)}
                    style={signUpStyles.textinput}
                />
                <View style={signUpStyles.containerInputDate}>
                    <TextInput
                        value={day}
                        dataDetectorTypes={'calendarEvent'}
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.day.label').toString()}
                        placeholderTextColor={COLORS.text}
                        onChangeText={(day: any) => setDay(day)}
                        style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50 }]}
                        keyboardType="numeric"
                    />
                    <Text style={[commonStyles.title, { paddingTop: 20 }]}>/</Text>
                    <TextInput
                        value={month}
                        dataDetectorTypes={'calendarEvent'}
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.month.label').toString()}
                        placeholderTextColor={COLORS.text}
                        onChangeText={(month: any) => setMonth(month)}
                        style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50 }]}
                        keyboardType="numeric"
                    />
                    <Text style={[commonStyles.title, { paddingTop: 20 }]}>/</Text>
                    <TextInput
                        value={year}
                        dataDetectorTypes={'calendarEvent'}
                        autoCorrect={false}
                        placeholder={i18n.t('sign_up.year.label').toString()}
                        placeholderTextColor={COLORS.text}
                        onChangeText={(year: any) => setYear(year)}
                        style={[signUpStyles.textinput, { paddingLeft: 5, textAlign: 'center', width: 50 }]}
                        keyboardType="numeric"
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
                    <TouchableOpacity style={signUpStyles.button} onPress={doSignUp} >
                        <Text style={commonStyles.textButton}>{i18n.t('sign_up.title')}</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}