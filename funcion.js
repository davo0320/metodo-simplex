function condicaoParada(p_matriz) {
	var i = p_matriz.length - 1;

	for (j = 1; j < p_matriz[i].length; j++) {
		if (p_matriz[i][j] > 0) {
			return true;
		}
	}
	return false;
}

function calcMatriz(p_matriz) {
	var nrenglones = p_matriz.length - 1;
	var ncolumnas = p_matriz[nrenglones].length - 1;

	// Escolhendo qual colocar como variável básica
	var maior = p_matriz[nrenglones][1];
	indMaior = 1;
	for (j = 2; j <= ncolumnas; j++) {
		if (p_matriz[nrenglones][j] > maior) {
			maior = p_matriz[nrenglones][j];
			indMaior = j;
		}
	}

	// Escolhendo qual variável básica sai
	var menor = Number.MAX_VALUE;
	var indMenor = 0;
	for (k = 1; k < nrenglones; k++) {
		var teste = p_matriz[k][ncolumnas] / p_matriz[k][indMaior]; //não testou após mudança
		if (p_matriz[k][indMaior] != 0 && teste < menor && teste >= 0 ) { //não testou após mudança
			menor = p_matriz[k][ncolumnas] / p_matriz[k][indMaior];
			indMenor = k;
		}
	}
	var v_in = p_matriz[0][indMaior];
	var v_out = p_matriz[indMenor][0];
	document.getElementById("tab").innerHTML+="<p>Reemplazo en VB: Entre "+v_in.substr(0,1)+"<sub>"+v_in.substr(1,1)+"</sub> y  "+v_out.substr(0,1)+"<sub>"+v_out.substr(1,1)+"</sub></p>";
	p_matriz[indMenor][0] = p_matriz[0][indMaior];
	
	printtabla(p_matriz);
	

	// Deixando o valor da nova variável básica == 1
	var aux = p_matriz[indMenor][indMaior];
	if (aux != 1) {
		for (l = 1; l <= ncolumnas; l++) {
			p_matriz[indMenor][l] = p_matriz[indMenor][l] / aux;
		}
		var fraccion = new Fraction(1/aux);
		var numFormatado = fraccion.toFraction();
		document.getElementById("tab").innerHTML+="<p>Renglon "+indMenor+" = Renglon "+indMenor+" * "+numFormatado+"</p>";
		printtabla(p_matriz);
	}

	// Zerando os outros valores na columna da nova variável básica
	for (i = 1; i <= nrenglones; i++) {
		var aux = p_matriz[i][indMaior];
		if (i != indMenor && aux != 0) {
			for (j = 1; j <= ncolumnas; j++) {
				p_matriz[i][j] = parseFloat(p_matriz[i][j]) + parseFloat(-1 * aux * p_matriz[indMenor][j]);
			}
			var fraccion = new Fraction(-1*aux);
			var numFormatado = fraccion.toFraction();
			document.getElementById("tab").innerHTML+="<p>Renglon "+i+" = Renglon "+i+" + ("+numFormatado+") * Renglon "+indMenor+"</p>";
			printtabla(p_matriz);
		}
	}
}

//Bloquea la edición de las entradas.
function esconder(p_variables, p_restricciones) {
	for (i = 1; i <= p_variables; i++) {
		document.getElementById('y'+i).style = "-moz-appearance:textfield;";
		document.getElementById('y'+i).style.border = "0";
		document.getElementById('y'+i).readOnly = true;
		for (j = 1; j <= p_restricciones; j++) {
			document.getElementById('x'+j+i).style = "-moz-appearance:textfield;";
			document.getElementById('x'+j+i).style.border = "0";
			document.getElementById('x'+j+i).readOnly = true;
		}
	}
	for (j = 1; j <= p_restricciones; j++) {
		document.getElementById('Const'+j).style = "-moz-appearance:textfield;";
		document.getElementById('Const'+j).style.border = "0";
		document.getElementById('Const'+j).readOnly = true;
	}
}

