import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import * as Permissions  from 'expo-permissions';
import * as ImagePicker  from 'expo-image-picker';
import * as axios  from 'axios';
import {serverAddress} from '../constants/server';
import {RNS3} from 'react-native-aws3/src/RNS3';
import { ACCESS_KEY, SECRET_KEY } from '../env'

export class UploadImage extends React.Component {
    state = {
        image: null,
        isUploading: false
    };


    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

        const file = await ImagePicker.launchImageLibraryAsync();
        const { cancelled, uri } = file;
        this.setState({isUploading: true});
        if (!cancelled) this.uploadImage(uri);
    };

    uploadImage = (uri) => {
        const type = uri.split('.').pop();

        const file = {
            uri,
            name: new Date().getTime() + '.' + type,
            type: `image/${type}`,
        };

        const config = {
            keyPrefix: 'image/',
            bucket: 'myimagesforcoursework',
            region: 'eu-central-1',
            accessKey: ACCESS_KEY,
            secretKey: SECRET_KEY,
            successActionStatus: 201
        }

        RNS3.put(file, config)
            .then( response => this.setState({
                image: response.body.postResponse.location,
                isUploading: false
            }))
    }

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });

        if (!cancelled) this.uploadImage(uri);
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
