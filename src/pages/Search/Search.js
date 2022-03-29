import React from "react";
import PropTypes from "prop-types";
import {IonPage, IonContent} from "@ionic/react";
import PageHeader2 from "../../components/PageHeader2";

import "./Search.css";

export default function Search({}) {

    return (
        <IonPage>
            <PageHeader2 title="Search" />
            <IonContent>
                
            </IonContent>
        </IonPage>
    );
}

Search.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
