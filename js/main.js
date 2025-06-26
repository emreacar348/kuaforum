// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Load Navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;

            // Mobile menu toggle logic after navbar is loaded
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const navLinks = document.getElementById('nav-links');
            const authButtons = document.getElementById('auth-buttons');

            if (mobileMenuButton && navLinks && authButtons) {
                mobileMenuButton.addEventListener('click', () => {
                    navLinks.classList.toggle('hidden');
                    authButtons.classList.toggle('hidden');
                });
            }
        });

    // Load Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

    // Load Featured Hairdressers
    fetch('assets/data/hairdressers.json')
        .then(response => response.json())
        .then(data => {
            const featuredCardsContainer = document.getElementById('featured-cards');
            data.forEach(hairdresser => {
                const stars = Array(5).fill('<i class="far fa-star text-kua-gold"></i>').map((star, index) => {
                    return index < Math.floor(hairdresser.rating) ? '<i class="fas fa-star text-kua-gold"></i>' : star;
                }).join('');

                const card = `
                    <div class="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <img src="${hairdresser.image}" alt="${hairdresser.name}" class="w-full h-48 object-cover object-center">
                        <div class="p-5">
                            <h3 class="text-2xl font-bold text-kua-lacivert mb-2 font-lora">${hairdresser.name}</h3>
                            <p class="text-gray-600 text-sm mb-3 flex items-center"><i class="fas fa-map-marker-alt text-kua-pembe mr-2"></i>${hairdresser.city}</p>
                            <div class="flex items-center mb-4">
                                ${stars}
                                <span class="text-gray-500 text-sm ml-2">(${hairdresser.rating})</span>
                            </div>
                            <button class="bg-kua-pembe text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-kua-lacivert transition duration-300 w-full flex items-center justify-center"><i class="far fa-calendar-alt mr-2"></i>Randevu Al</button>
                        </div>
                    </div>
                `;
                featuredCardsContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error loading featured hairdressers:', error));
});
