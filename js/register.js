var validPattern = /^[a-zA-Z0-9]*$/;
var validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function valid_Name(inputElement, inputId) {
    var inputName = document.getElementById(inputId);
    var errorElement = document.querySelector(inputElement);
    var errorMessage = errorElement.querySelector(".error__message");

    function validate() {
        if (inputName.value.trim() === "") {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Please enter this field";
            return false;
        } else if (!validPattern.test(inputName.value)) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Special characters are not allowed";
            return false;
        } else if (inputName.value.length < 8) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "This field requires at least 8 characters";
            return false;
        } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
            return true;
        }
    }

    inputName.onblur = validate;
    inputName.oninput = validate;

 
 
    return validate(); ;
}
function valid_Email(inputElement, inputId){
    var inputName = document.getElementById(inputId);
    var errorElement = document.querySelector(inputElement);
    var errorMessage = errorElement.querySelector(".error__message");

    function validate() {
        if (inputName.value.trim() === "") {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Please enter this field";
            return false;
        } else if (!validEmailPattern.test(inputName.value)) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Incorrect format Email";
            return false;
        }  else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
            return true;
        }
    }

    inputName.onblur = validate;
    inputName.oninput = validate;

 
 
    return validate(); ;
}
function valid_Option(selectElement, selectId) {
    var selectNode = document.getElementById(selectId);
    var errorElement = document.querySelector(selectElement);
    var errorMessage = errorElement.querySelector(".error__message");

    function validate() {
        // Kiểm tra nếu không có tùy chọn được chọn
        if (selectNode.value === "" || selectNode.value === null) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Please select an option";
            return false;
        } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
            return true;
        }
    }


    selectNode.onchange = validate;


    return validate(); 
}
function Valid_isNull(inputElement, inputId) {
    var inputElementNode = document.getElementById(inputId);
    var errorElement = document.querySelector(inputElement);
    var errorMessage = errorElement.querySelector(".error__message");

    function validateInput() {
        var validPattern = /^[a-zA-Z0-9]*$/;

        if (inputElementNode.value.trim() === '') {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Please enter this field";
            return false;
        } else if (!validPattern.test(inputElementNode.value)) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Special characters are not allowed";
            return false;
        } else if (inputElementNode.value.length < 8) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "This field requires at least 8 characters";
            return false;
        } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
            return true;
        }
    }

    inputElementNode.onblur = validateInput;
    inputElementNode.oninput = validateInput;

    return validateInput();
}
function checkPassword(inputElement, inputId, inputreId) {
    var inputElementNode = document.getElementById(inputId);
    var inputElementNode2 = document.getElementById(inputreId);
    var errorElement = document.querySelector(inputElement);
    var errorMessage = errorElement.querySelector(".error__message");
    function validatePasswords() {
        if (inputElementNode.value.trim() !== inputElementNode2.value.trim()) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Passwords do not match";
            return false;
        } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
            return true;
        }
    }
    inputElementNode.oninput = validatePasswords;
    inputElementNode2.oninput = validatePasswords;

    return validatePasswords();
}

function onSubmit(input, select) {
    if(!(valid_Name(".form__input-name","name") || valid_Email(".form__input-email","email") 
        || valid_Option(".form__input-language","language")
    ||Valid_isNull(".form__input-username","username")
    ||Valid_isNull(".form__input-password","password")
    ||Valid_isNull(".form__input-repassword","repassword")
    ||checkPassword(".form__input-repassword","repassword","password"))){
    alert("Please enter the information") 
    return ""
    } 
    var inputs = document.querySelectorAll(input + ',' + select);
    var object = {
        name: "",
        email: "",
        language: "",
        sex: "",
        username: "",
        password: "",
        repassword: ""
    };

    inputs.forEach(function(input) {
        if (input.name in object) {
            object[input.name] = input.value.trim();
        }
    });

    console.log(object); 

    fetch('https://lephuocviet.io.vn/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 1000) {
            localStorage.setItem('username', object.username);

            return fetch('https://lephuocviet.io.vn/verify/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: object.username })
            });
        } else {
            alert(data.message)
            throw new Error('Failed to create user');
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 1000) {
            window.location.href = '/infor.html'; 
        } else {
            window.location.href = '/login';
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
