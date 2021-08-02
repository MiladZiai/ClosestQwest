document.addEventListener("DOMContentLoaded", function() {

    showPage(location.pathname)

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
        case "/sign-up":
            newPageId = "sign-up"
            break
        case "/sign-in":
            newPageId = "sign-in"
            break
        case "/clubs":
            newPageId = "threads"
            loadAllThreads()
            break
        default:

            if (uri.startsWith("/posts/")) {
                newPageId = "posts"
                /*const threadName = uri.split("/")[2]
                loadAllPosts(threadName)*/
            } else if (uri.startsWith("/create-thread/")) {
                newPageId = "create-thread"
            } else if (uri.startsWith("/edit-thread/")) {
                newPageId = "edit-thread"
            } else {
                newPageId = "not-found"
            }
    }


    if (localStorage.getItem("accessToken")) {
        const signUpButton = document.getElementById("is-sign-up")
        signUpButton.classList.remove("is-sign-up")
        signUpButton.classList.add("is-logged-in")

        const signInButton = document.getElementById("is-sign-in")
        signInButton.classList.remove("is-sign-in")
        signInButton.classList.add("is-logged-in")

        const logoutButton = document.getElementById("is-logout")
        logoutButton.classList.remove("is-logout")
        logoutButton.classList.add("show-logout")
    }

    errorSection.innerHTML = ""
    document.getElementById(newPageId).classList.add("current-page")
}

function hideCurrentPage() {
    document.querySelector(".current-page").classList.remove("current-page")
}