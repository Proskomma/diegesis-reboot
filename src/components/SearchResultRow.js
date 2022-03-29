import React from "react";
import PropTypes from "prop-types";
import {menuController} from "@ionic/core/components"
import {IonItem, IonText} from "@ionic/react";
import parseReferenceString from "./parseReferenceString";

export default function SearchResultRow({p, n, navState, setNavState}) {

    const searchReference = async reference => {

        const parseReference = parseReferenceString(reference);

        if (!parseReference.parsed) {
            return
        }
        setNavState({
            ...navState,
            bookCode: parseReference.bookCode,
            chapter: parseReference.startChapter,
            verse: parseReference.startVerse,
        });
        await menuController.close();
    };

    return <IonItem key={n} >
                    <IonText class="hanging">
                        <IonText class="cv" color="tertiary" onClick={() => searchReference(p.reference)}>{p.reference}</IonText> <IonText>{p.text}</IonText>
                    </IonText>
                </IonItem>
}

SearchResultRow.propTypes = {
    p: PropTypes.object.isRequired,
    n: PropTypes.number.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
};
