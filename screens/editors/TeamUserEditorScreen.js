import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {serverAddress} from '../../constants/server';
import axios from 'axios';
import {Button, Card} from 'react-native-elements';
import {ViewWithSending} from '../../components/ViewWithSending';
import Colors from '../../constants/Colors';
import {Select} from '../../components/Select';
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
        if (selectedTeam) {
            const enabledUsers = users.filter(
                user => selectedTeam.users.findIndex(userSelectedTeam => user.id === userSelectedTeam.id) === -1);
            setEnabledUsers(enabledUsers);
        } else {
            setEnabledUsers([]);
        }
    }, [selectedTeam]);

    useEffect(() => {
        navigation.addListener('willFocus', () => {
            setLoading(true);
            update()
                .then(() => setLoading(false));
        });
    }, []);

    const addUserToTeam = () => {
        setSending(true);
        axios.post(`${serverAddress}/team/user`, {
            userId: selectedUser.id, teamId: selectedTeam.id
        })
            .then(() => {
                ToastAndroid.show(`${selectedUser.name} add to the team ${selectedTeam.name}`, 2000);
                setSending(false);
                setTeam(undefined);
                setUser(undefined);
            })
            .then(() => update());
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

    return (<ViewWithLoading isLoading={isLoading}>
        <ViewWithSending isSending={isSending}>
            <ScrollView>
                <Card style={styles.main} titleStyle={{fontSize: 40, color: Colors.headerText}} title='Team + User'>
                    <View>
                        <Card containerStyle={{marginTop: 0}}>
                            <View style={{display: 'flex', alignItems: 'center'}}>
                                <Select value={selectedTeam} onSelect={team => setTeam(team)} size='large'
                                        mode='team'
                                        list={teams}
                                        header='Teams'
                                />
                            </View>
                        </Card>

                        {enabledUsers.length ?
                            <Card containerStyle={{display: 'flex', alignItems: 'center', marginBottom: 15}}>
                                <Select value={selectedUser} onSelect={user => setUser(user)} size='large'
                                        mode='user'
                                        list={enabledUsers}
                                        header='Players'

                                />
                            </Card> :
                            <View style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginHorizontal: 10,
                                marginTop: 10
                            }}>
                                {!selectedTeam ?
                                    <Text style={{textAlign: 'center', color: 'orange', fontSize: 30}}>Choose
                                        team!</Text> :
                                    <Text style={{textAlign: 'center', color: Colors.error, fontSize: 40}}>The team
                                        has
                                        all the
                                        users!!!</Text>}
                            </View>}

                    </View>

                    <Button
                        buttonStyle={{backgroundColor: Colors.creatingButton}}
                        title="Add"
                        onPress={addUserToTeam}
                        disabled={!selectedUser || !selectedTeam}
                    />
                </Card>
            </ScrollView>
        </ViewWithSending>
    </ViewWithLoading>);
};

const styles = StyleSheet.create({
    container: {
        height: '100%', width: '100%'
    }, main: {
        display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between'
    }, name: {
        fontSize: 35, lineHeight: 45, color: Colors.headerText, textAlign: 'center'
    }
});

