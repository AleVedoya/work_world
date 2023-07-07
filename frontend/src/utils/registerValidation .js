const isValidEmail = (email) => {
    // Implement your email validation logic here
    // You can use regular expressions or a library like "email-validator"

    // Example regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


export default function validateRegistration(
    firstname,
    lastname,
    email,
    password,
    confirmPassword
) {
    const errors = {};

    if (firstname.trim().length < 3) {
        errors.firstname = "El nombre cebe contener al menos 3 caracteres.";
    }

    if (lastname.trim().length  < 3) {
        errors.lastname = "El apellido debe contener al menos 3 caracteres.";
    }

    if (!isValidEmail(email)) {
        errors.email = "Formato de correo invalido.";
    }

    if (password.length < 6) {
        errors.password = "La contraseña debe tener un minimo 6 caracteres.";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    return errors;
}