import React from 'react';
import {Spinner} from '../screens/loaderScreen';


export function ViewWithLoading ({children, isLoading}) {
    return isLoading ? <Spinner/> : children;
}


