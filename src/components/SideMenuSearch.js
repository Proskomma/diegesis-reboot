import React from "react";
import {IonList, IonItem} from "@ionic/react";
import PropTypes from "prop-types";

export default function SideMenuSearch() {

    return <IonList>
        <IonItem>Search Goes Here</IonItem>
    </IonList>
}

SideMenuSearch.propTypes = {
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
