require('colors');
// const { mostrarMenu, pausa } = require('./helpers/mensajes.js');
const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
 } = require('./helpers/inquirer.js');
const { guardarDB, leerDB } = require('./db/guardarArchivo.js');
const Tareas = require('./models/Tareas.js');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasDeArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listadoCompletadas();
                break;
            case '4':
                tareas.listadoPendientes();
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleComplete(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }
        guardarDB( tareas.listadoArr );
        if(opt !== '0') {
            await pausa();
        } else {
            console.log('Bye!');
        }
    } while (opt !== '0');
}

main();