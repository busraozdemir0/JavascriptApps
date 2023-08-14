const word_el=document.getElementById("word");
const popup=document.getElementById("popup-container");
const message_el=document.getElementById("success-message");
const wrongLetters_el=document.getElementById("wrong-letters");
const items=document.querySelectorAll(".item");
const message2_el=document.getElementById("message");
const playAgainBtn=document.getElementById("play-again");

const correctLetters=[];
const wrongLetters=[];
let selectedWord=getRandomWord(); // rastgele gelen kelimeyi aldık(değiştirilebilir bir kelime olması için let ile tanımladık)

function getRandomWord() // her çağırdığımızda rastgele bir kelime üretecek
{
    const words=["javascrıpt","python","css","html","kalem","yazılım","klavye","kod"]
    return words[Math.floor(Math.random()*words.length)]
}


function displayWord()
{
    // üretilen elemanı index.html sayfasındaki classı word  olan div içerisine letter classlı olarak ekliyoruz
    word_el.innerHTML=`             
    ${selectedWord.split('').map(letter=>` 
        <div class="letter" >
           ${correctLetters.includes(letter) ? letter : ''}
        </div>
    `).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g,''); // kelimedeki harfleri yan yana yazması için
    if(w===selectedWord){
        popup.style.display="flex";  // oyundaki kelimeyi bilince popup gösterilecek
        message_el.innerText="Tebrikler kazandınız.";
    }

}

function updateWrongLetters() // Hatalı harfleri gösterecek
{
    // hatalı harflerin yazımı
    wrongLetters_el.innerHTML=`
        ${wrongLetters.length>0 ? '<h3>Hatalı harfler</h3>' : ''}
        ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;
    items.forEach((item,index)=> {
        const errorCount=wrongLetters.length;

        if(index<errorCount)  // her hatalı harfte asılı olacak adamın bi kısmı çıkacak
        {
            item.style.display='block';
        }
        else
        {
            item.style.display='none';
        }
    })

    if(wrongLetters.length===items.length) // yanlış harfler ile adamın gövdesi tamamlanmışsa oyunu kaybettiniz mesajı
    {
        popup.style.display="flex"; 
        message_el.innerText="Maalesef oyunu kaybettiniz.";
    }


}

function displayMessage()
{
    message2_el.classList.add("show");  // Eğer aynı harf tekrar girilmişse message id'sine sahip olan elemente show classını ekliyoruz. Bu classta bu harfi zaten eklediniz diyerek uyarı mesajı veriyor.

    setTimeout(function(){
        message2_el.classList.remove("show");  // 3 saniye sonra mesajın kaybolması için
    },3000);
}

playAgainBtn.addEventListener("click",function(){ // tekrar oyna butonuna basıldığında
    correctLetters.splice(0); // doğru harfler sıfırlansın
    wrongLetters.splice(0); // yanlış harfler sıfırlansın

    selectedWord=getRandomWord(); // seçilen kelimeye yeni kelime atansın

    displayWord(); // kelimeyi göster
    updateWrongLetters(); // yanlış harfleri güncelle(devamlı olarak)

    popup.style.display="none"; // popup mesajını başlangıçta none yap
});

window.addEventListener("keydown",function(e){
    if(e.keyCode>=65 && e.keyCode<=90)  // sadece harf içeren tuşlara basıldığını gösteren kontrol bloğu
    {
        const letter=e.key;

        if(selectedWord.includes(letter)) // girilen harf üretilen kelimede  var mı?
        {
            if(!correctLetters.includes(letter))  // doğru harflaeri içeren dizide yoksa o doğru harfi ekleyecek
            {
                correctLetters.push(letter);
                displayWord();
            }
            else{
                displayMessage(); // Harfi tekrar girdiğimize dair uyarı mesaj kutusu
            }
        }
        else{
            if(!wrongLetters.includes(letter))  // girilen yanlış harf; yanlış harfler dizisinde yoksa ekleyecek
            {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else{
                displayMessage();
            }
        }
    }
});


displayWord();