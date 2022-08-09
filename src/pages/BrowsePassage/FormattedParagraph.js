import React from "react";
import PropTypes from "prop-types";
import {IonItem, IonText} from '@ionic/react';
import FormattedParagraphContents from "./FormattedParagraphContents";

export default function FormattedParagraph({block, n, n1}) {
    return <IonItem id={`Paragraph-${n}-${n1}`} className={block.scopeLabels[0].split('/')[1]} key={n}>
            <IonText>
                <FormattedParagraphContents  b={block} n1={n1} />
            </IonText>
    </IonItem>
}

FormattedParagraph.propTypes = {
    block: PropTypes.object.isRequired,
    n: PropTypes.number.isRequired,
    n1: PropTypes.number.isRequired,}