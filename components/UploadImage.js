import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {RNS3} from 'react-native-aws3/src/RNS3';
import {ACCESS_KEY, SECRET_KEY} from '../env';
import {Loader} from './Loader';


const config = {
    keyPrefix: 'image/',
    bucket: 'myimagesforcoursework',
    region: 'eu-central-1',
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY,
    successActionStatus: 201
};

export const UploadImage = ({size: {height, width}, onChange, defaultImage}) => {
    const [image, setImage] = useState('');
    const [isUploading, setUploading] = useState(false);

    useEffect(() => {
        setImage(defaultImage);
    }, [defaultImage]);

    const selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

        const file = await ImagePicker.launchImageLibraryAsync();
        const {cancelled, uri} = file;

        if (!cancelled) {
            setUploading(true);
            uploadImage(uri);
        }
    };

    const uploadImage = (uri) => {
        const type = uri.split('.')
            .pop();

        const file = {
            uri, name: new Date().getTime() + '.' + type, type: `image/${type}`
        };

        RNS3.put(file, config)
            .then(response => {
                setImage(response.body.postResponse.location);
                onChange(response.body.postResponse.location);
                setUploading(false);
            });
    };

    return (<View style={{...styles.container, height, width}}>
        {!isUploading ? <TouchableOpacity onPress={selectPicture}>
            <View style={{...styles.button, height, width}}>
                {image ?
                    <Image style={styles.image} resizeMode={'cover'} source={{uri: image}}/> :
                    <Image style={styles.image} resizeMode={'cover'}
                           source={require('../assets/images/defaultUploadImage.png')}/>}
            </View>
        </TouchableOpacity> : <Loader/>}
    </View>);
};

const styles = StyleSheet.create({
    text: {
        fontSize: 21
    }, row: {
        flexDirection: 'row'
    }, image: {
        width: '100%', height: '100%'
    }, button: {
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }, container: {
        backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }
});
