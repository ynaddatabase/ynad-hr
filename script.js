const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ১. টপ বারের তারিখ ফিক্সড রাখার লজিক
function setTopBarFixedDate() {
    const d = new Date();
    const day = d.getDate();
    const formatted = `${day < 10 ? '0'+day : day} ${enMonths[d.getMonth()]} ${d.getFullYear()}`;
    document.getElementById('topBarDate').innerText = formatted;
}

// ২. UI আপডেট এবং ল্যাঙ্গুয়েজ সুইচিং
function updateUI() {
    const isBN = document.getElementById('langSwitch').checked;
    const dateInput = document.getElementById('mainDateInput');
    const val = dateInput.value;
    
    if(!val) return;
    const d = new Date(val);

    // ফন্ট সুইচিং
    if(isBN) document.documentElement.classList.add('lang-bn');
    else document.documentElement.classList.remove('lang-bn');

    // ক্যালেন্ডারের দিনের নাম (সবসময় ইংলিশ)
    document.getElementById('displayDay').value = enDays[d.getDay()];

    // শুক্রবার চেক
    const alertBox = document.getElementById('holidayAlert');
    if(enDays[d.getDay()] === "Friday") {
        dateInput.classList.add('holiday-red');
        document.getElementById('displayDay').classList.add('holiday-red');
        alertBox.style.display = 'block';
    } else {
        dateInput.classList.remove('holiday-red');
        document.getElementById('displayDay').classList.remove('holiday-red');
        alertBox.style.display = 'none';
    }

    // অনুবাদ প্রসেস
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        if(el.children.length === 0) el.innerText = text;
        else {
            el.childNodes.forEach(n => { if(n.nodeType === 3 && n.textContent.trim()) n.textContent = text; });
        }
    });

    // রিমার্কস ওপাসিটি
    const remarks = document.getElementById('workRemarks');
    remarks.style.opacity = remarks.value === "" ? "0.6" : "1";

    saveToStorage();
}

// ৩. নেভিগেশন লজিক
function showPage(pageId, element) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    element.classList.add('active');
}

// ৪. ডাটা সেভিং (Persistence)
function saveToStorage() {
    localStorage.setItem('ynad_lang', document.getElementById('langSwitch').checked ? 'bn' : 'en');
    localStorage.setItem('ynad_date', document.getElementById('mainDateInput').value);
    localStorage.setItem('ynad_details', document.getElementById('workDetails').value);
    localStorage.setItem('ynad_remarks', document.getElementById('workRemarks').value);
}

function loadFromStorage() {
    if(localStorage.getItem('ynad_lang') === 'bn') document.getElementById('langSwitch').checked = true;
    if(localStorage.getItem('ynad_date')) document.getElementById('mainDateInput').value = localStorage.getItem('ynad_date');
    if(localStorage.getItem('ynad_details')) document.getElementById('workDetails').value = localStorage.getItem('ynad_details');
    if(localStorage.getItem('ynad_remarks')) document.getElementById('workRemarks').value = localStorage.getItem('ynad_remarks');
}

// ৫. ইনিশিয়ালাইজেশন
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('mainDateInput');
    const today = new Date().toISOString().split('T')[0];
    
    setTopBarFixedDate(); // টপ বার ডেট ফিক্সড করা
    dateInput.value = today;
    dateInput.max = today;

    loadFromStorage();
    updateUI();

    // লিসেনারস
    dateInput.addEventListener('change', updateUI);
    document.getElementById('langSwitch').addEventListener('change', updateUI);
    document.getElementById('workDetails').addEventListener('input', saveToStorage);
    document.getElementById('workRemarks').addEventListener('change', updateUI);
    
    // ক্লিয়ার অল ট্রিগার (স্মুথ রিফ্রেশ)
    document.getElementById('clearBtnTrigger').addEventListener('click', () => {
        document.getElementById('workDetails').value = '';
        document.getElementById('workRemarks').selectedIndex = 0;
        document.getElementById('mainDateInput').value = today;
        localStorage.clear();
        updateUI();
    });
});
