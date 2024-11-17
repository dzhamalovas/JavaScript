document.addEventListener('DOMContentLoaded', () => {
  // Инициализация карты
  const map = L.map('map').setView([61.5240, 105.3188], 4);

  // Добавление слоя карты
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Города России с координатами и информацией
  const cities = [
      { name: "Москва", coords: [55.7558, 37.6173], info: "Столица России." },
      { name: "Санкт-Петербург", coords: [59.9343, 30.3351], info: "Культурная столица России." },
      { name: "Новосибирск", coords: [55.0084, 82.9357], info: "Крупнейший город Сибири." },
      { name: "Екатеринбург", coords: [56.8389, 60.6057], info: "Столица Урала." },
      { name: "Казань", coords: [55.8304, 49.0661], info: "Столица Татарстана." },
      { name: "Владивосток", coords: [43.1198, 131.8869], info: "Крупнейший порт на Дальнем Востоке." },
      { name: "Сочи", coords: [43.5855, 39.7231], info: "Курортный город, место проведения Олимпиады 2014." },
      { name: "Нижний Новгород", coords: [56.3269, 44.0059], info: "Город на слиянии Волги и Оки." },
      { name: "Челябинск", coords: [55.1644, 61.4368], info: "Промышленный центр Южного Урала." },
      { name: "Красноярск", coords: [56.0095, 92.8526], info: "Город на реке Енисей, в Сибири." },
      { name: "Абакан", coords: [53.7170, 91.4297], info: "Столица Республики Хакасия." },
      { name: "Улан-Удэ", coords: [51.8357, 107.5847], info: "Столица Бурятии." },
      { name: "Чита", coords: [52.0357, 113.489], info: "Город в Забайкалье, на востоке России." },
  ];

  // Добавление маркеров городов России
  cities.forEach(city => {
      const marker = L.marker(city.coords).addTo(map);
      marker.bindPopup(`<b>${city.name}</b><br>${city.info}`);
  });

  // Хранение пользовательских маркеров для управления
  const userMarkers = [];

  // Обработка кликов на карту
  map.on('click', (e) => {
      // Проверяем, зажат ли Ctrl
      if (!e.originalEvent.ctrlKey) {
          alert('Чтобы добавить маркер, зажмите Ctrl.');
          return;
      }

      // Получаем координаты клика
      const { lat, lng } = e.latlng;

      // Просим пользователя ввести название и описание места
      const placeName = prompt("Введите название этого места:");
      const placeDescription = prompt("Введите описание этого места:");
      if (!placeName || !placeDescription) {
          alert('Название и описание обязательны для добавления маркера.');
          return;
      }

      // Создаем новый маркер
      const newMarker = L.marker([lat, lng]).addTo(map);
      newMarker.bindPopup(`<b>${placeName}</b><br>${placeDescription}`).openPopup();

      // Добавляем возможность удалить маркер
      newMarker.on('dblclick', () => {
          if (confirm(`Удалить маркер "${placeName}"?`)) {
              map.removeLayer(newMarker);
          }
      });

      // Сохраняем маркер в массив
      userMarkers.push(newMarker);
  });
});
