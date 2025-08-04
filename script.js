document.getElementById('contact-form').addEventListener('submit', function(event){
    event.preventDefault();
    alert('Formulaire envoyé !');
});
// Gestion du menu burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputs = contactForm.querySelectorAll('input, textarea');
        let valid = true;

        // Validation simple : champs non vides
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.border = '2px solid red';
                valid = false;
            } else {
                input.style.border = '';
            }
        });

        // Si non valide, on arrête
        if (!valid) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // Affichage d'un message de confirmation
        const confirmation = document.createElement('p');
        confirmation.textContent = 'Merci, votre message a bien été envoyé !';
        confirmation.style.color = 'green';
        confirmation.style.marginTop = '15px';
        confirmation.style.fontWeight = 'bold';

        // Ajout du message dans le formulaire
        contactForm.appendChild(confirmation);

        // Réinitialisation du formulaire
        contactForm.reset();

        // Suppression du message après 5 secondes
        setTimeout(() => {
            confirmation.remove();
        }, 5000);
    });
}
