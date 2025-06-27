<<<<<<< HEAD
import { db } from './firebase.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    const appointmentForm = document.getElementById('appointment-form');
    const hairdresserSelect = document.getElementById('hairdresser');
    const appointmentsList = document.getElementById('appointments-list');
    const dateInput = document.getElementById('date');

    // Initialize Flatpickr
    flatpickr(dateInput, {
        dateFormat: "Y-m-d",
        minDate: "today"
    });

    // Load hairdressers from JSON
    try {
        const response = await fetch('assets/data/hairdressers.json');
        const hairdressers = await response.json();
        hairdressers.forEach(hairdresser => {
            const option = document.createElement('option');
            option.value = hairdresser.name;
            option.textContent = hairdresser.name;
            hairdresserSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading hairdressers:', error);
    }

    // Handle form submission
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newAppointment = {
            hairdresser: hairdresserSelect.value,
            service: document.getElementById('service').value,
            date: dateInput.value,
            time: document.getElementById('time').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            timestamp: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, "appointments"), newAppointment);
            console.log("Document written with ID: ", docRef.id);
            alert('Randevunuz başarıyla oluşturuldu!');
            appointmentForm.reset();
            displayAppointments(); // Refresh the list
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Randevu oluşturulurken bir hata oluştu.');
        }
    });

    // Display existing appointments
    async function displayAppointments() {
        appointmentsList.innerHTML = ''; // Clear current list
        try {
            const querySnapshot = await getDocs(collection(db, "appointments"));
            if (querySnapshot.empty) {
                appointmentsList.innerHTML = '<p class="text-center text-gray-600">Henüz randevu bulunmamaktadır.</p>';
                return;
            }
            querySnapshot.forEach((doc) => {
                const appointment = doc.data();
                const appointmentCard = `
                    <div class="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 class="text-xl font-bold text-kua-lacivert mb-2">${appointment.hairdresser} - ${appointment.service}</h3>
                        <p class="text-gray-700"><strong>Tarih:</strong> ${appointment.date}</p>
                        <p class="text-gray-700"><strong>Saat:</strong> ${appointment.time}</p>
                        <p class="text-gray-700"><strong>Müşteri:</strong> ${appointment.name}</p>
                        <p class="text-gray-700"><strong>Telefon:</strong> ${appointment.phone}</p>
                    </div>
                `;
                appointmentsList.innerHTML += appointmentCard;
            });
        } catch (error) {
            console.error("Error getting documents: ", error);
            appointmentsList.innerHTML = '<p class="text-center text-red-500">Randevular yüklenirken bir hata oluştu.</p>';
        }
    }

    displayAppointments(); // Initial load of appointments
});
=======
// appointment.js

document.addEventListener('DOMContentLoaded', () => {
    const hairdresserSelect = document.getElementById('hairdresser-select');
    const datePicker = document.getElementById('date-picker');
    const timePicker = document.getElementById('time-picker');
    const appointmentForm = document.querySelector('form');

    // Kuaförleri yükle
    fetch('assets/data/hairdressers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(hairdresser => {
                const option = document.createElement('option');
                option.value = hairdresser.id;
                option.textContent = hairdresser.name;
                hairdresserSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading hairdressers for appointment:', error));

    // Flatpickr başlatma (appointment.html içinde zaten var, burada sadece JS tarafında referans)
    // flatpickr(datePicker, {
    //     dateFormat: "Y-m-d",
    //     minDate: "today"
    // });

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedHairdresser = hairdresserSelect.options[hairdresserSelect.selectedIndex].text;
        const selectedService = document.getElementById('service-select').value;
        const selectedDate = datePicker.value;
        const selectedTime = timePicker.value;

        if (selectedHairdresser && selectedService && selectedDate && selectedTime) {
            alert(`Randevunuz başarıyla oluşturuldu!
Kuaför: ${selectedHairdresser}
Hizmet: ${selectedService}
Tarih: ${selectedDate}
Saat: ${selectedTime}`);
            // Burada randevu verilerini bir API'ye gönderme veya başka bir işlem yapılabilir.
            appointmentForm.reset();
        } else {
            alert('Lütfen tüm alanları doldurunuz.');
        }
    });
});
>>>>>>> ae290d34293b7faed219a8f8667674a1fb67c144
