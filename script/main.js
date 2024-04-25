




let wordSettings={
   capital: false,
   punctuations:false,
   sentences:2
}
document.querySelector(".capital").onclick=()=>{
    wordSettings.capital=!wordSettings.capital;
    fetchParagraph();
}
document.querySelector(".punctuation").onclick=()=>{
    wordSettings.punctuations=!wordSettings.punctuations;
    fetchParagraph();
}
document.getElementById("one").onclick=()=>{
    wordSettings.sentences=1;
    fetchParagraph()
}
const elements=document.querySelectorAll(".two-class");
elements.forEach(element => {
    element.onclick=()=>{
        wordSettings.sentences=2;
        fetchParagraph()
        console.log("dsfknasdfsdfsdf")
    }
});   
document.getElementById("three").onclick=()=>{
    wordSettings.sentences=3;
    fetchParagraph()
}
document.querySelector(".default").onclick=()=>{
    
 wordSettings={
    capital: false,
    punctuations:false,
    sentences:2
 }
 fetchParagraph();
}

let game=document.getElementById("textt");

fetchParagraph()
async function fetchParagraph() {
    try {
      const response = await fetch(`https://typing-panda-words.vercel.app/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      words = await data.paragraph;
      game.innerHTML = words;
      
    } catch (error) {
      console.log(wordSettings)
    }
  }