document.addEventListener("DOMContentLoaded", function() {

    const logoutForm = document.getElementById("logoutForm")
    logoutForm.addEventListener("submit", function(event) {
        event.preventDefault()

        const signUpButton = document.getElementById("is-sign-up")
        signUpButton.setAttribute("style", "display: inline !important;")

        const signInButton = document.getElementById("is-sign-in")
        signInButton.setAttribute("style", "display: inline !important;")

        const logoutForm = document.getElementById("is-logout")
        logoutForm.classList.remove("show-logout")
        logoutForm.classList.add("is-logout")

        document.getElementById("usernameSignIn").value = ""
        document.getElementById("passwordSignIn").value = ""

        document.getElementById("usernameSignUp").value = ""
        document.getElementById("passwordSignUp").value = ""

        document.getElementById("createThreadButton").style.visibility = "hidden"
        document.getElementById("noThreadsExist").style.visibility = "hidden"

        localStorage.clear()
        
        const uri = "/"
        newPage(uri)
    })

})