function validarCoeficientes(p_variables, p_restricciones) {
	for (i = 1; i <= p_variables; i++) {
		if (document.getElementById('y'+i).value == "") {
			document.getElementById('y'+i).focus();
			alert('Ingrese los valores de todos los coeficientes.');
			return 1;
		}
		for (j = 1; j <= p_restricciones; j++) {
			if (document.getElementById('x'+j+i).value == "") {
				document.getElementById('x'+j+i).focus();
				alert('Ingrese los valores de todos los coeficientes.');
				return 1;
			}
		}
	}
	for (j = 1; j <= p_restricciones; j++) {
		if (document.getElementById('Const'+j).value == "") {
			document.getElementById('Const'+j).focus();
			alert('Ingrese el valor de todas las constantes');
			return 1;
		}
	}
}

function atualizar() {
	window.location.href='simplex.html';
}

function mouseIn(id) {
	document.getElementById("btnImg").src = "info_azul.png"
}

function mouseOut(id) {
	document.getElementById("btnImg").src = "info.png"
}


function crearFormato(p_variables, p_restricciones) {
	
	if (p_variables == "" || p_variables <= 0 || p_variables != parseInt(p_variables)) {
		alert('La cantidad de variables no puede estar vacía');
		form1.variables.focus();
		return;
	} else {
		if (p_restricciones == "" || p_restricciones <= 0 || p_restricciones != parseInt(p_restricciones)) {
			alert('La cantidad de restricciones no puede estar vacía.');
			form1.restricciones.focus();
			return;
		}
	}
	if (p_variables > 0 && p_restricciones > 0) {
		document.getElementById("form2").style.display = 'block';
		document.getElementById("aqui").innerHTML+="<span>Z = </span>";
		document.getElementById("aqui").innerHTML+="<input type='number' class='inputZ' required autocomplete='off' size='5' maxlength='10' step='0.1' id='y1' name='y1' />x<sub>1</sub>";
		for (var h = 2; h <= p_variables; h++) {
			document.getElementById("aqui").innerHTML+=" + <input type='number' class='inputZ' required autocomplete='off' size='5' maxlength='10' step='0.1' id='y"+h+"' name='y"+h+"' />x<sub>"+h+"</sub>";
		}
		for (var i = 1; i <= p_restricciones; i++) {
			document.getElementById("aqui").innerHTML+="<p><Const>Restricción "+i+"</Const></p>";
			document.getElementById("aqui").innerHTML+="<input type='number' class='input' required autocomplete='off' size='5' maxlength='10' step='0.1' id='x"+i+"1' name='x"+i+"1' />x<sub>1</sub>";
			for (var j = 2; j <= p_variables; j++) {
				document.getElementById("aqui").innerHTML+=" + <input type='number' class='input' required autocomplete='off' size='5' maxlength='10' step='0.1' id='x"+i+j+"' name='x"+i+j+"' />x<sub>"+j+"</sub>";
			}
			document.getElementById("aqui").innerHTML+="<span> <= </span>"
			+"<input type='number' class='input' required size='5' maxlength='10' id='Const"+i+"' name='Const"+i+"' style='text-align:left' />";
		}
		document.getElementById("aqui").innerHTML+="<p><Const>Restricción "+(++p_restricciones)+"</Const></p>"
		+"<p>x<sub>i</sub> >= 0</p>";
		document.getElementById("btn1").style.display = 'none';
		document.getElementById("in1").disabled = true;
		document.getElementById("in2").disabled = true;
		document.getElementById('y1').focus();
	}
} 

