import React, {useState} from 'react';
import {Image, Modal, ScrollView, Text, TouchableHighlight, View} from 'react-native';

const defaultImageUser = require('../assets/images/incognito-user.png');
const defaultImageTeam = require('../assets/images/inco.png');

const defaultSize = {
    'small': {
        width: 75,
        height: 100,
    },
    'middle': {
        width: 125,
        height: 150,
    },
    'large': {
        width: 225,
        height: 250,
    }
}

export const Select = ({list, onSelect, onClose, mode = 'user', size = 'small'}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState();
    const defaultImage = mode === 'user' ? defaultImageUser : defaultImageTeam;

    const onSelectItem = (item) => {
        setItem(item);
        onSelect(item);
        setModalVisible(false);
    };

    const onCloseModal = () => {
        if(onClose) {
            onClose();
        }
        setModalVisible(false);
    };

    return (<View>
        <TouchableHighlight onPress={() => setModalVisible(true)}>
            <View style={{...defaultSize[size], display: 'flex', alignItems: 'center'}}>
                <Image
                    source={item ? {uri: item.image} : defaultImage}
                    style={{...defaultSize[size], height: defaultSize[size].height - 25}}
                />
                <Text style={{textAlign: 'center'}}>{item ? item.name : 'No name'}</Text>
            </View>
        </TouchableHighlight>

        <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
        >
            <View>
                <TouchableHighlight
                    onPress={onCloseModal}>
                    <Text>Hide Modal</Text>
                </TouchableHighlight>
            </View>
            <ScrollView>
                <View style={{
                    flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', margin: 10
                }}>
                    {list.map(item => {
                        return (<TouchableHighlight key={item.id} onPress={() => onSelectItem(item)}>
                            <View>
                                <Image source={{uri: item.image}} style={{width: 100, height: 100}}/>
                                <Text style={{textAlign: 'center'}}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>);
                    })}
                </View>
            </ScrollView>

        </Modal>
    </View>);
};
