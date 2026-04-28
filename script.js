document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('entryDate');
    const dayInput = document.getElementById('entryDay');

    // ১. আজকের তারিখ বের করা
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`;

    // ২. ভবিষ্যৎ তারিখ লক করা (max attribute ব্যবহার করে)
    dateInput.max = todayString;
    dateInput.value = todayString; // ডিফল্টভাবে আজকের তারিখ

    // ৩. বারের নাম আপডেট করার ফাংশন
    const updateDay = (dateStr) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const d = new Date(dateStr);
        dayInput.value = days[d.getDay()];
    };

    // শুরুতে আজকের বার সেট করা
    updateDay(todayString);

    // তারিখ পরিবর্তন করলে বার আপডেট হবে
    dateInput.addEventListener('change', (e) => {
        updateDay(e.target.value);
    });

    // ৪. ফর্ম সাবমিশন
    document.getElementById('dailyReportForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = {
            date: dateInput.value,
            day: dayInput.value,
            details: document.getElementById('workDetails').value,
            remarks: document.getElementById('workRemarks').value
        };

        console.log("Submitting Data:", data);
        alert("Report Submitted Successfully for " + data.date);
        
        // ফর্ম ক্লিয়ার (শুধু ডিটেইলস এবং রিমার্কস)
        document.getElementById('workDetails').value = "";
        document.getElementById('workRemarks').value = "";
    });
});
