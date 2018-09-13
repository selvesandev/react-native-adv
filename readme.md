### React Native Advanced.



##### Installing React Native with EXPO.
Installation can be done by `react-native-cli` installing react native with cli
requires android studio and xcode installed in your machine.

`Expo XDE` Download the expo from https://docs.expo.io/versions/v29.0.0/introduction/installation for your 
respective operating system.

Other methods.

`create react native` command line tool.

`Sketch` 



### Animations with React Native.
##### Animation Systems in React Native.
###### 1) Layout Animations
1) Easy to Setup
2) Not much Control.
3) Some things might get animated that we don't want to be.
Used to set very simple animations say change the size of the box or circle, move the element around the screen.
```
import {LayoutAnimation, UIManager} from 'react-native';
  componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

```

###### 2) Animated
1) Far more complex to set up.
2) Allows for more complicated animations
3) You probably need this if you want to handle gesture animations.


For eg: animate a ball to the right and left and bottom 20px with full control. Basically if you are doing
animation animation that you think is remotely complicated reach for `animated`.


The `animated` module contains many different function object and components that can be used for the animations.
```
import {Animated} from 'react-native';
```

###### The animated Module.



XXXX          | XXXX   
------------- | -------------
Values        | `Value` `ValueXY`
Types         | `Spring` `Decay` `Timing`
Components    | `View` `Text` `Image`



*3 Questions for animations*
* Where is the item right now (X and Y Position)?
> the animated module contains the `Values` Object which helps us describe the current position of the element on the screen. This object contains two small property `Value` & `ValueXY` i.e what is the current position of the element or what size or what color. 
```
import {Animated} from 'react-native';

Animated.Values.Animated
```

* Where/How is the element moving to or size, color? (end goal)
> This is answered by the `Types` module which have three objects `Spring`, `Decay` and `Timing` which will help us to understand how is the animation changing over time. How are we changing the position or color of the element over time.
```
import {Animated} from 'react-native';
Animated.Types.Spring

```
* Which element are we animating?
> `Component` module has three components `View`, `Text` and `Image` to specify the element that we are trying to animate.
```
import {Animated} from 'react-native';
Animated.Components.View
```


#### Animating a ball by answering three different question.
```
Where is the item on the screen ?

> this.position = new Animated.ValueXY(0, 0);
        
```

```
Where is the element moving to ?

Animated.spring(this.position, {
            toValue: {
                x: 200,
                y: 500
            }
        }).start();
        //the spring here used to change the position where we are moving the element to.
        // default 1 second.
```

```
Which element ?
    //passing the values which is changing over time to Animated.View

 render() {
        return (<Animated.View style={this.position.getLayout()}><View
            style={{height: 60, width: 60, borderRadius: 30, borderWidth: 30, borderColor: 'red'}}/></Animated.View>);
    }

```


#### Animated.Value && Animated.timing
**Eg: changing the opacity** 
```
this.animatedValue=new Animated.Value(1);

Animated.timing(this.animatedValue,{
    toValue:0.3,
    duration:1000,
    easing: Easing.bounce // various easing options are available. https://facebook.github.io/react-native/docs/easing
}).start();
```
You can also use this method to change the other properties like color,height etc.

#### Animated.spring
Spring is a bouncy effect on the animation.
```
    Animated.spring(this.animatedValue,{
        toValue:.5,
        friction:3,
        tension:40
    }).start();
```

```
const animatedStyle = {
            transform: [{
                scale: this.animatedValue
            }]
        };
        
        <Animated.View style={[styles.btnStyle, animatedStyle]}>
                            <Text style={styles.text}>Click me</Text>
                        </Animated.View>
```

#### Animated.decay
Decay the acceleration on the direction. 
```
    Animated.decay(this.animatedValue,{
        decelaration:0.997,
        velocity:{x:gestureState.vx,y:gestureState.vy}
    }).start();
```

