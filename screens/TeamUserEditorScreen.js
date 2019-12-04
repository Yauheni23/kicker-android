import React, {useEffect, useState} from 'react';
import {Picker, StyleSheet, ToastAndroid, View} from 'react-native';
import {serverAddress} from '../constants/server';
import axios from 'axios';
import {Spinner} from './loaderScreen';
import {Button} from 'react-native-elements';

export const TeamUserEditorScreen = () => {
    const [selectedTeam, setTeam] = useState(undefined);
    const [selectedUser, setUser] = useState(undefined);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [enabledUsers, setEnabledUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`${serverAddress}/team`),
            axios.get(`${serverAddress}/user`),
        ]).then(([teamResponse, userResponse]) => {
            setTeams(teamResponse.data);
            setUsers(userResponse.data);
            selectTeam(teamResponse.data[0], userResponse.data);
        })
            .finally(() => setLoading(false));
    }, []);

    const getEnabledUser = () => {
        return users.filter(user => selectedTeam.users.findIndex(userSelectedTeam => user.id === userSelectedTeam.id) === -1);
    };

    const selectTeam = (team, users) => {
        setTeam(team);
        const enabledUsers = users.filter(user => team.users.findIndex(userSelectedTeam => user.id === userSelectedTeam.id) === -1);

        setEnabledUsers(enabledUsers);
        setUser(enabledUsers[0]);
    }

    const addUserToTeam = () => {
        axios.post(`${serverAddress}/team/user`, {
            userId: selectedUser.id,
            teamId: selectedTeam.id,
        }).then(() => {
            ToastAndroid.show(`Done`, 2000);
        })
    };

    return (
        <View style={styles.container}>
            {!isLoading ?
                <View>
                    <Picker
                        selectedValue={selectedTeam}
                        style={{height: 50, width: '100%'}}
                        onValueChange={selectTeam}>
                        {teams.map(team => <Picker.Item key={team.id} label={team.name} value={team}/>)}
                    </Picker>
                    <Picker
                        selectedValue={selectedUser}
                        style={{height: 50, width: '100%'}}
                        onValueChange={user => setUser(user)}>
                        {enabledUsers.map(user => <Picker.Item key={user.id} label={user.name} value={user}/>)}
                    </Picker>
                    <Button
                        buttonStyle={{backgroundColor: 'blue'}}
                        title="Add"
                        onPress={addUserToTeam}
                    />
                </View>
                :
                <Spinner/>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    }
});

