import React from "react";
import PropTypes from "prop-types";
import {IonList, IonListHeader} from '@ionic/react';
import PassageByVersion from "./PassageByVersion";

export default function PassageByVersions({docSets}) {

    return docSets?.filter(ds => ds.document).map(
            (ds, n) => <IonList key={n}><IonListHeader class="mainContentTitle2">{ds.id}</IonListHeader>
                    <PassageByVersion docSet={ds} keyPrefix={n} key={n} />
            </IonList>
        );
}

 PassageByVersions.propTypes = {
     docSets: PropTypes.array.isRequired,
 };
