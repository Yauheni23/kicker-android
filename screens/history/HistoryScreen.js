import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Image, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {serverAddress} from '../../constants/server';
import {UpdateScrollView} from '../../components/UpdatePage';
import {ViewWithLoading} from '../../components/ViewWithLoading';


export const HistoryScreen = ({navigation}) => {
    const [historyGames, setHistoryGames] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        update().finally(() => setLoading(false));
    }, []);

    const update = () => {
        return axios
            .get(`${serverAddress}/game`)
            .then((response) => setHistoryGames(response.data));
    };

    const selectGame = (game) => {
        navigation.navigate('Game', {
            game,games: historyGames
        })
    }

    return (<ViewWithLoading isLoading={isLoading} >
        <UpdateScrollView update={update}>
            {historyGames.map((game, i) => (<ListItem
                onPress={() => selectGame(game)}
                key={i}
                contentContainerStyle={styles.teamContainer}
                rightContentContainerStyle={styles.teamContainer}
                leftAvatar={<Image source={{uri: game.team1.image}} style={{width: 40, height: 40}}/>}
                rightAvatar={<Image source={{uri: game.team2.image}} style={{width: 40, height: 40}}/>}
                title={game.team1.name}
                subtitle={`${game.team1.goals}`}
                rightTitle={game.team2.name}
                rightSubtitle={`${game.team2.goals}`}
                bottomDivider
                titleStyle={game.team1.goals === 10 ? {...styles.winner} : {...styles.loser}}
                subtitleStyle={game.team1.goals === 10 ? {...styles.winner} : {...styles.loser}}
                rightTitleStyle={game.team2.goals === 10 ? {...styles.winner} : {...styles.loser}}
                rightSubtitleStyle={game.team2.goals === 10 ? {...styles.winner} : {...styles.loser}}
            />))}
        </UpdateScrollView>
    </ViewWithLoading>);
};

HistoryScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1, height: '100%', width: '100%'
    }, teamContainer: {
        width: '50%'
    }, winner: {
        color: 'green'
    }, loser: {
        color: 'red'
    }
});
