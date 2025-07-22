
function calcolaNutrientiSettimanali() {
  const preferenze = JSON.parse(localStorage.getItem("preferenze")) || {};
  const datiUtente = JSON.parse(localStorage.getItem("datiUtente")) || {};

  if (!preferenze || !datiUtente) {
    alert("Dati mancanti. Torna alla homepage.");
    return;
  }

  let nutrientiTotali = {
    kcal: 0, carboidrati: 0, proteine: 0, grassi: 0,
    vitaminaA: 0, vitaminaC: 0, vitaminaD: 0, vitaminaE: 0, vitaminaK: 0,
    vitaminaB1: 0, vitaminaB2: 0, vitaminaB3: 0, vitaminaB5: 0,
    vitaminaB6: 0, vitaminaB9: 0, vitaminaB12: 0,
    calcio: 0, ferro: 0, magnesio: 0, fosforo: 0,
    potassio: 0, sodio: 0, zinco: 0, rame: 0, manganese: 0
  };

  const database = typeof alimentiDB !== "undefined" ? alimentiDB : [];

  // Simuliamo 3 alimenti per ogni giorno (1 colazione, 1 pranzo, 1 cena)
  for (let giorno = 0; giorno < 7; giorno++) {
    const alimentiGiornalieri = [
      preferenze.frutta?.[giorno % preferenze.frutta.length],
      preferenze.verdura?.[giorno % preferenze.verdura.length],
      preferenze.cereali?.[giorno % preferenze.cereali.length]
    ];

    for (const alimento of alimentiGiornalieri) {
      const alimentoDB = database.find(a => a.nome.toLowerCase() === alimento?.toLowerCase());
      if (alimentoDB) {
        for (let chiave in nutrientiTotali) {
          nutrientiTotali[chiave] += alimentoDB[chiave] || 0;
        }
      }
    }
  }

  localStorage.setItem("nutrientiTotaliSettimanali", JSON.stringify(nutrientiTotali));
  return nutrientiTotali;
}

function mostraRiepilogo() {
  const dati = calcolaNutrientiSettimanali();
  if (!dati) return;

  const contenitore = document.getElementById("contenutoRiepilogo");
  contenitore.innerHTML = "<h2>Nutrienti settimanali stimati</h2><table>";

  for (const [chiave, valore] of Object.entries(dati)) {
    contenitore.innerHTML += `<tr><td>${chiave}</td><td>${valore.toFixed(2)}</td></tr>`;
  }

  contenitore.innerHTML += "</table>";
}

window.onload = mostraRiepilogo;
