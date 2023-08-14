const redInput = document.getElementById('red')
const greenInput = document.getElementById('green')
const blueInput = document.getElementById('blue')
const alphaInput = document.getElementById('alpha')

const inputs = document.querySelectorAll('input[type="range"]')
inputs.forEach(input => {
    input.nextElementSibling.innerText = input.value  // başlangıçtaki değeri  gelir

    input.addEventListener('input', () => {
        localStorage.setItem(input.id,input.value)
        input.nextElementSibling.innerText = input.value  // input range ile oynayınca değerleri spanlara yazdırmak için
        changeBodyColor()
    })
})

function changeBodyColor() {
    document.body.style.backgroundColor = `rgba(${redInput.value},${greenInput.value},${blueInput.value},${alphaInput.value})`
}

changeBodyColor()

