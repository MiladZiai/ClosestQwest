document.addEventListener("DOMContentLoaded", function() {

    const signUpForm = document.getElementById("SignUpForm")
    const errorSection = document.getElementById("errorSection")

    signUpForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementsByName("username")[0].value
        const password = document.getElementsByName("password")[0].value

        const data = {
            username,
            password,
            grant_type: "password"
        }

        const response = await Post("api/accounts/sign-up", data)

        if (response.errors) {
            handleErrors(response.errors, errorSection)
            signUpForm.appendChild(errorSection)
            return
        } else if(response.message == "Bad Request") {
            handleMessage(response.message, errorSection)
            signUpForm.appendChild(errorSection)
            return
        } else {
            document.getElementById("usernameSignIn").value = username
            document.getElementById("passwordSignIn").value = password
            
            const uri = "/accounts/sign-in"
            newPage(uri)
        }
    })
})