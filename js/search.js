document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([41.0082, 28.9784], 12); // İstanbul koordinatları

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let allHairdressers = [];
    let markers = L.featureGroup().addTo(map);

    const districtFilter = document.getElementById('district');
    const serviceFilter = document.getElementById('service');
    const ratingFilter = document.getElementById('rating');
    const ratingValueSpan = document.getElementById('rating-value');
    const filterButton = document.getElementById('filter-button');
    const clearFiltersButton = document.getElementById('clear-filters-button');
    const filteredHairdressersContainer = document.getElementById('filtered-hairdressers-container');

    // Puan aralığı değiştikçe değeri güncelle
    ratingFilter.addEventListener('input', () => {
        ratingValueSpan.textContent = `${ratingFilter.value} ve üzeri`;
    });

    // Kuaförleri yükle ve filtreleri doldur
    fetch('assets/data/hairdressers.json')
        .then(response => response.json())
        .then(data => {
            allHairdressers = data;
            displayHairdressers(allHairdressers);
            populateServiceFilter(allHairdressers);
        })
        .catch(error => console.error('Error loading hairdressers:', error));

    function displayHairdressers(hairdressers) {
        filteredHairdressersContainer.innerHTML = '';
        markers.clearLayers();

        hairdressers.forEach(hairdresser => {
            // Kuaför kartını oluştur
            const stars = Array(5).fill('<i class="far fa-star text-kua-gold"></i>').map((star, index) => {
                return index < Math.floor(hairdresser.rating) ? '<i class="fas fa-star text-kua-gold"></i>' : star;
            }).join('');

            const priceRange = hairdresser.services && hairdresser.services.length > 0 
                               ? `Fiyat: ${hairdresser.services[0].price.split(' ')[0]} TL'den başlayan` 
                               : 'Fiyat bilgisi yok';

            const card = `
                <a href="salon.html?id=${hairdresser.id}" class="block bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <img src="${hairdresser.image}" alt="${hairdresser.name}" class="w-full h-48 object-cover object-center">
                    <div class="p-5">
                        <h3 class="text-2xl font-bold text-kua-lacivert mb-2 font-lora">${hairdresser.name}</h3>
                        <p class="text-gray-600 text-sm mb-3 flex items-center"><i class="fas fa-map-marker-alt text-kua-pembe mr-2"></i>${hairdresser.city}</p>
                        <p class="text-gray-700 text-sm mb-3">${hairdresser.description}</p>
                        <div class="flex items-center mb-4">
                            ${stars}
                            <span class="text-gray-500 text-sm ml-2">(${hairdresser.rating})</span>
                        </div>
                        <p class="text-kua-lacivert font-semibold mb-4">${priceRange}</p>
                        <button class="bg-kua-pembe text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-kua-lacivert transition duration-300 w-full flex items-center justify-center"><i class="far fa-calendar-alt mr-2"></i>Randevu Al</button>
                    </div>
                </a>
            `;
            filteredHairdressersContainer.innerHTML += card;

            // Harita işaretçisi ekle
            const marker = L.marker([hairdresser.lat, hairdresser.lng])
                .bindPopup(`<b>${hairdresser.name}</b><br>${hairdresser.city}<br><a href="salon.html?id=${hairdresser.id}">Detayları Gör</a>`);
            markers.addLayer(marker);
        });

        if (hairdressers.length > 0) {
            map.fitBounds(markers.getBounds());
        }
    }

    function populateServiceFilter(hairdressers) {
        const services = new Set();
        hairdressers.forEach(hairdresser => {
            if (hairdresser.services) {
                hairdresser.services.forEach(service => services.add(service.name));
            }
        });

        serviceFilter.innerHTML = '<option value="">Tümü</option>';
        Array.from(services).sort().forEach(service => {
            const option = document.createElement('option');
            option.value = service.toLowerCase().replace(/ /g, '-');
            option.textContent = service;
            serviceFilter.appendChild(option);
        });
    }

    function applyFilters() {
        const selectedDistrict = districtFilter.value;
        const selectedService = serviceFilter.value;
        const selectedRating = parseFloat(ratingFilter.value);

        const filtered = allHairdressers.filter(hairdresser => {
            const matchesDistrict = selectedDistrict === '' || hairdresser.city.toLowerCase().includes(selectedDistrict);
            const matchesService = selectedService === '' || 
                                   (hairdresser.services && hairdresser.services.some(s => s.name.toLowerCase().replace(/ /g, '-').includes(selectedService)));
            const matchesRating = hairdresser.rating >= selectedRating;

            return matchesDistrict && matchesService && matchesRating;
        });

        displayHairdressers(filtered);
    }

    function clearFilters() {
        districtFilter.value = '';
        serviceFilter.value = '';
        ratingFilter.value = '3';
        ratingValueSpan.textContent = '3 ve üzeri';
        displayHairdressers(allHairdressers);
    }

    filterButton.addEventListener('click', applyFilters);
    clearFiltersButton.addEventListener('click', clearFilters);

    // Harita üzerinde marker'a tıklanınca ilgili kuaförün detay sayfasına git
    markers.on('click', function(e) {
        if (e.layer && e.layer.options && e.layer.options.hairdresserId) {
            window.location.href = `salon.html?id=${e.layer.options.hairdresserId}`;
        }
    });
});
