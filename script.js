// ১. ইউজার ডাটা (অফিস টাইপসহ)
const users = [
    { 
        id: 'admin', 
        pin: '1234', 
        name: 'Engr. Abdul Alim', 
        role: 'admin', 
        designation: 'Sr. Site Engineer',
        office: 'Dhaka Office',
        photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' 
    },
    { 
        id: '2511022', 
        pin: '5566', 
        name: 'Md. Abu Sayeed', 
        role: 'employee', 
        designation: 'Project Engineer',
        office: 'Field Office',
        photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png' 
    }
];

// ২. লগইন ফাংশন
function attemptLogin() {
    const idVal = document.getElementById('loginId').value;
    const pinVal = document.getElementById('loginPin').value;
    const errorMsg = document.getElementById('loginError');

    const user = users.find(u => u.id === idVal && u.pin === pinVal);

    if (user) {
        errorMsg.classList.add('hidden');
        showWelcomeSplash(user);
    } else {
        errorMsg.classList.remove('hidden');
    }
}

// ৩. স্প্ল্যাশ স্ক্রিন পপ-আপ
function showWelcomeSplash(user) {
    document.getElementById('welcomeName').innerText = user.name;
    document.getElementById('welcomeID').innerText = `ID: ${user.id}`;
    document.getElementById('welcomePhoto').src = user.photo;
    
    const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();

    setTimeout(() => {
        welcomeModal.hide();
        document.getElementById('loginOverlay').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        setupDashboard(user);
    }, 3000);
}

// ৪. ড্যাশবোর্ড হেডার ও ইন্টারফেস সেটআপ
function setupDashboard(user) {
    // হেডার ইনফো
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userDesig').innerText = user.designation;
    document.getElementById('userID').innerText = user.id;
    document.getElementById('userPhoto').src = user.photo;
    
    // অফিস ট্যাগ ও টাইটেল
    document.getElementById('officeTag').innerText = user.office;
    document.getElementById('officeReportTitle').innerText = `- ${user.office} -`;

    // বর্তমান তারিখ
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('currentMonthDisplay').innerText = months[now.getMonth()];
    document.getElementById('currentYearDisplay').innerText = now.getFullYear();

    // রোল অনুযায়ী কন্টেন্ট (ভবিষ্যতের এন্ট্রি টেবিল এখানে আসবে)
    console.log(`${user.role} interface loaded.`);
}

function logout() {
    location.reload();
}
