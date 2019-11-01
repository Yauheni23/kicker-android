import React from 'react';
import LottieView from 'lottie-react-native';

export class Spinner extends React.Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <LottieView
                ref={animation => {
                    this.animation = animation;
                }}
                source={require('../animations/spinner')}
            />
        );
    }
}

