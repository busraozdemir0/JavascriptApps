var liste, secenek;
var i;  // dongude kullanmak icin

//Listelerden secim yapilmasi olayini yakalayarak ilgili fonksiyonu çagirir
document.addEventListener("change", pizzaHesapla);  // belgede herhangi bir degisiklik oldugunda olay dinleyicisi ekle yani secenekler isaretlendikce devamli pizza fiyati hesaplansin 


function toggle() {
    liste = document.getElementsByName("grupIndirim"); // grupIndirim name'ine sahip taglerin icinde dolas (kod var, kod yok)
    for (i = 0; i < liste.length; i++) {
        if (liste[i].checked) {
            if (liste[i].value == "Aktif") {
                document.getElementById("txtIndirimKodu").disabled = false;  // Aktif olan yani kod var olan seciliyse inputun disabled özelligini false yap
            }
            else if (liste[i].value == "Pasif") {
                document.getElementById("txtIndirimKodu").value = " ";
                document.getElementById("txtIndirimKodu").disabled = true; // Pasif olan yani kod yok olan seciliyse inputun disabled özelligini true yap
            }
        }
    }
}

function pizzaHesapla() {
    var pizzaFiyati, girilenKod, malzeme;
    const indirimKodu = "PROMO";

    liste = document.getElementById("listePizza");
    secenek = liste[liste.selectedIndex];   // select kisminda secili olanin indexini al
    pizzaFiyati = Number(secenek.value);  // string olarak alacagi icin biz onu Number yapiyoruz.

    liste = document.getElementsByName("grupEkMalzeme");

    document.querySelectorAll("#listeEkSecimler option").forEach(option => option.remove()); // sectiginiz malzemeler kisminda ne varsa kaldir

    for (i = 0; i < liste.length; i++) {

        if (liste[i].checked) {  // listenin i. elemani seciliyse
            pizzaFiyati += 2;  // ek malzemenin bir tanesi 2 tl olarak hesaba yansitilacak
            malzeme = liste[i].value;  // ek malzemenin value degeri malzeme adli degiskene aktar

            secenek = document.createElement("option");
            document.getElementById("listeEkSecimler").options.add(secenek);
            secenek.text = malzeme;
        }
    }

    if (document.getElementById("kodTrue").checked) {  // eger indirim kodu var radioButton seciliyse bunlari calistir

        girilenKod = document.getElementById("txtIndirimKodu").value;  // inputa girilen indirim kodunu aliyoruz

        if (indirimKodu == girilenKod) {  // girilen indirim kodu PROMO ile belirtilen degiskene esitse hesaptan 5 cikar
            pizzaFiyati = pizzaFiyati - 5; // indirim kodu varsa hesaptan 5 cikarilacak
            document.getElementById("dogrula").innerHTML="";
        }
        else {  // eger indirim kodu yoksa 
            document.getElementById("dogrula").innerHTML="Lütfen geçerli bir kod giriniz!";  // indirim kodu girmemisse veya gecersiz ise bunu yazacak
        }
    }
    document.getElementById("sonuc").innerHTML = "Ödenecek tutar: " + pizzaFiyati;

}