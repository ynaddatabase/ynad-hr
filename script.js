document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('entryDate');
    const dayInput = document.getElementById('entryDay');
    const holidayMsg = document.getElementById('holidayMsg');

    // ১. ডেট সেটআপ ও লক করা
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    dateInput.max = todayStr;
    dateInput.value = todayStr;

    const checkHoliday = (dateString) => {
        const d = new Date(dateString);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayNames[d.getDay()];
        
        dayInput.value = dayName;

        // ২. শুক্রবার চেক (Weekly Holiday)
        if (dayName === "Friday") {
            dayInput.classList.add('text-holiday');
            dateInput.classList.add('text-holiday');
            holidayMsg.style.display = 'block';
        } else {
            dayInput.classList.remove('text-holiday');
            dateInput.classList.remove('text-holiday');
            holidayMsg.style.display = 'none';
        }
    };

    checkHoliday(todayStr);

    dateInput.addEventListener('change', (e) => {
        checkHoliday(e.target.value);
    });

    // ৩. ল্যাঙ্গুয়েজ সুইচ (বুনিয়াদি লজিক)
    let currentLang = 'EN';
    document.getElementById('langToggle').addEventListener('click', function() {
        currentLang = currentLang === 'EN' ? 'BN' : 'EN';
        this.innerText = currentLang === 'EN' ? 'EN | BN' : 'বাংলা | EN';
        alert("Language switched to: " + currentLang);
        // এখানে আপনি ডাটাবেস বা ডিকশনারি থেকে টেক্সট চেঞ্জ করার লজিক দিতে পারেন
    });
});

function logout() { location.reload(); }document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('entryDate');
    const dayInput = document.getElementById('entryDay');
    const holidayMsg = document.getElementById('holidayMsg');

    // ১. ডেট সেটআপ ও লক করা
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    dateInput.max = todayStr;
    dateInput.value = todayStr;

    const checkHoliday = (dateString) => {
        const d = new Date(dateString);
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayNames[d.getDay()];
        
        dayInput.value = dayName;

        // ২. শুক্রবার চেক (Weekly Holiday)
        if (dayName === "Friday") {
            dayInput.classList.add('text-holiday');
            dateInput.classList.add('text-holiday');
            holidayMsg.style.display = 'block';
        } else {
            dayInput.classList.remove('text-holiday');
            dateInput.classList.remove('text-holiday');
            holidayMsg.style.display = 'none';
        }
    };

    checkHoliday(todayStr);

    dateInput.addEventListener('change', (e) => {
        checkHoliday(e.target.value);
    });

    // ৩. ল্যাঙ্গুয়েজ সুইচ (বুনিয়াদি লজিক)
    let currentLang = 'EN';
    document.getElementById('langToggle').addEventListener('click', function() {
        currentLang = currentLang === 'EN' ? 'BN' : 'EN';
        this.innerText = currentLang === 'EN' ? 'EN | BN' : 'বাংলা | EN';
        alert("Language switched to: " + currentLang);
        // এখানে আপনি ডাটাবেস বা ডিকশনারি থেকে টেক্সট চেঞ্জ করার লজিক দিতে পারেন
    });
});

function logout() { location.reload(); }
