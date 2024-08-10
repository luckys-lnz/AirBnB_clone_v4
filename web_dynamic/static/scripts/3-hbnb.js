$(document).ready(function () {
  const checkedAmenities = {};
  // Event handler for the checkbox
  $('input[type="checkbox"]').change(function () {
    // Get value of data-id attribute
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");
    if ($(this).is(":checked")) {
      // add to dictionary of amenity ids
      checkedAmenities[amenityId] = amenityName;
    } else {
      // remove the id from amenity ids
      delete checkedAmenities[amenityId];
    }
    // Convert the dict to list of id's
    const checkedAmenitiesList = Object.values(checkedAmenities);
    $("div.amenities h4").text(checkedAmenitiesList.join(", "));
  });

  // Event handler for status
  $.get("http://127.0.0.1:5001/api/v1/status/", function (data) {
    if (data.status == "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
$.ajax({
  type: "POST",
  url: "http://0.0.0.0:5001/api/v1/places_search",
  dataType: "json",
  data: "{}",
  contentType: "application/json; charset=utf-8",
  success: function (places) {
    for (let i = 0; i < places.length; i++) {
      $(".places").append(`<article>
<div class="title_box">
<h2> ${places[i].name}</h2>
<div class="price_by_night"> ${places[i].price_by_night} </div>
</div>
<div class="information">
<div class="max_guest">${places[i].max_guest}
${places[i].max_guest > 1 ? "Guests" : "Guest"} </div>
<div class="number_rooms">${places[i].number_rooms}
${places[i].number_rooms > 1 ? "Bedrooms" : "Bedroom"}  </div>
<div class="number_bathrooms">${places[i].number_bathrooms}
${places[i].number_bathrooms > 1 ? "Bathrooms" : "Bathroom"}  </div>
</div>
<div class="user">
</div>
<div class="description">
${places[i].description}
</div>
</article>
`);
    }
  },
});
