// async function fetchData() {
//   try {
//     const response = await fetch('pageatlah.json');
//     const data = await response.json();

//     // Retrieve the selected ID from local storage
//     const selectedId = localStorage.getItem('SelectedPerson');
//     console.log("idddddd"+selectedId);

//     // Filter the data to get all dresses for the selected ID
//     const selectedDresses = data.filter(item => item.ID.toString() === selectedId && item.type === 'woman');

//     // Display all dresses from the selected ID
//     displayData(selectedDresses);
    
//     if (selectedDresses.length > 0) {
//       console.log("Selected dresses found:", selectedDresses);
//       console.log(selectedId);
//     } else {
//       console.error('No dresses found for the selected store ID.');
//       console.log(selectedId);
//     }
    
//   } catch (error) {
//     console.error('Error fetching ', error);
//   }
// }
// function displayData(woman) {
//   var atlah = '';

//   for (let i = 0; i < woman.length; i++) {
//     const id=woman[i].id;
//     atlah += `
//       <div class="col">
//         <div class="card" data-id="${woman[i].ID}">
//           <img id="atlahf" src="${woman[i].img}" class="card-img-top" alt="..." />
//           <div class="card-body">
//             <div>
//               <span class="fa fa-star checked"></span>
//               <span class="fa fa-star checked"></span>
//               <span class="fa fa-star checked"></span>
//               <span class="fa fa-star"></span>
//               <span class="fa fa-star"></span>
//             </div>
//             <h3 class="card-title">${woman[i].name}</h3>
//             <h3 class="card-text">Color: ${woman[i].color}</h3>
//             <h3 class="card-text">Size: ${woman[i].size}</h3>
//             <h3 class="card-text">Price: ${woman[i].price1}</h3>
//           </div>
//         </div>
//       </div>`;
//   }

//   document.getElementById("row").innerHTML = atlah;
//   console.log('Data fetched:', woman);

//   // Call addClickEvent after data has been displayed
//   addClickEvent();
//   console.log("Aaaaaaaaaaaa");
// }

// function setupSearch(woman) {
//   document.getElementById('searchInput').addEventListener('input', function () {
//     const searchTerm = this.value.toLowerCase(); // Get the text entered by the user
//     const filteredData = woman.filter(item => item.name.toLowerCase().includes(searchTerm)); // Filter the data
//     displayData(filteredData); // Redisplay data based on filtering
//   });
// }

// function addClickEvent() {
//   const containers = document.querySelectorAll('.card'); // Use document here for broader scope
//   containers.forEach(container => {
//     container.addEventListener('click', (event) => {
//       const id = container.getAttribute('data-id');
//       localStorage.setItem('SelectedPerson', id);
      
//       fetchData(); // Re-fetch data after selecting a person
//       console.log("Aaaaaaaaaaaa");
//     });
//   });
// }

// // Initial fetch data call
// fetchData();

document.addEventListener("DOMContentLoaded", () => {
  // Initial fetch call
  fetchData();
});

async function fetchData() {
  try {
    const response = await fetch('pageatlah.json');
    const data = await response.json();

    // Retrieve the selected ID from local storage
    const selectedId = localStorage.getItem('SelectedPerson');
    console.log("Selected ID: " + selectedId);

    // Filter the data to get all dresses for the selected ID
    const selectedDresses = data.filter(item => item.ID.toString() === selectedId && item.type === 'woman');

    // Display filtered dresses
    displayData(selectedDresses);
    
    if (selectedDresses.length > 0) {
      console.log("Selected dresses found:", selectedDresses);
    } else {
      console.error('No dresses found for the selected store ID.');
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayData(woman) {
  const atelierDetailsElement = document.getElementById("atelierDetails"); // Update to use the correct ID
  if (!atelierDetailsElement) {
    console.error("Element with ID 'atelierDetails' not found in the DOM.");
    return; // Early return if the element is not found
  }

  let atlah = '';

  for (let i = 0; i < woman.length; i++) {
    const id = woman[i].ID; // Use the correct property for ID
    atlah += `
      <div class="col">
        <div class="card" data-id="${id}">
          <img src="${woman[i].img}" class="card-img-top" alt="Dress Image" />
          <div class="card-body">
            <div class="star-rating">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
            <h3 class="card-title">${woman[i].name}</h3>
            <p class="card-text">Color: ${woman[i].color}</p>
            <p class="card-text">Size: ${woman[i].size}</p>
            <p class="card-text">Price: ${woman[i].price1}</p>
          </div>
        </div>
      </div>`;
  }

  atelierDetailsElement.innerHTML = atlah; // Update the innerHTML of the atelierDetails element
  console.log('Data displayed:', woman);
}

function navigateToDetails(id) {
  localStorage.setItem('SelectedAtelierId', id);

  // Redirect to the details page
  window.location.href = 'alehdetail.html';
}

function setupSearch(woman) {
  document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase(); 
    const filteredData = woman.filter(item => item.name.toLowerCase().includes(searchTerm)); 
    displayData(filteredData);
  });
}

function addClickEvent() {
  const containers = document.querySelectorAll('.card');
  containers.forEach(container => {
    container.addEventListener('click', () => {
      const id = container.getAttribute('data-id');
      localStorage.setItem('SelectedPerson', id);

      // Re-fetch data to update the display for the selected store
      fetchData();
    });
  });
}

// Initial fetch call
fetchData().then(() => {
  addClickEvent();
});
