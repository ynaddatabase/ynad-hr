// ১. ইউজার ডাটাবেস (সংযোজিত ছবি এবং রোলসহ)
const users = [
    { id: 'admin', pin: '1234', name: 'Super Admin', role: 'admin', photo: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png' },
    { id: 'sup01', pin: '5555', name: 'Site Supervisor', role: 'supervisor', photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { id: '2511022', pin: '5566', name: 'Md. Abu Sayeed', role: 'employee', photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { id: '0101001', pin: '7788', name: 'Engr. Abdul Alim', role: 'employee', photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }
];

let loggedInUser = null;

// ২. লগইন প্রসেস এবং পপ-আপ লজিক
function attemptLogin() {
    const idVal = document.getElementById('loginId').value;
    const pinVal = document.getElementById('loginPin').value;
    const errorMsg = document.getElementById('loginError');

    const user = users.find(u => u.id === idVal && u.pin === pinVal);

    if (user) {
        loggedInUser = user;
        errorMsg.classList.add('hidden');

        // পপ-আপে ডাটা সেট করা
        document.getElementById('welcomeName').innerText = user.name;
        document.getElementById('welcomeID').innerText = `Staff ID: ${user.id}`;
        document.getElementById('welcomePhoto').src = user.photo;
        
        const badge = document.getElementById('roleBadge');
        badge.innerText = `${user.role.toUpperCase()} ACCESS`;
        if(user.role === 'admin') badge.className = "badge p-2 px-4 rounded-pill mb-4 bg-danger";
        else if(user.role === 'supervisor') badge.className = "badge p-2 px-4 rounded-pill mb-4 bg-warning text-dark";
        else badge.className = "badge p-2 px-4 rounded-pill mb-4 bg-success";

        // পপ-আপ দেখানো
        const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
        welcomeModal.show();

        // ৩ সেকেন্ড পর ড্যাশবোর্ড ওপেন
        setTimeout(() => {
            welcomeModal.hide();
            document.getElementById('loginOverlay').classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
            setupInterface(user);
        }, 3000);
    } else {
        errorMsg.classList.remove('hidden');
    }
}

// ৩. রোল ভিত্তিক ইন্টারফেস কন্ট্রোল
function setupInterface(user) {
    document.getElementById('userRoleHeader').innerText = `Portal: ${user.role} Control Panel`;
    
    const adminBtn = document.getElementById('adminAddBtn');
    const reportSection = document.getElementById('reportEntrySection');
    const empFilterDiv = document.getElementById('empFilterDiv');
    const empSelect = document.getElementById('empSelect');

    // ড্রপডাউন লোড করা
    loadDropdowns();

    if (user.role === 'admin') {
        // ADMIN: সব করতে পারবে
        adminBtn.classList.remove('hidden');
        reportSection.classList.remove('hidden');
        empFilterDiv.classList.remove('hidden');
    } 
    else if (user.role === 'supervisor') {
        // SUPERVISOR: শুধু ফিল্টার করে দেখবে, এন্ট্রি নেই
        adminBtn.classList.add('hidden');
        reportSection.classList.add('hidden');
        empFilterDiv.classList.remove('hidden'); // সবার রিপোর্ট দেখার ফিল্টার থাকবে
    } 
    else {
        // EMPLOYEE: শুধু নিজের এন্ট্রি এবং নিজের রিপোর্ট
        adminBtn.classList.add('hidden');
        reportSection.classList.remove('hidden');
        empFilterDiv.classList.add('hidden'); // অন্য কারো নাম দেখার ফিল্টার থাকবে না
        
        // এমপ্লয়ীর নাম ফর্মে লক করে রাখা
        empSelect.value = user.id;
        empSelect.disabled = true;
    }
}

// ৪. ড্রপডাউন জেনারেশন
function loadDropdowns() {
    const lists = users.filter(u => u.role === 'employee');
    const selects = [document.getElementById('empSelect'), document.getElementById('filterEmp')];
    
    selects.forEach(s => {
        if(!s) return;
        s.innerHTML = '<option value="">-- Choose Staff --</option>';
        lists.forEach(emp => {
            s.innerHTML += `<option value="${emp.id}">${emp.name} (${emp.id})</option>`;
        });
    });
}

// ৫. রিপোর্ট জেনারেশন (আপনার এক্সেল ফরম্যাটে)
function renderReport() {
    const monthVal = document.getElementById('filterMonth').value;
    if(!monthVal) { alert("Select Month First"); return; }

    const [year, month] = monthVal.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, month - 1, d);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const isHoliday = (dayName === 'Friday' || dayName === 'Saturday');

        const tr = document.createElement('tr');
        if(isHoliday) tr.className = 'holiday-row';
        
        tr.innerHTML = `
            <td>${d}-${month}-${year}</td>
            <td>${dayName}</td>
            <td class="text-start">---</td>
            <td>${isHoliday ? 'HOLIDAY' : '---'}</td>
        `;
        tbody.appendChild(tr);
    }
}

function logout() {
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('workDate').valueAsDate = new Date();
});
