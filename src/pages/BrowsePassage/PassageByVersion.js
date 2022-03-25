import React from "react";
import PropTypes from "prop-types";
import {IonList, IonItem} from '@ionic/react';

export default function PassageByVersion({docSet, keyPrefix}) {
    const sLO = (sL) => {
        const ret = {};
        sL.forEach(l => {
            const [scopeType, scopeNumber] = l.split("/");
            ret[scopeType] = scopeNumber;
        })
        return ret;
    };

    return <div key={keyPrefix}>
        
        {docSet.document?.cv.map(
            (v, n2) => <IonList key={`${keyPrefix}-${n2}`}>

                <IonItem>
                    {`${sLO(v.scopeLabels)["chapter"]}:${sLO(v.scopeLabels)["verses"]}`}
                </IonItem>
                <IonItem>
                    {v.text}
                </IonItem>
            </IonList>
        )
        }
    </div>
}

PassageByVersion.propTypes = {
    docSet: PropTypes.object.isRequired,
    keyPrefix: PropTypes.number.isRequired,
};