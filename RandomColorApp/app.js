const button = document.getElementById("generate-color-btn")

const colors = ["red", "blue", "yellow", "green", "purple", "pink", "orange"]

function generateRandomNumber(maxNumber){
    return Math.floor(
        Math.random() * (maxNumber +1)
    )
}

const generateRGBColor=()=>{
    return[
        generateRandomNumber(255),
        generateRandomNumber(255),
        generateRandomNumber(255),
    ].join(', ')
}

button.addEventListener("click", () => {

    // document.body.style.backgroundColor=colors[6] // arkaplanı turuncu yapacak
    // --- 1. YÖNTEM ---
    // const randomNumber=Math.floor(
    //     Math.random() * colors.length
    // )
    // document.body.style.backgroundColor=colors[randomNumber] // randomnumber değişkeninden gelen değere göre colors içerisindeki renk sayesinde arkaplan rengi değişir

    // --- 2. YÖNTEM --- rgb ile
    // const randomNumber = generateRandomNumber(255)
    // const randomNumber2 = generateRandomNumber(255)
    // const randomNumber3 = generateRandomNumber(255)

    // document.body.style.backgroundColor = `rgb(${randomNumber},${randomNumber2},${randomNumber3})`

    document.body.style.backgroundColor=`rgb(${generateRGBColor()})`



})