import React, {Component} from 'react';
import {View, Animated, Text} from 'react-native';

export default class Ball extends Component {
    constructor() {
        super();
        this.position = new Animated.ValueXY(0, 0);
        console.log(this.position.getLayout());
        Animated.spring(this.position, {
            toValue: {
                x: 200,
                y: 500
            }
        }).start();
    }

    render() {
        console.log(this.position.getLayout());
        return (<Animated.View style={this.position.getLayout()}><View
            style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 30,
                borderColor: 'red'
            }}/><Text>Ball</Text></Animated.View>);
    }
}