const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bnMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const bnDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

function toBnNum(num) {
    return num.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

function updateUI() {
    const isBN = document.getElementById('langSwitch').checked;
    const lang = isBN ? 'bn' : 'en';
    const dateInput = document.getElementById('mainDateInput');
    const val = dateInput.value;
    
    if(!val) return;
    const d = new Date(val);

    // ১. ক্যালেন্ডার আপডেট ও ফন্ট পরিবর্তন
    if(isBN) document.documentElement.classList.add('lang-bn');
    else document.documentElement.classList.remove('lang-bn');

    // ২. সপক্ষের দিন আপডেট
    document.getElementById('displayDay').value = isBN ? bnDays[d.getDay()] : enDays[d.getDay()];

    // ৩. টপ বার তারিখ আপডেট
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const formattedDate = isBN 
        ? `${toBnNum(day < 10 ? '0'+day : day)} ${bnMonths[month]} ${toBnNum(year)}`
        : `${day < 10 ? '0'+day : day} ${enMonths[month]} ${year}`;
    document.getElementById('topBarDate').innerText = formattedDate;

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

    // ৫. এ টু জেড ট্রান্সলেশন
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        if(el.tagName === 'OPTION') el.text = text;
        else if(el.children.length === 0) el.innerText = text;
        else {
            el.childNodes.forEach(n => { if(n.nodeType === 3 && n.textContent.trim()) n.textContent = text; });
        }
    });

    // ডাটা সেভ রাখা
    localStorage.setItem('ynad_lang', lang);
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

    // আজকের তারিখ ডিফল্ট
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.max = today;

    // লোড করার সময় আগের ল্যাঙ্গুয়েজ ফিরে আনা
    if(localStorage.getItem('ynad_lang') === 'bn') langSwitch.checked = true;

    updateUI();

    dateInput.addEventListener('change', updateUI);
    langSwitch.addEventListener('change', updateUI);
    
    document.getElementById('clearBtn').addEventListener('click', () => {
        document.getElementById('workDetails').value = '';
        document.getElementById('workRemarks').selectedIndex = 0;
    });
});
