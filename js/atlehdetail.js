async function fetchAtelierDetails() {
    try {
      const response = await fetch('pageatlah.json');
      const data = await response.json();
  
      // Get the selected atelier ID from localStorage
      const selectedAtelierId = localStorage.getItem('SelectedAtelierId');
  
      // Filter the data to get the details for the selected atelier
      const selectedAtelier = data.find(item => item.ID.toString() === selectedAtelierId);
  
      // Display the selected atelier details
      displayAtelierDetails(selectedAtelier);
      console.log(localStorage.getItem('SelectedPerson'));
      
    } catch (error) {
      console.error('Error fetching atelier details:', error);
      console.log(localStorage.getItem('SelectedPerson'));
    }
  }
  
  function displayAtelierDetails(atelier) {
    const detailsContainer = document.getElementById('atelierDetails');
  
    if (atelier) {
      detailsContainer.innerHTML = `
        <div class="card">
          <img src="${atelier.img}" class="card-img-top" alt="Atelier Image">
          <div class="card-body">
            <h3 class="card-title">${atelier.name}</h3>
            <p class="card-text">Color: ${atelier.color}</p>
            <p class="card-text">Size: ${atelier.size}</p>
            <p class="card-text">Price: ${atelier.price1}</p>
          </div>
        </div>`;
    } else {
      detailsContainer.innerHTML = `<p>Atelier not found.</p>`;
    }
  }
  
  // Fetch atelier details on page load
  fetchAtelierDetails();
  