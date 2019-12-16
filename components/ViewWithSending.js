import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BirdAnimation} from './BirdAnimation';

export function ViewWithSending({children, isSending}) {
    return (
        <View style={styles.container}>
            {isSending &&
                <View style={styles.loading}>
                    <BirdAnimation/>
                </View>
            }
            <View style={{height: '100%', width: '100%', opacity: isSending ? 0.5 : 1}}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
});

