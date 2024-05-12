

let wordSettings = {
    capital: false,
    punctuations: false,
    sentences: 2
}
addClass(document.getElementById("two"), "on")
addClass(document.querySelector(".sentences"), "on")
addClass(document.querySelector(".default"), "on")

//check user is login or not
document.addEventListener("DOMContentLoaded",()=>{
    const token =localStorage.getItem("token")
    if(token){
        axios.get(`${network}/user/user`,{
            headers:{
                "Authorization": token
            }
        }).then(res=>{
            console.log(res.data.message)
            document.querySelector(".login").classList.add("done")
        }).catch(err=>{
            
        })
    }
})

//login button
document.querySelector(".login").addEventListener('click',()=>{
    window.location.pathname="/login.html"
})

//capital
document.querySelector(".capital").onclick = () => {
    removeClass(document.querySelector(".default"), "on")
    const el = document.querySelector(".capital");
    document.getElementById("game").focus()

    if (!el.classList.contains("on")) {
        addClass(el, "on")
    } else {
        removeClass(el, "on")
    }
    wordSettings.capital = !wordSettings.capital;
    fetchParagraph();
}

//punctutation
document.querySelector(".punctuation").onclick = () => {
    removeClass(document.querySelector(".default"), "on")
    document.getElementById("game").focus()
    const el = document.querySelector(".punctuation");
    if (!el.classList.contains("on")) {
        addClass(el, "on");
    } else {
        removeClass(el, "on")
    }
    wordSettings.punctuations = !wordSettings.punctuations;
    fetchParagraph();
}

//one
document.getElementById("one").onclick = () => {
    removeClass(document.getElementById("two"), "on")
    removeClass(document.getElementById("three"), "on")
    document.getElementById("game").focus()
    const el = document.getElementById("one")
    if (!el.classList.contains("on")) {
        addClass(el, "on")
    } else {
        removeClass(el, "on")
    }
    wordSettings.sentences = 1;
    fetchParagraph()
}

//two class
const elements = document.querySelectorAll(".two-class");
elements.forEach(element => {
    element.onclick = () => {
        removeClass(document.getElementById("one"), "on")
        removeClass(document.getElementById("three"), "on")
        document.getElementById("game").focus()

        if (!element.classList.contains("on")) {
            addClass(element, "on")
        } else {
            removeClass(element, "on")
        }

        wordSettings.sentences = 2;
        fetchParagraph()
    }
});

//three
document.getElementById("three").onclick = () => {

    removeClass(document.getElementById("one"), "on")
    removeClass(document.getElementById("two"), "on")
    addClass(document.querySelector(".sentences"), "on")
    document.getElementById("game").focus()

    const el = document.getElementById("three")
    if (!el.classList.contains("on")) {
        addClass(el, "on")
    } else {
        removeClass(el, "on")
    }
    wordSettings.sentences = 3;
    fetchParagraph()
}

//default
document.querySelector(".default").onclick = () => {
    removeClass(document.querySelector(".punctuation"), "on")
    removeClass(document.querySelector(".capital"), "on")
    removeClass(document.getElementById("one"), "on")
    removeClass(document.getElementById("three"), "on");
    addClass(document.getElementById("two"), "on")
    addClass(document.querySelector(".sentences"), "on")
    document.getElementById("game").focus()


    const el = document.querySelector(".default");
    if (!el.classList.contains("on")) {
        addClass(el, "on")
    } else {
        removeClass(el, "on")
    }
    wordSettings = {
        capital: false,
        punctuations: false,
        sentences: 2
    }
    fetchParagraph();
}


function addClass(el, name) {
    el.classList.add(name);
}

function removeClass(el, name) {
    el.classList.remove(name);
}

let words = [];
let game = document.getElementById("textt");
let timer = 0;
let TimerStart = false;
let myInterval;
let CorrectLetter = 0;
let TotalLetter = 0;
let WrongLetter = 0;

