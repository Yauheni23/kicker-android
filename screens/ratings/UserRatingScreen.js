import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {serverAddress} from '../../constants/server';
import axios from 'axios';
import {ViewWithLoading} from '../../components/ViewWithLoading';
import {Divider} from 'react-native-elements';
import {ImageWinner} from '../../constants/Images';
import {UpdateScrollView} from '../../components/UpdatePage';


const arrow = {
    1: require('../../assets/images/arrowUp.png'), 2: require('../../assets/images/arrowDown.png')
};

export const UserRatingScreen = () => {
    const [isLoading, setLoading] = useState([]);
    const [users, setUsers] = useState([]);
    const [placeSort, setPlaceSort] = useState(0);
    const [nameSort, setNameSort] = useState(0);
    const [gameSort, setGameSort] = useState(0);
    const [goalSort, setGoalSort] = useState(0);

    useEffect(() => {
        setLoading(true);
        update()
            .finally(() => setLoading(false));
    }, []);

    const update = () => {
        return axios.get(`${serverAddress}/user`)
            .then(response => response.data.map(user => ({
                id: user.id,
                name: user.name,
                image: user.image,
                goals: user.games.reduce((accumulator, game) => accumulator + game.goals, 0),
                countGame: user.games.length
            }))
                .sort(sortByResult)
                .map(mapPlace))
            .then(users => setUsers(users));
    };

    const changeSort = (entity, sortValue) => {
        const newSortValue = changeValueSort(sortValue);
        setPlaceSort(0);
        setNameSort(0);
        setGameSort(0);
        setGoalSort(0);

        switch (entity) {
        case 'place': {
            setPlaceSort(newSortValue);
            break;
        }
        case 'name': {
            setNameSort(newSortValue);
            break;
        }
        case 'game': {
            setGameSort(newSortValue);
            break;
        }
        case 'goal': {
            setGoalSort(newSortValue);
            break;
        }

        }
    };
    const changeValueSort = (value) => {
        if (value < 2) {
            return ++value;
        }

        return 0;
    };

    const sort = (users) => {
        const newUsers = users.slice();
        if (placeSort) {
            if (placeSort === 1) {
                newUsers.sort((prev, current) => prev.place > current.place ? 1 : -1);
            } else {
                newUsers.sort((prev, current) => prev.place > current.place ? -1 : 1);
            }
        }

        if (nameSort) {
            if (nameSort === 1) {
                newUsers.sort((prev, current) => prev.name > current.name ? 1 : -1);
            } else {
                newUsers.sort((prev, current) => prev.name > current.name ? -1 : 1);
            }
        }

        if (gameSort) {
            if (gameSort === 1) {
                newUsers.sort((prev, current) => prev.countGame > current.countGame ? 1 : -1);
            } else {
                newUsers.sort((prev, current) => prev.countGame > current.countGame ? -1 : 1);
            }
        }

        if (goalSort) {
            if (goalSort === 1) {
                newUsers.sort((prev, current) => prev.goals > current.goals ? 1 : -1);
            } else {
                newUsers.sort((prev, current) => prev.goals > current.goals ? -1 : 1);
            }
        }

        return newUsers;
    };

    return (<ViewWithLoading isLoading={isLoading}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            backgroundColor: 'black'
        }}>
            <TouchableHighlight style={{width: '20%'}} onPress={() => changeSort('place', placeSort)}>
                <View style={{position: 'relative', paddingLeft: 20}}>
                    <Image source={require('../../assets/images/place.png')} style={{width: 40, height: 40}}/>
                    {placeSort ?
                        <Image source={arrow[placeSort]} resizeMode='contain' style={styles.arrow}/> :
                        null}
                </View>
            </TouchableHighlight>
            <View style={{width: '10%'}}/>
            <TouchableHighlight style={{width: '30%'}} onPress={() => changeSort('name', nameSort)}>
                <View style={{position: 'relative', paddingLeft: 20}}>
                    <Text style={styles.header}>Name</Text>
                    {nameSort ?
                        <Image source={arrow[nameSort]} resizeMode='contain' style={styles.arrow}/> :
                        null}
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={{width: '20%'}} onPress={() => changeSort('game', gameSort)}>
                <View style={{position: 'relative', paddingLeft: 20}}>
                    <Text style={styles.header}>Game</Text>
                    {gameSort ?
                        <Image source={arrow[gameSort]} resizeMode='contain' style={styles.arrow}/> :
                        null}
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={{width: '20%'}} onPress={() => changeSort('goal', goalSort)}>
                <View style={{position: 'relative', paddingLeft: 20}}>
                    <Text style={styles.header}>Goal</Text>
                    {goalSort ?
                        <Image source={arrow[goalSort]} resizeMode='contain' style={styles.arrow}/> :
                        null}
                </View>
            </TouchableHighlight>
        </View>
        <Divider/>

        <UpdateScrollView update={update}>
            {sort(users)
                .map(user => (<View key={user.id}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 60
                    }}>
                        <View style={{width: '20%', alignItems: 'center'}}>
                            {ImageWinner[user.place] ?
                                <Image source={ImageWinner[user.place]} style={{width: 40, height: 40}}/> :
                                <Text style={styles.info}>{user.place}</Text>}

                        </View>
                        <View style={{width: '15%', alignItems: 'flex-end'}}>
                            <Image source={{uri: user.image}} style={{width: 50, height: 50}}/>
                        </View>
                        <View style={{width: '25%', alignItems: 'flex-start'}}>
                            <Text style={styles.info}>{user.name}</Text>
                        </View>
                        <View style={{width: '20%', alignItems: 'center'}}>
                            <Text style={styles.info}>{user.countGame}</Text>
                        </View>
                        <View style={{width: '20%', alignItems: 'center'}}>
                            <Text style={styles.info}>{user.goals}</Text>
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
    },arrow: {
        width: 20, height: 20, position: 'absolute', left: 0, top: '50%', transform: [
            { translateY: -10 },
        ],
    }
});

function sortByResult (prev, next) {
    return (prev.goals / prev.countGame || 0) > (next.goals / next.countGame || 0) ? -1 : 1;
}

function mapPlace (user, index) {
    return {
        ...user, place: index + 1
    };
}
