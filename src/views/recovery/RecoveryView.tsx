import { Icon, Input, NativeBaseProvider, Stack } from "native-base";
import { useState } from "react";
import { ActivityIndicator, Appearance, Button, InputAccessoryView, Keyboard, Pressable, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { back } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { RecoveryViewModel } from "../../viewmodels/RecoveryViewModel";
import { recoveryStyles } from "./RecoveryStyles";

export const RecoveryView: FunctionalView<RecoveryViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={recoveryStyles.toolbar}>
                        <TouchableOpacity onPress={() => back()} style={recoveryStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[recoveryStyles.titleToolbar, { color: COLORS.text }]}>{i18n.t('recovery.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <Stack space={4} w="100%" alignItems="center" style={{ marginBottom: 10 }}>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('recovery.code.label').toString()}
                            onChangeText={(code) => vm.setCode(Number(code))}
                            borderRadius={10}
                            keyboardType="numeric"
                            inputAccessoryViewID="code"
                        />
                        <InputAccessoryView nativeID="code">
                            <View style={[formStyles.keyboardOptions, { backgroundColor: COLORS.keyboard }]}>
                                <Button
                                    onPress={() => Keyboard.dismiss()}
                                    title={i18n.t('ok').toString()}
                                />
                            </View>
                        </InputAccessoryView>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('recovery.password.label').toString()}
                            onChangeText={(password) => vm.setNewPassword(password)}
                            borderRadius={10}
                            type={showPassword ? "text" : "password"}
                            InputRightElement={
                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                </Pressable>
                            }
                            inputAccessoryViewID="password"
                        />
                        <InputAccessoryView nativeID="password">
                            <View style={[formStyles.keyboardOptions, { backgroundColor: COLORS.keyboard }]}>
                                <Button
                                    onPress={() => Keyboard.dismiss()}
                                    title={i18n.t('ok').toString()}
                                />
                            </View>
                        </InputAccessoryView>
                        <Input
                            style={[formStyles.input, { color: COLORS.text }]}
                            w={{ base: "75%", md: "25%" }}
                            placeholder={i18n.t('recovery.repeat_password.label').toString()}
                            onChangeText={(password) => vm.setRepeatNewPassword(password)}
                            borderRadius={10}
                            type={showRepeatPassword ? "text" : "password"}
                            InputRightElement={
                                <Pressable onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
                                    <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                </Pressable>
                            }
                            inputAccessoryViewID="password2"
                        />
                        <InputAccessoryView nativeID="password2">
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
                        <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.touchable }]} onPress={() => { }} >
                            <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('sign_up.title')}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </NativeBaseProvider>
        </>
    )
}