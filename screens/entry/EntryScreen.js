import React, {useState} from 'react';
import axios from 'axios';
import {Image, ScrollView, Text, ToastAndroid, View} from 'react-native';
import {RegisterScreen} from './RegisterScreen';
import {LoginScreen} from './LoginScreen';
import {BirdAnimation} from '../../components/BirdAnimation';
import {serverAddress} from '../../constants/server';
import {validateCreateUser, validateRegisterUser} from '../../validators/user';


const headersPost = {
    method: 'POST', headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
    }
};

export const EntryScreen = ({login}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const singIn = ({username, password}) => {
        if (validateCreateUser({name: username, password})) {
            setIsSubmit(true);
            fetch(`${serverAddress}/login`, {
                ...headersPost, body: JSON.stringify({
                    name: username, password
                })
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.message) {
                        setIsSubmit(false);
                        ToastAndroid.show(response.message, 2000);
                    } else {
                        setIsSubmit(false);
                        login(response);
                    }
                })
                .catch(() => {
                    ToastAndroid.show('Server error', 2000);
                    setIsSubmit(false);
                });
        } else {
            ToastAndroid.show(`User data isn't correct`, 2000);
        }

    };

    const singUp = ({username, password, repeatedPassword}) => {
        if (validateRegisterUser({name: username, password, repeatedPassword})) {
            setIsSubmit(true);
            fetch(`${serverAddress}/register`, {
                ...headersPost, body: JSON.stringify({
                    name: username, password
                })
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.message) {
                        setIsSubmit(false);
                        ToastAndroid.show(response.message, 2000);
                    } else {
                        setIsSubmit(false);
                        login(response);
                    }
                })
                .catch(() => {
                    ToastAndroid.show('Server error', 2000);
                    setIsSubmit(false);
                });
        } else {
            ToastAndroid.show(`User data isn't correct`, 2000);
        }
    };

    return (<View>
            {!isSubmit ? <ScrollView>
                <View style={{marginTop: 10}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                        <Image style={{height: 200, width: 200}} source={require('../../assets/images/kicker.png')}/>
                    </View>
                    <Text style={{textAlign: 'center', fontSize: 50, color: 'white'}}>Kicker</Text>
                </View>
                <View>
                    {isRegister ?
                        <RegisterScreen singUp={singUp} swapPage={() => setIsRegister(false)}/> :
                        <LoginScreen signIn={singIn} swapPage={() => setIsRegister(true)}/>}
                </View>
            </ScrollView> : <BirdAnimation/>}
        </View>);
};
