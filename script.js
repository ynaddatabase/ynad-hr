const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// পেজ সুইচিং লজিক
function showPage(pageId, element) {
    // সব পেজ হাইড করা
    document.querySelectorAll('.page-content').forEach(page => page.classList.remove('active'));
    // টার্গেট পেজ শো করা
    document.getElementById(pageId).classList.add('active');
    
    // সব মেনু থেকে একটিভ ক্লাস সরানো
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    // ক্লিক করা মেনুতে একটিভ ক্লাস দেওয়া
    element.classList.add('active');
    
    localStorage.setItem('last_page', pageId);
}

function updateUI() {
    const isBN = document.getElementById('langSwitch').checked;
    const dateInput = document.getElementById('mainDateInput');
    const val = dateInput.value;
    
    if(!val) return;
    const d = new Date(val);

    // ১. বাংলা মোড হ্যান্ডলিং
    if(isBN) document.documentElement.classList.add('lang-bn');
    else document.documentElement.classList.remove('lang-bn');

    // ২. ডেট ও ডে ফরম্যাট (Fixed English)
    const day = d.getDate();
    const formattedDate = `${day < 10 ? '0'+day : day} ${enMonths[d.getMonth()]} ${d.getFullYear()}`;
    document.getElementById('topBarDate').innerText = formattedDate;
    document.getElementById('displayDay').value = enDays[d.getDay()];

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

    // ৪. ট্রান্সলেশন
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        if(el.children.length === 0) el.innerText = text;
        else {
            el.childNodes.forEach(n => { if(n.nodeType === 3 && n.textContent.trim()) n.textContent = text; });
        }
    });

    // ৫. রিমার্কস ওপাসিটি
    const remarks = document.getElementById('workRemarks');
    remarks.style.opacity = remarks.value === "" ? "0.6" : "1";

    saveToStorage();
}

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

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('mainDateInput');
    const today = new Date().toISOString().split('T')[0];
    
    dateInput.value = today;
    dateInput.max = today;

    loadFromStorage();
    updateUI();

    // ইভেন্ট লিসেনারস
    dateInput.addEventListener('change', updateUI);
    document.getElementById('langSwitch').addEventListener('change', updateUI);
    document.getElementById('workDetails').addEventListener('input', saveToStorage);
    document.getElementById('workRemarks').addEventListener('change', updateUI);
    
    // ক্লিয়ার ফাংশন (Current Date এ ফিরে যাবে)
    document.getElementById('clearBtn').addEventListener('click', () => {
        document.getElementById('workDetails').value = '';
        document.getElementById('workRemarks').selectedIndex = 0;
        document.getElementById('mainDateInput').value = today;
        localStorage.clear();
        updateUI();
    });
});
