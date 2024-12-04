
var usernameInput = document.getElementById("usernameInput"); 
var userEmailInput = document.getElementById("userEmailInput"); 
var userPasswordInput = document.getElementById("userPasswordInput"); 
var signupBtn = document.getElementById("signupBtn"); 

let usersinfo = [];

if (localStorage.getItem('users') != null) {
    usersinfo = JSON.parse(localStorage.getItem('users'));
};

function signUp()
{

    userInputsValidation();
    isExist();

    if(userInputsValidation() == true && isExist() == false)
    {
        var user = 
        {
            name:usernameInput.value,
            email:userEmailInput.value,
            password:userPasswordInput.value
        }

        usersinfo.push(user)
        localStorage.setItem("users", JSON.stringify(usersinfo));
        var confirmMsg = document.getElementById("confirmMsg");
        confirmMsg.classList.replace("d-none", "d-block");
        var signin = document.getElementById("signin")
        signin.classList.replace("d-none", "d-block");
    }
    else
    {
        var tryAgainMsg = document.getElementById("tryAgainMsg");
        tryAgainMsg.classList.replace("d-none", "d-block");
    }

}

function usernameValidation()
{
    var usernameAlert = document.getElementById("usernameAlert");

    var regex = /^[A-Za-z]{3,8}(\s?[A-Za-z]{3,8})?$/
    if( regex.test(usernameInput.value) == true && usernameInput.value != "")
    {
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
        usernameAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
        usernameAlert.classList.replace("d-none", "d-block");

        return false
    }
};

function userEmailValidation()
{
    var userEmailAlert = document.getElementById("userEmailAlert");

    var regex = /@[a-z]{5,10}(\.com)$/;
    if( regex.test(userEmailInput.value) == true && userEmailInput.value != "")
    {
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");

        return false
    }
};

function userPasswordValidation()
{
    var regex = /^.{8,20}$/;
    var userPasswordAlert = document.getElementById("userPasswordAlert");

    if( regex.test(userPasswordInput.value) == true && userPasswordInput.value != "")
    {
        userPasswordInput.classList.add("is-valid");
        userPasswordInput.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");

        return false
    }
};



function isExist()
{
    var accountExistMsg = document.getElementById("accountExistMsg");
    
    for(var i = 0; i < usersinfo.length; i++)
    {

        if(usersinfo[i].name.toLowerCase() == usernameInput.value.toLowerCase()
             || usersinfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase())
        {
            accountExistMsg.classList.replace("d-none", "d-block");
            usernameInput.classList.remove("is-valid");
            userEmailInput.classList.remove("is-valid");
            userPasswordInput.classList.remove("is-valid");

            return true
        }
    }
    return false
};

function userInputsValidation()
{
    usernameValidation();   
    userEmailValidation();
    userPasswordValidation();

    if( (usernameValidation() == true && 
    userEmailValidation() == true &&
     userPasswordValidation() == true))
    {
        return true
    }
    else
    {
        return false
    }
};


var username = localStorage.getItem("sessionUsername");
function login()
{
    var loginEmail = document.getElementById("loginEmail");
    var loginPassword = document.getElementById("loginPassword");
    var loginBtn = document.getElementById("loginBtn");
    var wrongMsg = document.getElementById("wrongMsg");

    if(loginEmail.value == "" || loginPassword.value == "")
    {
        var fillMsg = document.getElementById("fillMsg");
        fillMsg.classList.replace("d-none", "d-block");
        return false
    }

    for(var i = 0; i < usersinfo.length; i++)
    {
        if(usersinfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() && usersinfo[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            
            localStorage.setItem('sessionUsername', usersinfo[i].name)
            loginBtn.setAttribute("href", "home.html");
        }
        else
        {
            wrongMsg.classList.replace("d-none", "d-block");
        }
    }
}

function displayHome()
{
    document.getElementById("username").innerHTML = "Welcome "+ username;

}

function logout() {
    localStorage.removeItem('sessionUsername')
}