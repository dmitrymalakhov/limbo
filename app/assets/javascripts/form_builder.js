$(document).ready(function() {
	var cities = $("select#cities");
	var regions = $("select#region_id");
	
	regions.on("change", function(){
        get_current_cities();
    });

	function get_current_cities() {
		cities.empty();
		$(".error").empty();

		var id = regions.val();
		
		$.ajax({
			type: 'POST',
			data: {region_id:id},
			url: "/cities",
			success: function (response){				
				$.each(response, function(i,item){
					cities.append(
						$("<option/>").text(item.name).attr({id:item.id})
					);
				})
			},
			error: function (data) {
				$(".error .statusText").html(data["statusText"]);
				$(".error .statusCode").html(data["status"]);
				$(".error .responseText").html(data["responseText"]);
			}
		});
	}
})