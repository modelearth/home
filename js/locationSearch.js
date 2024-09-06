document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('autocomplete-input');
  const resultsContainer = document.getElementById('autocomplete-results');
  const loading = document.getElementById('loading');

  let items = [];
  let zip = "";
  const requestsDiv = document.getElementById('requests');

  // Address auto-complete using hereapi.com
  async function fetchLocations(inputValue) {
    if (!inputValue) return;
    loading.style.display = 'block';
    try {
      const response = await fetch(`https://autocomplete.search.hereapi.com/v1/autocomplete?apiKey=14B6Yr62CTa_mKKoYViJQClxjjA32S6pL4Ir2ehCMcY&q=${inputValue}&maxresults=5`);
      const data = await response.json();
      console.log(data.items)
      items = data.items.map(item => ({
        id: item.id,
        title: item.title,
        address: item.address.label,
        zip: item.address.postalcode
      }));
      loading.style.display = 'none';
      renderResults();
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.style.display = 'none';
      items = [];
      renderResults();
    }
  }

  function renderResults() {
    resultsContainer.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.title;
      li.className = 'autocomplete-item';
      li.addEventListener('click', () => {
        input.value = item.title;
        globalAddress = item.address;
        // zip = item.zip
        // zip = item.address.postalcode; // For button click
        //alert(zip)
        console.log('Selected item', item);

        requestsDiv.innerHTML = globalAddress;
        resultsContainer.innerHTML = '';
      });
      resultsContainer.appendChild(li);
    });
  }

  input.addEventListener('input', function () {
    const value = input.value;
    fetchLocations(value);
  });

  document.getElementById("autocomplete-button").addEventListener("click", function() {
    window.location.href = "/RealityStream/#zip=" + zip;
  });
});

var globalAddress = "";

function updateGlobalAddress() {
  var inputField = document.getElementById("autocomplete-input");
  globalAddress = inputField.value;
  console.log("Global Address Updated: " + globalAddress);
}
