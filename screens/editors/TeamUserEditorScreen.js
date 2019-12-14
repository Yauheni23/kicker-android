import React, {useEffect, useState} from 'react';
import {Image, Picker, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {serverAddress} from '../../constants/server';
import axios from 'axios';
import {Spinner} from '../loaderScreen';
import {Button} from 'react-native-elements';
import {ViewWithLoading} from '../../components/ViewWithLoading';


export const TeamUserEditorScreen = ({navigation}) => {
    const [selectedTeam, setTeam] = useState();
    const [selectedUser, setUser] = useState();
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [enabledUsers, setEnabledUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isSending, setSending] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`${serverAddress}/team`), axios.get(`${serverAddress}/user`)
        ])
            .then(([teamResponse, userResponse]) => {
                setUsers(userResponse.data);
                setTeams(teamResponse.data);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const enabledUsers = users.filter(
            user => selectedTeam.users.findIndex(userSelectedTeam => user.id === userSelectedTeam.id) === -1);

        setEnabledUsers(enabledUsers);
        setUser(enabledUsers[0]);
    }, [selectedTeam]);

    useEffect(() => {
        setTeam(teams[0]);
    }, [teams]);

    useEffect(() => {
        navigation.addListener('willFocus', () => {
            setLoading(true);
            update().then(() => setLoading(false));
        })
    }, []);

    const addUserToTeam = () => {
        setSending(true);
        axios.post(`${serverAddress}/team/user`, {
            userId: selectedUser.id, teamId: selectedTeam.id
        })
            .then(() => update())
            .then(() => {
                ToastAndroid.show(`Done`, 2000);
                setSending(false)
            });
    };

    const update = () => {
        return Promise.all([
            axios.get(`${serverAddress}/team`), axios.get(`${serverAddress}/user`)
        ])
            .then(([teamResponse, userResponse]) => {
                setUsers(userResponse.data);
                setTeams(teamResponse.data);
            });
    };

    return (<View>
                {!isLoading ?
                    <ViewWithLoading isLoading={isSending}>
                        <View style={styles.main}>
                            <View>
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <Text style={styles.name}>Team</Text>
                                    <Picker
                                        selectedValue={selectedTeam}
                                        style={{height: 50, width: '100%'}}
                                        onValueChange={team => setTeam(team)}>
                                        {teams.map(team => <Picker.Item key={team.id} label={team.name} value={team}/>)}
                                    </Picker>
                                    {selectedTeam && <Image style={{width: 175, height: 175}} source={{uri: selectedTeam.image}}/>}
                                </View>
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <Text style={styles.name}>User</Text>
                                    <Picker
                                        selectedValue={selectedUser}
                                        style={{height: 50, width: '100%'}}
                                        onValueChange={user => setUser(user)}>
                                        {enabledUsers.map(user => <Picker.Item key={user.id} label={user.name} value={user}/>)}
                                    </Picker>
                                    {selectedUser && <Image style={{width: 175, height: 175}} source={{uri: selectedUser.image}}/>}
                                </View>
                            </View>

                            <Button
                                buttonStyle={{backgroundColor: 'blue'}}
                                title="Add"
                                onPress={addUserToTeam}
                                disabled={!selectedUser || !selectedTeam}
                            />
                        </View>
                    </ViewWithLoading>
                : <Spinner/>}
        </View>);
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 30
    }
});

