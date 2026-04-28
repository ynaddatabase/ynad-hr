const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateUI() {
    const isBN = document.getElementById('langSwitch').checked;
    const dateInput = document.getElementById('mainDateInput');
    const val = dateInput.value;
    
    if(!val) return;
    const d = new Date(val);

    // ১. বাংলা ফন্ট সেটআপ
    if(isBN) document.documentElement.classList.add('lang-bn');
    else document.documentElement.classList.remove('lang-bn');

    // ২. সপক্ষের দিন ও টপবার তারিখ (সবসময় ইংলিশ)
    document.getElementById('displayDay').value = enDays[d.getDay()];
    
    const day = d.getDate();
    const formattedDate = `${day < 10 ? '0'+day : day} ${enMonths[d.getMonth()]} ${d.getFullYear()}`;
    document.getElementById('topBarDate').innerText = formattedDate;

    // ৩. শুক্রবার চেক
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

    // ৪. পেজ ট্রান্সলেশন (শুধু বাটন ও টাইটেল)
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        if(el.children.length === 0) el.innerText = text;
        else {
            el.childNodes.forEach(n => { if(n.nodeType === 3 && n.textContent.trim()) n.textContent = text; });
        }
    });

    localStorage.setItem('ynad_lang', isBN ? 'bn' : 'en');
}

function resetToCurrent() {
    const dateInput = document.getElementById('mainDateInput');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
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
    const langSwitch = document.getElementById('langSwitch');

    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.max = today;

    if(localStorage.getItem('ynad_lang') === 'bn') langSwitch.checked = true;

    updateUI();

    dateInput.addEventListener('change', updateUI);
    langSwitch.addEventListener('change', updateUI);
    document.getElementById('clearBtn').addEventListener('click', resetToCurrent);
});
