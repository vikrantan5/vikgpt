let prompt = document.querySelector("#prompt")
let container = document.querySelector(".container")
let btn = document.querySelector("#btn")
let chatContainer = document.querySelector(".chat-container")
let userMessage = null;
let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBPzDoAqw1xNl2EtnmblRf5dbqZ_1XY2uU'


function createChatBox(html,className){
    let div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html
    return div
}
async function getApiResponse(aiChatBox){
 let textElement =    aiChatBox.querySelector(".text")
    try{
        let response =await fetch(Api_Url,{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                contents:[
                    {"role": "user",
                        "parts":[{"text":userMessage}]
                    }
                ]

            })
        })
        let data = await response.json()
        let apiResponse = data ?.candidates[0].content.parts[0].text;
        textElement.innerText= apiResponse

    }
    catch(error){
        console.log(error)

    }
    finally{
        aiChatBox.querySelector(".loading").style.display="none"
    }
}
function showLoading(){
    let html = ` <div class="img">
                <img src="ai.jpg" alt="" width="30px">
               
            </div>
            <p class="text"></p>
            <img class="loading" src="loading.gif" alt="loading" height="50">`
            let aiChatBox = createChatBox(html,"ai-chat-box")
            chatContainer.appendChild(aiChatBox)
            getApiResponse(aiChatBox)
}

btn.addEventListener("click",()=>{
    userMessage = prompt.value
    if(userMessage==""){
        container.style.display= "flex"
    }{
        container.style.display= "none"
    }
    if(!userMessage) return;
    let html =`<div class="img">
                <img src="user.png" alt="" width="30px">
              
            </div>
            <p class="text"> </p>`;
    let userChatBox = createChatBox(html,"user-chat-box")
    userChatBox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value=""
    setTimeout(showLoading,500)

})