import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, ImageBackground} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import {EntryScreen} from './screens/entry/EntryScreen';

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [isEntry, setIsEntry] = useState(true);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <ImageBackground source={require('./assets/images/background.jpg')}
                             style={{width: '100%', height: '100%'}}
            >
                <View style={styles.container}>
                    {isEntry ?
                        <AppNavigator/> :
                        <EntryScreen login={() => setIsEntry(true)}/>
                    }
                    <StatusBar hidden/>
                </View>
            </ImageBackground>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/robot-dev.png'),
            require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        }),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
