import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {RegisterScreen} from './RegisterScreen';
import {LoginScreen} from './LoginScreen';
import {BirdAnimation} from '../components/BirdAnimation';

export const EntryScreen = ({login}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const singIn = ({username, password}) => {
        console.log(username);
        console.log(password);
        setIsSubmit(true);
        setTimeout(() => {
            login();
        }, 3000);
    }

    const singUp = ({username, password, repeatedPassword}) => {
        console.log(username);
        console.log(password);
        console.log(repeatedPassword);
        login();
    }

    return (
        <View>
            {!isSubmit ?
                <View>
                    <View style={{height: '40%', width: '100%', marginTop: 10}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{height: 230, width: 230}} source={require('../assets/images/logo.png')}/>
                        </View>
                        <Text style={{textAlign: 'center', fontSize: 50}}>Kicker</Text>
                    </View>
                    <View style={{height: '60%', width: '100%'}}>
                        {isRegister ?
                            <RegisterScreen singUp={singUp} swapPage={() => setIsRegister(false)}/> :
                            <LoginScreen signIn={singIn} swapPage={() => setIsRegister(true)}/>
                        }
                    </View>
                </View>
                : <BirdAnimation/>
            }
        </View>
    )
}
