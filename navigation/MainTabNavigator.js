import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import {HistoryScreen} from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {GameScreen} from '../screens/GameScreen';
import {UserRatingScreen} from '../screens/UserRatingScreen';
import {TeamRatingScreen} from '../screens/TeamRatingScreen';
import {UserEditorScreen} from '../screens/UserEditorScreen';
import {TeamEditorScreen} from '../screens/TeamEditorScreen';
import {TeamUserEditorScreen} from '../screens/TeamUserEditorScreen';
import {GameEditorScreen} from '../screens/GameEditorScreen';

// const config = Platform.select({
//     web: {headerMode: 'screen'},
//     default: {},
// });
//
// const HomeStack = createStackNavigator(
//     {
//         Home: HomeScreen,
//     },
//     config
// );
//
// HomeStack.navigationOptions = {
//     tabBarLabel: 'Home',
//     tabBarIcon: ({focused}) => (
//         <TabBarIcon
//             focused={focused}
//             name={'md-information-circle'}
//         />
//     ),
// };
//
// HomeStack.path = 'Home';
//
// const HistoryStack = createStackNavigator(
//     {
//         History: HistoryScreen,
//         Game: GameScreen,
//     },
//     config
// );
//
// HistoryStack.navigationOptions = {
//     tabBarLabel: 'History',
//     tabBarIcon: ({focused}) => (
//         <TabBarIcon focused={focused} name={'md-paper'}/>
//     ),
// };
//
// HistoryStack.path = 'History';
//
// const SettingsStack = createStackNavigator(
//     {
//         Settings: SettingsScreen,
//     },
//     config
// );
//
// SettingsStack.navigationOptions = {
//     tabBarLabel: 'Settings',
//     tabBarIcon: ({focused}) => (
//         <TabBarIcon focused={focused} name={'md-options'}/>
//     ),
// };
//
// SettingsStack.path = 'Settings';
//
// const GameStack = createStackNavigator(
//     {
//         Game: GameScreen,
//     },
//     config
// );
//
// const MainDrawer = createDrawerNavigator({
//     MainTabs: HistoryStack,
//     Settings: SettingsStack,
// });
//
// GameStack.path = 'Game';
//
// const tabNavigator = createBottomTabNavigator({
//     HomeStack,
//     SettingsStack,
//     HistoryStack,
// });
//
// tabNavigator.path = '';
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
