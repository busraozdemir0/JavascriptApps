
function oyunuBaslat(secim){
    let kullaniciSecimi=secim.id;

    let rastgeleSayi=Math.floor(Math.random()*3);  // taş kağıt makas oyununda 3 farklı seçim olabildiğinden 3'e kadar random sayı üretebilir
    let bilgisayarSecimi=["tas","kagit","makas"][rastgeleSayi];

    let oyunPuanlamalari={
        "tas":{"makas":1,"tas":0.5, "kagit":0},  // taş seçtiğimizde karşısına makas çıkarsa 1 puan alarak oyunu kazanacak
        "kagit":{"tas":1,"kagit":0.5,"makas":0},
        "makas":{"kagit":1,"makas":0.5,"tas":0}
    };

    let kullaniciPuani=oyunPuanlamalari[kullaniciSecimi][bilgisayarSecimi];

    let kayitliResimler={
        "tas":document.getElementById("tas").src,
        "kagit":document.getElementById("kagit").src,
        "makas":document.getElementById("makas").src
    };

    document.getElementById("tas").remove();  // seçim yaptıktan sonra ekrandaki tüm resimler kaldırılsın
    document.getElementById("kagit").remove();
    document.getElementById("makas").remove();

    let kullaniciResmi=document.createElement("img");
    let bilgisayarResmi=document.createElement("img");
    let sonucMesaji=document.createElement("div");

    kullaniciResmi.src=kayitliResimler[kullaniciSecimi];
    bilgisayarResmi.src=kayitliResimler[bilgisayarSecimi];

    document.getElementById("container").appendChild(kullaniciResmi); // ekran silindikten sonra kullanıcının seçtiği resmi sol tarafa koysun
    document.getElementById("container").appendChild(sonucMesaji);
    document.getElementById("container").appendChild(bilgisayarResmi);

    sonucMesaji.classList.remove("basarili","basarisiz","berabere");

    if(kullaniciPuani===0){
        sonucMesaji.innerHTML="Maalesef kaybettiniz :(";
        sonucMesaji.classList.add("basarisiz");
    } else if(kullaniciPuani===0.5){
        sonucMesaji.innerHTML="Sonuç berabere";
        sonucMesaji.classList.add("berabere");
    } else{
        sonucMesaji.innerHTML="Tebrikler kazandınız. :)";
        sonucMesaji.classList.add("basarili");
    }
}