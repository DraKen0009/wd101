function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function clearLocalStorage() {
    localStorage.removeItem('users');
}

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.querySelector('#users-table tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 text-center">${user.fullName}</td>
            <td class="py-2 text-center">${user.email}</td>
            <td class="py-2 text-center">${user.password}</td>
            <td class="py-2 text-center">${user.dateOfBirth}</td>
            <td class="py-2 text-center">${user.termsChecked}</td>
        `;
        tableBody.appendChild(row);
    });
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dateOfBirth = document.getElementById('date_of_birth').value;
    const termsChecked = document.getElementById('terms').checked;

    const age = calculateAge(dateOfBirth);

    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55.');
        return;
    }

    if (!termsChecked) {
        alert('You must accept the Terms and Conditions.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ fullName, email,password, dateOfBirth,termsChecked });
    localStorage.setItem('users', JSON.stringify(users));

    displayUsers();

    this.reset();
});

clearLocalStorage(); // This will clear all the session data when webpage is first loaded
displayUsers();