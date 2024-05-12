

 function SaveData(wpm,accuracy){
    const token=localStorage.getItem("token");
    if(token){
        axios.post(`${network}/score/add`,{
            wpm,
            accuracy
        },{
            headers:{
                "Authorization":token
            }
        }).then(res=>{
            console.log(res)
            alert(res.data.message)
        }).catch(err=>{
            console.log(err)
        })
    }
}

window.SaveData=SaveData;
