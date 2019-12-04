import React, {useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import axios from 'axios';
import {serverAddress} from '../constants/server';
import {UploadImage} from '../components/UploadImage';
import {Button, Input} from 'react-native-elements';

export const TeamEditorScreen = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const createTeam = () => {
        axios.post(`${serverAddress}/team`, {
            name,
            image
        })
            .then(() => {
                ToastAndroid.show(`${name} was created`, 2000);
                setName('');
            })
            .catch(() => {
                ToastAndroid.show('Name should be unique', 2000)
            })
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 24}}>
                Creating team
            </Text>
            <View>
                <UploadImage size={{height: 150, width: 150}} onChange={image => setImage(image)}/>
            </View>
            <Input
                value={name}
                onChangeText={text => setName(text)}
                label='Name'
                placeholder='Your team name'
            />
            <Button
                buttonStyle={{backgroundColor: 'blue'}}
                title="Create"
                onPress={createTeam}
            />
        </View>
    )
}
