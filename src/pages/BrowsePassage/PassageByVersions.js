import React from "react";
import PropTypes from "prop-types";
import {IonList, IonListHeader} from '@ionic/react';
import PassageByVersion from "./PassageByVersion";

export default function PassageByVersions({docSets}) {

    return docSets?.filter(ds => ds.document).map(
            (ds, n) => <IonList id={`Book-${n}`} key={n}><IonListHeader class="mainContentTitle2">{ds.id}</IonListHeader>
                    <PassageByVersion it={n} docSet={ds} keyPrefix={n} />
            </IonList>
        );
}

 PassageByVersions.propTypes = {
     docSets: PropTypes.array.isRequired,
 };
