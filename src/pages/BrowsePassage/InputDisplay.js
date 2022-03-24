import React from "react";
import PropTypes from "prop-types";
import {IonIcon} from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

export default function InputDisplay({parseR}) {
    return Object.keys(parseR).length === 0 || parseR.parsed && parseR.startVerse ? 
    <IonIcon 
    size="large" 
    color="success" 
    icon={checkmarkCircle} 
    /> : 
    <IonIcon 
    size="large" 
    color="danger" 
    icon={closeCircle} 
    />
}

InputDisplay.propTypes = {
    parseR: PropTypes.object.isRequired,
};