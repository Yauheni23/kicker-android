import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {serverAddress} from '../../constants/server';
import axios from 'axios';
import {ViewWithLoading} from '../../components/ViewWithLoading';
import {Divider} from 'react-native-elements';
import {ImageWinner} from '../../constants/Images';
import {UpdateScrollView} from '../../components/UpdatePage';


export const TeamRatingScreen = () => {
    const [isLoading, setLoading] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setLoading(true);
        update().finally(() => setLoading(false));
    }, []);

    const update = () => {
        return axios.get(`${serverAddress}/team`)
            .then(response => response.data.map(mapTeams).sort(sortCountGames).sort(sortWinRate).map(mapPlace))
            .then(teams => setTeams(teams))
    }

    return (<ViewWithLoading isLoading={isLoading}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            backgroundColor: 'black'
        }}>
            <View style={{width: '15%', alignItems: 'center'}}>
                <Image source={require('../../assets/images/place.png')} style={{width: 40, height: 40}}/>
            </View>
            <View style={{width: '15%'}}/>
            <View style={{width: '30%', alignItems: 'flex-start'}}><Text style={styles.header}>Name</Text></View>
            <View style={{width: '20%', alignItems: 'center'}}><Text style={styles.header}>Games</Text></View>
            <View style={{width: '20%', alignItems: 'center'}}><Text style={styles.header}>Win</Text></View>
        </View>
        <Divider/>

        <UpdateScrollView update={update}>
            {teams.map(user => (<View key={user.id}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 60
                }}>
                    <View style={{width: '15%', alignItems: 'center'}}>
                        {ImageWinner[user.place] ?
                            <Image source={ImageWinner[user.place]} style={{width: 40, height: 40}}/> :
                            <Text style={styles.info}>{user.place}</Text>}

                    </View>
                    <View style={{width: '15%', alignItems: 'flex-end'}}>
                        <Image source={{uri: user.image}} style={{width: 50, height: 50}}/>
                    </View>
                    <View style={{width: '30%', alignItems: 'flex-start'}}>
                        <Text style={styles.info}>{user.name}</Text>
                    </View>
                    <View style={{width: '20%', alignItems: 'center'}}>
                        <Text style={styles.info}>{user.games}</Text>
                    </View>
                    <View style={{width: '20%', alignItems: 'center'}}>
                        <Text style={styles.info}>{Math.round(user.winRate * 100)}%</Text>
                    </View>
                </View>
                <Divider/>
            </View>))}
        </UpdateScrollView>
    </ViewWithLoading>);
};

const styles = StyleSheet.create({
    info: {
        fontSize: 18
    }, header: {
        fontSize: 18, fontWeight: 'bold', color: 'blue'
    }
});

function mapTeams(team) {
    return {
        id: team.id,
        name: team.name,
        users: team.users,
        image: team.image,
        games: team.games.length,
        goals: team.games.reduce((accumulator, currentGame) => accumulator + currentGame.goals, 0),
        winRate: team.games.filter(game => game.goals === 10).length / team.games.length || 0
    };
}

function sortWinRate(current, next) {
    return current.winRate > next.winRate ? -1 : 1;
}

function sortCountGames(current, next) {
    return current.games > next.games ? -1 : 1;
}

function mapPlace(team, index) {
    return {
        ...team,
        place: index + 1
    };
}
