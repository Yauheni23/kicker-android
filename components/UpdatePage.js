import React, {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';


export function UpdateScrollView ({children, update}) {
    const [refreshing, setRefreshing] = useState(false);

    const updatePage = () => {
        setRefreshing(true);
        update()
            .then(() => setRefreshing(false));
    };

    return (<ScrollView style={styles.container}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updatePage}/>}
    >
        {children}
    </ScrollView>);
}

const styles = StyleSheet.create({
    container: {}
});

