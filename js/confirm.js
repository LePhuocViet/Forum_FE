function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);

    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function() {
    var token = getQueryParam('token');
    if (token) {
        verifyToken(token);
    } else {
        var contextElement = document.querySelector(".container__item-title")
        contextElement.textContent = "An error occurred during authentication."
    }
});

function verifyToken(token) {
    fetch(`http://localhost:8080/verify?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 1000) {
                  var contextElement = document.querySelector(".container__item-title")
                    contextElement.textContent = "Verification successful!"
       
        } else {
         var contextElement = document.querySelector(".container__item-title")
                    contextElement.textContent = "An error occurred during verification."
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('status').textContent = "An error occurred during verification.";
    });
}