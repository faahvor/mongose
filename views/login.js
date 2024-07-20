document.getElementById("form").addEventListener("submit",async(e)=>{
    e.preventDefault()

    const data = {
        username:document.getElementById("username").ariaValueMax,
        password:document.getElementById("password").value
    }
    console.log(data);

    fetch("http://localhost:3000/api/v1/login",{
        
    })
})