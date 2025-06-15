document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for better performance
    const passwordInput = document.getElementById('passwordInput');
    const toggleBtn = document.getElementById('toggleVisibility');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const criteria = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        number: document.getElementById('number'),
        special: document.getElementById('special')
    };

    let isVisible = false;

    // Toggle password visibility
    toggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        passwordInput.type = isVisible ? 'text' : 'password';
        toggleBtn.textContent = isVisible ? '🙈' : '👁️';
    });

    // Password strength evaluation function
    function evaluateStrength(password) {
        let strength = 0;

        const checks = {
            hasMinLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        // Update criteria UI
        Object.keys(criteria).forEach(key => {
            criteria[key].classList.toggle('valid', checks[key]);
        });

        // Calculate strength score
        strength = Object.values(checks).filter(Boolean).length * 20;

        return { strength, checks };
    }

    // Update strength meter UI
    function updateUI(strength, password) {
        const colors = {
            default: 'var(--default)',
            weak: 'var(--weak)',
            medium: 'var(--medium)',
            strong: 'var(--strong)',
        };

        strengthBar.style.width = `${strength}%`;

        if (password.length === 0) {
            strengthBar.style.backgroundColor = colors.default;
            strengthText.textContent = 'Enter a password to check';
            strengthText.style.color = '#777';
        } else if (strength <= 40) {
            strengthBar.style.backgroundColor = colors.weak;
            strengthText.textContent = 'Weak Password';
            strengthText.style.color = colors.weak;
        } else if (strength <= 80) {
            strengthBar.style.backgroundColor = colors.medium;
            strengthText.textContent = 'Medium Strength';
            strengthText.style.color = colors.medium;
        } else {
            strengthBar.style.backgroundColor = colors.strong;
            strengthText.textContent = 'Strong Password!';
            strengthText.style.color = colors.strong;
        }
    }

    // Event listener for password input
    passwordInput.addEventListener('input', () => {
        const { strength } = evaluateStrength(passwordInput.value);
        updateUI(strength, passwordInput.value);
    });
});
