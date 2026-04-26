const SB_URL = "https://raazacwtlpxrwpiqyjvr.supabase.co";
const SB_KEY = "sb_publishable_5qpbnzlA0DkzX96BrjERqA_ZtlUv4yk";

const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

// পেজ লোড হলে এমপ্লয়ী ড্রপডাউন লোড হবে
window.onload = async () => {
    const { data, error } = await supabaseClient.from('employees').select('id, name');
    const empSelect = document.getElementById('empSelect');
    
    if (data && data.length > 0) {
        let options = '<option value="">-- Select Employee --</option>';
        data.forEach(emp => {
            options += `<option value="${emp.id}">${emp.name} (${emp.id})</option>`;
        });
        empSelect.innerHTML = options;
    } else {
        empSelect.innerHTML = '<option>No Employees Found</option>';
    }
};

// ডাটা ফিল্টার এবং ক্যালকুলেশন ফাংশন
async function fetchReports() {
    const empId = document.getElementById('empSelect').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;

    if (!empId || !fromDate || !toDate) {
        alert("Please select Employee and Date Range!");
        return;
    }

    const { data, error } = await supabaseClient
        .from('daily_activities')
        .select('*')
        .eq('employee_id', empId)
        .gte('activity_date', fromDate)
        .lte('activity_date', toDate)
        .order('activity_date', { ascending: true });

    if (error) {
        console.error("Error fetching data:", error);
    } else {
        renderUI(data);
    }
}

function renderUI(data) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = "";
    
    let stats = { working: 0, present: 0, outside: 0, leave: 0, holiday: 0, absent: 0 };

    data.forEach(row => {
        const dateObj = new Date(row.activity_date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const isWeekend = (dayName === 'Friday' || dayName === 'Saturday');

        stats.working++;

        // লজিক চেক (আপনার গুগল শিট অনুযায়ী)
        if (isWeekend) stats.holiday++;
        if (row.remarks === 'Work on Outside') stats.outside++;
        if (row.remarks && row.remarks.includes('Leave')) stats.leave++;
        if (row.remarks === 'Absent') stats.absent++;
        
        // প্রেজেন্ট দিন গণনা (ছুটি বা এবসেন্ট না হলে প্রেজেন্ট)
        if (!row.remarks || row.remarks === 'Work on Outside') {
            if(!isWeekend) stats.present++;
        }

        const tr = document.createElement('tr');
        if (isWeekend) tr.classList.add('holiday-row');

        tr.innerHTML = `
            <td>${row.activity_date}</td>
            <td>${dayName}</td>
            <td>${row.work_details || '-'}</td>
            <td>${row.remarks || '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    // সামারি বোর্ড আপডেট
    document.getElementById('statWorking').innerText = stats.working;
    document.getElementById('statPresent').innerText = stats.present;
    document.getElementById('statLeave').innerText = stats.leave;
    document.getElementById('statOutside').innerText = stats.outside;
    document.getElementById('statHoliday').innerText = stats.holiday;
    document.getElementById('statAbsent').innerText = stats.absent;
}