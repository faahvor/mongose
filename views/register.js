const form = document.getElementById("registerForm");

const formData = () => {
  const { firstName, lastName, userName, email, password, confirmPassword } =
    form;
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
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
    })
    .catch((err) => {
      console.log(err);
    });
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formData();
});
