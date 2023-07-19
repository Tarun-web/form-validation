const pass = document.querySelector('#password')
const cPass = document.querySelector('#cpassword')
const form = document.querySelector('form')
const message = document.querySelector('.message')

const isPasswordMatch = false;

function validateForm(){
    if(pass.value === cPass.value){
        isPasswordMatch = true;
    }    
    if(pass.value !== cPass.value){
        message.textContent = "Passwords are not matching"
        return;
    }

}


form.addEventListener('submit', function(){
    
    validateForm();

})