#### Animated.sequece
To Play multiple animation one after this other.
```
this.animatedValue1 = new Animated.Value(0);
this.animatedValue2 = new Animated.Value(1);

 const animatedStyle = {
            transform: [{
                translateY: this.animatedValue1
            }, {
                scale: this.animatedValue2
            }]
        };
        
        
 Animated.sequence([
             Animated.timing(this.animatedValue1, {
                 toValue: 150,
                 duration: 1000
             }),
             Animated.spring(this.animatedValue2, {
                 toValue: 3,
             }),
             Animated.timing(this.animatedValue1, {
                 toValue: 0,
                 duration: 1000
             }),
             Animated.spring(this.animatedValue2, {
                 toValue: 1
             })
         ]).start();
                
```

#### Animated.stagger
All the animation inside the `Animated.stagger` will get animated but `1000` seconds apart one after the other in this example.

```
this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);
        this.animatedValue3 = new Animated.Value(0);
        
        
const animatedStyle1 = {
     height: this.animatedValue1
 };

 const animatedStyle2 = {
     height: this.animatedValue2
 };

 const animatedStyle3 = {
     height: this.animatedValue3
 };
     

Animated.stagger(1000, [
    Animated.timing(this.animatedValue1, {
        toValue: 300,
        duration: 1500
    }),
    
    Animated.timing(this.animatedValue2, {
        toValue: 500,
        duration: 1500
    }),
    
    Animated.timing(this.animatedValue3, {
        toValue: 800,
        duration: 1500
    })
]).start();
                
```

All the animation inside the `Animated.stagger` will get animated but `1000` seconds apart one after the other.

#### Animated.parallel
Animate all the animation in the same time.
```
this.animatedValue1 = new Animated.Value(0);
this.animatedValue2 = new Animated.Value(1);
const animatedStyle1 = {
    transform: [{
        translateY: this.animatedValue1
    }, {
        scale: this.animatedValue2
    }]
};

Animated.parallel([
    Animated.timing(this.animatedValue1, {
        toValue: 300,
        duration: 300
    }),

    Animated.spring(this.animatedValue2, {
        toValue: 2,
        duration:1000
    })
]).start()
```


#### Handling Gestures.
* What are we touching?
* What component handles touch?
* How is the gesture changing?


##### The PanResponder
The User `Click on the Screen` and then `moves the finger` then `release it` this is one single Gesture.  
Whenever we want to work with the gesture in react native we use `PanResponder` module.
```
import {PanResponder} from 'react-native';
```

```
constructor() {
        super();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                // executed when the user taps on the screen.
                // if returned true that means anytime the user places their finger in the card and
                // starts dragging around the screen the panresponder will work if false panresponder wont work.
                

            },
            onPanResponderMove: (event, gesture) => {
                // gets executed once the object is moved on the screen.
                // this is going to be called a lot of times.

                // event(1st arg) is pretty much the same as in javascript -> gives information about the event element.
                // gesture (2nd arg) has bunch of information about what the user is doing with the fingers on the screen
                // eg: what pixel value the user is pressing down on, how quickly the user is moving their fingers.

                console.log(event, gesture);

            },
            onPanResponderRelease: () => {
                // gets executed when the user lets go the touch or screen.
                console.log('onPanResponderRelease');
            }
        });

    }
```

In order for the panResponder to operate you will have to wire it to a particular element to our component.
```
<View {...this.panResponder.panHandlers}>
            {this.renderCard()}
        </View>
```
The ```panResponder.panHandlers``` is a object which have different callback that help interact with different user's presses.
```...``` syntax helps us to spread all the different callbacks. 


#### Interpolation System.
Interpolation is used when we want to tie some changing property (eg: position of the dragged card) to another property (eg: transform)


As the user drags the card around the screen i want to also change the rotation property as well.
Or when a element is dragged i want to change the color or may be size.  


Cases when you want to take in some property and output some related property as well this is what the interpolation system helps us do.

```
const rotate = this.position.x.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: ['-120deg', '0deg', '120deg']
        }); // the interpolation to change the transform css property.

        return {
            ...this.position.getLayout(),
            transform: [{rotate: rotate}]
        };

```

**Here** the `inputRange` and `outputRange` go with relation to one another.
the `inputRange` is the input value received from the user's interaction with the card. 
and the `outputRange` `deg` values changes according to the input value .


If the user moves the card `-500deg` on the x axis the card will rotate `-120deg` on the x axis and if `500` on the x axis
then the card will rotate `120deg`;

