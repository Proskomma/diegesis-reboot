
import PropTypes from "prop-types";

export function makeTextReference(reference)
{
    if(reference.startVerse === reference.endVerse){
        return `${reference.bookCode} ${reference.startChapter}:${reference.startVerse}`
    }
    else
    {
        return `${reference.bookCode} ${reference.startChapter}:${reference.startVerse}-${reference.endVerse}`
    }
}
makeTextReference.propTypes = {
    reference: PropTypes.object.isRequired,
  };