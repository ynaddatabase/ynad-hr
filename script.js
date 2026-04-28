function showPage(pageId, el) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}

// ক্লিয়ার বাটন লজিক
function clearForm() {
    document.getElementById('reportForm').reset();
    setDefaultDate();
}

// তারিখ সেটআপ ফাংশন
function setDefaultDate() {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const localToday = (new Date(today - offset)).toISOString().split('T')[0];
    
    const dateInput = document.getElementById('inputDate');
    dateInput.value = localToday;
    dateInput.max = localToday;
    updateDayLogic(localToday);
}

function updateDayLogic(dateStr) {
    if (!dateStr) return;
    const d = new Date(dateStr);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[d.getDay()];
    
    const dayInput = document.getElementById('inputDay');
    const dateInput = document.getElementById('inputDate');
    const alertBox = document.getElementById('holidayAlert');

    dayInput.value = dayName;

    if (dayName === "Friday") {
        dateInput.classList.add('holiday-red');
        dayInput.classList.add('holiday-red');
        alertBox.style.display = 'block';
    } else {
        dateInput.classList.remove('holiday-red');
        dayInput.classList.remove('holiday-red');
        alertBox.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setDefaultDate();
    document.getElementById('inputDate').addEventListener('change', (e) => updateDayLogic(e.target.value));

    // এ টু জেড ল্যাঙ্গুয়েজ সুইচ (Toggle logic)
    document.getElementById('langSwitch').addEventListener('change', function() {
        const isBN = this.checked;
        document.querySelectorAll('[data-en]').forEach(el => {
            // ১. শুধু টেক্সট আছে এমন এলিমেন্ট
            if(el.children.length === 0) {
                el.innerText = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
            } 
            // ২. ড্রপডাউন অপশনের জন্য
            else if(el.tagName === 'OPTION') {
                el.text = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
            }
            // ৩. টেক্সট নোডসহ এলিমেন্ট (যেমন সাইডবার মেনু)
            else {
                el.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
                        node.textContent = isBN ? el.getAttribute('data-bn') : el.getAttribute('data-en');
                    }
                });
            }
        });
    });
});
