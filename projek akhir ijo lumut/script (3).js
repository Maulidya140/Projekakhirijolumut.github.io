document.addEventListener("DOMContentLoaded", function() {
  const wordCells = document.querySelectorAll(".word-cell");
  let score = 0;

  wordCells.forEach(cell => {
      cell.addEventListener("click", function() {
          if (!this.hasAttribute('data-active') || this.getAttribute('data-active') !== 'false') {
              // Toggle class 'active' untuk mengubah warna latar belakang
              this.classList.toggle("active");

              // Cek jika sel aktif adalah konsonan
              if (!isVowel(this.innerText)) {
                  if (!this.classList.contains('active')) {
                      score -= 20; // Kurangi 20 poin jika konsonan tidak lagi aktif
                  } else {
                      score += 20; // Tambah 20 poin jika konsonan diaktifkan
                  }
                  document.getElementById('score').innerText = score;
              }
          }
      });
  });

  // Fungsi untuk memeriksa apakah huruf adalah konsonan
  function isVowel(letter) {
      return ['Harimau', 'Ular', 'Tikus', 'Kelinci', 'Kuda'].indexOf(letter.toUpperCase()) !== -1;
  }
});


 //petunjukkesimpulan
 function petunjukkesimpulan() {
  var x = document.getElementsByClassName("dalamkesim");
  if (x[0].style.display === "none") {
    x[0].style.display = "block";
  } else {
    x[0].style.display = "none";
  }
}
