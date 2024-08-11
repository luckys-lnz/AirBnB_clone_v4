$(document).ready(function () {
  const checkedAmenities = {};

  // Event handler for the checkbox
  $('input[type="checkbox"]').change(function () {
    // Get value of data-id attribute
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");
    if ($(this).is(":checked")) {
      // Add to dictionary of amenity ids
      checkedAmenities[amenityId] = amenityName;
    } else {
      // Remove the id from amenity ids
      delete checkedAmenities[amenityId];
    }
    // Convert the dictionary to a list of names
    const checkedAmenitiesList = Object.values(checkedAmenities);
    $("div.amenities h4").text(checkedAmenitiesList.join(", "));
  });

  // Event handler for status
  $.get("http://127.0.0.1:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  // Event handler for filter button
  $("#filter-button").click(function () {
    // Convert the checked amenities to a list of ids
    const checkedAmenitiesList = Object.keys(checkedAmenities);

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5001/api/v1/places_search",
      dataType: "json",
      data: JSON.stringify({ amenities: checkedAmenitiesList }),
      contentType: "application/json; charset=utf-8",
      success: function (places) {
        $(".places").empty(); // Clear previous results
        for (let i = 0; i < places.length; i++) {
          $(".places").append(`
            <article>
              <div class="title_box">
                <h2>${places[i].name}</h2>
                <div class="price_by_night">${places[i].price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${places[i].max_guest} ${
            places[i].max_guest > 1 ? "Guests" : "Guest"
          }</div>
                <div class="number_rooms">${places[i].number_rooms} ${
            places[i].number_rooms > 1 ? "Bedrooms" : "Bedroom"
          }</div>
                <div class="number_bathrooms">${places[i].number_bathrooms} ${
            places[i].number_bathrooms > 1 ? "Bathrooms" : "Bathroom"
          }</div>
              </div>
              <div class="user"></div>
              <div class="description">${places[i].description}</div>
            </article>
          `);
        }
      },
      error: function (status, error) {
        console.error("Error:", status, error);
      },
    });
  });
});

