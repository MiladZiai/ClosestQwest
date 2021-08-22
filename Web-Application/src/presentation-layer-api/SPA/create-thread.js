document.addEventListener("DOMContentLoaded", function() {

    const createThreadForm = document.getElementById("postCreateThreadForm")
    const errorSection = document.getElementById("errorSection")
    
    createThreadForm.addEventListener("submit", async function(event) {

        event.preventDefault()

        var threadName = document.getElementById("threadNameInput").value

        const idToken = localStorage.getItem("idToken")

        const thread = {
            name: threadName,
            threadOfAccount: idToken
        }

        const response = await Post(`api/threads/create`, thread)
        
        if (response.errors) {
            handleErrors(response.errors, errorSection)
            createThreadForm.appendChild(errorSection)
            return
        } else if(response.message == "Bad Request") {
            handleMessage(response.message, errorSection)
            createThreadForm.appendChild(errorSection)
            return
        } else if(response.message == "Auth Failed!") {
            handleMessage(response.message, errorSection) 
            editThreadForm.appendChild(errorSection)
            return
        } else {
            document.getElementById("noThreadsExist").style.visibility = "hidden"
            const uri = "/threads"
            newPage(uri)
        }

    })

})