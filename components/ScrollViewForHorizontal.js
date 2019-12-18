import React, {useEffect, useState} from 'react';
import {ScreenOrientation} from 'expo';
import {ScrollView} from 'react-native';


export function ScrollViewForHorizontal ({children}) {
    const [orientation, setOrientation] = useState('');

    useEffect(() => {
        ScreenOrientation.getOrientationAsync()
            .then(data => {
                const orientation = data.orientation.includes('LANDSCAPE') ? 'horizontal' : 'portrait';

                setOrientation(orientation);
            });

        ScreenOrientation.addOrientationChangeListener(orientationListener);

        return () => ScreenOrientation.removeOrientationChangeListener(orientationListener);
    }, []);

    const orientationListener = (event) => {
        const orientation = event.orientationInfo.orientation.includes('LANDSCAPE') ? 'horizontal' : 'portrait';

        setOrientation(orientation);
    };
    return orientation === 'horizontal' ? <ScrollView>
        {children}
    </ScrollView> : children;
}


