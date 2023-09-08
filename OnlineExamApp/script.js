let sunucudanDonen;

var baglanti=new XMLHttpRequest();
baglanti.onreadystatechange=function(){
    if(this.readyState==4 && this.status == 200){
        sunucudanDonen=JSON.parse(baglanti.responseText);
        soruGetir();
    }

    return sunucudanDonen;
};
baglanti.open("GET","data.json",true);
baglanti.send();

const sonucAlani=document.getElementById("soruAlani");
const soru=document.getElementById("soru");
const secenekler=document.getElementsByName("secenek");

const aciklamaA=document.getElementById("aciklamaA")
const aciklamaB=document.getElementById("aciklamaB")
const aciklamaC=document.getElementById("aciklamaC")
const aciklamaD=document.getElementById("aciklamaD")

const gonderButonu=document.getElementById("gonder");

let puan=0;
let sira=0;

function soruGetir(){
    secimiTemizle();
    console.log(sunucudanDonen);

    let siradakiSoru=sunucudanDonen.sorular[sira];

    soru.innerHTML=siradakiSoru.soru;
    aciklamaA.innerText=siradakiSoru.secenekA;
    aciklamaB.innerText=siradakiSoru.secenekB;
    aciklamaC.innerText=siradakiSoru.secenekC;
    aciklamaD.innerText=siradakiSoru.secenekD;
}

function secimiTemizle()
{
    secenekler.forEach(secenek => secenek.checked=false); // checkbox'lardan seçili olanın özelliğini false yap
}

function secimiAl(){
    let secim;

    secenekler.forEach(secenek => {
        if(secenek.checked==true) // hangi radio seçiliyse
        {
            secim=secenek.id;
        }        
    });
    return secim;
}

gonderButonu.addEventListener("click", ()=>{
    const secilen=secimiAl();
    console.log(secilen);

    if(secilen){ // işaretlenmiş cevap varsa
        if(secilen === sunucudanDonen.sorular[sira].cevap){  // seçilen cevap data.jsondaki sorular içerisinde yer alan cevaba eşitse
            puan++;
        }
    }
    sira++; // diğer soruya geçmek için

    if(sira < sunucudanDonen.sorular.length) // soru sayısı bitmediyse soru getirmeye devam et
    {
        soruGetir();
    }
    else{
        sonucAlani.innerHTML=`
            <h2 style="margin-top:50px; margin-bottom:50px;">Mevcut sorulardan ${puan}/${sunucudanDonen.sorular.length} oranında başarı sağladınız.</h2>
            `
        gonderButonu.setAttribute("onclick","location.reload()");
        gonderButonu.innerHTML=("Yeniden Başla");
    }
})