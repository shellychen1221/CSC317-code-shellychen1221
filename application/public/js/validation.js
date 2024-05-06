let usernamevalid=false;
let emailvalid=false;
let passwordvalid=false;
let confirmpassvalid=false;
let agevalid=false;
let termvalid=false;


function checkValid(label){
    if(label.classList.contains('valid-cond')){
        return true;
    }
    else{
        return false;
    }
}
function setValid(label){
    label.classList.add("valid-cond");
    label.classList.remove("invalid-cond");
}
function setInvalid(label){
    label.classList.add("invalid-cond");
    label.classList.remove("valid-cond");
}
function validText(label){
    label.classList.add("valid-text");
    label.classList.remove("invalid-text");
}
function InvalidText(label){
    label.classList.add("invalid-text");
    label.classList.remove("valid-text");
}
document.getElementById("username").addEventListener("input", function(ev) {
    let userInput = ev.currentTarget;
    let username = userInput.value;
    let usernameRegex = /^[a-zA-Z]$/;
    let usernameLabel1 = document.getElementById("username-label1");
    let usernameLabel2 = document.getElementById("username-label2");

    userInput.addEventListener("blur", () => {
        usernameLabel1.style.display = "none";
        usernameLabel2.style.display = "none";
      });
    userInput.addEventListener("click", () => {
        usernameLabel1.style.display = "inline";
        usernameLabel2.style.display = "inline";
    });
    if (usernameRegex.test(username[0])) {
        usernameLabel1.textContent = 'O Username begins with a letter.';
        setValid(usernameLabel1);
    } 
      else{
        usernameLabel1.textContent = 'X Username must begin with a letter.';
        setInvalid(usernameLabel1);
    }
      
    if (username.length >= 3) {
        usernameLabel2.textContent = 'O Username has at least 3 alphanumeric characters.';
        setValid(usernameLabel2);
    }
    else {
        usernameLabel2.textContent = 'X Username must have at least 3 alphanumeric characters.';
        setInvalid(usernameLabel2);
    }
      
    if(checkValid(usernameLabel1) && checkValid(usernameLabel2)){
        validText(userInput);
        usernamevalid=true;
    }
    else {
        InvalidText(userInput);
        usernamevalid=false;
    }
  });
  document.getElementById("email").addEventListener("input", function(ev) {
    let userInput = ev.currentTarget;
    let email = userInput.value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emaillabel=document.getElementById("email-label");
    userInput.addEventListener("blur", () => {
        emaillabel.style.display = "none";
      });
    userInput.addEventListener("click", () => {
        emaillabel.style.display = "inline";
    });
    if (emailRegex.test(email)) {
        emaillabel.textContent= 'O Email is valid.';
        setValid(emaillabel);
        validText(userInput);
        emailvalid=true;
    } else {
        emaillabel.textContent = 'X Email is valid.';
        setInvalid(emaillabel);
        InvalidText(userInput);
        emailvalid=false;
    }
    
  });
  
  
  document.getElementById("password").addEventListener("input", function(ev) {
    let userInput = ev.currentTarget;
    let password = userInput.value;
    let uppercaseRegex = /[A-Z]/;
    let numberRegex = /\d+/;
    let specialRegex = /[/*\-+!@#$^&~\[\]]/;
    let passwordlabel1 = document.getElementById("password-label1"); 
    let passwordlabel2 = document.getElementById("password-label2"); 
    let passwordlabel3 = document.getElementById("password-label3"); 
    let passwordlabel4 = document.getElementById("password-label4"); 

    userInput.addEventListener("blur", () => {
        passwordlabel1.style.display = "none";
        passwordlabel2.style.display = "none";
        passwordlabel3.style.display = "none";
        passwordlabel4.style.display = "none";
      });
    userInput.addEventListener("click", () => {
        passwordlabel1.style.display = "inline";
        passwordlabel2.style.display = "inline";
        passwordlabel3.style.display = "inline";
        passwordlabel4.style.display = "inline";
    });
    if (password.length < 8) {
        passwordlabel1.textContent = 'X Has at least 8 characters';
        setInvalid(passwordlabel1);
      }
    else {
        passwordlabel1.textContent = 'O Has at least 8 characters';
        setValid(passwordlabel1);
    }
    if (uppercaseRegex.test(password)) {
        passwordlabel2.textContent= 'O Has at least one uppercase letter';
        setValid(passwordlabel2);
    } else {
        passwordlabel2.textContent= 'X Has at least one uppercase letter';
        setInvalid(passwordlabel2);
    }
    if(numberRegex.test(password)){
        passwordlabel3.textContent= 'O Has at least one number case letter';
        setValid(passwordlabel3);
    } else {
        passwordlabel3.textContent= 'X Has at least one number case letter';
        setInvalid(passwordlabel3);
    }
    if(specialRegex.test(password)){
        passwordlabel4.textContent= 'O Has at least one of following:  / * - + ! @ # $ ^ & ~ [ ]';
        setValid(passwordlabel4);
    } else {
        passwordlabel4.textContent= 'X Has at least one of following:  / * - + ! @ # $ ^ & ~ [ ]';
        setInvalid(passwordlabel4);
    }
    passwordvalid=checkValid(passwordlabel1)&& checkValid(passwordlabel2)&& checkValid(passwordlabel3)&& checkValid(passwordlabel4);
    if(passwordvalid){
        validText(userInput);
        passwordvalid=false;
    }
    else {
        InvalidText(userInput);
        passwordvalid=true;
    }


  });
  
  document.getElementById("confirm-password").addEventListener("input", function(ev) {
    let userInput = ev.currentTarget;
    let confirmPassword = userInput.value;
    let password = document.getElementById("password").value;
    let confirmlabel=document.getElementById("confirm-password-label"); 
    userInput.addEventListener("blur", () => {
        confirmlabel.style.display = "none";
      });
    userInput.addEventListener("click", () => {
        confirmlabel.style.display = "inline";
    });
    if (confirmPassword == password) {
        confirmlabel.textContent='O Passwords match';
        setValid(confirmlabel);
        validText(userInput);
        confirmpassvalid=true;
    } else {
        confirmlabel.textContent='X Passwords match';
        setInvalid(confirmlabel);
        InvalidText(userInput);
        confirmpassvalid=false;
    }
  });
  
  
  document.getElementById("age").addEventListener("change", function(ev) {
    let userInput = ev.currentTarget;
    let ageCheckbox = document.getElementById("age");
    let agelabel=document.getElementById("age-label");

    if (ageCheckbox.checked) {
        agelabel.textContent='✓';
        setValid(agelabel);
        agevalid=true;
    }
    else{
        agelabel.textContent='X';
        setInvalid(agelabel);
        agevalid=false;
    }
  });
  
  document.getElementById("terms").addEventListener("change", function(ev) {
    let userInput = ev.currentTarget;
    let termCheckbox = document.getElementById("terms");
    let termlabel=document.getElementById("term-label");

    if (termCheckbox.checked) {
        termlabel.textContent="✓";
        setValid(termlabel);
        termvalid=true;
    }
    else{
        termlabel.textContent="X";
        setInvalid(termlabel);
        termvalid=false;
    }
  });

  function clearForm() {
    document.getElementById("reg-form").reset();
  }


  window.onload = function() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }  
  };

  