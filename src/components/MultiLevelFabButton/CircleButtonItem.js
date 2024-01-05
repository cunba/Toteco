import React, {
    Component,
  } from 'react';
  import {
    StyleSheet,
    View,
    Animated,
    TouchableOpacity,
  } from 'react-native';
  import PropTypes from 'prop-types';
  
  // Conclusión
(function() {
  /**
   * Ajuste decimal de un número.
   *
   * @param {String}  tipo  El tipo de ajuste.
   * @param {Number}  valor El numero.
   * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
   * @returns {Number} El valor ajustado.
   */
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
  export default class CircleButtonItem extends Component {
  
    render() {
      //const offsetX = Math.round10(this.props.radius * Math.cos(this.props.angle));
      //const offsetY = Math.round10(this.props.radius * Math.sin(this.props.angle));
      const offsetX = (this.props.radius * Math.cos(this.props.angle));
      const offsetY = (this.props.radius * Math.sin(this.props.angle));
      return (
        <Animated.View
          style={[{
            opacity: this.props.anim,
            width: this.props.size,
            height: this.props.size,
            transform: [
              {
                translateY: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, offsetY],
                }) },
              {
                translateX: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, offsetX],
                }) },
              {
                rotate: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [`${this.props.startDegree}deg`, `${this.props.endDegree}deg`],
                }) },
              {
                scale: this.props.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }) },
            ]
          }]}
        >
          <TouchableOpacity style={{flex:1}} activeOpacity={this.props.activeOpacity || 0.85} onPress={this.props.onPress}>
            <View
              style={[styles.circleButton,{
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
                backgroundColor: this.props.buttonColor,
              }]}
            >
              {this.props?.children}
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }
  
  }
  
  CircleButtonItem.propTypes = {
    angle: PropTypes.number,
    radius: PropTypes.number,
    buttonColor: PropTypes.string,
    onPress: PropTypes.func,
    children: PropTypes.node,
    startDegree: PropTypes.number,
    endDegree: PropTypes.number,
  };
  
  CircleButtonItem.defaultProps = {
    onPress: () => {},
    startDegree: 0,
    endDegree: 720
  };
  
  const styles = StyleSheet.create({
    circleButton: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop: 2,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowColor: '#444',
      shadowRadius: 1,
      backgroundColor: 'red',
      position: 'absolute',
    },
  });