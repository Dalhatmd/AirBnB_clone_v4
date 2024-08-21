$(document).ready(function () {
  let selectedAmenities = [];

$(".amenities input[type='checkbox']").change(function() {
  let amenityID = $(this).data("id");

  if ($(this).is("checked")) {
    selectedAmenities.push(amenityID);
} else {
    selectedAmenities = selectedAmenities.filter(function(id) {
	  return id !== amenityId;
  });
}


 let amenityNames = selectedAmenities.map(function(id) {
  return $(".amenities li[data-id='" + id + "']".text();
})
.join(", ")
$(".amenities h4").text(amenityNames || "&nsbsp;");
});
});
