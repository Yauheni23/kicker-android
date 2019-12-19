import React from 'react';
import {Spinner} from '../components/Spinner';


export function ViewWithLoading ({children, isLoading}) {
    return isLoading ? <Spinner/> : children;
}


