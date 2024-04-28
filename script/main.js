

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
    el.classList.add(name);
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
      
     formatWord();
      
    } catch (error) {

    }
  }

  function formatWord(){
    game.innerHTML=""
    for(let i=0;i<words.length;i++){
        game.innerHTML+=`<div class="word"><span class="letter">${words[i].split("").join('</span><span class="letter">')}</span></div>`
    }
   
    const cur=document.querySelector(".word");
    const lett=document.querySelector(".letter");
   
    addClass(cur,"current");
    addClass(lett,"current");
  }

  document.getElementById("game").addEventListener('keyup',(ev)=>{
    const key=ev.key;
    const currentSpan=document.querySelector('.letter.current')
    const currentDiv=document.querySelector('.word.current')
    const currentLetter=currentSpan?.innerHTML || " ";
    const isLetter=key.length===1 && key!==" ";
    const isFirstLetter = currentSpan === currentDiv.firstChild
  
    console.log(key)
    console.log("curr--"+currentLetter+"--curr")
    
    if(isLetter){
        if(currentLetter!==" "){
            {key===currentLetter?addClass(currentSpan,"correct"):addClass(currentSpan,"incorrect")}
            removeClass(currentSpan,"current")
            if(currentSpan.nextSibling){
                addClass(currentSpan.nextSibling,"current")   
            }
        }else if(currentLetter===" "){
            currentDiv.innerHTML+=`<span class="letter incorrect extra">${key}</span>`
        }

        
        
    }
    if(key===" "){
        if(currentLetter!==" "){
            const invalidLetters=[...document.querySelectorAll(".word.current > span.letter:not(.correct)")]
            invalidLetters.forEach(element => {
                addClass(element,"incorrect")
            });
        }
        
        removeClass(currentDiv,"current");
        addClass(currentDiv.nextSibling,"current");
        if(currentSpan){
            removeClass(currentSpan,"current");
        }
        addClass(currentDiv.nextSibling.firstChild,"current");
    }

    if(key==="Backspace"){
        if(currentSpan && isFirstLetter && currentDiv.previousSibling && currentDiv.previousSibling.lastChild.classList.contains("extra")){
            const prevDiv = currentDiv.previousSibling;
            const extraLetter = prevDiv.lastChild;
            removeClass(currentDiv,"current");
            addClass(prevDiv,"current");
            removeClass(currentSpan,"current");
            addClass(extraLetter,"current");
            prevDiv.removeChild(extraLetter);
        }
        else if(currentSpan && isFirstLetter && currentDiv.previousSibling){
            removeClass(currentDiv,"current")
            addClass(currentDiv.previousSibling,"current")
            removeClass(currentSpan,"current")
            addClass(currentDiv.previousSibling.lastChild,"current");
            removeClass(currentDiv.previousSibling.lastChild,"incorrect");
            removeClass(currentDiv.previousSibling.lastChild,"correct");
        }
        if(currentSpan && !isFirstLetter && currentDiv.lastChild.classList.contains("extra")){
            addClass(currentDiv.lastChild,"current");    
            currentDiv.removeChild(currentDiv.lastChild);

        }
        else if(currentSpan && !isFirstLetter){
           removeClass(currentSpan,"current")
           if(currentSpan.previousSibling){
            addClass(currentSpan.previousSibling,"current");
            removeClass(currentSpan.previousSibling,"correct")
            removeClass(currentSpan.previousSibling,"incorrect")
           }
        }
        if(!currentSpan && currentDiv.lastChild.classList.contains("extra")){
            addClass(currentDiv.lastChild,"current");
            currentDiv.removeChild(currentDiv.lastChild)
        }
        else if(!currentSpan){
            addClass(currentDiv.lastChild,"current");
            removeClass(currentDiv.lastChild,"incorrect");
            removeClass(currentDiv.lastChild,"correct");
        }
        
    }

    //move cursor
    const cursor = document.getElementById('cursor');
    const game = document.getElementById('game');
    const nextLetter = document.querySelector(".letter.current");
    const nextWord= document.querySelector(".word.current");
    const gameRect = game.getBoundingClientRect();
    let left;
    let rect;
    let top;
    if(nextLetter){
         rect = nextLetter.getBoundingClientRect();
         left = rect.left - gameRect.left;
          top = rect.top - gameRect.top;

    }else{
         rect = nextWord.getBoundingClientRect();
         left = rect.right - gameRect.left;
        top = rect.top - gameRect.top+7;
       
    }
    
    
    
    
    
    // Ensure the cursor doesn't go outside the bounds of the game element
    top = Math.min(top, game.offsetHeight - cursor.offsetHeight)+5;
    left = Math.min(left, game.offsetWidth - cursor.offsetWidth)-10;
    
    cursor.style.top = top + 'px';
    cursor.style.left = left + 'px';
    
  })