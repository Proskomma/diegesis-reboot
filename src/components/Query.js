let queryStringBookSet1 = `{  docSets{
id
documents(sortedBy:"paratext" 
        allChars: false 
        withMatchingChars: [%searchText%]
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
           withMatchingChars: [%searchText%]
        ) {
          scopeLabels
          text
          tokens {
            subType
            payload
            scopes(
              startsWith:[
                "attribute/spanWithAtts/w/"
                "attribute/milestone/zaln/"
              ]
            )
          }
        }
      }
      matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"(%searchText%)") { matched }
    }
  }`;

let queryStringPassagesByBookCodes1 = `{
    docSet(id : %setID%){
        document(bookCode : %bookID%) {
        id
        bookCode: header(id: "bookCode")
        title: header(id: "toc2")
        mainSequence {
            blocks(withMatchingChars: ["""%searchText%"""]) {
            text
            scopeLabels
            tokens {
              subType
              payload
              scopes(
                startsWith:[
                  "attribute/spanWithAtts/w/"
                  "attribute/milestone/zaln/"
                ]
              )
            }
            }
            }
        }
      matches: enumRegexIndexesForString (enumType:"wordLike" searchRegex:"(%searchText%)") { matched }
    }
}`;
export { queryStringBookSet1, queryStringPassage1, queryStringPassagesByBookCodes1};
