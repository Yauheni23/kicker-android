import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

export class Loader extends React.Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={{height: '100%', width: '100%'}}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    source={require('../animations/loader')}
                />
            </View>
        );
    }
}

