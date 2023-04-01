const HashModel = require("../Model/hashtag")


const CreatHashTag= async(req,res)=>{
    
// makeHashtag('Why hello there') ='#WhyHelloThere';
makeHashtag('      suh     dude    ') = '#SuhDude';
makeHashtag('') = false;
makeHashtag('Pie gang for life'.repeat(10000)) = false;

function makeHashtag(str) {
  let wordArray = str.split(' ').filter(char => char !== "");
  if (wordArray.length === 0) {
    return false;
  };
};


function makeHashtag (str) {
  let wordArray = str.split(' ').filter(char => char !== "");
  let result = "#";
  
  if (wordArray.length === 0) {
    return false;
  };
  
  result = result + wordArray.map(word => {
    let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord;
  }).join('');
 };

function makeHashtag (str) {
  let wordArray = str.split('').filter(char => char !== "");
  let result = "#";
  
  if (wordArray.length === 0) {
    return false;
  };
  
  result = result + wordArray.map(word => {
    let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord;
  }).join('');
  
  if(result.length > 140) {
    return false;
  } else{
    return result;
  };
};



}

module.exports={CreatHashTag}