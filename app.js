// https://script.google.com/macros/s/AKfycbwDKqNGKLVK-ngR1QZFZntv_hm5X9FM8lstOlbQHpJAC2TeDDxVakLhP0sS7BBY7XM/exec
// AKfycbwDKqNGKLVK-ngR1QZFZntv_hm5X9FM8lstOlbQHpJAC2TeDDxVakLhP0sS7BBY7XM

//ANIMATIONS
const timeline = gsap.timeline({ defaults: { duration: 1 } });

timeline
  .from(".container", { y: "-100%", opacity: 0.3, ease: "bounce" })
  .from(
    ".title",
    { duration: 0.5, scale: "0.6", opacity: 0, ease: "power1.in" },
    "<0.5"
  )
  .from(".animatedField", {
    scale: 0,
    ease: "elastic.out(0.5, 0.4)",
    stagger: "-.1",
  });

//VARIABLES
const message = document.querySelector(".message");
const success = document.querySelector(".success");
const pass = document.querySelector("#password1");
const cPass = document.querySelector("#password2");
const check = document.querySelector('#check')

const form = document.forms["google-sheet"];
//DEPLOYMENT ID
const deploymentURL =
  "https://script.google.com/macros/s/AKfycbwDKqNGKLVK-ngR1QZFZntv_hm5X9FM8lstOlbQHpJAC2TeDDxVakLhP0sS7BBY7XM/exec";

let isValid = false;
let passwordMatch = false;
let isChecked = false;

function validateForm() {
  isValid = form.checkValidity();

  if (!isValid) {
    message.textContent = "Please Fill Out all Fields";
    message.style.color = "red";
    success.style.border = "2px solid red";
    return;
  }
  if (pass.value !== cPass.value) {
    passwordMatch = false;
    message.textContent = "Passwords are not Matching";
    pass.style.border = "2px solid red";
    cPass.style.border = "2px solid red";
    message.style.color = "red";
    success.style.border = "2px solid red";
    return;
  }
  if(!check.checked){
    message.style.color = "red";
    message.textContent = "Please Agree to continue further"
    success.style.border = "2px solid red";
    return;
  }
  else{
    isChecked = true;
  }
  if (pass.value === cPass.value) {
    passwordMatch = true;
    cPass.style.border = "2px solid green";
    pass.style.border = "2px solid green";
    message.style.color = "green";
    message.textContent = "Form is going to be submitted to google sheet";
    success.style.border = "2px solid green";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateForm();

  if (isValid && passwordMatch && isChecked) {
    console.log(form);
    fetch(deploymentURL, {
      method: "POST",
      body: new FormData(form),
    })
      .then((res) => {
        message.textContent = "Data has been Successfully added";
        alert("The data has been successfully saved to the google sheets");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});
