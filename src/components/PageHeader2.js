import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import PropTypes from 'prop-types';

export default function PageHeader2({ title}) {

    return (
        <IonHeader>
            <IonToolbar color="primary">
                    <IonTitle class="headerTitle">{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}

PageHeader2.propTypes = {
    title: PropTypes.string,
};
