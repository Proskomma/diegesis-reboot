import React from "react";
import PropTypes from "prop-types";
import {IonList, IonItem, IonText} from '@ionic/react';

export default function PassageByVersion({docSet,it}) {
    const sLO = (sL) => {
        const ret = {};
        sL.forEach(l => {
            const [scopeType, scopeNumber] = l.split("/");
            ret[scopeType] = scopeNumber;
        })
        return ret;
    };

    return <div key={it}>
        {docSet.document?.cv.map(
            (v, n2) => {
            return(<IonList key={`${it}-${n2}`} id={`${it}-${n2}`}>     
                <IonItem>
                    <IonText>
                        <IonText class="cv">{`${sLO(v.scopeLabels)["chapter"]}:${sLO(v.scopeLabels)["verses"]}`}</IonText> <IonText>{v.text}</IonText>
                    </IonText>
                </IonItem>
            </IonList>)}
        )
        }
    </div>
}

PassageByVersion.propTypes = {
    docSet: PropTypes.object.isRequired,
    it: PropTypes.number.isRequired,
};
