// fetch('https://sozluk.gov.tr/atasozu')
//     .then(gelen=>gelen.json())  // json formatında almak istediğimiz için gelen veriyi json fonksiyonu ile jsona döndürüyoruz
//     .then(veri=>console.log(veri))

//Giriş ve çıkış için kullanacağımız HTML nesnelerini değişkenlere alalım
const sonuc = document.getElementById("sonuc");
const aramaKutusu = document.getElementById("aramaKutusu");
const aramaListesi = document.getElementById("aramaListesi");

// JSON kaynağından aldığımız verileri sayfada tutmak için dizi değişkenleri oluşturalım.
const anahtarKelimeler = [];
const deyimlerSozler = [];

verileriYukle();

async function verileriYukle() {
    const sunucuYaniti = await fetch('https://sozluk.gov.tr/atasozu');
    let veriler = await sunucuYaniti.json(); // veri kaynağına bağlandık


    veriler.forEach(eleman => {
        anahtarKelimeler.push(eleman.anahtar);
        deyimlerSozler.push(eleman.sozum);
    });

    const birlesmisKelimeler = [...new Set(anahtarKelimeler)];

    birlesmisKelimeler.sort(() => Math.random() - 0.5); // kelimelerin yerini değiştirmesi için
    let sayac = 0;
    birlesmisKelimeler.forEach(kelime => {
        if (sayac < 5) {  // sadece 5 öneri sunulsun
            const yeniOneri = document.createElement("option");
            aramaListesi.appendChild(yeniOneri);  // datalist içerisine option adında elementler açıp bunların içerisine önerileri yazacağız
            yeniOneri.value = kelime;
        }
        sayac++;
    });
}

aramaKutusu.addEventListener("input", (e) => sonuclariFiltrele(e.target.value));

function sonuclariFiltrele(arananKelime) {
    sonuc.innerHTML = "";
    const aramaKriteri = new RegExp(arananKelime, "gi");
    let eslesenler = deyimlerSozler.filter(soz => aramaKriteri.test(soz));

    if (arananKelime.length < 3) {  // aranan kelimenin uzunluğu 3ten kısaysa eşleşenler dizisini boş yap
        eslesenler = [];
    } else {
        eslesenler.forEach(es => {  // eşleşen kelimeleri yukarıya ul içerisine li'ler şeklinde bastıracak
            const siradakiSonuc = document.createElement("li");
            sonuc.appendChild(siradakiSonuc);
            siradakiSonuc.innerHTML = es;
        });
    }
}