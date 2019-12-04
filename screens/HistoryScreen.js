import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import { ListItem } from 'react-native-elements'
import {serverAddress} from '../constants/server';
import {Spinner} from './loaderScreen';

export const HistoryScreen = ({ navigation }) => {
    const [historyGames, setHistoryGames] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${serverAddress}/game`)
            .then((response) => {
                setHistoryGames(response.data);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            {!isLoading ?
                <ScrollView>
                    {
                        historyGames.map((game, i) => (
                            <ListItem
                                onPress={() => navigation.navigate('Game')}
                                key={i}
                                contentContainerStyle={styles.teamContainer}
                                rightContentContainerStyle={styles.teamContainer}
                                leftAvatar={{ source: { uri: game.team1.image } }}
                                rightAvatar={{ source: { uri: game.team2.image } }}
                                title={game.team1.name}
                                subtitle={`${game.team1.goals}`}
                                rightTitle={game.team2.name}
                                rightSubtitle={`${game.team2.goals}`}
                                bottomDivider
                                titleStyle={game.team1.goals === 10 ? {...styles.winner} : {...styles.loser}}
                                subtitleStyle={game.team1.goals === 10 ? {...styles.winner} : {...styles.loser}}
                                rightTitleStyle={game.team2.goals === 10 ? {...styles.winner} : {...styles.loser}}
                                rightSubtitleStyle={game.team2.goals === 10 ? {...styles.winner} : {...styles.loser}}
                            />
                        ))
                    }
                </ScrollView> :
                <Spinner/>
            }
        </View>
    );
};

HistoryScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    teamContainer: {
        width: '50%'
    },
    winner: {
        color: 'green',
    },
    loser: {
        color: 'red',
    }
});
