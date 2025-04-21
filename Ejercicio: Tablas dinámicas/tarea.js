document.addEventListener('DOMContentLoaded', function() {
    const boton = document.getElementById('boton');
    const formulario = document.querySelector('.persona-form');

    // Variable para controlar si el reset es programático o del usuario
    let resetProgramatico = false;
    
    if (boton && formulario) {
        // Evento para el botón de reset
        formulario.addEventListener('reset', (e) => {
            // Solo mostrar alerta si no es un reset programático
            if (!resetProgramatico) {
                alert('Operación cancelada');
            }
            // Restablecer la bandera
            resetProgramatico = false;
        });

        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            
            let sexoValue = '';
            const sexoOptions = document.getElementsByName('sexo');
            for (let i = 0; i < sexoOptions.length; i++) {
                if (sexoOptions[i].checked) {
                    sexoValue = sexoOptions[i].value;
                    break;
                }
            }
            
            const fechaNac = document.getElementById('fh_nac').value;
            
            let rolValue = '';
            const rolOptions = document.getElementsByName('id_rol');
            for (let i = 0; i < rolOptions.length; i++) {
                if (rolOptions[i].checked) {
                    rolValue = rolOptions[i].value;
                    break;
                }
            }
            
            // Para mostrar en la tabla
            let sexoText = sexoValue === 'h' ? 'Hombre' : (sexoValue === 'm' ? 'Mujer' : 'Otro');
            let rolText = '';
            switch(rolValue) {
                case '1': rolText = 'Alumno'; break;
                case '2': rolText = 'Profesor'; break;
                case '3': rolText = 'Administrativo'; break;
                default: rolText = 'Otro';
            }
            
            // Formatear fecha
            const fecha = new Date(fechaNac);
            const fechaFormateada = fecha.toLocaleDateString();
            
            try {
                // Añadir registro a la tabla
                const tbody = document.querySelector('tbody');
                if (tbody) {
                    const newRow = document.createElement('tr');
                    
                    newRow.innerHTML = `
                        <td>${nombre}</td>
                        <td>${apellido}</td>
                        <td>${sexoText}</td>
                        <td>${fechaFormateada}</td>
                        <td>${rolText}</td>
                    `;
                    
                    tbody.appendChild(newRow);
                }
                
                // Intentar enviar al servidor
                fetch('https://fi.jcaguilar.dev/v1/escuela/persona', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombre: nombre,
                        apellido: apellido,
                        sexo: sexoValue,
                        fh_nac: fechaNac,
                        id_rol: parseInt(rolValue)
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Mostrar mensaje de éxito
                        alert('Registro guardado correctamente en el servidor');
                    } else {
                        alert('El registro se agregó a la tabla pero hubo un problema al guardarlo en el servidor');
                    }
                })
                .catch(err => {
                    console.log('Error al enviar al servidor:', err);
                    alert('El registro se agregó a la tabla pero no se pudo enviar al servidor');
                });
                
                // Limpiar formulario
                resetProgramatico = true;
                formulario.reset();
                
            } catch (error) {
                console.error('Error al procesar el formulario:', error);
                alert('Ocurrió un error al procesar el formulario');
            }
        });
    }
    
    // Simplificar el botón de refrescar
    const botonRefrescar = document.getElementById('refrescarTabla');
    if (botonRefrescar) {
        botonRefrescar.addEventListener('click', function() {
            alert('La tabla muestra los datos locales');
        });
    }
});
