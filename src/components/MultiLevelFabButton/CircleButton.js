import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Animated, StyleSheet, TouchableOpacity,
  TouchableWithoutFeedback, View
} from "react-native";
import CircleButtonItem from "./CircleButtonItem";

const alignMap = {
  topcenter: {
    alignItems: "center",
    justifyContent: "flex-start",
    startDegree: 0,
    endDegree: 180,
  },
  topleft: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    startDegree: 0,
    endDegree: 90,
  },

  topright: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    startDegree: 180,
    endDegree: 90,
  },
  center: {
    alignItems: "center",
    justifyContent: "flex-end",
    startDegree: 180,
    endDegree: 360,
  },
  left: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    startDegree: 270,
    endDegree: 360,
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    startDegree: 180,
    endDegree: 270,
  },
};

export default class CircleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      anim: new Animated.Value(props.active ? 1 : 0),
    };

    this.timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getCircleButtonStyle() {
    return [styles.circleBarItem, this.getButtonSize()];
  }

  getCircleContainerStyle() {
    const { alignItems, justifyContent } = alignMap[this.props.position];
    return [
      styles.overlay,
      styles.circleContainer,
      {
        alignItems,
        justifyContent,
      },
    ];
  }

  getCirclesStyle() {
    return [this.getButtonSize()];
  }

  getButtonSize() {
    return {
      width: this.props.size,
      height: this.props.size,
    };
  }

  animateButton() {
    if (this.state.active) {
      this.reset();
      return;
    }

    Animated.spring(this.state.anim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();

    this.setState({ active: true });
  }

  reset() {
    Animated.spring(this.state.anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      this.setState({ active: false });
    }, 250);
  }

  renderButton() {
    return (
      <View style={this.getCircleButtonStyle()}>
        <TouchableOpacity
          activeOpacity={0.85} //By default 0.85 
          onLongPress={() => {
            this.props.onLongPress();

            if (this.props.children) {
              this.animateButton();
            }
          }}
          onPress={() => {
            this.props.onPress();

            if (this.props.children) {
              this.reset();
            }
          }}
        >
          <Animated.View
            style={[
              styles.btn,
              {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
                backgroundColor: this.state.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.props.buttonColor, this.props.buttonColor], // Default the second option was called this.props.btnOutRange change it for change the color onLongPress
                }),
                transform: [
                  {
                    scale: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, this.props.outRangeScale],
                    }),
                  },
                  {
                    rotate: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", this.props.degrees + "deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            {!this.state.active ? this.renderButtonIcon() : this.renderOpenButtonIcon()}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  renderOpenButtonIcon() {
    return (
      <Animated.Text
        style={[
          styles.btnText,
          {
            color: this.state.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                'white',
                'white',
              ],
            }),
          },
        ]}
      >
        +
      </Animated.Text>
    );
  }

  renderButtonIcon() {
    if (this.props.icon) {
      return this.props.icon;
    } else {
      this.renderOpenButtonIcon()
    }
  }

  renderCircles() {
    if (!this.state.active) return null;
    const startDegree =
      (this.props.startDegree || alignMap[this.props.position].startDegree) + (this.props.offset || 0);
    const endDegree =
      (this.props.endDegree || alignMap[this.props.position].endDegree) - (this.props.offset || 0);
    const startRadian = (startDegree * Math.PI) / 180;
    const endRadian = (endDegree * Math.PI) / 180;

    const childrenCount = React.Children.count(this.props.children) - 1;
    let offset = 1;
    if (childrenCount !== 1 && childrenCount < 6) {
      offset = (endRadian - startRadian) / (childrenCount /*-1*/);
    }

    let numPerRow = 5;
    let row = 1
    return React.Children.map(this.props?.children, (button, index) => {
      if (index === 0) { return <></> }
      else {
        let angleProp = index
        let rowToRadius = 1
        if (index < 6) {
          offset = childrenCount >= 6 ? (endRadian - startRadian) / 5 : offset
        } else {
          if (row < (Math.floor(index / numPerRow) + 1)) {
            numPerRow++
            row++
          }
          angleProp = index - (Math.floor(index / numPerRow) * numPerRow) * 0.9
          offset = (endRadian - startRadian) / (numPerRow + 1);
          rowToRadius = row * 0.8
        }

        return (
          <View pointerEvents="box-none" style={this.getCircleContainerStyle()}>
            <CircleButtonItem
              key={index}
              position={this.props.position}
              anim={this.state.anim}
              size={this.props.itemSize}
              radius={this.props.radius * rowToRadius}
              angle={startRadian + angleProp * offset}
              btnColor={this.props.btnOutRange}
              {...button.props}
              onPress={() => {
                if (this.props.autoInactive) {
                  this.timeout = setTimeout(() => {
                    this.reset();
                  }, 200);
                }
                button.props.onPress();
              }}
            />
          </View>
        );
      }
    });

  }

  render() {
    let backdrop;
    if (this.state.active) {
      backdrop = (
        <TouchableWithoutFeedback
          style={styles.overlay}
          onPress={() => {
            this.reset();
            this.props.onOverlayPress();
          }}
        >
          <Animated.View
            style={{
              backgroundColor: this.props.bgColor,
              flex: 1,
            }}
          >
            {this.props.backdrop}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View pointerEvents="box-none" style={styles.overlay}>
        {backdrop}

        {this.props.children && this.renderCircles()}
        <View pointerEvents="box-none" style={this.getCircleContainerStyle()}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

CircleButton.Item = CircleButtonItem;

CircleButton.propTypes = {
  active: PropTypes.bool,
  bgColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  size: PropTypes.number,
  itemSize: PropTypes.number,
  autoInactive: PropTypes.bool,
  onPress: PropTypes.func,
  onOverlayPress: PropTypes.func,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
  radius: PropTypes.number,
  children: PropTypes.node,
  position: PropTypes.oneOf([
    "left",
    "center",
    "right",
    "topleft",
    "tpocenter",
    "topright",
  ]),
};

CircleButton.defaultProps = {
  active: false,
  bgColor: "transparent",
  buttonColor: "rgba(0,0,0,1)",
  buttonTextColor: "rgba(0,0,0,1)",
  position: "center",
  outRangeScale: 1,
  autoInactive: true,
  onPress: () => { },
  onOverlayPress: () => { },
  backdrop: false,
  degrees: 135,
  size: 63,
  itemSize: 36,
  radius: 100,
  btnOutRange: "rgba(0,0,0,1)",
  btnOutRangeTxt: "white",
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "transparent",
    elevation: 24
  },
  circleContainer: {
    paddingBottom: 30,
    flexDirection: "column",
    padding: 10,
  },
  circleBarItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  btn: {
    // borderWidth:2,
    // borderColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    marginTop: -4,
    fontSize: 24,
    backgroundColor: "transparent",
    position: "relative",
  },
});