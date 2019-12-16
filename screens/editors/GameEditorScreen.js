import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import {serverAddress} from '../../constants/server';
import {ViewWithLoading} from '../../components/ViewWithLoading';
import {Input} from 'react-native-elements';
import Colors from '../../constants/Colors';
import {Select} from '../../components/Select';


export const GameEditorScreen = () => {
    const [isLoading, setLoading] = useState(false);
    const [teams, setTeams] = useState([]);
    const [firstSelectedTeam, setFirstTeam] = useState();
    const [secondSelectedTeam, setSecondTeam] = useState();
    const [goals, setGoals] = useState({'0': '0', '1': '0'});
    const [playersFirstTeam, setPlayersFirstTeam] = useState([undefined,undefined]);
    const [playersSecondTeam, setPlayersSecondTeam] = useState([undefined,undefined]);
    const [enabledFirstTeamUsers, setEnabledFirstTeamUsers] = useState([]);

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
        const lol = secondSelectedTeam.users.filter(user => selectedUsers.every(userFilter => userFilter.id !== user.id))
        setEnabledFirstTeamUsers(lol)
    }, [playersFirstTeam, playersSecondTeam]);

    const getEnabledTeam = (selectedTeam) => {
        return teams.filter(team => team.id !== (selectedTeam && selectedTeam.id));
    };

    const getSecondTeamEnabledPlayers = (selectedUser) => {
        const selectedUsers = [playersFirstTeam[0], playersFirstTeam[1]]
            .concat(playersSecondTeam[0], playersSecondTeam[1])
            .filter(user => user && selectedUser && (user.id !== selectedUser.id));

        return secondSelectedTeam.users.filter(user => selectedUsers.every(userFilter => userFilter.id !== user.id));
    };

    return (<ViewWithLoading isLoading={isLoading}>
        <Text style={{color: Colors.headerText, fontSize: 40, textAlign: 'center'}}>Creating Game</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Select list={getEnabledTeam(secondSelectedTeam)} onSelect={(team) => setFirstTeam(team)} mode='team'
                        size='middle'/>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Select list={getEnabledTeam(firstSelectedTeam)} onSelect={(team) => setSecondTeam(team)} mode='team'
                 size='middle'/>
            </View>
        </View>
        <View style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 100, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Input
                    inputStyle={{textAlign: 'center'}}
                    keyboardType='number-pad'
                    value={goals['0']}
                    maxLength={2}
                    onChangeText={countGoals => setGoals({
                        ...goals, '0': countGoals
                    })}
                />
            </View>
            <Text>:</Text>
            <View style={{width: 100, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Input
                    inputStyle={{textAlign: 'center'}}
                    keyboardType='number-pad'
                    value={goals['1']}
                    maxLength={2}
                    onChangeText={countGoals => setGoals({
                        ...goals, '1': countGoals
                    })}
                />
            </View>

        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 5}}>
            {firstSelectedTeam && <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <Select list={getFirstTeamEnabledPlayers(playersFirstTeam[0])} onSelect={(player) => setPlayersFirstTeam({
                    ...playersFirstTeam, '0': player
                })}/>
                <Select list={getFirstTeamEnabledPlayers(playersFirstTeam[1])} onSelect={(player) => setPlayersFirstTeam({
                    ...playersFirstTeam, '1': player
                })}/>
            </View>}
            {secondSelectedTeam && <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <Select list={getSecondTeamEnabledPlayers(playersSecondTeam[0])} onSelect={(player) => setPlayersSecondTeam({
                    ...playersSecondTeam, '0': player
                })}/>
                <Select list={getSecondTeamEnabledPlayers(playersSecondTeam[1])} onSelect={(player) => setPlayersSecondTeam({
                    ...playersSecondTeam, '1': player
                })}/>
            </View>}
        </View>



    </ViewWithLoading>);
};
