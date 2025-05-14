let currentAudio = null;
let currentButton = null;

document.querySelectorAll('.deck-button').forEach(button => {
    const img = button.dataset.image;
    if (img) {
        button.style.backgroundImage = `url(${img})`;
    }
  button.addEventListener('click', () => {
    const soundFile = button.dataset.sound;

    // Si ya hay un sonido sonando
    if (currentAudio) {
      // Si es el mismo botón, detener
      if (currentButton === button) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentButton.classList.remove('active');
        currentAudio = null;
        currentButton = null;
        return;
      } else {
        // Botón diferente, detener sonido anterior
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentButton.classList.remove('active');
      }
    }

    // Reproducir nuevo sonido
    const newAudio = new Audio(soundFile);
    newAudio.play().catch(err => {
      console.error("Error al reproducir sonido:", err);
    });

    // Activar visual del botón
    button.classList.add('active');

    // Remover clase active cuando el sonido termine solo
    newAudio.addEventListener('ended', () => {
      button.classList.remove('active');
      if (currentButton === button) {
        currentAudio = null;
        currentButton = null;
      }
    });

    // Guardar referencia
    currentAudio = newAudio;
    currentButton = button;
  });
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("Error al registrar Service Worker", err));
}
  