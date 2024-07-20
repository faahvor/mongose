document.getElementById("form").addEventListener("submit",async(e)=>{
    e.preventDefault()

    const data = {
        username:document.getElementById("username").ariaValueMax,
        password:document.getElementById("password").value
    }
    console.log(data);

    fetch("http://localhost:3000/api/v1/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
    })
    .then((res)=>res.json)
    .then((res)=>{
        console.log(res);
        alert("successfully logged in")
    })
    .catch((err)=>{
        console.log(err);
    })
})