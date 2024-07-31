import { Icon, Input, NativeBaseProvider, Stack } from "native-base";
import { useState } from "react";
import { ActivityIndicator, Alert, Appearance, Button, InputAccessoryView, Keyboard, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { back, navigate } from "../../infrastructure/navigation/RootNavigation";
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
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.title, { color: COLORS.text }]}>{i18n.t('recovery_email.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <Stack space={4} w="100%" alignItems="center" style={{ marginVertical: 10 }}>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('recovery_email.email.label').toString()}
                            onChangeText={(email) => vm.setEmail(email)}
                            borderRadius={10}
                            autoCapitalize="none"
                            inputMode="email"
                            inputAccessoryViewID="email"
                        />
                        <InputAccessoryView nativeID="email">
                            <View style={[formStyles.keyboardOptions, { backgroundColor: COLORS.keyboard }]}>
                                <Button
                                    onPress={() => Keyboard.dismiss()}
                                    title={i18n.t('ok').toString()}
                                />
                            </View>
                        </InputAccessoryView>
                    </Stack>

                    {!hideErrorMessage ? (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ marginBottom: 5, color: 'red' }}>
                                {errorMessage}
                            </Text>
                        </View>
                    ) : null}

                    {showSpinner ?
                        <ActivityIndicator style={[commonStyles.spinner, { backgroundColor: COLORS.background }]} size='large' animating={true} color={COLORS.touchable} />
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