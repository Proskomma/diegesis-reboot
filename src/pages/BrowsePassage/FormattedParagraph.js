import React from "react";
import PropTypes from "prop-types";
import {IonItem, IonText} from '@ionic/react';
import FormattedParagraphContents from "./FormattedParagraphContents";

export default function FormattedParagraph({block, n}) {
    return <IonItem className={block.scopeLabels[0].split('/')[1]} key={n}>
            <IonText>
                <FormattedParagraphContents b={block} />
            </IonText>
    </IonItem>
}

FormattedParagraph.propTypes = {
    block: PropTypes.object.isRequired,
    n: PropTypes.number.isRequired,
};