const form = document.querySelector("form");
const formErrorsField = document.getElementById("form-errors");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const commentsField = document.getElementById("comments");
const nameErrorArea = document.getElementById("name-error-area");
const emailErrorArea = document.getElementById("email-error-area");
const commentsErrorArea =  document.getElementById("comments-error-area");

const commentsCharRemaining = document.getElementById("char-count-area");

let form_errors = [];
// if (commentsField.validity.tooShort){
//     commentsField.setCustomValidity("Comment must be at least 10 characters long.");

// } else{
//     nameField.setCustomValidity("");
// }




function checkCommentCharCount(){
    let remainingChars = commentsField.maxLength - commentsField.value.length;

    if (remainingChars >= 1 && remainingChars < 100){
        commentsCharRemaining.textContent = "Warning, Remaining Characters: " + remainingChars;
        commentsCharRemaining.style.color = "red";
        return;

    } else if (remainingChars == 0){
        commentsCharRemaining.textContent = "You Hit the Character limit of " + commentsField.maxLength;
        commentsCharRemaining.style.color = "red";
        return;
    }
    commentsCharRemaining.style.color = "";
    
    commentsCharRemaining.textContent = "Remaining Characters: " + remainingChars;
    
}

function checkNameValidity(){
    if (nameField.validity.valueMissing){
        nameField.setCustomValidity("Please Enter Your Name.");
        nameErrorArea.textContent = "Please Enter Your Name.";
        
    } else if (nameField.value.trim() === ""){
        nameField.setCustomValidity("Please Enter Your Name. A minimum of 1 character is required.");
        nameErrorArea.textContent = "Please Enter Your Name. A minimum of 1 character is required.";

    } else{
        nameField.setCustomValidity("");
        nameErrorArea.textContent = "";

        
    }
}


function checkEmailValidity(){
    if (emailField.validity.valueMissing){
        emailField.setCustomValidity("Please Enter Your Email Address.");
        emailErrorArea.textContent = "Please Enter Your Email Address.";

    } else if (emailField.validity.typeMismatch){
        emailField.setCustomValidity("Enter an email address in the form: name@example.com.");
        emailErrorArea.textContent = "Enter an email address in the form: name@example.com.";
        
    } else{
        emailField.setCustomValidity("");
        emailErrorArea.textContent = "";
        
    }
}

function checkCommentsValidity(){
    if (commentsField.validity.valueMissing){
        commentsField.setCustomValidity("Please Enter a Comment.");
        commentsErrorArea.textContent = "Please Enter a Comment.";
        

    } else if (commentsField.validity.tooShort){
        commentsField.setCustomValidity("Comment must be at least 10 characters long.");
        commentsErrorArea.textContent = "Comment must be at least 10 characters long.";
        checkCommentCharCount();

    } else{
        if (commentsField.value.trim().length < 10){
            commentsField.setCustomValidity("Comment must be at least 10 characters long. White space characters do not count.");
            commentsErrorArea.textContent = "Comment must be at least 10 characters long. White space characters do not count.";
            checkCommentCharCount();
            return;
        }
        checkCommentCharCount();
        commentsField.setCustomValidity("");
        commentsErrorArea.textContent = "";

    }
}

function handleInvalid(event){
    const field = event.target;


    if (field === nameField){
        checkNameValidity();
    } else if (field === emailField){
        checkEmailValidity();
    } else if (field === commentsField){
        checkCommentsValidity();
    }

    form_errors.push({ field: field.name, error: field.validationMessage });
    
    
}

nameField.addEventListener("change", checkNameValidity);
emailField.addEventListener("change", checkEmailValidity);
commentsField.addEventListener("change", checkCommentsValidity);


commentsField.addEventListener("input", checkCommentCharCount);
checkCommentCharCount();
commentsCharRemaining.hidden = false;

nameField.addEventListener("invalid", handleInvalid);
emailField.addEventListener("invalid", handleInvalid);
commentsField.addEventListener("invalid", handleInvalid);


form.addEventListener("submit", function(){
    formErrorsField.value = JSON.stringify(form_errors);
});


// commentsField.addEventListener("input", function () {
//     console.log(comments.value);
//     if (commentsField.validity.tooShort){
//         commentsField.setCustomValidity("Comment must be at least 10 characters long.");

//     } else{
//         commentsField.setCustomValidity("");
//     }
// });