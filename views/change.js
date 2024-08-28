document.getElementById("form").addEventListener("submit",async(e)=>{
    e.preventDefault()

    const data ={
        username:document.getElementById("username").value,
        password:document.getElementById("password").value,
        newPassword:document.getElementById("newPassword").value
        }
        console.log(data); 
        fetch("http://localhost:3000/api/v1/change-password/:userName",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then((res)=>res.json)
        .then((res)=>{
            console.log(res);
            alert("successfully changed")
            window.location.href="/views/login.html"
        })
        .catch((err)=>{
            console.log(err);
        })
     
})