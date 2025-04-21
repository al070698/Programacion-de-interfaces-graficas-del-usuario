const tipoTarjeta = document.querySelectorAll('input[name="tipo"]')
const boton = document.querySelector('#boton')
const numerotarjeta = document.querySelector('#numerotarjeta')
const fecha = document.querySelector('#fecha')
const titular = document.querySelector('#titular')
const cvc = document.querySelector('#cvc')
const contrasenia = document.querySelector('#contrasenia')
const talla = document.querySelector('#talla')
const comentarios = document.querySelector('#comentarios')

function miOyente(event){
    event.preventDefault();
    const numerotarjetaStr = numerotarjeta.value
    const fechaStr = fecha.value
    const titularStr = titular.value
    const cvcStr = cvc.value
    const contraseniaStr = contrasenia.value
    const tallaStr = talla.value
    const comentariosStr = comentarios.value

    const tbody = document.querySelector('tbody')

    let tipoTarjetaStr = "";
for (let i = 0; i < tipoTarjeta.length; i++) {
    if (tipoTarjeta[i].checked) {
        tipoTarjetaStr = tipoTarjeta[i].nextSibling.textContent.trim();
        break;
    }
}
    
    /*Primera forma
    const tdNombre = document.createElement('td')
    tdNombre.innerHTML = nombreStr

    const tdApellido = document.createElement('td')
    tdApellido.innerHTML = apellidoStr

    const tdId = document.createElement('td')
    tdId.innerHTML = idStr

    const tr = document.createElement('tr')
    tr.appendChild(tdId)
    tr.appendChild(tdNombre)
    tr.appendChild(tdApellido)

    tbody.appendChild(tr)*/

    //Segunda forma
    const codigoHTML = `
<tr>
    <td>${numerotarjetaStr}</td>
    <td>${fechaStr}</td>
    <td>${tipoTarjetaStr}</td>
    <td>${titularStr}</td>
    <td>${cvcStr}</td>
    <td>${contraseniaStr}</td>
    <td>${tallaStr}</td>
    <td>${comentariosStr}</td>
</tr>`;
   

    tbody.innerHTML = tbody.innerHTML + codigoHTML;
    
        // 2) Mostrar alerta al usuario
        alert('¡Tarjeta guardada correctamente!');
}

boton.addEventListener('click', miOyente)

// Scroll‑indicator
const scrollable = document.querySelector('.scrollable-table');
const thumb      = document.querySelector('.scroll-thumb');

function updateIndicator() {
  const totalWidth   = scrollable.scrollWidth;
  const visibleWidth = scrollable.clientWidth;
  const scrollLeft   = scrollable.scrollLeft;

  // ancho del thumb como proporción del área visible
  const thumbWidth  = (visibleWidth / totalWidth) * 100;
  // posición del thumb
  const thumbOffset = (scrollLeft / totalWidth) * 100;

  thumb.style.width = thumbWidth + '%';
  thumb.style.left  = thumbOffset + '%';
}

// actualizar en scroll y al cargar
scrollable.addEventListener('scroll', updateIndicator);
window.addEventListener('load', updateIndicator);

let isDrag    = false;
let dragStartX;
let scrollStart;

thumb.addEventListener('mousedown', e => {
  isDrag       = true;
  dragStartX   = e.pageX;
  scrollStart  = scrollable.scrollLeft;
  document.body.classList.add('no-select');
});
document.addEventListener('mousemove', e => {
  if (!isDrag) return;
  const dx           = e.pageX - dragStartX;
  const maxScroll    = scrollable.scrollWidth - scrollable.clientWidth;
  const trackWidth   = scrollable.clientWidth;
  // relación movimiento thumb ↔ scroll real
  const scrollDelta  = dx * (scrollable.scrollWidth / trackWidth);
  scrollable.scrollLeft = Math.min(Math.max(scrollStart + scrollDelta, 0), maxScroll);
});
document.addEventListener('mouseup', () => {
  if (isDrag) {
    isDrag = false;
    document.body.classList.remove('no-select');
  }
});

// lo mismo para touch
thumb.addEventListener('touchstart', e => {
  isDrag      = true;
  dragStartX  = e.touches[0].pageX;
  scrollStart = scrollable.scrollLeft;
});
document.addEventListener('touchmove', e => {
  if (!isDrag) return;
  const dx = e.touches[0].pageX - dragStartX;
  const maxScroll = scrollable.scrollWidth - scrollable.clientWidth;
  const trackWidth = scrollable.clientWidth;
  const scrollDelta = dx * (scrollable.scrollWidth / trackWidth);
  scrollable.scrollLeft = Math.min(Math.max(scrollStart + scrollDelta, 0), maxScroll);
});
document.addEventListener('touchend', () => { isDrag = false; });

// Seleccionamos el formulario
const form = document.querySelector('.tarjeta-form');

// Cuando se dispare el reset (pulsar "Cancelar"), mostramos alerta
form.addEventListener('reset', () => {
  alert('Operación cancelada');
});
