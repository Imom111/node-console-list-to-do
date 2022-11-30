const Tarea = require('./tarea.js');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasDeArray( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(  ){
        const list = Object.values(this._listado);
        console.log();
        list.forEach((tarea, i) => {
            const id = `${i+1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${ id }. ${ desc } :: ${ estado } `);
        });
    }

    listadoCompletadas(  ){
        const list = Object.values(this._listado);
        console.log();
        let contador = 0;
        list.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea;
            if (completadoEn) {
                contador ++;
                const id = `${contador}`.green;
                const estado = `${tarea.completadoEn}`.green;
                console.log(`${ id }. ${ desc } :: ${ estado } `);
            }
        });
    }

    listadoPendientes(  ){
        const list = Object.values(this._listado);
        console.log();
        let contador = 0;
        list.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            if (!completadoEn) {
                contador ++;
                const id = `${contador}`.green;
                const estado = 'Pendiente'.red;
                console.log(`${ id }. ${ desc } :: ${ estado } `);
            }
        });
    }

    borrarTarea( id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleComplete( ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;