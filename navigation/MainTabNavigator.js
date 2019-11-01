import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import {HistoryScreen} from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {BasicExample} from '../screens/loaderScreen';

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'md-information-circle'}
        />
    ),
};

HomeStack.path = 'Home';

const HistoryStack = createStackNavigator(
    {
        History: HistoryScreen,
    },
    config
);

HistoryStack.navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-paper'}/>
    ),
};

HistoryStack.path = 'History';

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-options'}/>
    ),
};

SettingsStack.path = 'Settings';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    SettingsStack,
    HistoryStack,
});

tabNavigator.path = '';

export default tabNavigator;
