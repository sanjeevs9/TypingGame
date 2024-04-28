

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
    const cur=document.querySelector(".word");
    const lett=document.querySelector(".letter");
    console.log(lett)
    addClass(cur,"current");
    addClass(lett,"current");
  }

  document.getElementById("game").addEventListener('keyup',(ev)=>{
    const key=ev.key;
    const currentSpan=document.querySelector(".letter.current")
    const currentDiv=document.querySelector(".word.current")
    const currentLetter=currentSpan?.innerHTML || " ";
    const isLetter=key.length==1 && key!==" ";
   
    console.log("curr--"+currentLetter+"--curr")
    
    if(isLetter){
        if(currentLetter!==" "){
            {key==currentLetter?addClass(currentSpan,"correct"):addClass(currentSpan,"incorrect")}
            removeClass(currentSpan,"current")
            if(currentSpan.nextSibling){
                addClass(currentSpan.nextSibling,"current")   
            }
        }else{
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
        if(currentLetter!==" "){
            if(currentSpan.previousElementSibling){
                removeClass(currentSpan,"current")
                const prevElement=currentSpan.previousElementSibling;
                removeClass(prevElement,"correct")
                removeClass(prevElement,"incorrect")
                addClass(prevElement,"current")
            }else{
                console.log(currentDiv.innerHTML)
                if(currentDiv.previousElementSibling){
                    removeClass(currentDiv,"current")
                    const prevDiv=currentDiv.previousElementSibling;
                    addClass(prevDiv,"current")
                    const extra=[...document.querySelectorAll(".current.word > span.extra")]
                    if(extra.length!==0){
                        extra.forEach(element => {
                            prevDiv.removeChild(element)
                        });
                        addClass(prevDiv.lastChild,"current")
                            removeClass(prevDiv.lastChild,"incorrect")
                            removeClass(prevDiv.lastChild,"correct")
                    }else{
                        if(prevDiv.lastChild){
                            addClass(prevDiv.lastChild,"current")
                            removeClass(prevDiv.lastChild,"incorrect")
                            removeClass(prevDiv.lastChild,"correct")
                        }
                    }
                    
                }
            }
        }else{
            const extra=[...document.querySelectorAll(".current.word > span.extra")]
            console.log(extra)
            if(extra.length!==0){
                extra.forEach(element => {
                    currentDiv.removeChild(element)
                });
            }else{
                if(currentDiv.lastChild){
                    addClass(currentDiv.lastChild,"current")
                    removeClass(currentDiv.lastChild,"correct")
                    removeClass(currentDiv.lastChild,"incorrect")
                }
            }
            
        }
    }
    
  })