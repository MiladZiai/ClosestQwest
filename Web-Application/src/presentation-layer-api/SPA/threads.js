async function loadAllThreads() {
    const threadsDiv = document.getElementById("threadsDiv")
    const errorSection = document.getElementById("errorSection")
    errorSection.innerHTML = ""
    threadsDiv.innerText = ""

    try {
        const response = await Get("api/threads")
        if (response.errors) {
            handleErrors(response.errors, errorSection)
            threadsDiv.appendChild(errorSection)
            return
        }
        const threads = response.threads

        if(threads.length == 0) {
            const noThreadsExist = document.getElementById("noThreadsExist")
            noThreadsExist.style.visibility = "visible"
            threadsDiv.appendChild(errorSection)
            return
        }

        for (const thread of threads) {

            const threadH3 = document.createElement('h3')
            threadH3.innerText = thread.threadName

            threadsDiv.appendChild(threadH3)

            const user = localStorage.getItem("idToken")

            if(user == thread.threadOfAccount) {
                const editButton = document.createElement("button")
                editButton.innerText = "Edit Thread"

                editButton.addEventListener('click', (event) => {
                    event.preventDefault()
                    document.getElementById("editThreadNameInput").value = thread.threadName
                    const uri = `/edit-thread/${thread.threadId}`
                    newPage(uri)
                })

                const removeButton = document.createElement("button")
                removeButton.innerText = "Remove Thread"

                removeButton.addEventListener('click', async function(event) {
                    event.preventDefault()
                    const threadId = thread.threadId
                    const threadOfAccount = thread.threadOfAccount

                    const threadToDelete = {
                        threadId,
                        threadOfAccount
                    }

                    try {
                        const response = await Delete(`api/threads/delete`, threadToDelete)

                        if (response.errors) {
                            handleErrors(response.errors, errorSection)
                            threadsDiv.appendChild(errorSection)
                        } else if(response.message == "Bad Request") {
                            handleMessage(response.message, errorSection) 
                            threadsDiv.appendChild(errorSection)
                            return
                        } else if(response.message == "Auth Failed!") {
                            handleMessage(response.message, errorSection) 
                            threadsDiv.appendChild(errorSection)
                            return
                        } else {
                            threadsDiv.removeChild(threadH3)
                        }
                    } catch (error) {
                        handleMessage(error, errorSection)
                        threadsDiv.appendChild(errorSection)
                    }
                    loadAllThreads()
                })

                threadsDiv.appendChild(editButton)
                threadsDiv.appendChild(removeButton)
            }
        }
    } catch (error) {
        handleErrors(error, errorSection)
        threadsDiv.appendChild(errorSection)
    }
    threadsDiv.appendChild(errorSection)

}