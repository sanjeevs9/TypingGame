

// document.addEventListener("DOMContentLoaded",()=>{
//     axios.get(`${network}/score/high`).then(res=>{
//         console.log(res.data.value)
//         let count=1;
//         let placeholder=document.getElementById("output");
//         let out=""
//         res.data.value.forEach(element => {
//             out +=`
//                 <tr>
//                     <td>#${count}</td>
//                     <td>${element.id.name}</td>
//                     <td>${element.wpm} Wpm</td>
//                 </tr>
//             `
//             count++;
//         });
//         placeholder.innerHTML=out
//     }).catch(err=>{
//         console.log(err)
//     })

// })