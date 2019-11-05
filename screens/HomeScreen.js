import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {UploadImage} from '../components/UploadImage';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <UploadImage size={{height: 150, width: 150}}/>
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff',
    },
});
