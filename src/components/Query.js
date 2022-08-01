let queryStringBookSet1 = `{  docSets{
id
documents(sortedBy:"paratext" 
        allChars: false 
        withMatchingChars: [%Jesus%]
        allScopes: true ) {
        bookCode: header(id:"bookCode")          }
    }
}`;

let queryStringPassage1 = `{
    docSet(id : %setID%){
      document(bookCode : %bookID%) {
        id
        bookCode: header(id: "bookCode")
        title: header(id: "toc2")
        cvMatching(
          allChars:false
          allScopes:true
           withMatchingChars: [%Jesus%]
        ) {
          scopeLabels
          text
        }
      }
      matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"(%Jesus%)") { matched }
    }
  }`;

let queryStringPassagesByBookCodes1 = `{
    docSet(id : %setID%){
        document(bookCode : %bookID%) {
        id
        bookCode: header(id: "bookCode")
        title: header(id: "toc2")
        mainSequence {
            blocks(withMatchingChars: ["""%Jesus%"""]) {
            text
            scopeLabels
            }
            }
        }
      matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"(%Jesus%)") { matched }
    }
}`;
export { queryStringBookSet1, queryStringPassage1, queryStringPassagesByBookCodes1};
