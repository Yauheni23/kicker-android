import React, {useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import axios from 'axios';
import {serverAddress} from '../../constants/server';
import {UploadImage} from '../../components/UploadImage';
import {Button, Input} from 'react-native-elements';
import {ViewWithSending} from '../../components/ViewWithSending';
import Colors from '../../constants/Colors';

export const TeamEditorScreen = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [isSending, setSending] = useState(false)

    const createTeam = () => {
        setSending(true);
        axios.post(`${serverAddress}/team`, {
            name,
            image
        })
            .then(() => {
                setSending(false);
                setName('');
                setImage('');
                ToastAndroid.show(`${name} was created`, 200);
            })
            .catch(() => {
                setSending(false);
                ToastAndroid.show('Name should be unique', 200);
            })
    }

    return (
        <ViewWithSending isSending={isSending}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 40, color: Colors.headerText}}>
                    Creating team
                </Text>
                <View>
                    <UploadImage size={{height: 150, width: 150}} onChange={image => setImage(image)} defaultImage={image}/>
                </View>
                <Input
                    value={name}
                    onChangeText={text => setName(text)}
                    label='Name'
                    placeholder='Your team name'
                />
                <Button
                    buttonStyle={{backgroundColor: Colors.creatingButton}}
                    title="Create"
                    onPress={createTeam}
                />
            </View>
        </ViewWithSending>
    )
}
