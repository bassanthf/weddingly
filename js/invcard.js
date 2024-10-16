async function fetchData() {
    try {
        const response = await fetch('invcard.json');
        const data = await response.json();
        displayData(data); 
        setupSearch(data); 
        console.log(data)
    } catch (error) {
        console.error('Error fetching ', error);
    }
  }

  
  function displayData(data) {
    var card = '';
  
    for (let i = 0; i < data.length; i++) {
        card += `
        
             <div class="col">
            <div class="card invcr">
             <img id="invc" src="${data[i].card}" class="card-img-top" alt="..." />
              <div class="card-body">
              
                <h3 class="card-title invn">${data[i].name}</h3>
            
                 <a href="${data[i].link}" target="_blank" class="btn invbtn" id="more">Edit</a>
              </div>
            </div>
          </div>`;
    }
  
    document.getElementById("row").innerHTML =card;

  }
  
  function setupSearch(data) {
    document.getElementById('searchInput').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase(); // الحصول على النص الذي كتبه المستخدم
        const filteredData = data.filter(data => data.name.toLowerCase().includes(searchTerm)); // فلترة البيانات
        displayData(filteredData); // إعادة عرض البيانات بناءً على الفلترة
    });
  }

  
  
  fetchData();