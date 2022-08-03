function makeRegex(regTab, regex, word) {
    const words = ["AT_END",
    "HAVE_EXACT" ,
    "MATCH_SEQUENCE",
    "HAVE_MAYBE_LOT",
    "HAVE_SURE",
    "HAVE_MAYBE_ONE",
    "AT_START",
    "NOTSPACE",
    "WORDS_WITH",
  "WORDS_START_WITH",
  "WORDS_END_WITH",];
    if (regTab.length === 1) {
      if (word === "AT_END") {
        return `${regex}${regTab[0]}$`;
      }
      if (word === "HAVE_MAYBE_LOT") {
        return `${regex}${regTab[0]}*`;
      }
      if (word === "=") {
        return regTab[0];
      }
      if(word === "AT_START"){
          return `^${regex}${regTab[0]}`;
      }
      if(word === "HAVE_SURE"){
          return `${regex}${regTab[0]}+`;
      }
      if(word === "HAVE_MAYBE_ONE"){
          return `${regex}${regTab[0]}?`;
      }
      if (word === "NOTSPACE"){
          return `(${regex}\\S)`;
      }
      if(word === "HAVE_EXACT"){
          return `${regex}(${regTab[0]})`;
      }
      if(word === "MATCH_SEQUENCE"){
          const a = regTab[0].split(",")
          return `${regex}${a[1]}{${a[0]}}`;
      }
      if(word === "WORDS_WITH"){
          return `${regex}(\\\\S*${regTab[0]}\\\\S*)`;
      }
      if(word === "WORDS_START_WITH"){
          return `${regex}(${regTab[0]}\\\\S*)`;
      }
      if(word === "WORDS_END_WITH"){
          return `${regex}(\\\\S*${regTab[0]})`;
      }
  
  
  
  
      return;
    } 
    else {
      let count = 1;
      let ide = 0
      let newRegTab = [];
      let skip = true;
      let skiptwice = false
      let rege = "";
      regTab.map((re,id) => {
        if (!skip && !skiptwice) {
          if (words.includes(re)) {
            count += 1;
          }
          if (re === ")") {
            count -= 1;
          }
          if (count === 0) {
            let truc = newRegTab; 
            newRegTab = [];
            skip = true;
            count = 1;
            rege += makeRegex(truc, regex, regTab[ide]);
  
            if(words.includes(truc[id+2])){
              skiptwice = true
              ide = id+2
            }
            else{
              ide = id+1
            }
            return
          }
          newRegTab.push(re);
        }
        if (skip) {
          skip = !skip;
        }
        if(!skip && skiptwice){
          skiptwice = false
        }
      });
      return makeRegex([rege],regex,word)
  
    }
  }
  
export default function lightRegexCode(lightRegex) {
let regex = lightRegex.split(")");
let regTab = [];
regex.map((reg, id) => {
    regTab.push(reg);
    if (id !== regex.length - 1) {
    regTab.push(")");
    }
});
regex = [];
regTab.map((re) => {
    if (re !== "") {
    regex.push(re);
    }
});
regTab = [];
regex.map((re) => {
    re.split("(").map((r) => regTab.push(r));
});
regex = "";
regex = makeRegex(regTab, regex,"=");
return regex ;
};