function stopwatch() {
    timer = timer + 1;
    document.getElementById("time").innerHTML = timer;
}



fetchParagraph()
async function fetchParagraph() {
    try {
        const response = await fetch(`https://typing-panda-words.vercel.app/generate-paragraph?capital=${wordSettings.capital}&punctuations=${wordSettings.punctuations}&sentences=${wordSettings.sentences}`);
        const data = await response.json();
        const paragraph = data.paragraph;
        words = paragraph.split(" ");
        formatWord();

    } catch (error) {

    }
}

function formatWord() {
    document.getElementById("textt").style.marginTop = "0px"
    document.getElementById("cursor").style.top = "12px"
    document.getElementById("cursor").style.left = "-3px"

    timer = 0;
    TimerStart = false;
    clearInterval(myInterval);
    game.innerHTML = ""
    document.getElementById("time").innerHTML = "";
    CorrectLetter = 0;
    WrongLetter = 0;
    TotalLetter = 0;

    for (let i = 0; i < words.length; i++) {
        game.innerHTML += `<div class="word"><span class="letter">${words[i].split("").join('</span><span class="letter">')}</span></div>`
    }

    const cur = document.querySelector(".word");
    const lett = document.querySelector(".letter");

    addClass(cur, "current");
    addClass(lett, "current");
}

window.addEventListener('keyup', (ev) => {
    const key = ev.key;
    console.log(key)
    if (key === "Escape" || key=== "Tab") {
        console.log("sdfbasd")
        wordSettings.sentences = 2;
        fetchParagraph()
        document.getElementById("game").focus();
    }
})

