$(document).ready(function() {
	var questt = "";
	var anss1 = "";
	var anss2 = "";
	var anss3 = "";

	function create() {
		var parametros={
		"Usr":""
		};
		$.ajax({
			data: parametros,
			url: "php/cuadrado.php",
			type: "post",
			success:function(response){
				var cubas = response.trim();
				if(prevcuadbas != cubas)
					{
						cuadrado.height = 300;
					}
				dibujar_cuadrado(cubas);
				var texto = "Lado: "+cubas+" || Area: "+((cubas)*(cubas))+" || Perimetro: "+cubas*4;
				$("#lblCuadrado").text(texto);
				prevcuadbas = cubas;
			}
		});
	}

	
});