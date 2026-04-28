const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateUI() {
    const isBN = document.getElementById('langSwitch').checked;
    const dateInput = document.getElementById('mainDateInput');
    const val = dateInput.value;
    
    if(!val) return;
    const d = new Date(val);

    // ১. বাংলা ফন্ট কন্ট্রোল
    if(isBN) document.documentElement.classList.add('lang-bn');
    else document.documentElement.classList.remove('lang-bn');

    // ২. তারিখের ফরম্যাট (01 Apr 2026) - সবসময় ইংলিশ ফন্ট
    const day = d.getDate();
    const dayStr = day < 10 ? '0' + day : day;
    const formattedDate = `${dayStr} ${enMonths[d.getMonth()]} ${d.getFullYear()}`;
    
    document.getElementById('topBarDate').innerText = formattedDate;
    document.getElementById('formattedDisplay').innerText = "Selected: " + formattedDate;

    // ৩. সাপ্তাহিক দিন (সবসময় ইংলিশ ফন্ট)
    document.getElementById('displayDay').value = enDays[d.getDay()];

    // ৪. শুক্রবার চেক
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

    // ৫. ট্রান্সলেশন (শুধু লেবেল ও বাটন)
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        if(el.children.length === 0) el.innerText = text;
        else {
            el.childNodes.forEach(n => { if(n.nodeType === 3 && n.textContent.trim()) n.textContent = text; });
        }
    });

    // ডাটা সেভ রাখা (Persistence)
    saveCurrentData();
}

function saveCurrentData() {
    localStorage.setItem('ynad_lang', document.getElementById('langSwitch').checked ? 'bn' : 'en');
    localStorage.setItem('ynad_date', document.getElementById('mainDateInput').value);
    localStorage.setItem('ynad_details', document.getElementById('workDetails').value);
    localStorage.setItem('ynad_remarks', document.getElementById('workRemarks').value);
}

function loadSavedData() {
    if(localStorage.getItem('ynad_lang') === 'bn') document.getElementById('langSwitch').checked = true;
    if(localStorage.getItem('ynad_date')) document.getElementById('mainDateInput').value = localStorage.getItem('ynad_date');
    if(localStorage.getItem('ynad_details')) document.getElementById('workDetails').value = localStorage.getItem('ynad_details');
    if(localStorage.getItem('ynad_remarks')) document.getElementById('workRemarks').value = localStorage.getItem('ynad_remarks');
}

function fullReset() {
    localStorage.clear();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('mainDateInput').value = today;
    document.getElementById('workDetails').value = '';
    document.getElementById('workRemarks').selectedIndex = 0;
    updateUI();
}

function showPage(id, el) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('mainDateInput');
    
    // ডিফল্ট আজকের তারিখ
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.max = today;

    loadSavedData();
    updateUI();

    dateInput.addEventListener('change', updateUI);
    document.getElementById('langSwitch').addEventListener('change', updateUI);
    document.getElementById('workDetails').addEventListener('input', saveCurrentData);
    document.getElementById('workRemarks').addEventListener('change', updateUI);
    document.getElementById('clearBtn').addEventListener('click', fullReset);
});
