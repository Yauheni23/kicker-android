import React, {useEffect, useState} from 'react';
import {ScrollView, ToastAndroid, View} from 'react-native';
import axios from 'axios';
import {serverAddress} from '../../constants/server';
import {ViewWithLoading} from '../../components/ViewWithLoading';
import {Button, Card, Input} from 'react-native-elements';
import Colors from '../../constants/Colors';
import {Select} from '../../components/Select';
import {ViewWithSending} from '../../components/ViewWithSending';
import {validateGame} from '../../validators/game';


export const GameEditorScreen = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSending, setSending] = useState(false);
    const [teams, setTeams] = useState([]);
    const [firstSelectedTeam, setFirstTeam] = useState();
    const [secondSelectedTeam, setSecondTeam] = useState();
    const [goals, setGoals] = useState(['0', '0']);
    const [playersFirstTeam, setPlayersFirstTeam] = useState([undefined, undefined]);
    const [playersSecondTeam, setPlayersSecondTeam] = useState([undefined, undefined]);
    const [enabledFirstTeamUsers, setEnabledFirstTeamUsers] = useState([]);
    const [enabledSecondTeamUsers, setEnabledSecondTeamUsers] = useState([]);
    const [goalsFirstTeam, setGoalsFirstTeam] = useState(['0', '0']);
    const [goalsSecondTeam, setGoalsSecondTeam] = useState(['0', '0']);

    useEffect(() => {
        setLoading(true);
        axios.get(`${serverAddress}/team`)
            .then(response => {
                setTeams(response.data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const selectedUsers = playersFirstTeam.concat(playersSecondTeam);
        if (firstSelectedTeam) {
            const lol = firstSelectedTeam.users.filter(
                user => selectedUsers.every(userFilter => !userFilter || (userFilter.id !== user.id)));
            setEnabledFirstTeamUsers(lol);
        }
        if (secondSelectedTeam) {
            const kek = secondSelectedTeam.users.filter(
                user => selectedUsers.every(userFilter => !userFilter || (userFilter.id !== user.id)));
            setEnabledSecondTeamUsers(kek);
        }
    }, [firstSelectedTeam, secondSelectedTeam, playersFirstTeam, playersSecondTeam]);

    const chooseFirstTeam = (team) => {
        setFirstTeam(team);
        setPlayersFirstTeam([undefined, undefined]);
    };

    const chooseSecondTeam = (team) => {
        setSecondTeam(team);
        setPlayersSecondTeam([undefined, undefined]);
    };

    const createGame = () => {
        const requestBody = generateRequestBody();

        if (validateGame(requestBody)) {
            setSending(true);
            axios.post(`${serverAddress}/game`, requestBody)
                .then(() => {
                    clear();
                    ToastAndroid.show(`Game was created`, 2000);
                    setSending(false);
                })
                .catch(() => ToastAndroid.show(`The game isn't correct`, 2000));
        } else {
            ToastAndroid.show(`The game isn't correct`, 1000);
        }
    };

    const generateRequestBody = () => ({
        team1: {
            goals: +goals[0], id: firstSelectedTeam && firstSelectedTeam.id, player1: {
                id: playersFirstTeam[0] && playersFirstTeam[0].id, goals: +goalsFirstTeam[0]
            }, player2: {
                id: playersFirstTeam[1] && playersFirstTeam[1].id, goals: +goalsFirstTeam[1]
            }
        }, team2: {
            goals: +goals[1], id: secondSelectedTeam && secondSelectedTeam.id, player1: {
                id: playersSecondTeam[0] && playersSecondTeam[0].id, goals: +goalsSecondTeam[0]
            }, player2: {
                id: playersSecondTeam[1] && playersSecondTeam[1].id, goals: +goalsSecondTeam[1]
            }
        }
    });

    const clear = () => {
        setFirstTeam(undefined);
        setSecondTeam(undefined);
        setGoals(['0', '0']);
        setPlayersFirstTeam([undefined, undefined]);
        setPlayersSecondTeam([undefined, undefined]);
        setEnabledFirstTeamUsers([]);
        setEnabledSecondTeamUsers([]);
        setGoalsFirstTeam(['0', '0']);
        setGoalsSecondTeam(['0', '0']);
    };

    const getEnabledTeam = (selectedTeam) => {
        return teams.filter(team => team.id !== (selectedTeam && selectedTeam.id));
    };

    return (<ViewWithLoading isLoading={isLoading}>
        <ViewWithSending isSending={isSending}>
            <ScrollView>
                <Card title='Creating Game' titleStyle={{color: Colors.headerText, fontSize: 40, textAlign: 'center'}}
                      containerStyle={{margin: 15}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Select list={getEnabledTeam(secondSelectedTeam)} onSelect={chooseFirstTeam} mode='team'
                                    size='middle' value={firstSelectedTeam} header='Teams'/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Select list={getEnabledTeam(firstSelectedTeam)} onSelect={chooseSecondTeam} mode='team'
                                    size='middle' value={secondSelectedTeam} header='Teams'/>
                        </View>
                    </View>
                    <View style={{
                        display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'
                    }}>
                        <View style={{width: 100, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Input
                                inputStyle={{textAlign: 'center'}}
                                keyboardType='number-pad'
                                value={goals[0]}
                                maxLength={2}
                                onChangeText={countGoals => setGoals([
                                    countGoals, goals[1]
                                ])}
                            />
                        </View>
                        <View style={{width: 100, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Input
                                inputStyle={{textAlign: 'center'}}
                                keyboardType='number-pad'
                                value={goals[1]}
                                maxLength={2}
                                onChangeText={countGoals => setGoals([
                                    goals[0], countGoals
                                ])}
                            />
                        </View>

                    </View>
                    <View
                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 5}}>
                        <View style={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '50%'
                        }}>
                            {firstSelectedTeam && <>
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <Select list={enabledFirstTeamUsers.concat(playersFirstTeam[0])}
                                            value={playersFirstTeam[0]}
                                            header='Players'
                                            onSelect={(player) => setPlayersFirstTeam([
                                                player, playersFirstTeam[1]
                                            ])}/>
                                    <Input
                                        inputStyle={{textAlign: 'center'}}
                                        keyboardType='number-pad'
                                        value={goalsFirstTeam[0]}
                                        maxLength={2}
                                        onChangeText={countGoals => setGoalsFirstTeam([
                                            countGoals, goalsFirstTeam[1]
                                        ])}/>
                                </View>
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <Select list={enabledFirstTeamUsers.concat(playersFirstTeam[1])}
                                            value={playersFirstTeam[1]}
                                            header='Players'
                                            onSelect={(player) => setPlayersFirstTeam([
                                                playersFirstTeam[0], player
                                            ])}/>
                                    <Input
                                        inputStyle={{textAlign: 'center'}}
                                        keyboardType='number-pad'
                                        value={goalsFirstTeam[1]}
                                        maxLength={2}
                                        onChangeText={countGoals => setGoalsFirstTeam([
                                            goalsFirstTeam[0], countGoals
                                        ])}/>
                                </View>
                            </>}
                        </View>

                        <View style={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '50%'
                        }}>
                            {secondSelectedTeam && <>
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <Select list={enabledSecondTeamUsers.concat(playersSecondTeam[0])}
                                            value={playersSecondTeam[0]}
                                            header='Players'
                                            onSelect={(player) => setPlayersSecondTeam([
                                                player, playersSecondTeam[1]
                                            ])}/>
                                    <Input
                                        inputStyle={{textAlign: 'center'}}
                                        keyboardType='number-pad'
                                        value={goalsSecondTeam[0]}
                                        maxLength={2}
                                        onChangeText={countGoals => setGoalsSecondTeam([
                                            countGoals, goalsSecondTeam[1]
                                        ])}/>
                                </View>
                                <View style={{display: 'flex', alignItems: 'center'}}>
                                    <Select list={enabledSecondTeamUsers.concat(playersSecondTeam[1])}
                                            value={playersSecondTeam[1]}
                                            header='Players'
                                            onSelect={(player) => setPlayersSecondTeam([
                                                playersSecondTeam[0], player
                                            ])}/>
                                    <Input
                                        inputStyle={{textAlign: 'center'}}
                                        keyboardType='number-pad'
                                        value={goalsSecondTeam[1]}
                                        maxLength={2}
                                        onChangeText={countGoals => setGoalsSecondTeam([
                                            goalsSecondTeam[0], countGoals
                                        ])}/>
                                </View>
                            </>}

                        </View>
                    </View>
                    <Button
                        buttonStyle={{backgroundColor: Colors.creatingButton}}
                        title="Create"
                        onPress={createGame}
                    />
                </Card>
            </ScrollView>
        </ViewWithSending>

    </ViewWithLoading>);
};
