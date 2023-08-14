
const buttons = document.querySelectorAll(".btn")

buttons.forEach(button => {
    const content = document.querySelector(button.dataset.target) // hangi eleman seçileceğini butonun target'ından alacağız 

    button.innerText = button.dataset.hide

    button.addEventListener("click", () => {
        // --- 1. yöntem ---

        if (content.style.display === "" || content.style.display === "block") {

            content.style.display ="none"

            //butonun text'ini göster olarak ayarlayacağız
            button.innerText = button.dataset.show
        } else {
            content.style.display = "block"

            //butonun text'ini gizle olarak ayarlayacağız
            button.innerText = button.dataset.hide
        }

        // 2. yöntem
        if(content.classList.contains("hide")){
            button.innerText=button.dataset.hide
            content.classList.remove("hide")
        }else{
            cutton.innerText=button.dataset.show
            content.classList.add("hide")
        }

       
    })
})