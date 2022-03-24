import React from "react";
import PropTypes from "prop-types";
import FormattedParagraphContents from "./FormattedParagraphContents";

export default function FormattedParagraph({block, n}) {
    return <p className={block.scopeLabels[0].split('/')[1]} key={n}>
        <FormattedParagraphContents b={block} />
    </p>
}

FormattedParagraph.propTypes = {
    block: PropTypes.object.isRequired,
    n: PropTypes.number.isRequired,
};