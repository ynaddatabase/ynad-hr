const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bnMonths = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const bnDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

function toBnNum(num) {
    return num.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

function formatDate(dateStr, lang) {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    
    if (lang === 'bn') {
        return `${toBnNum(day < 10 ? '0'+day : day)} ${bnMonths[month]} ${toBnNum(year)}`;
    }
    return `${day < 10 ? '0'+day : day} ${enMonths[month]} ${year}`;
}

function updateUI() {
    const lang = document.getElementById('langSwitch').checked ? 'bn' : 'en';
    const dateVal = document.getElementById('hiddenDate').value;
    const d = new Date(dateVal);
    
    // ১. তারিখ ও দিনের ফরম্যাট আপডেট
    document.getElementById('displayDate').value = formatDate(dateVal, lang);
    document.getElementById('displayDay').value = lang === 'bn' ? bnDays[d.getDay()] : enDays[d.getDay()];
    document.getElementById('topBarDate').innerText = formatDate(dateVal, lang);

    // ২. শুক্রবার চেক
    const isFriday = enDays[d.getDay()] === "Friday";
    const alertBox = document.getElementById('holidayAlert');
    const inputs = [document.getElementById('displayDate'), document.getElementById('displayDay')];
    
    if(isFriday) {
        inputs.forEach(i => i.classList.add('holiday-red'));
        alertBox.style.display = 'block';
    } else {
        inputs.forEach(i => i.classList.remove('holiday-red'));
        alertBox.style.display = 'none';
    }

    // ৩. সব টেক্সট ট্রান্সলেশন
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = lang === 'bn' ? el.getAttribute('data-bn') : el.getAttribute('data-en');
        if(el.tagName === 'OPTION') el.text = text;
        else if(el.children.length === 0) el.innerText = text;
        else {
            el.childNodes.forEach(n => { if(n.nodeType === 3 && n.textContent.trim()) n.textContent = text; });
        }
    });

    // ৪. ব্রাউজারে ডাটা সেভ রাখা (Persistence)
    localStorage.setItem('ynad_lang', lang);
    localStorage.setItem('ynad_details', document.getElementById('workDetails').value);
    localStorage.setItem('ynad_remarks', document.getElementById('workRemarks').value);
}

function showPage(id, el) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const hiddenDate = document.getElementById('hiddenDate');
    const workDetails = document.getElementById('workDetails');
    const workRemarks = document.getElementById('workRemarks');
    const langSwitch = document.getElementById('langSwitch');

    // আজকের তারিখ ডিফল্ট
    const today = new Date().toISOString().split('T')[0];
    hiddenDate.value = today;
    hiddenDate.max = today;

    // ৫. রিলোড দিলে আগের ডাটা ফিরিয়ে আনা
    if(localStorage.getItem('ynad_lang') === 'bn') langSwitch.checked = true;
    if(localStorage.getItem('ynad_details')) workDetails.value = localStorage.getItem('ynad_details');
    if(localStorage.getItem('ynad_remarks')) workRemarks.value = localStorage.getItem('ynad_remarks');

    updateUI();

    // ইভেন্ট লিসেনারস
    hiddenDate.addEventListener('change', updateUI);
    langSwitch.addEventListener('change', updateUI);
    workDetails.addEventListener('input', updateUI);
    workRemarks.addEventListener('change', updateUI);
    
    document.getElementById('clearBtn').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
});
