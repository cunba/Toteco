import { Input, NativeBaseProvider, Stack } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Appearance, Text, TouchableOpacity, View } from "react-native";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { RecoveryCodeViewModel } from "../../viewmodels/RecoveryCodeViewModel";

export const RecoveryCodeView: FunctionalView<RecoveryCodeViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    useEffect(() => { vm.getUser() }, [])

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const onPressOk = () => {
        if (vm.checkCode()) {
            setHideErrorMessage(false)
            setShowSpinner(true)
            vm.setNullCode()
            setShowSpinner(false);
            navigate(ROUTES.LOGIN, null)
            setShowSpinner(false)
        }
        else {
            console.log('entra')
            setErrorMessage(i18n.t('recovery_code.error')!);
            setHideErrorMessage(false);
        }
    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderBottomColor: COLORS.shadowToolbar }]}>
                        <Text style={[commonStyles.title, { color: COLORS.touchable }]}>{i18n.t('recovery_code.title')}</Text>
                    </View>
                    <Stack space={4} w="100%" alignItems="center" style={{ marginVertical: 10 }}>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('recovery_code.code.label').toString()}
                            onChangeText={(code) => vm.setCode(Number(code))}
                            borderRadius={10}
                            keyboardType="numeric"
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
                        <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.touchable }]} onPress={() => onPressOk} >
                            <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('continue')}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </NativeBaseProvider>
        </>
    )
}