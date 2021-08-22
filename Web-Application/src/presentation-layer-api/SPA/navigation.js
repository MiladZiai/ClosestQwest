document.addEventListener("DOMContentLoaded", function() {

    showPage(location.pathname)

    // By listening to the body we dont need to listen to every single new element
    document.body.addEventListener("click", function(event) {

        const clickedElement = event.target

        if (clickedElement.tagName == "A") {
            if (clickedElement.hostname == location.hostname) {
                event.preventDefault()

                const uri = clickedElement.getAttribute("href")

                if (location.pathname != uri) {
                    hideCurrentPage()
                    showPage(uri)
                    history.pushState({}, "", uri)
                }
            }
        }
    })
})

window.addEventListener("popstate", function(event) {
    const uri = location.pathname
    hideCurrentPage()
    showPage(uri)
})

function showPage(uri) {
    const errorSection = document.getElementById("errorSection")

    let newPageId = ""

    switch (uri) {
        case "/":
            newPageId = "home"
            break
        case "/about":
            newPageId = "about"
            break
        case "/contact":
            newPageId = "contact"
            break
        case "/accounts":
            newPageId = "accounts"
            break
        case "/accounts/sign-up":
            newPageId = "sign-up"
            break
        case "/accounts/sign-in":
            newPageId = "sign-in"
            break
        case "/threads":
            newPageId = "threads"
            loadAllThreads()
            break
        default:
            if (uri.startsWith("/create-thread")) {
                newPageId = "create-thread"
            } else if (uri.startsWith("/edit-thread/")) {
                newPageId = "edit-thread"
            } else {
                newPageId = "not-found"
            }
    }

    checkToken()

    errorSection.innerHTML = ""
    document.getElementById(newPageId).classList.add("current-page")
}

function hideCurrentPage() {
    document.querySelector(".current-page").classList.remove("current-page")
}

function checkToken() {
    if (localStorage.getItem("accessToken")) {
        const signUpButton = document.getElementById("is-sign-up")
        signUpButton.setAttribute("style", "display: none !important;")

        const signInButton = document.getElementById("is-sign-in")
        signInButton.setAttribute("style", "display: none !important;")

        document.getElementById("createThreadButton").style.visibility = "visible"

        const logoutButton = document.getElementById("is-logout")
        logoutButton.classList.remove("is-logout")
        logoutButton.classList.add("show-logout")
    }
}