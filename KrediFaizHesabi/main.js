
function krediHesapla() {

    var cekilecekTutar, vadeSayisi;
    var aylikTaksit, odenecekToplamTutar;

    cekilecekTutar = document.getElementById("txtKrediTutari").value; // inputa girilen değeri al
    var liste = document.getElementById("listeVade");
    vadeSayisi = liste.options[liste.selectedIndex].value;  // listede seçili olanın value'sini al


    if (vadeSayisi == 12) { // vade sayısını 12 ay olarak seçmişse %10 faiz uygula
        odenecekToplamTutar = cekilecekTutar * 1.1;
    } else if (vadeSayisi == 24) {
        odenecekToplamTutar = cekilecekTutar * 1.2; // vade sayısını 24 ay olarak seçmişse %20 faiz uygula
    } else if (vadeSayisi == 36) {
        odenecekToplamTutar = cekilecekTutar * 1.3;
    } else if (vadeSayisi == 48) {
        odenecekToplamTutar = cekilecekTutar * 1.4;
    }

    aylikTaksit = odenecekToplamTutar / vadeSayisi;

    document.querySelector("#sonuc").innerHTML = "Geri ödeme toplamı: " + odenecekToplamTutar 
    + "<br>" + "Aylık taksit tutarınız: " + aylikTaksit.toFixed(2); // toFixed(2) virgülden sonra 2 basamak olması için
}