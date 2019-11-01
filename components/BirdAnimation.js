import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export class BirdAnimation extends React.Component {
    componentDidMount() {
        this.animation.play(0, 60);
    }

    render() {
        return (
            <View style={{height: '100%', width: '100%'}}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    source={require('../animations/bird')}
                />
            </View>
        );
    }
}
