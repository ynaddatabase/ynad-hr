document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('entryDate');
    const dayInput = document.getElementById('entryDay');
    const holidayBadge = document.getElementById('holidayBadge');
    const langToggle = document.getElementById('langToggle');

    // 1. Initial Setup
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    dateInput.max = todayStr;
    dateInput.value = todayStr;

    // 2. Logic to handle Friday Highlight
    function updateHolidayLogic(selectedDate) {
        if (!selectedDate) return;
        
        const d = new Date(selectedDate);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = days[d.getDay()];
        dayInput.value = dayName;

        if (dayName === "Friday") {
            // Add red styles
            dateInput.classList.add('friday-red');
            dayInput.classList.add('friday-red');
            holidayBadge.style.display = 'block';
        } else {
            // Remove red styles
            dateInput.classList.remove('friday-red');
            dayInput.classList.remove('friday-red');
            holidayBadge.style.display = 'none';
        }
    }

    // Run on load and change
    updateHolidayLogic(todayStr);
    dateInput.addEventListener('change', (e) => updateHolidayLogic(e.target.value));

    // 3. Language Switch Logic
    langToggle.addEventListener('click', function() {
        const isEN = this.innerText.includes("EN");
        this.innerText = isEN ? "বাংলা | EN" : "EN | বাংলা";
        
        // Example translation logic
        const labels = document.querySelectorAll('.form-label');
        if (isEN) {
            labels[0].innerText = "তারিখ নির্বাচন করুন";
            labels[1].innerText = "বারের নাম";
            // Add more translations here...
        } else {
            labels[0].innerText = "Select Date";
            labels[1].innerText = "Day of Week";
        }
    });
});
