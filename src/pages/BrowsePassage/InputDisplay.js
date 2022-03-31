import React from "react";
import PropTypes from "prop-types";
import {IonIcon} from '@ionic/react';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';

export default function InputDisplay({parseR}) {
    return Object.keys(parseR).length === 0 || parseR.parsed && parseR.startVerse ? 
    <IonIcon 
    size="large" 
    slot="end" 
    color="light" 
    icon={checkmarkCircleOutline} 
    /> : 
    <IonIcon 
    size="large" 
    slot="end" 
    color="light" 
    icon={closeCircleOutline} 
    />
}

InputDisplay.propTypes = {
    parseR: PropTypes.object.isRequired,
};