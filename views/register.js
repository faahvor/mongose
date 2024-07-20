document.getElementById("registerForm").addEventListener('submit',async(event)=>{
event.preventDefault()


  const data = {
    firstName:document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    userName: document.getElementById("userName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log(data);

  fetch("http://localhost:3000/api/v1/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("account successfully created")
    })
    .catch((err) => {
      console.log(err);
    });
});

