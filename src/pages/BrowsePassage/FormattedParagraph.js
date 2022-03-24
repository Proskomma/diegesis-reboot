import React from "react";
import PropTypes from "prop-types";
import {IonCol, IonRow} from '@ionic/react';
import FormattedParagraphContents from "./FormattedParagraphContents";

export default function FormattedParagraph({block, n}) {
    return <IonRow className={block.scopeLabels[0].split('/')[1]} key={n}>
        <IonCol>
            <FormattedParagraphContents b={block} />
        </IonCol>
    </IonRow>
}

FormattedParagraph.propTypes = {
    block: PropTypes.object.isRequired,
    n: PropTypes.number.isRequired,
};