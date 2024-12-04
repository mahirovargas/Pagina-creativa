document.addEventListener('DOMContentLoaded', () => {
  const buttonsContainer = document.getElementById('color-buttons');
  const addColorButton = document.getElementById('add-color-btn');
  const newColorSelector = document.getElementById('new-color-selector');
  const resetButton = document.getElementById('reset-btn');
  const counters = {
    red: document.getElementById('count-red'),
    black: document.getElementById('count-black'),
    white: document.getElementById('count-white'),
  };

  // Evento para los botones de colores iniciales
  buttonsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('color-btn')) {
      const color = event.target.dataset.color;
      createColorCircle(color);
      updateCounter(color);
    }
  });

  //  aleatorio
  function createColorCircle(color) {
    const circle = document.createElement('div');
    circle.style.backgroundColor = color;
    circle.style.width = '50px';
    circle.style.height = '50px';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = `${Math.random() * 90}%`;
    circle.style.left = `${Math.random() * 90}%`;
    circle.classList.add('color-circle'); // Añadimos una clase para identificarlo
    circle.addEventListener('click', () => playSound(color));
    document.body.appendChild(circle);
  }

  // Actualizar el contador de color
  function updateCounter(color) {
    if (counters[color]) {
      counters[color].textContent = parseInt(counters[color].textContent) + 1;
    }
  }

  // Reproducir sonido
  function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
  }

  // Añadir nuevos colores desde el menú desplegable
  addColorButton.addEventListener('click', () => {
    const color = newColorSelector.value;
    if (!counters[color]) {
      addNewColor(color);
    }
  });

  // Función para añadir un nuevo botón y contador
  function addNewColor(color) {
    // botón
    const newButton = document.createElement('button');
    newButton.classList.add('color-btn', 'dynamic'); 
    newButton.dataset.color = color;
    newButton.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    buttonsContainer.appendChild(newButton);

    //  contador
    const newCounter = document.createElement('p');
    newCounter.innerHTML = `${color.charAt(0).toUpperCase() + color.slice(1)}: <span id="count-${color}">0</span>`;
    document.getElementById('color-counter').appendChild(newCounter);

    // Añadir al objeto de contadores
    counters[color] = document.getElementById(`count-${color}`);
  }

  // reiniciar 
  resetButton.addEventListener('click', () => {
    // Reiniciar contadores a 0
    Object.keys(counters).forEach(color => {
      counters[color].textContent = 0;
    });

    // Eliminar botones 
    const dynamicButtons = document.querySelectorAll('.color-btn.dynamic');
    dynamicButtons.forEach(button => button.remove());

    // Eliminar círculos 
    const dynamicCircles = document.querySelectorAll('.color-circle');
    dynamicCircles.forEach(circle => circle.remove());

    alert('¡La fiesta se ha reiniciado! 🎉');
  });
});
