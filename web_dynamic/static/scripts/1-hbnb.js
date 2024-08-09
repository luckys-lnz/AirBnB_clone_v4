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
});