function printtabla(p_matriz) {
	var restricciones = parseInt(document.form1.restricciones.value);
	var variables = parseInt(document.form1.variables.value);
	var renglones = restricciones+1;
	var columnas = restricciones + variables+1;
	var tabla = document.createElement("table");
	tabla.className = "table table-striped";
	var thead = document.createElement("thead");
	var tbody=document.createElement("tbody");
  
	var tr = document.createElement("tr");
	for (var l = 0; l <= columnas; l++) {
		var variable = p_matriz[0][l];
		var th = document.createElement("th");
		if(l == 0) {
			var texto = document.createTextNode(variable);
			th.appendChild(texto)
		} else {
			var sub = document.createElement("sub");
			var textoSub = document.createTextNode(variable.substr(1,1));
			var texto = document.createTextNode(variable.substr(0,1));
			sub.appendChild(textoSub)
			th.appendChild(sub);
			th.insertBefore(texto, th.firstChild);
		}
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	
	for(var n = 1; n <= renglones; n++) {
		var tr = document.createElement("tr");
		for(var o = 0; o <= columnas; o++) {
			var variable = p_matriz[n][o];
			var td = document.createElement("td");
			if (o == 0 && n < renglones) {
				var sub = document.createElement("sub");
				var Const = document.createElement("Const");
				var textoSub = document.createTextNode(variable.substr(1,1));
				var texto = document.createTextNode(variable.substr(0,1));
				sub.appendChild(textoSub)
				Const.appendChild(sub);
				Const.insertBefore(texto, Const.firstChild);
				td.appendChild(Const);
			} else {
				if (variable != '-Z') {
					var fraccion = new Fraction(variable);
					variable = fraccion.toFraction();
					var texto = document.createTextNode(variable);
					td.appendChild(texto);
				} else {
					var Const = document.createElement("Const");
					var texto = document.createTextNode(variable);
					Const.appendChild(texto);
					td.appendChild(Const);
				}
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	tabla.appendChild(thead);
	tabla.appendChild(tbody);
	tabla.border = 1;
	document.getElementById("tab").appendChild(tabla);
}

function resolver() {
	var restricciones = parseInt(document.form1.restricciones.value);
	var variables = parseInt(document.form1.variables.value);	
	var renglones = parseInt(document.form1.restricciones.value) + 1;
	var columnas = parseInt(document.form1.variables.value) + parseInt(document.form1.restricciones.value) + 1;
	
	if (validarCoeficientes(variables, restricciones) == 1) {
		return;
	}
	esconder(variables, restricciones);
	
	document.getElementById("btn2").style.display = 'none';
	document.getElementById("btn3").style.display = 'none';
	document.getElementById("tab").innerHTML+="<h2>Solución</h2>";
	document.getElementById("tab").innerHTML+="<hr/>";
	matriz = [[]];
	matriz[0][0] = 'VB';
	
	var indice = 1;
	for (var l = 1; l <= variables; l++) {
		matriz[0][indice] = "x"+indice;
		indice++;
	}
	for (var m = 1; m <= restricciones; m++) {
		matriz[0][indice] = "h"+m;
		indice++;
	}
	
	matriz[0][matriz[0].length] = 'Const';

	// Adicionando renglones com as variavéis básicas. Ex: 'f1', 'f2'
	var x = document.querySelectorAll(".input");
	indice = 0;
	var columna = 0;
	for (var i = 1; i < renglones; i++) {
		matriz.push(['h'+i]);
		for (var j = 1; j <= variables; j++) {
			matriz[i][j] = parseFloat(x[indice].value.replace(",","."));
			indice++;
		}
		columna = variables + 1;
		for (var k = 1; k <= restricciones; k++) {
			if(i==k) {
				matriz[i][columna] = 1;
			} else {
				matriz[i][columna] = 0;
			}
			columna++;
		}
		matriz[i][columna] = x[indice].value;
		indice++;
	}
	

	// Adicionando a última Renglon '-Z'
	var z = document.querySelectorAll(".inputZ");
	columna = 0;
	matriz.push(['-Z']);
	for (var l = 0; l < variables; l++) {
		matriz[renglones][l+1] = parseFloat(z[l].value.replace(",","."));
	}
	columna = variables + 1;
	for (var m = 1; m <= restricciones; m++) {
		matriz[renglones][columna] = 0;
		columna++;
	}
	matriz[renglones][columna] = 0;
	
	printtabla(matriz);
	
	var ite = 1;
	while (condicaoParada(matriz)) {
		document.getElementById("tab").innerHTML+="<p><Const>Iteración "+ite+"</Const></p>";
		calcMatriz(matriz);
		ite++;
	}
	
	var solucion = "Solución: ";
	
	for (var n = 1; n <= variables; n++) {
		var valor = 0;
		for (var o = 1; o <= restricciones; o++) {
			if (matriz[o][0] == 'x'+n) {
				valor = matriz[o][columnas];
				break;
			}
		}
		var fraccion = new Fraction(valor);
		var numFormatado = fraccion.toFraction();
		if (n == variables) {
			solucion += "x<sub>"+n+"</sub> = "+numFormatado;
		} else {
			solucion += "x<sub>"+n+"</sub> = "+numFormatado+", ";
		}
	}
	var fraccion = new Fraction((matriz[renglones][columnas])*-1);
	var z = fraccion.toFraction();
	solucion += " y Z = "+z;
	document.getElementById("tab").innerHTML+="<p><Const>"+solucion+"</Const></p>";
	document.getElementById("btn4").type = 'button';
}