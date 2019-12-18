import React, {useState} from 'react';
import {ScrollView, ToastAndroid, View} from 'react-native';
import {UploadImage} from '../../components/UploadImage';
import {Button, Card, Input} from 'react-native-elements';
import axios from 'axios';
import {serverAddress} from '../../constants/server';
import {ViewWithSending} from '../../components/ViewWithSending';
import Colors from '../../constants/Colors';
import {ScrollViewForHorizontal} from '../../components/ScrollViewForHorizontal';


export const UserEditorScreen = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [isSending, setSending] = useState(false);

    const createUser = () => {
        setSending(true);
        axios.post(`${serverAddress}/user`, {
            name, image
        })
            .then(() => {
                setSending(false);
                setName('');
                setImage('');
                ToastAndroid.show(`${name} was created`, 2000);
            })
            .catch(() => {
                setSending(false);
                ToastAndroid.show('Name should be unique', 2000);
            });
    };

    return (<ViewWithSending isSending={isSending}>
            <ScrollViewForHorizontal>
                <Card containerStyle={{flex: 1, alignItems: 'center', marginBottom: 15, minWidth: 250}}
                      titleStyle={{fontSize: 40, color: Colors.headerText}} title='Creating User'>
                    <View style={{flex: 1, alignItems: 'center'}}>

                        <UploadImage size={{height: 200, width: 200}} onChange={image => setImage(image)}
                                     defaultImage={image}/>
                        <View style={{width: '100%', padding: 0, marginHorizontal: 0, marginVertical: 20}}>
                            <Input
                                value={name}
                                onChangeText={text => setName(text)}
                                label='Name'
                                placeholder='Your nickname'
                            />
                        </View>
                    </View>
                    <Button
                        buttonStyle={{backgroundColor: Colors.creatingButton, minWidth: 250}}
                        title="Create"
                        onPress={createUser}
                        disabled={!name.trim()}
                    />

                </Card>
            </ScrollViewForHorizontal>

        </ViewWithSending>

    );
};
