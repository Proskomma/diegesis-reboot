import React from "react";
import PropTypes from "prop-types";
import {IonLabel, IonRadioGroup, IonRadio, IonList, IonItem} from '@ionic/react';

export default function AppLangOptions({appLanguage, setAppLanguage}) {

    return <> <IonRadioGroup value={appLanguage} onIonChange={e => setAppLanguage(e.detail.value)}>
            <IonList>
                <IonItem>
                    <IonLabel color="secondary">English</IonLabel>
                    <IonRadio value="en" />
                </IonItem>
                <IonItem>
                    <IonLabel color="secondary">Français</IonLabel>
                    <IonRadio value="fr" />
                </IonItem>
                <IonItem>
                    <IonLabel color="secondary">Español</IonLabel>
                    <IonRadio value="es" />
                </IonItem>
            </IonList>
        </IonRadioGroup>
        </>
}

AppLangOptions.propTypes = {
    appLanguage: PropTypes.string.isRequired,
    setAppLanguage: PropTypes.func.isRequired,
};