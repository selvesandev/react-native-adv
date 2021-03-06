import React, {Component} from 'react';
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;


export default class Deck extends Component {
    static defaultProps = {
        onSwipeRight: () => {
        },
        onSwipeLeft: () => {

        },
        renderNoMoreCards: () => {

        }
    };

    constructor() {
        super();
        this.state = {
            index: 0
        };
        this.position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                //executed when the user taps on the screen.
                return true;

            },
            onPanResponderMove: (event, gesture) => {
                //gets executed once the object is moved on the screen.
                //this is going to be called a lot of times.

                //event(1st arg) is pretty much the same as in javascript -> gives information about the event element.
                //gesture (2nd arg) has bunch of information about what the user is doing with the fingers on the screen
                //eg: what pixel value the user is pressing down on, how quickly the user is moving their fingers.

                console.log(event, gesture);
                this.position.setValue({x: gesture.dx, y: gesture.dy});
                //update the current position of the element with the user dragged value.

            },
            onPanResponderRelease: (event, gesture) => {
                //gets executed when the user lets go the touch or screen.
                console.log('onPanResponderRelease');
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left')
                } else {
                    this.resetPosition();
                }
            }
        });


    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data)
            this.setState({index: 0});
    }

    forceSwipe(where) {
        let swipe = {x: 0, y: 0};
        if (where === 'right') {
            swipe.x = SCREEN_WIDTH + 100
        } else if (where === 'left') {
            swipe.x = -SCREEN_WIDTH - 100
        }
        //spring has a bouncing effect we do not need that keeping it simple.
        Animated.timing(this.position, {
            toValue: swipe,
            duration: 250
        }).start(() => {
            //called when the animation is complete
            this.onSwipeComplete(where);
        });
    }

    onSwipeComplete(direction) {
        const {onSwipeLeft, onSwipeRight, data} = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.position.setValue({x: 0, y: 0});
        this.setState({index: this.state.index + 1});

    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: {
                x: 0,
                y: 0
            }
        }).start();
    }

    getCardStyle() {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2.5, 0, SCREEN_WIDTH * 2.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{rotate: rotate}]
        };
    }

    renderCard() {
        if (this.state.index >= this.props.data.length)
            return this.props.renderNoMoreCards();

        return this.props.data.map((item, i) => {
            if (i < this.state.index) return null;

            if (i === this.state.index) {
                return <Animated.View key={i}
                                      style={[this.getCardStyle(), styles.cardStyle]} {...this.panResponder.panHandlers}>
                    {this.props.renderCard(item)}
                </Animated.View>
            }
            return <Animated.View key={i}
                                  style={[styles.cardStyle, {top: 10 * (i - this.state.index)}]}>{this.props.renderCard(item)}</Animated.View>;
        }).reverse();
    }

    render() {
        return (<View>
            {this.renderCard()}
        </View>);
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH //or left:0, right:0
    }
};