// Gestion du menu burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Gestion du formulaire de contact s'il existe
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputs = contactForm.querySelectorAll('input, textarea');
        let valid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.border = '2px solid red';
                valid = false;
            } else {
                input.style.border = '';
            }
        });

        if (!valid) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        const confirmation = document.createElement('p');
        confirmation.textContent = 'Merci, votre message a bien été envoyé !';
        confirmation.style.color = 'green';
        confirmation.style.marginTop = '15px';
        confirmation.style.fontWeight = 'bold';

        contactForm.appendChild(confirmation);
        contactForm.reset();

        setTimeout(() => {
            confirmation.remove();
        }, 5000);
    });
}