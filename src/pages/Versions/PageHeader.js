import React from 'react';
import { IonCol, IonHeader, IonRow, IonTitle, IonToolbar, IonList } from '@ionic/react';
import PropTypes from 'prop-types';

export default function PageHeader({ title}) {

    return (
        <IonHeader>
            <IonToolbar>
                <IonList>
                    <IonRow>
                        <IonCol>
                            <IonTitle size="large">{title} - Diegesis Reboot</IonTitle>
                        </IonCol>
                    </IonRow>
                </IonList>
            </IonToolbar>
        </IonHeader>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string,
};