document.getElementById("game").addEventListener('keyup', (ev) => {
    const key = ev.key;
    const currentSpan = document.querySelector('.letter.current')
    const currentDiv = document.querySelector('.word.current')
    const currentLetter = currentSpan?.innerHTML || " ";
    const isLetter = key.length === 1 && key !== " ";
    const isFirstLetter = currentSpan === currentDiv.firstChild
    const keys = document.querySelectorAll(".key")
    if (!TimerStart) {
        TimerStart = true;
        myInterval = setInterval(stopwatch, 1000);
    }

    keys.forEach(element => {
        if (element.textContent.trim() === key.toUpperCase()) {
            element.classList.add("active")
            setTimeout(() => {
                element.classList.remove("active")
            }, 200)
        }

    })

    if (isLetter) {
        if (currentLetter !== " ") {
            if (key === currentLetter) {
                addClass(currentSpan, "correct");
                CorrectLetter++;
            } else {
                addClass(currentSpan, "incorrect")
                WrongLetter++;
            }
            removeClass(currentSpan, "current")
            if (currentSpan.nextSibling) {
                addClass(currentSpan.nextSibling, "current")
            }
        } else if (currentLetter === " ") {
            currentDiv.innerHTML += `<span class="letter incorrect extra">${key}</span>`
        }



    }
    if (key === " ") {
        if (currentLetter !== " ") {
            const invalidLetters = [...document.querySelectorAll(".word.current > span.letter:not(.correct)")]
            invalidLetters.forEach(element => {
                addClass(element, "incorrect")
            });
        }

        removeClass(currentDiv, "current");
        addClass(currentDiv.nextSibling, "current");
        if (currentSpan) {
            removeClass(currentSpan, "current");
        }
        addClass(currentDiv.nextSibling.firstChild, "current");
    }

    if (key === "Backspace") {
        if (currentSpan && isFirstLetter && currentDiv.previousSibling && currentDiv.previousSibling.lastChild.classList.contains("extra")) {
            const prevDiv = currentDiv.previousSibling;
            const extraLetter = prevDiv.lastChild;
            removeClass(currentDiv, "current");
            addClass(prevDiv, "current");
            removeClass(currentSpan, "current");
            addClass(extraLetter, "current");
            prevDiv.removeChild(extraLetter);
        }
        else if (currentSpan && isFirstLetter && currentDiv.previousSibling) {
            removeClass(currentDiv, "current")
            addClass(currentDiv.previousSibling, "current")
            removeClass(currentSpan, "current")
            addClass(currentDiv.previousSibling.lastChild, "current");
            removeClass(currentDiv.previousSibling.lastChild, "incorrect");
            removeClass(currentDiv.previousSibling.lastChild, "correct");
        }
        if (currentSpan && !isFirstLetter && currentDiv.lastChild.classList.contains("extra")) {
            addClass(currentDiv.lastChild, "current");
            currentDiv.removeChild(currentDiv.lastChild);

        }
        else if (currentSpan && !isFirstLetter) {
            removeClass(currentSpan, "current")
            if (currentSpan.previousSibling) {
                addClass(currentSpan.previousSibling, "current");
                removeClass(currentSpan.previousSibling, "correct")
                removeClass(currentSpan.previousSibling, "incorrect")
            }
        }
        if (!currentSpan && currentDiv.lastChild.classList.contains("extra")) {
            addClass(currentDiv.lastChild, "current");
            currentDiv.removeChild(currentDiv.lastChild)
        }
        else if (!currentSpan) {
            addClass(currentDiv.lastChild, "current");
            removeClass(currentDiv.lastChild, "incorrect");
            removeClass(currentDiv.lastChild, "correct");
        }

    }
    if (!currentDiv.nextSibling && !currentSpan.nextSibling) {
        TimerStart = false;
        clearInterval(myInterval);
        TotalLetter = CorrectLetter + WrongLetter;

        WPM()
        document.getElementById("game").blur()

    }

    //move lines
    if (currentDiv.getBoundingClientRect().top > 240) {
        const text = document.getElementById('textt');
        const margin = parseInt(text.style.marginTop || "0px");
        const game = document.getElementById("game");
        console.log(game.clientHeight)

        if (game.scrollHeight < game.clientHeight) {

        } else {
            text.style.marginTop = (margin - 40) + "px";
        }

    }
    console.log(document.querySelector(".keyboard").clientWidth)
    //move cursor
    const cursor = document.getElementById('cursor');
    const game = document.getElementById('game');
    const nextLetter = document.querySelector(".letter.current");
    const nextWord = document.querySelector(".word.current");
    const gameRect = game.getBoundingClientRect();
    let left;
    let rect;
    let top;
    if (nextLetter) {
        rect = nextLetter.getBoundingClientRect();
        left = rect.left - gameRect.left;
        top = rect.top - gameRect.top;

    } else {
        rect = nextWord.getBoundingClientRect();
        left = rect.right - gameRect.left;
        top = rect.top - gameRect.top + 7;

    }





    // Ensure the cursor doesn't go outside the bounds of the game element
    top = Math.min(top, game.offsetHeight - cursor.offsetHeight) + 5;
    left = Math.min(left, game.offsetWidth - cursor.offsetWidth) - 10;

    cursor.style.top = top + 'px';
    cursor.style.left = left + 'px';

})

function WPM() {
    let timeinmin = timer / 60;
    let WPM = (TotalLetter / 5) / timeinmin;

    let accuracy = (CorrectLetter / TotalLetter) * 100;

    let AWPM = WPM * (accuracy / 100);

    window.SaveData(parseInt(AWPM.toFixed(2)),parseInt(accuracy.toFixed(2)))

    TotalLetter = 0;
    CorrectLetter = 0;
    WrongLetter = 0;
    const  mins=(Math.floor(timer/60)).toString().padStart(2,'0');
    const  secs=(timer%60).toString().padStart(2,'0');
    document.querySelector(".wpm").innerHTML = AWPM.toFixed(2) + " WPM";
    document.querySelector(".sec").innerHTML = mins+":"+secs;
    document.querySelector(".accuracy").innerHTML = accuracy.toFixed(2) + "%";
    timer = 0;
}