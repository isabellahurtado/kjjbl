  var config = {
  	apiKey: "AIzaSyALFZzC68aa4srh2VMl8EaipmqRqgCFeg4",
  	authDomain: "proyecto-de-nub.firebaseapp.com",
  	databaseURL: "https://proyecto-de-nub.firebaseio.com",
  	projectId: "proyecto-de-nub",
  	storageBucket: "proyecto-de-nub.appspot.com",
  	messagingSenderId: "98227132655"
  };
  firebase.initializeApp(config);
  
  const nombreDeusuario = prompt("Deme su nombre ome");
  const database = firebase.database();
  
  $("button").click( function( evento ) {
  	evento.preventDefault();
  	var mensaje = $("#mensaje").val();

  	var data = { usuario: nombreDeusuario, mensaje: mensaje };
  	database.ref("chat/").push(data, function( error ) {
  		if (error) { throw error; }
  		else { console.info( 'Guardamos la informacion');
  		ponerMensaje(data);
  		$("#mensaje").val("")
  	}
  });
  });


  function ponerMensaje( Pepito ) {
  	$("#caja").append( "<p>" + Pepito.usuario  + ":" + Pepito.mensaje + "<p>" );
  }

  function iterar(data) {
  	for ( var mutacion in data) {
  		if (data.hasOwnProperty( mutacion ) ) {
  			var elemento =  data[mutacion];
  			var alien = { usuario : elemento.usuario, mensaje: elemento.mensaje};
  			ponerMensaje( alien );
  		}
  	}

 }

  var traerMensajes = new Promise(function(res, rej) {
  	var mensaje = database.ref("/chat").once("value").then(function(snapshot){
  		return res( snapshot.val() );
  	});
  	if (!mensaje) { return rej(); }
  });

  	traerMensajes.then(function(data) {
  		iterar(data);

  	});