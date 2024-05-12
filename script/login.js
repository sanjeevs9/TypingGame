
document.getElementById("button1").addEventListener('click',()=>{
    document.querySelector(".right").classList.remove("alternate")
    document.querySelector(".container").classList.remove("alternate")
    document.querySelector(".container").classList.add("clicked")
    document.querySelector(".back-button").classList.add("clicked");
    setTimeout(()=>{
        document.querySelector(".left").classList.add("clicked")
    },600)
    setTimeout(()=>{
        document.querySelector(".SignIn").classList.add("clicked");
    },1100)
    setTimeout(()=>{
        document.querySelector(".SignUp").classList.add("clicked");
    },900)
    setTimeout(()=>{
        document.querySelector(".right").classList.add("clicked")
    },700)

})

document.getElementById("button2").addEventListener('click',()=>{
    document.querySelector(".right").classList.add("alternate")
    document.querySelector(".right").classList.remove("clicked")

    document.querySelector(".container").classList.add("alternate")
    document.querySelector(".container").classList.remove("clicked")

    document.querySelector(".back-button").classList.remove("clicked");

    setTimeout(()=>{
        document.querySelector(".left").classList.remove("clicked")
    },600)
    setTimeout(()=>{
        document.querySelector(".SignIn").classList.remove("clicked");
    },1100)
    setTimeout(()=>{
        document.querySelector(".SignUp").classList.remove("clicked");
    },900)
    setTimeout(()=>{
        document.querySelector(".right").classList.add("remove")
    },700)

})

document.querySelector(".back-button").addEventListener('click',()=>{
    window.location.pathname="/"
})

document.getElementById("login").addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById("Login-email").value;
    const pass=document.getElementById("Login-pass").value;
    console.log(email)
    console.log(pass)
})

document.getElementById("sign").addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById("Sign-email").value;
    const pass=document.getElementById("Sign-pass").value;
    const username=document.getElementById("Sign-user").value;
    console.log(username)
    console.log(email)
    console.log(pass)
})