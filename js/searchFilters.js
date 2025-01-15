document.addEventListener('DOMContentLoaded', () => {
	const applyFiltersBtn = document.getElementById('applyFiltersBtn');
	const clearFiltersBtn = document.getElementById('clearFiltersBtn');
	const searchTermInput = document.getElementById('searchTerm');
	const startDateInput = document.getElementById('startDate');
	const endDateInput = document.getElementById('endDate');
	const countriesList = document.getElementById('countriesList');
	const citiesList = document.getElementById('citiesList');
	const eventItems = document.querySelectorAll('.entries-list > div');

	const countrySet = new Set();
	eventItems.forEach((item) => {
		const country = item.querySelector('.country')?.innerText || '';
		if (country.trim() !== '') {
			countrySet.add(country);
		}
	});

	// Create a checkbox for each unique country
	countrySet.forEach((country) => {
		const label = document.createElement('label');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.value = country;
		checkbox.className = 'country-checkbox';

		// Build label with checkbox inside
		label.appendChild(checkbox);
		label.appendChild(document.createTextNode(' ' + country));
		countriesList.appendChild(label);

		// Add spacing or line breaks if desired
		//countriesList.appendChild(/*document.createElement('br')*/);
		//countriesList.appendChild(document.createTextNode(' · '));
	});

	const citySet = new Set();
	eventItems.forEach((item) => {
		const city = item.querySelector('.city')?.innerText || '';
		if (city.trim() !== '') {
			citySet.add(city);
		}
	});

	// Create a checkbox for each unique city
	citySet.forEach((city) => {
		const label = document.createElement('label');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.value = city;
		checkbox.className = 'city-checkbox';

		// Build label with checkbox inside
		label.appendChild(checkbox);
		label.appendChild(document.createTextNode(' ' + city));
		citiesList.appendChild(label);

		// Add spacing or line breaks if desired
		//citiesList.appendChild(/*document.createElement('br')*/);
		//citiesList.appendChild(document.createTextNode(' · '));
	});

	// STEP 2. On page load, parse filters from URL if present
	function loadFiltersFromURL() {
		const query = new URLSearchParams(window.location.search);

		// Get each parameter from the URL (if it exists)
		const searchTerm = query.get('searchTerm') || '';
		const startDate = query.get('startDate') || '';
		const endDate = query.get('endDate') || '';

		// Restore country checkboxes
		const urlCountries = query.getAll('country');
		// Note: getAll() retrieves multiple values if the parameter appears multiple times.
		// If your URL structure is different (e.g., a single comma-separated list),
		// you'll need to split it manually.
		const countryCheckboxes = document.querySelectorAll('.country-checkbox');
		countryCheckboxes.forEach((cb) => {
			// Check the box if it's in the URL's list
			cb.checked = urlCountries.includes(cb.value);
		});

		// Restore country checkboxes
		const urlCities = query.getAll('city');
		// Note: getAll() retrieves multiple values if the parameter appears multiple times.
		// If your URL structure is different (e.g., a single comma-separated list),
		// you'll need to split it manually.
		const cityCheckboxes = document.querySelectorAll('.city-checkbox');
		cityCheckboxes.forEach((cb) => {
			// Check the box if it's in the URL's list
			cb.checked = urlCities.includes(cb.value);
		});

		// Update the input fields
		searchTermInput.value = searchTerm;
		startDateInput.value = startDate;
		endDateInput.value = endDate;

		// Apply filters
		applyFilters();
	}

	// ---------------------------------------------
	// STEP 3: UNIFIED FILTER FUNCTION
	// ---------------------------------------------
	function applyFilters() {
		const searchTerm = searchTermInput.value.toLowerCase().trim();
		const startDate = new Date(startDateInput.value);
		const endDate = new Date(endDateInput.value);

		// Check if start or end dates are valid
		const startDateValid = !isNaN(startDate.getTime());
		const endDateValid = !isNaN(endDate.getTime());

		// Collect all selected countries
		const checkedCountries = Array.from(
			document.querySelectorAll('.country-checkbox:checked')
		).map((checkbox) => checkbox.value);

		// Collect all selected countries
		const checkedCities = Array.from(
			document.querySelectorAll('.city-checkbox:checked')
		).map((checkbox) => checkbox.value);

		// For each event, decide whether to display or hide
		eventItems.forEach((item) => {
			// Title & description check
			const titleText = (item.querySelector('h3')?.innerText || '').toLowerCase();
			const descText = (item.querySelector('p')?.innerText || '').toLowerCase();

			const textMatches =
				searchTerm === '' ||
				titleText.includes(searchTerm) ||
				descText.includes(searchTerm);

			// Country check
			const itemCountry = (item.querySelector('.country')?.innerText || '').trim();
			// If no checkboxes are selected, do not filter by country.
			// Otherwise, ensure the item country is in the list of checkedCountries.
			let countryMatches = true;
			if (checkedCountries.length > 0) {
				countryMatches = checkedCountries.includes(itemCountry);
			}

			// City check
			const itemCity = (item.querySelector('.city')?.innerText || '').trim();
			// If no checkboxes are selected, do not filter by city.
			// Otherwise, ensure the item country is in the list of checkedCountries.
			let cityMatches = true;
			if (checkedCities.length > 0) {
				cityMatches = checkedCities.includes(itemCity);
			}

			// Date check
			const eventDateStr = item.getAttribute('data-date') || '';
			const eventDate = eventDateStr ? new Date(eventDateStr) : new Date('Invalid');

			let dateMatches = true;
			// If user has set a start date, exclude items with invalid/before date
			if (startDateValid) {
				if (isNaN(eventDate.getTime()) || eventDate < startDate) {
					dateMatches = false;
				}
			}
			// If user has set an end date, exclude items with invalid/after date
			if (endDateValid) {
				if (isNaN(eventDate.getTime()) || eventDate > endDate) {
					dateMatches = false;
				}
			}

			// FINAL DECISION: must pass text, country, AND date filters
			if (textMatches && countryMatches && cityMatches && dateMatches) {
				item.style.display = '';
			} else {
				item.style.display = 'none';
			}
		});
	}

	// 4. Update URL with current filter settings
	function updateURLWithFilters() {
		const query = new URLSearchParams();

		// Only set parameters if they're non-empty
		if (searchTermInput.value.trim() !== '') {
			query.set('searchTerm', searchTermInput.value);
		}
		if (startDateInput.value) {
			query.set('startDate', startDateInput.value);
		}
		if (endDateInput.value) {
			query.set('endDate', endDateInput.value);
		}

		// Add country parameters, one per checkbox
		const countryCheckboxes = document.querySelectorAll('.country-checkbox:checked');
		countryCheckboxes.forEach((cb) => {
			query.append('country', cb.value);
		});

		// Add country parameters, one per checkbox
		const cityCheckboxes = document.querySelectorAll('.city-checkbox:checked');
		cityCheckboxes.forEach((cb) => {
			query.append('city', cb.value);
		});

		const newURL = window.location.pathname + '?' + query.toString();
		// Update the URL without reloading the page
		window.history.replaceState({}, '', newURL);
	}

	// 5. Unified event handler to apply filters and update URL
	function applyFiltersAndUpdateURL() {
		applyFilters();
		updateURLWithFilters();
	}

	// ---------------------------------------------
	// STEP 6: CLEAR FILTERS
	// ---------------------------------------------
	function clearFilters() {
		searchTermInput.value = '';
		startDateInput.value = '';
		endDateInput.value = '';

		// Uncheck all country checkboxes
		const allCountryCheckboxes = document.querySelectorAll('.country-checkbox');
		allCountryCheckboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});

		// Uncheck all city checkboxes
		const allCitiesCheckboxes = document.querySelectorAll('.city-checkbox');
		allCitiesCheckboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});

		window.history.replaceState({}, '', window.location.pathname);

		// Show all items
		eventItems.forEach((item) => {
			item.style.display = '';
		});
	}

	// ---------------------------------------------
	// STEP 7: SETUP EVENT LISTENERS
	// ---------------------------------------------
	applyFiltersBtn.addEventListener('click', applyFiltersAndUpdateURL);
	clearFiltersBtn.addEventListener('click', clearFilters);

	// Initial load: parse any existing params from the URL and apply them
	loadFiltersFromURL();
});
