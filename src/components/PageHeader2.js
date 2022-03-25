import React from 'react';
import { IonHeader, IonToolbar, IonList, IonListHeader } from '@ionic/react';
import PropTypes from 'prop-types';

export default function PageHeader2({ title}) {

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

PageHeader2.propTypes = {
    title: PropTypes.string,
};
