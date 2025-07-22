
function salvaPreferenze() {
  const sesso = document.getElementById("sesso").value;
  const eta = parseInt(document.getElementById("eta").value);
  const altezza = parseInt(document.getElementById("altezza").value);
  const peso = parseInt(document.getElementById("peso").value);
  const attivita = document.getElementById("attivita").value;

  const preferenze = {
    frutta: Array.from(document.querySelectorAll('.frutta')).map(el => el.value),
    verdura: Array.from(document.querySelectorAll('.verdura')).map(el => el.value),
    cereali: Array.from(document.querySelectorAll('.cereali')).map(el => el.value),
    frutta_secca: Array.from(document.querySelectorAll('.frutta_secca')).map(el => el.value),
    carne: Array.from(document.querySelectorAll('.carne')).map(el => el.value),
    pesce: Array.from(document.querySelectorAll('.pesce')).map(el => el.value),
    uova_latticini: Array.from(document.querySelectorAll('.uova_latticini')).map(el => el.value)
  };

  const datiUtente = {
    sesso, eta, altezza, peso, attivita
  };

  localStorage.setItem("preferenze", JSON.stringify(preferenze));
  localStorage.setItem("datiUtente", JSON.stringify(datiUtente));

  window.location.href = "menu_settimanale.html";
}
