import React from 'react';
import { IonCol, IonHeader, IonRow, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import PropTypes from 'prop-types';

export default function PageHeader({ title}) {

    return (
        <IonHeader>
            <IonToolbar>
                <IonList>
                    <IonItem>
                        <IonRow>
                            <IonCol>
                                <IonTitle size="large">{title} - Diegesis Reboot</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonItem>
                </IonList>
            </IonToolbar>
        </IonHeader>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string,
};
