const angka1 = document.getElementById("angka_1");
const operator = document.getElementById("operator");
const angka2 = document.getElementById("angka_2");
const hasil = document.getElementById("hasil");

const tombolOperator = {
  tombol_tambah: "+",
  tombol_kurang: "-",
  tombol_kali: "*",
  tombol_bagi: "/",
  tombol_pangkat: "power",
  tombol_kuadrat: "square",
  tombol_akar: "sqrt",
  tombol_akar_pangkat: "root",
};

Object.entries(tombolOperator).forEach(([id, operasi]) => {
  document.getElementById(id).addEventListener("click", () => {
    operator.value = operasi;
  });
});

document.getElementById("tombol_hasil").addEventListener("click", hitung);
[angka1, angka2].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") hitung();
  });
});

function hitung() {
  const nilai1 = Number(angka1.value);
  const nilai2 = Number(angka2.value);
  const operasi = operator.value;

  if (angka1.value.trim() === "" || !Number.isFinite(nilai1)) {
    tampilkan("Masukkan angka pertama yang valid.");
    return;
  }

  if (!operasi) {
    tampilkan("Pilih operator terlebih dahulu.");
    return;
  }

  const operasiSatuAngka = operasi === "square" || operasi === "sqrt";
  if (!operasiSatuAngka && (angka2.value.trim() === "" || !Number.isFinite(nilai2))) {
    tampilkan("Masukkan angka kedua yang valid.");
    return;
  }

  tampilkan(operasiMatematika(nilai1, nilai2, operasi));
}

function operasiMatematika(nilai1, nilai2, operasi) {
  switch (operasi) {
    case "+": return nilai1 + nilai2;
    case "-": return nilai1 - nilai2;
    case "*": return nilai1 * nilai2;
    case "/": return nilai2 === 0 ? "Tidak bisa dibagi nol." : nilai1 / nilai2;
    case "power": return nilai1 ** nilai2;
    case "square": return nilai1 ** 2;
    case "sqrt": return nilai1 < 0 ? "Akar bilangan negatif tidak real." : Math.sqrt(nilai1);
    case "root":
      if (nilai2 === 0) return "Pangkat akar tidak boleh nol.";
      if (nilai1 < 0 && nilai2 % 2 === 0) return "Hasil bukan bilangan real.";
      return Math.sign(nilai1) * Math.abs(nilai1) ** (1 / nilai2);
    default: return "Operator tidak valid.";
  }
}

function tampilkan(nilai) {
  hasil.textContent = `Hasil: ${nilai}`;
}
