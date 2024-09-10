function check(){
    var user = localStorage.getItem('username');
    if(user ==  null) window.location.href = '/login'; 
    
}
var countdownTimer;
function countdownt(input,button){

    var countdownElement = document.getElementById(input);
    var buttonElement = document.querySelector(button);
    var timeNow = new Date().getTime();
    var timeFinish;

    if (localStorage.getItem('timeFinish')) {
        timeFinish = localStorage.getItem('timeFinish');
    } else {
        timeFinish = timeNow + 60 * 1000;
        localStorage.setItem('timeFinish', timeFinish);
    }
    function updateTimer() {
        var currentTime = new Date().getTime(); 
        var timeLeft = Math.floor((timeFinish - currentTime) / 1000);
        if (timeLeft > 0) {
            countdownElement.textContent = timeLeft;
            buttonElement.style.display = "none";
        } else {
            clearInterval(countdownTimer);
            countdownElement.textContent = "Send Again!";
            buttonElement.style.display = "block";
            localStorage.removeItem('timeFinish');
        }
    }
    countdownTimer = setInterval(updateTimer, 1000);
    updateTimer();  
}

function send_again(input,button){
    var user = localStorage.getItem('username');
    if(user ==  null) window.location.href = '/login'; 
    fetch('http://localhost:8080/verify/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user
        }
        ) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 1000) {
            var timeNow = new Date().getTime();
            var timeFinish = timeNow + 60 * 1000; 
            localStorage.setItem('timeFinish', timeFinish);
            countdownt(input,button)
        
        } else {
            window.location.href = '/login';
            console.error(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}