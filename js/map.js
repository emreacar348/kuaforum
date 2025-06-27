// map.js

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([41.0082, 28.9784], 10); // İstanbul merkezli

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Örnek kuaför verilerini yükle
    fetch('assets/data/hairdressers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(hairdresser => {
                L.marker([hairdresser.lat, hairdresser.lng]).addTo(map)
                    .bindPopup(`<b>${hairdresser.name}</b><br>${hairdresser.city}<br>Puan: ${hairdresser.rating}/5`)
                    .openPopup();
            });
        })
        .catch(error => console.error('Error loading hairdresser data:', error));
});
