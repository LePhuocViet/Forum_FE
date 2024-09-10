function Valid_isNull(inputElement,inputId){
    var inputName = document.getElementById(inputId);
    var errorElement = document.querySelector(inputElement);
    var errorMessage = errorElement.querySelector(".error__message")
    inputName.onblur = function () {
        if (inputName.value.trim() === '') {
          errorMessage.style.display = "block";
          errorMessage.textContent = "Please enter this field";
   
       
        } else if(inputName.value.length < 8){
          errorMessage.style.display = "block";
          errorMessage.textContent = "This field requires at least 8 characters";
       
        }else {
          errorMessage.textContent = "";
          errorMessage.style.display = "none";
      
        }
      };
      inputName.oninput = function () {
      if (inputName.value.trim() === '') {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter this field";
       
      } else if(inputName.value.length < 8){
        errorMessage.style.display = "block";
        errorMessage.textContent = "This field requires at least 8 characters";
  
      }else {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
 
      }
   
    };

}

function checkValid(inputId){
    var inputName = document.getElementById(inputId);
    if (inputName.value.trim() === '') {
        return false;
     
      } else if(inputName.value.length < 8){
        return false;
     
      }else {
        return true;
      }

    };



function Login_Confirm(inputUsername, inputPassword) {
    if(!checkValid(inputUsername) || !checkValid(inputUsername)){
        alert("Please enter the information")
        return ""}
  var usernameI = document.getElementById(inputUsername);
  var errorMessage = usernameI.parentElement.querySelector(".error__message")
  var passwordI = document.getElementById(inputPassword);
  fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: usernameI.value.trim(),
          password: passwordI.value.trim()
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.code === 1000) {
          // window.location.href = '/home'; 
          console.log(data.result)
          alert("TAO CHỈ MỚI LÀM ĐĂNG NHẬP ĐĂNG KÝ")
      } else {
        errorMessage.textContent = data.message;
        errorMessage.style.display = "block";
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}





