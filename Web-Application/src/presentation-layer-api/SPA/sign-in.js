document.addEventListener("DOMContentLoaded", function() {

    const signInForm = document.getElementById("SignInForm")
    const errorSection = document.getElementById("errorSection")

    signInForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const username = document.getElementsByName("username")[1].value
        const password = document.getElementsByName("password")[1].value

        const data = {
            username,
            password,
            grant_type: "password"
        }

        const response = await loginPost("api/accounts/sign-in", data)

        if (response.errors) {
            handleErrors(response.errors, errorSection)
            signInForm.appendChild(errorSection)
            return
        } else if(response.message == "Auth failed!") {
            handleMessage(response.message, errorSection)
            signInForm.appendChild(errorSection)
            return
        } else {
            buttonConfig()

            localStorage.setItem("accessToken", response.access_token)
            localStorage.setItem("idToken", response.id_token.accountId)

            const uri = "/"
            newPage(uri)
        }
    })
})