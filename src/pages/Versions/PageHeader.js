import React from 'react';
import { IonHeader, IonToolbar, IonList, IonListHeader } from '@ionic/react';
import PropTypes from 'prop-types';
import "./Versions.css";

export default function PageHeader({ title}) {

    return (
        <IonHeader>
            <IonToolbar>
                <IonList>
                    <IonListHeader class="headerTitle">{title}</IonListHeader>
                </IonList>
            </IonToolbar>
        </IonHeader>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string,
};
