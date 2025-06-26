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
