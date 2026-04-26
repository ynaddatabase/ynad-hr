document.addEventListener('DOMContentLoaded', () => {
    console.log("YNAD HR UI Ready!");
    
    // সেট ডিফল্ট ডেট
    const dateInput = document.getElementById('workDate');
    if(dateInput) dateInput.valueAsDate = new Date();
    
    // এমপ্লয়ীদের একটি সাধারণ তালিকা (এখনকার জন্য কোডে রাখা)
    const dummyEmployees = [
        { id: '2511022', name: 'Md. Abu Sayeed' },
        { id: '0101001', name: 'Engr. Abdul Alim' }
    ];
    
    const empSelect = document.getElementById('empSelect');
    const filterEmp = document.getElementById('filterEmp');
    
    dummyEmployees.forEach(emp => {
        let option = `<option value="${emp.id}">${emp.name} (${emp.id})</option>`;
        empSelect.innerHTML += option;
        filterEmp.innerHTML += option;
    });
});
