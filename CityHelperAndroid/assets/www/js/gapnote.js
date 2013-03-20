(function($){
	var nextid = 3;
	var self = $.mobile.CityHelperAndroid ={
			transition:'none',
			checkTransition: function(){
				$.mobile.defaultPageTransition = self.transition;
			},
			
			init: function(){
				self.checkTransition();
				
				$(document).bind('pageinit',function(){
					console.log('pageinit');
					$('#transition').change(function(){
						self.transition = $(this).val();
						self.checkTransition();
					});
					
				});
	
				
				
				$('#negocio').live( 'pageinit',function(event){
					var SelectedOptionClass = $('option:selected').attr('class');
					$('div.ui-select').addClass(SelectedOptionClass);
					
					$('#note_utilisateur').live('change', function(){	 
						$('div.ui-select').removeClass(SelectedOptionClass);
						
						SelectedOptionClass = $('option:selected').attr('class');
						$('div.ui-select').addClass(SelectedOptionClass);		
						
					 });
					
					
					
					
				  
				});
				
				$('#negocio').live( 'pageshow',function(event){
					var fecha = (new Date()).toUTCString();
					$('#fecha').val(fecha);
					
				});
				
				$('#registro').live( 'pageshow',function(){
					$('#regis').off('click').on('click',function(){	 
						self.crearusuario();
					 })
				});

				

			},
			
			connection : null,
			openDatabase : function(){
				self.connection = window.openDatabase("CityHelper", "1.0", "City Helper DB", 200000);
			},
			
			transaction : function(fn,err,succ){
				if(self.connection == null){
					self.openDatabase();
				}
				
				self.connection.transaction(fn, err, succ);
			},
			
		/*	queryDB	:	function(tx,correo){
				tx.executeSql('SELECT IDUSUARIO FROM USUARIOS WHERE CORREO = '+ correo, [], querySuccess, errorCB);

			},
			
			querySuccess	:	function(tx,results){
				  console.log("Returned rows = " + results.rows.length);
				  // this will be true since it was a select statement and so rowsAffected was 0
				  if (!results.rowsAffected) {
				    console.log('No rows affected!');
				    return false;
				  }
				  // for an insert statement, this property will return the ID of the last inserted row
				  console.log("Last inserted row ID = " + results.insertId);
				  nextid = results.insertId.val();
			},
			*/
			crearusuario: function(){
			//	tx.executeSql('CREATE TABLE IF NOT EXISTS NEGOCIOS (IDNEGOCIO INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, NOMBRE VARCHAR(30), DIRECCION VARCHAR(40), DESCRIPCION VARCHAR(150), NUMVALORACIONES INTEGER, VALORACION INTEGER, FOTO TEXT, IDUSUARIO INTEGER, FOREIGN KEY(IDUSUARIO) REFERENCES USUARIOS(IDUSUARIO) ON DELETE CASCADE)');
				
				var	usuario =[
						$('#username').val(),
						$('#password1').val(),
						$('#contacto').val()
				];
				
				
				self.transaction(function(tx){
					console.log(usuario);
					//tx.executeSql('DROP TABLE IF EXISTS USUARIOS');
					//tx.executeSql('DROP TABLE IF EXISTS NEGOCIOS');

					tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIOS (IDUSUARIO INTEGER PRIMARY KEY ASC, USERNAME VARCHAR(20), PASSWORD VARCHAR(20), CORREO VARCHAR(25))');
				    tx.executeSql('INSERT INTO USUARIOS (USERNAME, PASSWORD, CORREO) VALUES (?,?,?)',usuario,function(tx){
				    	console.log('Usuario Perfecto!!!',tx);
				    },function(err){
				    	console.error('Usuario Error',err);
				    });
				    
				    
				    
				//	tx.executeSql('SELECT IDUSUARIO FROM USUARIOS WHERE CORREO = '+ usuario.CORREO  );
					//var nextid = SQLResultSetList;
				
					var	negocio =[$('#nombre').val(),
					   	          $('#direccion').val(),
					   	          $('#descripcion').val(),
					   	          0,
					   	          null,
					   	          null,
					   	          nextid
					];// nombre, direccion, descripcion, numero valoraciones, valoracion media, foto, id usuario
					console.log(negocio);
					tx.executeSql('CREATE TABLE IF NOT EXISTS NEGOCIOS (IDNEGOCIO INTEGER PRIMARY KEY ASC, NOMBRE VARCHAR(20), DIRECCION VARCHAR(80), DESCRIPCION VARCHAR(150), NUMVALORACIONES INTEGER, VALORACION INTEGER, FOTO TEXT, IDUSUARIO,FOREIGN KEY (IDUSUARIO) REFERENCES USUARIOS(IDUSUARIO) ON DELETE CASCADE)');
					tx.executeSql('INSERT INTO NEGOCIOS (NOMBRE, DIRECCION, DESCRIPCION, NUMVALORACIONES, VALORACION, FOTO, IDUSUARIO) VALUES (?,?,?,?,?,?,?)',negocio,function(tx){
				    	console.log('Negocio Perfecto!!!',tx);
				    },function(err){
				    	console.error('Negocio Error',err);
				    });
					
				    
				})
				
				
				
				
			    
			}	
				
		/*	 //   tx.executeSql('INSERT INTO USUARIOS (USERNAME, PASSWORD, CORREO) VALUES (?,?,?)',usuario);
			 //   var id=null;
			 //   idus = tx.executeSql('SELECT IDUSUARIO FROM USUARIOS WHERE CORREO = '+ usuario.CORREO  );

				var	negocio ={
						'NOMBRE'			:	$('#nombre').val(),
						'DIRECCION'			:	$('#direccion').val(),
						'DESCRIPCION'		:	$('#descripcion').val(),
						'NUMVALORACIONES'	:	0,
						'VALORACION'		:	null,
						'FOTO'				:	null,
						'IDUSUARIO'			:	1
						
				};
				console.log(negocio);
				//tx.executeSql('INSERT INTO NEGOCIOS (NOMBRE, DIRECCION, DESCRIPCION, NUMVALORACIONES, VALORACION, FOTO, IDUSUARIO) VALUES (?,?,?,?,?,?,?)',negocio);
				
			    
	
			},
			
			crearcomentario: function(){
				tx.executeSql('CREATE TABLE IF NOT EXISTS COMENTARIO (IDCOMENTARIO INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENTAL, FECHA TEXT, DESCRIPCION VARCHAR(150), IDNEGOCIO INTEGER, FOREIGN KEY (IDNEGOCIO) REFERENCES NEGOCIOS(IDNEGOCIO) ON DELETE CASCADE)');
				var nomb = $('#nombre').val();
				var idneg;
				tx.executeSql('SELECT IDNEGOCIO FROM NEGOCIOS WHERE NOMBRE = ' + nomb);
				
				var	comentario ={
						'FECHA'				:	null,
						'DESCRIPCION'		:	$('#descripcion'),
						'IDNEGOCIO'			:	idneg
				};
				
				
			    tx.executeSql('INSERT INTO COMENTARIO (FECHA, DESCRIPCION, IDNEGOCIO) VALUES (?,?,?)',comentario);
	
			}*/
			
		     
			
	};
	
	self.init();
	
})(jQuery);