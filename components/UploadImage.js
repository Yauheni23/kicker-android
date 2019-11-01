import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import * as Permissions  from 'expo-permissions';
import * as ImagePicker  from 'expo-image-picker';
import * as axios  from 'axios';
import {serverAddress} from '../constants/server';

export class UploadImage extends React.Component {
    state = {
        image: null,
        isUploading: false
    };

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync();
        if (!cancelled) this.setState({ image: uri });

        this.uploadImage(uri);
    };

    uploadImage = async (uri) => {
        this.setState({isUploading: true});

        let uploadData = new FormData();
        uploadData.append('submit', 'ok');
        uploadData.append('file', {
            type: 'image/*',
            uri,
            name: 'qqqqqq.jpg'
        });

        fetch(`${serverAddress}/image`, {
            method: 'post',
            body: uploadData,
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });
        this.setState({ image: uri });
    };

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: this.state.image }} />
                {
                    this.state.isUploading && <ActivityIndicator/>
                }
                <View style={styles.row}>
                    <Button onPress={this.selectPicture}>Gallery</Button>
                    <Button onPress={this.takePicture}>Camera</Button>
                </View>
            </View>
        );
    }
}

const Button = ({ onPress, children }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
    },
    row: { flexDirection: 'row' },
    image: { width: 200, height: 200, backgroundColor: 'gray' },
    button: {
        padding: 13,
        margin: 15,
        backgroundColor: '#dddddd',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
