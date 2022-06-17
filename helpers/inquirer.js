const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desa hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`,
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`,
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`,
            }
        ],

    }
]

const inquirerMenu = async () => {
    //console.clear();
    console.log('===================================='.green);
    console.log('Seleccione una opcion:'.white);
    console.log('====================================\n'.green);

    const { opcion } = await inquirer
        .prompt(preguntas)
    /*         .then((answers) => {
                // Use user feedback for... whatever!!
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            }); */

    return opcion;
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const pausa = async () => {
    await inquirer.prompt([{
        type: 'keypress',
        name: 'enter',
        message: `Pulse cualquier ${'tecla'.green} para continuar...`,
    }]);
}

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, idx) => {
        return {
            value: lugar.id,
            name: `${(idx + 1).toString().green}. ${lugar.nombre}`
        }
    })

    //agrega al principio de las opciones una opcion para salir
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar:',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm', //regresa un valor booleano
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        return {
            value: tarea.id,
            name: `${(idx + 1).toString().green}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione tareas a completar',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
}