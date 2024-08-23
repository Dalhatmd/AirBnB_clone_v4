$(document).ready(function () {
  let selectedAmenities = {};

  $(".amenities input[type='checkbox']").change(function() {
    let amenityId = $(this).data("id");
    let amenityName = $(this).data("name");
    if ($(this).is(":checked")) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    
    let amenityNames = Object.values(selectedAmenities).join(", ");
    $(".amenities h4").text(amenityNames || "&nbsp;");
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  // Function to create a place article
  function createPlaceArticle(place) {
    return `
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>
    `;
  }

  // Make a POST request to fetch places
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(response) {
      // Clear existing places
      $('section.places').empty();
      // Loop through the response and create place articles
      response.forEach(function(place) {
        const articleHtml = createPlaceArticle(place);
        $('section.places').append(articleHtml);
      });
    },
    error: function(xhr, status, error) {
      console.error('Error fetching places:', error);
    }
  });
});
