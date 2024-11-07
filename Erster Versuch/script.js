function handleFormSubmit(event) {
    event.preventDefault();

    // Eingabedaten abrufen
    const customerName = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const priority = document.getElementById('priority').value;
    const service = document.getElementById('service').value;

    // Berechnung des Abholdatums
    const pickupDate = calculatePickupDate(priority);

    // Validierung und Senden der Daten an den Server
    if (validateEmail(email) && validatePhone(phone)) {
        const data = {
            customerName,
            email,
            phone,
            priority,
            service,
            pickupDate,
            submissionDate: new Date().toISOString().split('T')[0]
        };

        // Server-Aufruf mit angepasstem API-Endpunkt
        fetch('http://localhost:5000/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('confirmationMessage').textContent = 
                    `Vielen Dank, ${customerName}! Ihr Serviceauftrag wurde erfolgreich eingereicht. Abholdatum: ${pickupDate}`;
            } else {
                document.getElementById('confirmationMessage').textContent = 
                    'Fehler beim Absenden. Bitte versuchen Sie es erneut.';
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Bitte überprüfen Sie Ihre Eingaben.');
    }
}
