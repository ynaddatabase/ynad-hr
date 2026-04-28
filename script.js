// ১. পেজ পরিবর্তন করার ফাংশন
function showPage(pageId, element) {
    // সব পেজ হাইড করা
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));

    // সিলেক্ট করা পেজ শো করা
    const activePage = document.getElementById(pageId);
    if (activePage) activePage.classList.add('active');

    // সাইডবার মেনু হাইলাইট পরিবর্তন
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('inputDate');
    const dayInput = document.getElementById('inputDay');
    const holidayAlert = document.getElementById('holidayAlert');

    // ২. আজকের তারিখ ডিফল্ট সেট করা
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const localDate = (new Date(today - offset)).toISOString().split('T')[0];
    
    dateInput.value = localDate; 
    dateInput.max = localDate; // ভবিষ্যৎ এডিট বন্ধ

    function updateLogic(selectedDate) {
        if (!selectedDate) return;
        
        const dateObj = new Date(selectedDate);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayNames[dateObj.getDay()];
        
        dayInput.value = dayName;

        // ৩. শুক্রবার লাল হওয়ার লজিক
        if (dayName === "Friday") {
            dateInput.classList.add('holiday-red');
            dayInput.classList.add('holiday-red');
            holidayAlert.style.display = 'block';
        } else {
            dateInput.classList.remove('holiday-red');
            dayInput.classList.remove('holiday-red');
            holidayAlert.style.display = 'none';
        }
    }

    // শুরুতে এবং তারিখ পরিবর্তনের সময় রান হবে
    updateLogic(localDate);
    dateInput.addEventListener('change', (e) => updateLogic(e.target.value));

    // ল্যাঙ্গুয়েজ সুইচ বাটন
    document.getElementById('langToggle').addEventListener('click', function() {
        this.innerText = this.innerText.includes("EN") ? "বাংলা | EN" : "EN | বাংলা";
    });
});
