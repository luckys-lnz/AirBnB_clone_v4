$(document).ready(function () {
  const checkedAmenities = {};
  // Event handler for the checkbox
  $('input[type="checkbox"]').change(function () {
    // Get value of data-id attribute
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      // add to dictionary of amenity ids
      checkedAmenities[amenityId] = amenityName;
    } else {
      // remove the id from amenity ids
      delete checkedAmenities[amenityId];
    }
    // Convert the dict to list of id's
    const checkedAmenitiesList = Object.values(checkedAmenities);
    $('div.amenities h4').text(checkedAmenitiesList.join(', '));
  });

  // Event handler for status
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status == 'OK') {
      $('#api_status').addClass('available');
    }
    else {
      $('#api_status').removeClass('available');
    }
  });
});
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
      }
    }
  });
