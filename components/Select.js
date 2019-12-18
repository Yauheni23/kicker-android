import React, {useEffect, useState} from 'react';
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Colors from '../constants/Colors';
import {Icon} from 'react-native-elements';


const defaultImageUser = require('../assets/images/incognito-user.png');
const defaultImageTeam = require('../assets/images/inco.png');

const defaultSize = {
    'small': {
        width: 75, height: 100
    }, 'middle': {
        width: 125, height: 150
    }, 'large': {
        width: 140, height: 165
    }
};

const fontSize = {
    'small': 14, 'middle': 20, 'large': 28
};

export const Select = ({value, list, onSelect, onClose, mode = 'user', size = 'small', header = 'Select'}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState();
    const defaultImage = mode === 'user' ? defaultImageUser : defaultImageTeam;

    const onSelectItem = (item) => {
        setItem(item);
        onSelect(item);
        setModalVisible(false);
    };

    const onCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalVisible(false);
    };

    useEffect(() => {
        setItem(value);
    }, [value]);

    return (<View>
        <TouchableHighlight onPress={() => setModalVisible(true)}>
            <View style={{...defaultSize[size], display: 'flex', alignItems: 'center'}}>
                <Image
                    resizeMode='contain'
                    source={item ? {uri: item.image} : defaultImage}
                    style={{...defaultSize[size], height: defaultSize[size].height - 25}}
                />
                <Text style={{textAlign: 'center', fontSize: fontSize[size], lineHeight: fontSize[size] * 1.2}}>{item ?
                    item.name :
                    'No name'}</Text>
            </View>
        </TouchableHighlight>

        <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
        >
            <View style={{position: 'relative'}}>
                <Text style={styles.name}>{header}</Text>
                <View style={{position: 'absolute', top: 5, right: 10}}>
                        <Icon name='times'
                              type='font-awesome'
                              size={35}
                              color='#C80F0F'
                              onPress={onCloseModal}
                        />
                </View>
            </View>
            <ScrollView>
                <View style={{
                    flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', margin: 10
                }}>
                    {list.map(item => {
                        return item ? (<TouchableHighlight key={item.id} onPress={() => onSelectItem(item)}>
                            <View>
                                <Image source={{uri: item.image}} style={{width: 100, height: 100}}/>
                                <Text style={{textAlign: 'center'}}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>) : null;
                    })}
                </View>
            </ScrollView>

        </Modal>
    </View>);
};

const styles = StyleSheet.create({
    name: {
        fontSize: 35, lineHeight: 45, color: Colors.headerText, textAlign: 'center'
    }
});
