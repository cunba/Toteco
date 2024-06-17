import { Input, NativeBaseProvider, Stack } from "native-base";
import { useState } from "react";
import { ActivityIndicator, Alert, Appearance, Text, TouchableOpacity, View } from "react-native";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { RecoveryEmailViewModel } from "../../viewmodels/RecoveryEmailViewModel";

export const RecoveryEmailView: FunctionalView<RecoveryEmailViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const onPressOk = async () => {
        const response = await vm.sendRecovery()
        if (response.error === undefined || response.error === null) {
            setHideErrorMessage(false)
            setShowSpinner(true)
            Alert.alert(i18n.t('recovery_email.success'))
            setShowSpinner(false)
            navigate(ROUTES.LOGIN, null)
        } else {
            setErrorMessage(i18n.t('recovery_email.error')!);
            setHideErrorMessage(false);
        }
    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderBottomColor: COLORS.shadowToolbar }]}>
                        <Text style={[commonStyles.title, { color: COLORS.touchable }]}>{i18n.t('recovery_email.title')}</Text>
                    </View>
                    <Stack space={4} w="100%" alignItems="center" style={{ marginVertical: 10 }}>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('recovery_email.email.label').toString()}
                            onChangeText={(email) => vm.setEmail(email)}
                            borderRadius={10}
                            autoCapitalize="none"
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
                        <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.touchable }]} onPress={onPressOk} >
                            <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('ok')}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </NativeBaseProvider>
        </>
    )
}