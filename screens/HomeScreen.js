import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {UploadImage} from '../components/UploadImage';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <UploadImage/>
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
