import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow, IonTitle} from '@ionic/react';
import PassageByVersion from "./PassageByVersion";

export default function PassageByVersions({docSets}) {

    return docSets?.map(
            (ds, n) => <div key={n}><IonRow>
                        <IonCol>
                            <IonTitle>{ds.id}</IonTitle>
                        </IonCol>
                    </IonRow>
                    <PassageByVersion docSet={ds} keyPrefix={n} key={n} />
            </div>
        );
}

 PassageByVersions.propTypes = {
     docSets: PropTypes.array.isRequired,
 };
