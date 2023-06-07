const { off } = require("../../models/review");

let newPasswordValue;
let confirmationValue;
const form = document.querySelector('form')
const newPassword = document.getElementById('new-password')
const confirmation = document.getElementById('password-confirmation')
const validationMessage = document.getElementById('validation-message')
function validatePassword(message,add,remove){
    validationMessage.textContent = message;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
}
confirmation.addEventListener('input', e =>{
    e.preventDefault();
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;
    if(newPasswordValue !== confirmationValue) {
        validatePassword('Password must match!!')
    }else{
        validatePassword('Password match!!')
    }
});

form.addEventListener('submit', e=>{
    if(newPasswordValue !== confirmationValue) {
        e.preventDefault();
        const error = document.getElementById('error')
        if(!error){
            alert('Password must match')
        }
    }
})