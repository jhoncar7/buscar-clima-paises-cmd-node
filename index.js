const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();

/* console.log(process.env) */

const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const termino = await leerInput('Ingrese Ciudad:');
                const lugares = await busquedas.ciudad(termino); // arreglo de lugares
                const id = await listarLugares(lugares);
                if (id === '0') continue;
                const lugarSel = lugares.find(lugar => lugar.id === id);

                busquedas.agregarHistoria(lugarSel.nombre);
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                console.log('\nInformacion de la ciudad \n'.green)
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Minima: ', clima.min);
                console.log('Maxima: ', clima.max);
                console.log('Como esta el clima: ', clima.desc.green);
                break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`)
                })
                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);
}

main();