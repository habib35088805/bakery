const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const yearNodes = document.querySelectorAll('#year');
const form = document.getElementById('order-form');
const formMessage = document.getElementById('form-message');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');
const authPill = document.getElementById('auth-pill');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

yearNodes.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const storedUser = localStorage.getItem('dadinKowaUser');
if (authPill && storedUser) {
  const user = JSON.parse(storedUser);
  authPill.textContent = `Welcome back, ${user.firstName}!`;
}

if (form && formMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = 'Thank you! We will be in touch about your order shortly.';
    form.reset();
  });
}

if (registerForm && registerMessage) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const user = {
      firstName: formData.get('firstName')?.toString().trim() || 'Guest',
      lastName: formData.get('lastName')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      password: formData.get('password')?.toString().trim() || ''
    };

    if (user.password.length !== 6 || !/^\d{6}$/.test(user.password)) {
      registerMessage.textContent = 'Please enter a valid 6-digit password.';
      return;
    }

    localStorage.setItem('dadinKowaUser', JSON.stringify(user));
    if (authPill) {
      authPill.textContent = `Welcome, ${user.firstName}!`;
    }
    registerMessage.textContent = `Welcome aboard, ${user.firstName}! You are now signed in.`;
    registerForm.reset();
  });
}
