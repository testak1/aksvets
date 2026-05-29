const QUOTE_EMAIL = "info@aktuning.se";

const form = document.querySelector("#quoteForm");
const statusEl = document.querySelector("#formStatus");

function value(data, key) {
  return data.get(key)?.toString().trim() || "-";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const selectedWork = data.getAll("arbete");

  if (selectedWork.length === 0) {
    statusEl.textContent = "Kryssa i minst en typ av arbete innan du skickar.";
    return;
  }

  const subject = `Offertförfrågan avgassystem: ${value(data, "marke")} ${value(data, "modell")} ${value(data, "arsmodell")}`;
  const body = [
    "Ny offertförfrågan från hemsidan",
    "",
    "Biluppgifter",
    `Märke: ${value(data, "marke")}`,
    `Modell: ${value(data, "modell")}`,
    `Årsmodell: ${value(data, "arsmodell")}`,
    `Motor: ${value(data, "motor")}`,
    `Registreringsnummer: ${value(data, "regnr")}`,
    `Växellåda: ${value(data, "vaxellada")}`,
    "",
    "Önskat arbete",
    selectedWork.map((item) => `- ${item}`).join("\n"),
    "",
    "Preferenser",
    `Önskad ljudnivå: ${value(data, "ljudniva")}`,
    `Önskad tidsram: ${value(data, "tidsram")}`,
    "",
    "Beskrivning",
    value(data, "beskrivning"),
    "",
    "Kontakt",
    `Namn: ${value(data, "namn")}`,
    `E-post: ${value(data, "epost")}`,
    `Telefon: ${value(data, "telefon")}`,
    `Ort: ${value(data, "ort")}`,
  ].join("\n");

  const mailtoUrl = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  statusEl.textContent = "Öppnar mailprogram med din offertförfrågan.";
  window.location.href = mailtoUrl;
});
