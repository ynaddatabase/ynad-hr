document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('entryDate');
    const dayInput = document.getElementById('entryDay');
    const holidayBadge = document.getElementById('holidayBadge');

    // আজকের তারিখ ডিফল্ট সেট করা
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    dateInput.max = todayStr; // ভবিষ্যৎ লক
    dateInput.value = todayStr;

    function handleDateChange(selectedDate) {
        if(!selectedDate) return;

        const dateObj = new Date(selectedDate);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = days[dateObj.getDay()];
        
        dayInput.value = dayName;

        // শুক্রবার লজিক (সাপ্তাহিক ছুটি)
        if (dayName === "Friday") {
            dateInput.classList.add('is-holiday');
            dayInput.classList.add('is-holiday');
            holidayBadge.style.display = 'block';
        } else {
            dateInput.classList.remove('is-holiday');
            dayInput.classList.remove('is-holiday');
            holidayBadge.style.display = 'none';
        }
    }

    // শুরুতে এবং তারিখ পরিবর্তনের সময় কল করা
    handleDateChange(todayStr);
    dateInput.addEventListener('change', (e) => handleDateChange(e.target.value));

    // ল্যাঙ্গুয়েজ সুইচ বাটন
    document.getElementById('langToggle').addEventListener('click', function() {
        this.innerText = this.innerText.includes("EN") ? "বাংলা | EN" : "EN | বাংলা";
    });
});

function logout() { location.reload(); }
