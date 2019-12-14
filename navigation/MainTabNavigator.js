import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {HistoryScreen} from '../screens/history/HistoryScreen';
import {GameScreen} from '../screens/history/GameScreen';
import {UserRatingScreen} from '../screens/ratings/UserRatingScreen';
import {TeamRatingScreen} from '../screens/ratings/TeamRatingScreen';
import {UserEditorScreen} from '../screens/editors/UserEditorScreen';
import {TeamEditorScreen} from '../screens/editors/TeamEditorScreen';
import {TeamUserEditorScreen} from '../screens/editors/TeamUserEditorScreen';
import {GameEditorScreen} from '../screens/editors/GameEditorScreen';

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
})

const UserRatingStack = createStackNavigator({
    UserRating: UserRatingScreen,
}, {
    initialRouteName: 'UserRating',
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
})


const HistoryStack = createStackNavigator({
        History: HistoryScreen,
        Game: GameScreen,
    }, {
        initialRouteName: 'History'
    }
);

const MainDrawer = createDrawerNavigator({
    Editor: EditorStack,
    Rating: RatingStack,
    History: HistoryStack,
});

export default MainDrawer;
