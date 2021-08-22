document.addEventListener("DOMContentLoaded", function() {

    const errorSection = document.getElementById("errorSection")
    const editThreadForm = document.getElementById("editThreadForm")

    editThreadForm.addEventListener("submit", async function(event) {

        event.preventDefault()

        var newThreadName = document.getElementById("editThreadNameInput").value
        const uri = window.location.href
        const threadId = uri.substring(uri.lastIndexOf('/') + 1)

        const thread = {
            newThreadName,
            threadId
        }

        const response = await Put(`api/threads/editThread`, thread)

        if (response.errors) {
            handleErrors(response.errors, errorSection)
            editThreadForm.appendChild(errorSection)
            return
        } else if(response.message == "Bad Request") {
            handleMessage(response.message, errorSection) 
            editThreadForm.appendChild(errorSection)
            return
        } else if(response.message == "Auth Failed!") {
            handleMessage(response.message, errorSection) 
            editThreadForm.appendChild(errorSection)
            return
        } else {
            const uri = "/threads"
            newPage(uri)
        }
    })
})