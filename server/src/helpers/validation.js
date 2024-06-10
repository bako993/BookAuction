export function validateInputs(password, email) {
    if (password.length <8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/\d/.test(password)) {
        return 'Password must contain at least one number';
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        return 'Email is invalid';
    }
    return null;
}


