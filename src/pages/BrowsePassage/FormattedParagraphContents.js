import React from "react";
import PropTypes from "prop-types";

export default function FormattedParagraphContents ({b}) { 
    return b.items.map((i, n) => {
    if (i.type === 'token') {
        return <span key={n}>{i.payload}</span>;
    } else if (i.type === 'scope' && i.subType === 'start' && i.payload.startsWith('verses/')) {
        return <span className='verse' key={n}>{i.payload.split('/')[1]}</span>;
    }
  }
 )
}

FormattedParagraphContents.propTypes = {
    b: PropTypes.object.isRequired,
};