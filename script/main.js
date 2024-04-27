

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


function addClass(el, name) {
    el.add(name);
}

function removeClass(el, name){
    el.classList.remove(name);
}

let words=[];
let game=document.getElementById("textt");

fetchParagraph()
async function fetchParagraph() {
    try {
      const response = await fetch(`https://typing-panda-words.vercel.app/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
      const data = await response.json();
      const paragraph = data.paragraph;
      words=paragraph.split(" ");
      console.log(words)
     formatWord();
      
    } catch (error) {
      console.log(wordSettings)
    }
  }

  function formatWord(){
    game.innerHTML=""
    for(let i=0;i<words.length;i++){
        game.innerHTML+=`<div class="word"><span class="letter">${words[i].split("").join('</span><span class="letter">')}</span></div>`
    }
    console.log(document.querySelector(".letter"))
    const cur=document.querySelector(".word").classList;
    const lett=document.querySelector(".letter").classList;
    console.log(lett)
    addClass(cur,"current");
    addClass(lett,"current");
  }

  document.getElementById("game").addEventListener('keyup',(ev)=>{
    const key=ev.key;
    const currentSpan=document.querySelector(".letter.current")
    const currentDiv=document.querySelector(".word.current")
    const currentLetter=currentSpan.textContent || ' ';
    const isLetter=key.length==1 && key!==" ";
    const isSpcace=key==" ";

    const nextSibling=currentSpan.nextSibling;
    const nextWord=currentDiv.nextSibling
   
    console.log(currentLetter)
    
    if(isLetter){
        if(currentLetter){
            {key==currentLetter?addClass(currentSpan.classList,"correct"):addClass(currentSpan.classList,"incorrect")}
            removeClass(currentSpan,"current")
        }
        if(nextSibling){
            addClass(nextSibling.classList,"current")   
        }else{
            
        }
        
    }
    
  })