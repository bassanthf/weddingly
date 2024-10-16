async function fetchData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    const woman = data.filter(data => data.type === 'woman');

    // عرض البيانات المفلترة (فقط العناصر التي تكون type === 'woman')
    displayData(woman);
     
    // إعداد البحث للعمل على البيانات المفلترة
    setupSearch(woman);

    console.log(woman); // يمكنك عرض العناصر المفلترة في وحدة التحكم
  } catch (error) {
    console.error('Error fetching ', error);
  }
}



function displayData(woman) {
  var atlah = '';

  for (let i = 0; i < woman.length; i++) {
    const id=woman[i].id;
    atlah += `
      <div class="col">
        <div class="card" data-id="${woman[i].ID}"> <!-- Add data-id here -->
          <img id="atlahf" src="${woman[i].img}" class="card-img-top" alt="..." />
          <div class="card-body">
            <div>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
            <h5 class="card-title">${woman[i].name}</h5>
            <h5 class="card-text">
              <img id="loca" src="/img/icon/location.png"/> ${woman[i].location}
            </h5>
            <div id="contact"> 
              <a id="clink"  href="tel:${woman[i].phone}"><img id="aicon" src="/img/icon/phone-call_455705.png"/>Phone</a>
              <a id="clink" href="${woman[i].inst}"><img id="aicon"  src="/img/icon/instagram_3991634.png"/>Instagram</a>
            </div>
            <button class="btn btn-primary" onclick="navigateToDetails(${woman[i].ID})">See more ...</button>
          </div>
        </div>
      </div>`;
  }

  document.getElementById("row").innerHTML = atlah;
  addClickEvent();
}


function addClickEvent() {
  // Use document.querySelectorAll to make sure it selects from the whole document
  const containers = document.querySelectorAll('.card');

  containers.forEach(container => {
    container.addEventListener('click', (event) => {
      const id = container.getAttribute('data-id');
      localStorage.setItem('SelectedPerson', id); // Store selected person ID in localStorage
      
      // Re-fetch the data or call the display function to update the data based on the clicked ID
      fetchData(); // Call the fetchData function to update the displayed data
    });
  });
}

function setupSearch(woman) {
  document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase(); // الحصول على النص الذي كتبه المستخدم
    const filteredData = woman.filter(data => data.name.toLowerCase().includes(searchTerm)); // فلترة البيانات
    displayData(filteredData); // إعادة عرض البيانات بناءً على الفلترة
  });
}
function navigateToDetails(id){
  localStorage.setItem('SelectedAtelierId', id);

  // Redirect to the details page
  window.location.href = 'alehdetail.html';
}

fetchData();
