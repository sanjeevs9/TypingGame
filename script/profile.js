
document.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem("token")
    if(!token){
        window.location.pathname="/login.html"
    }
    axios.get(`${network}/score/score`,
        {
            headers:{
                "Authorization":token
            }
        }).then(res=>{
            console.log(res)
            document.getElementById("wpm").innerHTML=res.data.wpm+"WPM"
            document.getElementById("accuracy").innerHTML=res.data.accuracy+"%"
        }).catch(err=>{
            window.location.pathname="/login.html"
        })
})