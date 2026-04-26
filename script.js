// এখনকার জন্য ডামি ডাটা (পরে ডাটাবেস থেকে আসবে)
const users = [
    { id: 'admin', pin: '1234', name: 'Administrator', role: 'admin' },
    { id: '2511022', pin: '5566', name: 'Md. Abu Sayeed', role: 'employee' },
    { id: '0101001', pin: '7788', name: 'Engr. Abdul Alim', role: 'employee' }
];

function attemptLogin() {
    const idInput = document.getElementById('loginId').value;
    const pinInput = document.getElementById('loginPin').value;
    const errorMsg = document.getElementById('loginError');

    const user = users.find(u => u.id === idInput && u.pin === pinInput);

    if (user) {
        errorMsg.classList.add('hidden');
        document.getElementById('loginOverlay').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        setupDashboard(user);
    } else {
        errorMsg.classList.remove('hidden');
    }
}

function setupDashboard(user) {
    document.getElementById('userWelcome').innerText = `Logged in as: ${user.name} (${user.id})`;
    document.getElementById('currentUserDisplay').value = user.name;

    if (user.role === 'admin') {
        // এডমিন যা যা দেখবে
        document.getElementById('adminAddBtn').classList.remove('hidden');
        document.getElementById('adminFilter').classList.remove('hidden');
        document.getElementById('userFilter').classList.add('hidden');
    } else {
        // সাধারণ এমপ্লয়ী যা দেখবে
        document.getElementById('adminAddBtn').classList.add('hidden');
        document.getElementById('adminFilter').classList.add('hidden');
        document.getElementById('userFilter').classList.remove('hidden');
    }
}

function logout() {
    location.reload(); // সিম্পল রিলোড দিয়ে লগআউট
}
