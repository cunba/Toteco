import RNActionButton, { ActionButtonProperties } from 'react-native-action-button'
import { Animated } from 'react-native'

interface ExtendedButton extends RNActionButton {
    anim: Animated.Value;
    animateButton: Function;
    state: {
        active: boolean;
        resetToken: any;
    };
    reset: Function;
    mounted: boolean;
    props: ActionButtonProperties & { onReset: Function };
}
(RNActionButton.prototype as ExtendedButton).animateButton = function (animate = true) {
    if (this.state.active) return this.reset();
    if (animate) {
        Animated.spring(this.anim, { toValue: 1, useNativeDriver: false }).start();
    } else {
        this.anim.setValue(1);
    }
    this.setState({ active: true, resetToken: this.state.resetToken });
};
(RNActionButton.prototype as ExtendedButton).reset = function (animate = true) {
    if (this.props.onReset) this.props.onReset();
    if (animate) {
        Animated.spring(this.anim, { toValue: 0, useNativeDriver: false }).start();
    } else {
        this.anim.setValue(0);
    }
    setTimeout(() => {
        if (this.mounted) {
            this.setState({ active: false, resetToken: this.state.resetToken });
        }
    }, 250);
};