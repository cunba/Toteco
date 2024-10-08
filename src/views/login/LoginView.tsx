import { Heading, Icon, Input, NativeBaseProvider, Pressable, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Appearance, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../App";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { LoginViewModel } from "../../viewmodels/LoginViewModel";
import { loginStyles } from "./LoginStyles";

export const LoginView: FunctionalView<LoginViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);
    const [showPassword, setShowPassword] = useState(false)

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const getUser = async () => {
        await vm.getUser()
        // if (vm.user?.recoveryCode !== null && vm.user?.recoveryCode !== undefined)
        //     navigate(ROUTES.RECOVERY_CODE, null)
    }

    useEffect(() => { getUser() }, [])

    const { signIn } = React.useContext(AuthContext)

    const doLogin = async () => {
        if (verifyInput()) {
            setShowSpinner(true)
            try {
                await signIn(vm.username, vm.password);
                setShowSpinner(false);
                navigate(ROUTES.HOME, null)
            } catch (w: any) {
                if (w) {
                    selectErrorMessage(3);
                } else {
                    selectErrorMessage(4);
                }
            }
            setHideErrorMessage(false);
            setShowSpinner(false)
        }
    }

    const verifyInput = () => {
        if (vm.username === '' && vm.password === '') {
            selectErrorMessage(5)
            setHideErrorMessage(false);
            return false
        }
        else if (vm.username === '') {
            selectErrorMessage(1);
            setHideErrorMessage(false);
            return false;
        }
        else if (vm.password === '') {
            selectErrorMessage(2);
            setHideErrorMessage(false);
            return false;
        }
        else {
            return true
        }
    }

    const selectErrorMessage = (value: number): void => {
        switch (value) {
            case 1:
                setErrorMessage(i18n.t('login.error.no_mail')!);
                break;
            case 2:
                setErrorMessage(i18n.t('login.error.no_password')!);
                break;
            case 3:
                setErrorMessage(i18n.t('login.error.credentials_error')!);
                break;
            case 4:
                setErrorMessage(i18n.t('login.error.default_error')!);
                break
            case 5:
                setErrorMessage(i18n.t('login.error.no_userame_no_password')!);
        }
    }

    const recover = () => {
        // navigate(ROUTES.SEND_EMAIL, null)
    }

    const signUp = () => {
        navigate(ROUTES.SIGN_UP, null)
    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[formStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={loginStyles.titleView}>
                        <Heading style={[loginStyles.header, { color: COLORS.text }]}>{i18n.t('login.title')}</Heading>
                    </View>
                    <View style={loginStyles.formView}>
                        <Stack space={4} w="100%" alignItems="center" style={{ marginBottom: 10 }}>
                            <Input
                                style={[formStyles.input, { color: COLORS.text }]}
                                w={{ base: "75%", md: "25%" }}
                                placeholder={i18n.t("login.label.username").toString()}
                                onChangeText={(username) => vm.setUsername(username)}
                                borderRadius={10}
                                autoCapitalize="none"
                            />
                            <Input
                                style={[formStyles.input, { color: COLORS.text }]}
                                w={{ base: "75%", md: "25%" }}
                                type={showPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                                        <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                    </Pressable>
                                }
                                placeholder={i18n.t("login.label.password").toString()}
                                onChangeText={(password) => vm.setPassword(password)}
                                borderRadius={10}
                            />
                        </Stack>
                        <TouchableOpacity onPress={recover}>
                            <Text style={[loginStyles.textRecover, { textDecorationLine: 'underline', color: COLORS.text }]}>
                                {i18n.t('login.recover_password')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', paddingBottom: 20 }} onPress={signUp}>
                            <Text style={[commonStyles.text, { color: COLORS.text }]}>{i18n.t('login.sign_up')}</Text>
                            <Text style={[commonStyles.text, { textDecorationLine: 'underline', color: COLORS.text }]}>{i18n.t('login.here')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={loginStyles.buttonView}>
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
                            <TouchableOpacity
                                style={[formStyles.button, { backgroundColor: COLORS.touchable }]}
                                onPress={doLogin}
                            >
                                <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('login.button').toUpperCase()}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </NativeBaseProvider>
        </>
    )
}
