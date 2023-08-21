function validate(data) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var hasUppercase = /[A-Z]/;
    var hasLowercase = /[a-z]/;
    var hasDigit = /\d/;
    var hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (!emailPattern.test(data.username)) {
        alert("please choose a valid email")
        return 0;
    } else if (data.password.length < 6 || !hasUppercase.test(data.password) || !hasLowercase.test(data.password) || !hasDigit.test(data.password) || !hasSpecialChar.test(data.password)) {
        alert("Please enter a valid password")
        return 0;
    }
    return 1;
}

function checkCredentals() {
    const email = String(document.getElementById("email").value)
    const pwd = String(document.getElementById("pwd").value)
    const data = {
        username: email,
        password: pwd
    }
    if (validate(data) == 1) {
        const req = new XMLHttpRequest()
        req.onreadystatechange = async () => {
            if (req.status === 200 && req.readyState === 4) {
                var res = req.responseText
                console.log(res)
                const val = res.split(":")
                const token = String(val[0])
                const customerID = String(val[1])
                localStorage.setItem("token", token);
                localStorage.setItem("customerID", customerID)
                this.window.open("../../view/customer/customerProfile.html", '_self')
            }
            if (req.readyState == XMLHttpRequest.DONE && req.status != 200) {
                alert("unsuccessful attempt ,check your credentials and please try again")
            }
        }
        req.open('POST', 'http://localhost:8080/FinanceBackend/rest/authentication/login', true)
        req.setRequestHeader("Content-Type", "application/json")
        req.send(JSON.stringify(data))
    }
}

window
    .addEventListener(
        'DOMContentLoaded',
        function () {
            this.document.getElementById("customerCred").addEventListener("click", () => {
                checkCredentals()
            })
        }
    )