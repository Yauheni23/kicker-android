import React, {useContext} from 'react';
import {createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {HistoryScreen} from '../screens/history/HistoryScreen';
import {GameScreen} from '../screens/history/GameScreen';
import {UserRatingScreen} from '../screens/ratings/UserRatingScreen';
import {TeamRatingScreen} from '../screens/ratings/TeamRatingScreen';
import {UserEditorScreen} from '../screens/editors/UserEditorScreen';
import {TeamEditorScreen} from '../screens/editors/TeamEditorScreen';
import {TeamUserEditorScreen} from '../screens/editors/TeamUserEditorScreen';
import {GameEditorScreen} from '../screens/editors/GameEditorScreen';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {EntryContext} from '../App';

const UserEditorStack = createStackNavigator({
    UserEditor: UserEditorScreen,
}, {
    initialRouteName: 'UserEditor',
    headerMode: 'none',
    navigationOptions: {
        tabBarLabel: 'User',
        tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name={'md-person'}/>
        ),
    }
});

const TeamEditorStack = createStackNavigator({
    TeamEditor: TeamEditorScreen,
}, {
    initialRouteName: 'TeamEditor',
    headerMode: 'none',
    navigationOptions: {
        tabBarLabel: 'Team',
        tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name={'md-people'}/>
        ),
    }
});

const TeamUserEditorStack = createStackNavigator({
    TeamUserEditor: TeamUserEditorScreen,
}, {
    initialRouteName: 'TeamUserEditor',
    headerMode: 'none',
    navigationOptions: {
        tabBarLabel: 'Team + User',
        tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name={'md-person-add'}/>
        ),
    }
});

const GameEditorStack = createStackNavigator({
    GameEditor: GameEditorScreen,
}, {
    initialRouteName: 'GameEditor',
    headerMode: 'none',
    navigationOptions: {
        tabBarLabel: 'Game',
        tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name={'md-football'}/>
        ),
    }
});

const EditorStack = createBottomTabNavigator({
    UserEditorStack,
    TeamEditorStack,
    TeamUserEditorStack,
    GameEditorStack,
}, {
    tabBarOptions: {
        inactiveTintColor: 'white',
        activeTintColor: 'white',
        tabStyle: {
            backgroundColor: 'black'
        }
    }
})

const UserRatingStack = createStackNavigator({
    UserRating: UserRatingScreen,
}, {
    initialRouteName: 'UserRating',
    headerMode: 'none',
    navigationOptions: {
        tabBarLabel: 'Users',
        tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name={'md-person'}/>
        ),
    }
});

const TeamRatingStack = createStackNavigator({
    TeamRating: TeamRatingScreen,
}, {
    initialRouteName: 'TeamRating',
    headerMode: 'none',
    navigationOptions: {
        tabBarLabel: 'Teams',
        tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name={'md-people'}/>
        ),
    }
});

const RatingStack = createBottomTabNavigator({
    UserRatingStack,
    TeamRatingStack,
}, {
    tabBarOptions: {
        inactiveTintColor: 'white',
        activeTintColor: 'white',
        tabStyle: {
            backgroundColor: 'black'
        }
    }
})


const HistoryStack = createStackNavigator({
        History: HistoryScreen,
        Game: {
            screen:GameScreen,
        },
    }, {
        initialRouteName: 'History',
        headerMode: 'none'
    }
);

const CustomDrawerContentComponent = (props) => {
    const {exit} = useContext(EntryContext);

    return (
        <View style={{position: 'relative', height: '100%'}}>
            <View>
                <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>Kicker</Text>
            </View>
            <Divider/>
            <View>
                <DrawerItems {...props} />
            </View>
            <Divider/>

            <TouchableHighlight style={{ marginLeft: 15, marginTop: 20}} onPress={() => exit()}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 30, height: 30, marginRight: 25}} source={require('../assets/images/exit.png')}/>
                    <Text style={{color: 'red', fontWeight: 'bold'}}> Exit </Text>
                </View>
            </TouchableHighlight>
        </View>

    );
}

const MainDrawer = createDrawerNavigator({
    Editor: {
        screen: EditorStack,
        navigationOptions: {
            drawerIcon: () => (
                <Image
                    source={require('../assets/images/editor.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
            ),
        }
    },
    Rating: {
        screen: RatingStack,
        navigationOptions: {
            drawerIcon: () => (
                <Image
                    source={require('../assets/images/rating.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
            ),
        }
    },
    History: {
        screen: HistoryStack,
        navigationOptions: {
            drawerIcon: () => (
                <Image
                    source={require('../assets/images/history.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
            ),
        }
    },
}, {
    contentOptions: {
        inactiveTintColor: 'white',
    },
    edgeWidth: 100,
    contentComponent: CustomDrawerContentComponent,
    drawerType: 'back',
    drawerBackgroundColor: 'black',
    overlayColor: 'white',
});

export default MainDrawer;
