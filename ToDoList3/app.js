var girilen, secilen;
var eklenen, btnTamamla, btnSil, sonuc;

function listeyeEkle(){
    girilen=document.getElementById("txtYapilacaklar").value; // inputa girilen deger

    if(girilen!=""){  // inputa girilen deger bos string degilse
        eklenen=document.createElement("li");
        document.getElementById("listeYapilacaklar").appendChild(eklenen);
        eklenen.innerHTML=girilen;

        btnTamamla=document.createElement("img");  // tamamla butonu icin img tagi olustur
        eklenen.appendChild(btnTamamla);  // eklenen metinin yanina olusturulan btnTamamla butonunu ekle
        btnTamamla.setAttribute("src","images/tamam.png");  // yaratilan img tagina src yani dosya yolunu verdik
        btnTamamla.setAttribute("id","resimTamamla");  // img tagina id verdik
        
        //btnTamamla.setAttribute("onclick","tamamla();");   // veya
        btnTamamla.addEventListener("click",tamamla);  // btnTamamla butonuna basilinca tamamla adli fonksiyonu calistir

        btnSil=document.createElement("img");
        eklenen.appendChild(btnSil);
        btnSil.setAttribute("src","images/sil.png");  // yaratilan img tagina src yani dosya yolunu verdik
        btnSil.setAttribute("id","resimSil");  // img tagina id verdik

        btnSil.addEventListener("click",sil);  // sil butonuna tiklandiginda sil fonk calissin
    }

    else{
        alert("Metin kutusu boş bırakılamaz!");
    }
}

function sil(){
    secilen=event.currentTarget.parentNode;  // hangisinin sil butonuna tiklandiysa onun bir ust ebeveynini kaldir
    secilen.remove();
    document.getElementById("sonuc").innerHTML="Seçiminiz silindi!";
}

function tamamla(){
    eklenen=document.createElement("li");
    document.getElementById("listeTamamlananlar").appendChild(eklenen);
    secilen=event.currentTarget.parentNode;
    secilen.childNodes[1].style.display="none";  // tamamlananlar kismina eklenirken sadece silme butonu olacagi icin onaylama butonunun gorunumunu kaldiriyoruz
    secilen.childNodes[2].setAttribute("onclick","sil();");
    eklenen.innerHTML=secilen.innerHTML;

    sil();  // listedeki elemani tamamlananlar kismina ekledikten sonra yapilacaklar listesinden silmek icin
    document.getElementById("sonuc").innerHTML="Seçiminiz tamamlandı!";
}