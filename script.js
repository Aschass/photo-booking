const startSelect = document.getElementById('start');
const endSelect = document.getElementById('end');

// Генерация времени с шагом 30 минут
function generateTimeOptions() {
  const times = [];
  for (let h = 9; h <= 19; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`);
    times.push(`${String(h).padStart(2, '0')}:30`);
  }
  times.push("20:00");
  return times;
}

function populateSelects() {
  const times = generateTimeOptions();
  times.forEach(time => {
    const optionStart = document.createElement('option');
    optionStart.value = time;
    optionStart.textContent = time;
    startSelect.appendChild(optionStart);

    const optionEnd = document.createElement('option');
    optionEnd.value = time;
    optionEnd.textContent = time;
    endSelect.appendChild(optionEnd);
  });
}

populateSelects();

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    start: document.getElementById('start').value,
    end: document.getElementById('end').value
  };

  fetch('https://script.google.com/macros/s/AKfycbzkmXgEdvCtYSN35jQ4puIa1mByM-CA8_R9ZYNrb1w25BDcneuc5h-DB70NOEuKuyli/exec', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    alert('Бронирование отправлено!');
    document.getElementById('bookingForm').reset();
  })
  .catch(error => {
    alert('Ошибка при отправке: ' + error);
  });
});