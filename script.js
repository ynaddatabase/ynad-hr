// ১. পেজ লোড হওয়ার সময় ডিফল্ট সেটআপ
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('entryDate');
    const dayInput = document.getElementById('entryDay');

    // আজকের তারিখ বের করা
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // তারিখের সর্বোচ্চ সীমা আজকের দিন পর্যন্ত সেট করা (ভবিষ্যৎ লক)
    dateInput.max = formattedDate;
    dateInput.value = formattedDate;

    // ডিফল্ট "Day" সেট করা
    updateDayName(today);

    // তারিখ পরিবর্তন করলে "Day" অটো আপডেট হবে
    dateInput.addEventListener('change', (e) => {
        const selectedDate = new Date(e.target.value);
        updateDayName(selectedDate);
    });
});

// ২. তারিখ অনুযায়ী বারের নাম (Saturday, Sunday...) বের করা
function updateDayName(dateObj) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[dateObj.getDay()];
    document.getElementById('entryDay').value = dayName;
}

// ৩. ফর্ম সাবমিশন হ্যান্ডলার
document.getElementById('dailyReportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const reportData = {
        date: document.getElementById('entryDate').value,
        day: document.getElementById('entryDay').value,
        details: document.getElementById('workDetails').value,
        remarks: document.getElementById('workRemarks').value
    };

    console.log("Saving Report:", reportData);

    // এখানে আমরা সুপাবেস কানেক্ট করবো। আপাতত একটি সাকসেস মেসেজ দিচ্ছি।
    alert(`Report for ${reportData.date} submitted successfully!`);
    
    // ফর্ম ক্লিয়ার করা (তারিখ বাদে)
    document.getElementById('workDetails').value = "";
    document.getElementById('workRemarks').value = "";
});
