import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Card, ListItem} from 'react-native-elements';


export const GameScreen = ({navigation: {state: {params: {game, games}}}, navigation}) => {
    const [historyGames, setHistoryGames] = useState([]);

    useEffect(() => {
        setHistoryGames(games.filter(
            el => (el.team1.id === game.team1.id || el.team1.id === game.team2.id) && (el.team2.id === game.team1.id || el.team2.id === game.team2.id)));
    }, [games]);

    const selectGame = (game) => {
        navigation.navigate('Game', {
            game,games
        })
    }

    const getPercentWin = (id) => {
        return Math.round(historyGames.reduce((acc, current) => {
            if(current.team1.id === id) {
                return current.team1.goals === 10 ? ++acc : acc
            }

            return current.team2.goals === 10 ? ++acc : acc
        }, 0) / historyGames.length * 100);
    }

    return game && (<ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri: game.team1.image}} style={{width: 100, height: 100}}/>
                    <Text style={{fontSize: 24}}>{game.team1.name}</Text>
                    <Text style={{fontSize: 24}}>{getPercentWin(game.team1.id)}%</Text>
                </View>
                <View
                    style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                    }}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={{uri: game.team1.players[0].image}} style={{width: 50, height: 50}}/>
                        <Text>{game.team1.players[0].name}</Text>
                        <Text>{+game.team1.players[0].goals}</Text>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={{uri: game.team1.players[1].image}} style={{width: 50, height: 50}}/>
                        <Text>{game.team1.players[1].name}</Text>
                        <Text>{+game.team1.players[1].goals}</Text>
                    </View>
                </View>
            </View>
            <View style={{display: 'flex', alignItems: 'center'}}>
                <View style={{textAlign: 'center', flexDirection: 'row'}}>
                    <Text style={{
                        color: game.team1.goals === 10 ? 'green' : 'red', fontSize: 35
                    }}>{+game.team1.goals}</Text>
                    <Text style={{fontSize: 35}}> - </Text>
                    <Text style={{
                        color: game.team2.goals === 10 ? 'green' : 'red', fontSize: 35
                    }}>{+game.team2.goals}</Text>
                </View>
                <Text>{new Date(game.date).toLocaleString()
                    .slice(0, 11)}</Text>
                <Text>{new Date(game.date).toTimeString()
                    .slice(0, 8)}</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri: game.team2.image}} style={{width: 100, height: 100}}/>
                    <Text style={{fontSize: 24}}>{game.team2.name}</Text>
                    <Text style={{fontSize: 24}}>{100 - getPercentWin(game.team1.id)}%</Text>
                </View>
                <View style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'
                }}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Image source={{uri: game.team2.players[0].image}} style={{width: 50, height: 50}}/>
                        <Text>{game.team2.players[0].name}</Text>
                        <Text>{+game.team2.players[0].goals}</Text>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={{uri: game.team2.players[1].image}} style={{width: 50, height: 50}}/>
                        <Text>{game.team2.players[1].name}</Text>
                        <Text>{+game.team2.players[1].goals}</Text>
                    </View>
                </View>
            </View>
        </View>
        <Card title='Game History'>
            <ScrollView>
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
            </ScrollView>

        </Card>
    </ScrollView>);
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

