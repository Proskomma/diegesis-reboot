import React from "react";
import PropTypes from "prop-types";
import {IonIcon} from '@ionic/react';
import { checkmarkCircleOutline, closeCircle } from 'ionicons/icons';

export default function InputDisplay({parseR}) {
    return parseR.parsed && parseR.startVerse ? <IonIcon size="large" icon={checkmarkCircleOutline} /> : <IonIcon size="large" icon={closeCircle} />
}

InputDisplay.propTypes = {
    parseR: PropTypes.object.isRequired,
};