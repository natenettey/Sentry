let icon = document.getElementById("icon")
let links = document.getElementById("nav_elements__ul")
let mail_link = document.getElementById("mail")
let modalTextarea= document.getElementById("formModal_textarea")
let modalform=document.getElementById("form_modal")

const passInfo =  (id)=>{
    console.log(id)

   fetch('/files/getMail',{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({key:id})
    }).then(
        response=>{
            return response.json()
        }
    ).then(data=>{
        console.log(data)
        modalTextarea.value =`the pass is ${data.path.password}`
        modalform.classList.toggle('displayModal_class')
    })

}
icon.onclick = ()=>{
    links.classList.toggle('display_class')
}