import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import {serverAddress} from '../constants/server';
import {Spinner} from './loaderScreen';

export const HistoryScreen = () => {
    const [historyGames, setHistoryGames] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${serverAddress}/game`)
            .then((data) => {
                setHistoryGames(data.data);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            {!isLoading ?
                <FlatList
                    data={historyGames}
                    renderItem={({ item }) => <Item {...item} />}
                    keyExtractor={item => item.id + ''}
                /> :
                <Spinner/>
            }
        </View>
    );
};

HistoryScreen.navigationOptions = {
    header: null,
};

export const Item = ({team1, team2, date}) => {
    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text>{team1.name}</Text>
            <Text>{team1.goals}</Text>
            <Text>:</Text>
            <Text>{team2.goals}</Text>
            <Text>{team2.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
