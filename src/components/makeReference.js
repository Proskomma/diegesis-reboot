import PropTypes from "prop-types";

export default function makeReference(bookCode, scopeLabels,displayMode) {

  let startChapter = "";
  let endChapter = "";
  let startVerse = "";
  let endVerse = "";
  let parsed = "";
  if (displayMode === false){
  scopeLabels.map((element, id) => {
    let string_tabl = [];
    if (id === 0) {
      string_tabl = element.split("/");
      startChapter = string_tabl[1];
      endChapter = string_tabl[1];
    }
    if (id === 2) {
      string_tabl = element.split("/");
      startVerse = string_tabl[1];
      endVerse = string_tabl[1];
      parsed = true;
    }
  });
  const reference = {
    startChapter: startChapter,
    endChapter: endChapter,
    startVerse: startVerse,
    endVerse: endVerse,
    parsed: parsed,
    bookCode: bookCode,
  
  };
  return reference;
}
else
{   
    let current = 0
    let endChapter = 0
    let startChapter = 10000
    let endVerse = 0
    let startVerse = 10000
    scopeLabels.map((element) => {
        let string_tabl = [];
        string_tabl = element.split("/");
        if(string_tabl[0] === "chapter"){
          startChapter = parseInt(string_tabl[1])
          endChapter = parseInt(string_tabl[1])
        }
        if(string_tabl[0] === "verse"){
            current = parseInt(string_tabl[1])
            if(current <= startVerse){
                startVerse = current
                console.log(startVerse)
            }
            if(endVerse <= current ){
                endVerse = current
            }
          }
        }
    )
    parsed = true;

    const reference = {
        startChapter: startChapter.toString(),
        endChapter: endChapter.toString(),
        startVerse: startVerse.toString(),
        endVerse: endVerse.toString(),
        parsed: parsed,
        bookCode: bookCode,
      
      };
      console.log(reference)
      return reference;
    }
}
makeReference.propTypes = {
  bookCode: PropTypes.string.isRequired,
  scopeLabels: PropTypes.object.isRequired,
  displayMode: PropTypes.bool.isRequired,
};