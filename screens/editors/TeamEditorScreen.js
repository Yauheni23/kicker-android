import React, {useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import axios from 'axios';
import {serverAddress} from '../../constants/server';
import {UploadImage} from '../../components/UploadImage';
import {Button, Card, Input} from 'react-native-elements';
import {ViewWithSending} from '../../components/ViewWithSending';
import Colors from '../../constants/Colors';
import {ScrollViewForHorizontal} from '../../components/ScrollViewForHorizontal';

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
            <ScrollViewForHorizontal>
            <Card containerStyle={{flex: 1, alignItems: 'center', marginBottom: 15, minWidth: 250}}
                  titleStyle={{fontSize: 40, color: Colors.headerText}}  title='Creating Team'>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <UploadImage size={{height: 200, width: 200}} onChange={image => setImage(image)} defaultImage={image}/>
                    <View style={{width: '100%', padding: 0, marginHorizontal: 0, marginVertical: 20}}>

                    <Input
                        value={name}
                        onChangeText={text => setName(text)}
                        label='Name'
                        placeholder='Your team name'
                    />
                    </View>
                </View>
                    <Button
                        buttonStyle={{backgroundColor: Colors.creatingButton}}
                        title="Create"
                        onPress={createTeam}
                        disabled={!(name.trim().length > 1)}
                    />
            </Card>
            </ScrollViewForHorizontal>
        </ViewWithSending>
    )
}
