const SUPABASE_URL = 'https://izpserjpxmdfuajwskvi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5qpbnzlA0DkzX96BrjERqA_ZtlUvjC7S';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Full Employee List from your sheet
const employeeData = [
    { id: '0101001', name: 'Engr. Abdul Alim', designation: 'Sr. Site Engineer' },
    { id: '1807002', name: 'Engr. Atiqur Rahman', designation: 'Project In Charge' },
    { id: '1808003', name: 'Mamun Ahmed', designation: 'Site Coordinator' },
    { id: '2101004', name: 'Monirul Islam', designation: 'Site Coordinator' },
    { id: '2102005', name: 'Jasim Uddin', designation: 'Site Coordinator' },
    { id: '2103006', name: 'Md. Habibur Rahman', designation: 'Office Assistant' },
    { id: '2110007', name: 'Engr. Shaukat Ali', designation: 'Sr. Site Engineer' },
    { id: '2206008', name: 'Engr. Imran Hossen', designation: 'Site Engineer' },
    { id: '2207009', name: 'Engr. Mahadi Hassan', designation: 'Site Engineer' },
    { id: '2209010', name: 'Md. Sahed', designation: 'Reporting In Charge' },
    { id: '2304011', name: 'Saiful Islam', designation: 'Site Coordinator' },
    { id: '2309012', name: 'Imam Hosain', designation: 'Media Officer' },
    { id: '2309013', name: 'Engr. Rakibuzzaman', designation: 'Site Engineer' },
    { id: '2407014', name: 'Engr. Shakil Ahmad', designation: 'Site Engineer' },
    { id: '2502015', name: 'Khalid Hussain Nasim', designation: 'Reporting Officer' },
    { id: '2505016', name: 'Ashraful Islam', designation: 'Site Coordinator' },
    { id: '2507017', name: 'Md. Tawhidul Islam', designation: 'Accountant' },
    { id: '2507018', name: 'Ahmed Ali', designation: 'Site Engineer' },
    { id: '2508019', name: 'Engr. Md. Ibtesham Alam', designation: 'Project Engineer' },
    { id: '2510020', name: 'Shabik Omar', designation: 'Site Coordinator' },
    { id: '2510021', name: 'Md. Monirujjaman Julhash', designation: 'Media Officer' },
    { id: '2511022', name: 'Md. Abu Sayeed', designation: 'IT & Media Officer' },
    { id: '2511023', name: 'Md. Mohosin Ali', designation: 'Site Engineer' },
    { id: '2512024', name: 'Md. Asadul Islam Mueen', designation: 'Site Engineer' },
    { id: '2602025', name: 'Md. Nahian Islam', designation: 'Project Engineer' },
    { id: '2603026', name: 'Md. Jahidul Islam', designation: 'Project Engineer' }
];

document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    document.getElementById('workDate').valueAsDate = new Date();
});

function loadEmployees() {
    const empSelect = document.getElementById('empSelect');
    empSelect.innerHTML = '<option value="">-- Select Your Name --</option>';
    employeeData.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.text = `${emp.name} (${emp.id})`;
        empSelect.appendChild(option);
    });
}

// Submit Report
document.getElementById('entryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const empId = document.getElementById('empSelect').value;
    const date = document.getElementById('workDate').value;
    const details = document.getElementById('workDetails').value;
    const remarks = document.getElementById('workRemarks').value;

    if (!empId) { alert("Please select your name first!"); return; }

    btn.disabled = true;
    btn.innerText = "Saving...";

    const { error } = await supabaseClient
        .from('daily_activities')
        .insert([{ employee_id: empId, activity_date: date, work_details: details, remarks: remarks }]);

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Report Submitted for " + date);
        document.getElementById('workDetails').value = '';
        fetchReports();
    }
    btn.disabled = false;
    btn.innerText = "Submit Report";
});

// View Reports
async function fetchReports() {
    const empId = document.getElementById('empSelect').value;
    const from = document.getElementById('fromDate').value;
    const to = document.getElementById('toDate').value;

    if (!empId) { alert("Select an employee first"); return; }

    let query = supabaseClient.from('daily_activities').select('*').eq('employee_id', empId).order('activity_date', { ascending: true });
    if (from && to) query = query.gte('activity_date', from).lte('activity_date', to);

    const { data, error } = await query;
    if (!error) renderTable(data);
}

function renderTable(data) {
    const tableBody = document.getElementById('reportTableBody');
    tableBody.innerHTML = '';
    let stats = { working: 0, present: 0, outside: 0, leave: 0, holiday: 0, absent: 0 };

    data.forEach(row => {
        const dateObj = new Date(row.activity_date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        
        stats.working++;
        if (row.remarks === 'Present') stats.present++;
        else if (row.remarks === 'Work on Outside') stats.outside++;
        else if (row.remarks.includes('Leave')) stats.leave++;
        else if (row.remarks === 'Absent') stats.absent++;
        
        const isFri = dayName === 'Friday';
        if (isFri) stats.holiday++;

        const tr = document.createElement('tr');
        if (isFri) tr.classList.add('holiday-row');
        
        tr.innerHTML = `
            <td class="ps-3">${row.activity_date}</td>
            <td>${dayName}</td>
            <td>${row.work_details}</td>
            <td><span class="badge ${getBadge(row.remarks)}">${row.remarks}</span></td>
        `;
        tableBody.appendChild(tr);
    });

    document.getElementById('statWorking').innerText = stats.working;
    document.getElementById('statPresent').innerText = stats.present;
    document.getElementById('statOutside').innerText = stats.outside;
    document.getElementById('statLeave').innerText = stats.leave;
    document.getElementById('statHoliday').innerText = stats.holiday;
    document.getElementById('statAbsent').innerText = stats.absent;
}

function getBadge(r) {
    if (r === 'Present') return 'badge-present';
    if (r === 'Work on Outside') return 'badge-outside';
    if (r.includes('Leave')) return 'badge-leave';
    return 'bg-dark';
}
