document.addEventListener('DOMContentLoaded', () => {
    const dateField = document.getElementById('inputDate');
    const dayField = document.getElementById('inputDay');
    const alertBox = document.getElementById('holidayAlert');
    const langBtn = document.getElementById('langToggle');

    // আজকের তারিখ ডিফল্ট সেট করা
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    dateField.max = formattedToday; // ভবিষ্যৎ লক
    dateField.value = formattedToday;

    function applyHolidayLogic(selectedDate) {
        if (!selectedDate) return;
        
        const dateObj = new Date(selectedDate);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayNames[dateObj.getDay()];
        
        dayField.value = dayName;

        // শুক্রবার লজিক
        if (dayName === "Friday") {
            dateField.classList.add('holiday-mode');
            dayField.classList.add('holiday-mode');
            alertBox.style.display = 'block';
        } else {
            dateField.classList.remove('holiday-mode');
            dayField.classList.remove('holiday-mode');
            alertBox.style.display = 'none';
        }
    }

    // শুরুতে এবং তারিখ পরিবর্তনের সময় রান হবে
    applyHolidayLogic(formattedToday);
    dateField.addEventListener('change', (e) => applyHolidayLogic(e.target.value));

    // ল্যাঙ্গুয়েজ সুইচ লজিক
    langBtn.addEventListener('click', function() {
        const isEn = this.innerText.includes("EN");
        this.innerText = isEn ? "বাংলা | EN" : "EN | বাংলা";
        
        // এখানে ফিল্ডের টেক্সট পরিবর্তনের লজিক দেওয়া যাবে
        document.querySelector('.title-main').innerText = isEn ? "মাসিক দাপ্তরিক কাজের প্রতিবেদন" : "Monthly Official Working Report";
    });
});
