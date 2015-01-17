function dibujar_circulo(r){
	var radio = r*2;
	var circulo = document.getElementById("can-circulo");
	var ctxcirculo = circulo.getContext("2d");
	ctxcirculo.beginPath();
	ctxcirculo.arc(150,150,radio,0,2*Math.PI);
	ctxcirculo.stroke();
}

function dibujar_rectangulo(b,a){
	var b1 = b*2;
	var a1 = a*2;
	var x = (300-b1)/2;
	var y = (300-a1)/2;
	var rectangulo=document.getElementById("can-rectangulo");
	var ctxrectangulo=rectangulo.getContext("2d");
	ctxrectangulo.fillStyle="#FF6828";
	ctxrectangulo.fillRect(x,y,b1,a1);
}

function dibujar_cuadrado(b){
	var b1 = b*2;
	var x = (300-b1)/2;
	var y = (300-b1)/2;
	var cuadrado=document.getElementById("can-cuadrado");
	var ctxcuadrado=cuadrado.getContext("2d");
	ctxcuadrado.fillStyle="#106828";
	ctxcuadrado.fillRect(x,y,b1,b1);
}

function dibujar_triangulo(b,a){
	var b1 = b*2;
	var a1 = a*2;
	var x1 = (300-b1)/2;
	var y1 = ((300-a1)/2)+a1;
	var y2 = (300-a1)/2;
	var x3 = ((300-b1)/2)+b1;
	var y3 = ((300-a1)/2)+a1;
	var triangulo = document.getElementById("can-triangulo");
	var ctxtriangulo = triangulo.getContext("2d");
	// Draw triangle
	ctxtriangulo.fillStyle="#A2322E";
	ctxtriangulo.beginPath();
	// Draw a triangle location for each corner from x:y 100,110 -> 200,10 -> 300,110 (it will return to first point)
	ctxtriangulo.moveTo(x1,y1);
	ctxtriangulo.lineTo(150,y2);
	ctxtriangulo.lineTo(x3,y3);
	ctxtriangulo.closePath();
	ctxtriangulo.fill();
}