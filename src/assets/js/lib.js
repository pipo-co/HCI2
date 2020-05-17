import Api from "./Api.js";
import Device from "./Device";
import Room from "./Room";
import Home from "./Home";
import Routine from "./Routine";


export function createDevice(name, typeId, room) {
    let device = new Device(null, name, { id: typeId }, {fav: false});
    return new Promise( (resolve, reject) => {
    Api.device.add(device)
        .then( data => {
            device.id = data.result.id;
            device.type = data.result.type;
            device.state = data.result.state;

            room.addDevice(device.id)
                .then( () => {
                    device.room = room;
                    resolve(device);
                })
                .catch(error => {
                    reject(`Add Device to Room: ${error}`);
                });
        })
        .catch( error => {
            reject(`Add Device: ${error}`);
        });
    });
}

export function createRoom(name, home){
    let room = new Room(null, name, {});
    return new Promise( (resolve, reject) => {
        Api.room.add(room)
            .then( data => {
                room.id = data.result.id;
                home.addRoom(room.id)
                    .then( () => {
                        room.home = home;
                        resolve(room);
                    })
                    .catch( error => {
                        reject(`Add Room to Home: ${error}`);
                    });
            })
            .catch( error => {
                reject(`Add Room: ${error}`);
            });
    });
}

export function createHome(name){
    let home = new Home(null, name, {});
    return new Promise( (resolve, reject) => {
        Api.home.add(home)
            .then( data => {
                home.id = data.result.id;
                resolve(home);
            })
            .catch( error => {
                reject(`Couldn't Add Home: ${error}`);
            });
    });
}

export function createRoutine(name, actions){
    let routine = new Routine(null, name, { fav: false}, actions, true);
    return new Promise( (resolve, reject) =>
        Api.routine.add(routine)
            .then( data => {
                routine.id = data.result.id;
                resolve(routine);
            })
            .catch( error => reject(`Add Routine ${name} ${error}`)))
}

export function createDeviceFromScratch(homeName, roomName, deviceName, typeId){
    return new Promise( (resolve, reject) => {
        createHome(homeName)
            .then(home => {
                createRoom(roomName, home)
                    .then( room => {
                        createDevice(deviceName, typeId, room)
                            .then( device => resolve(device) )
                            .catch( errors => reject(`Create Device ${deviceName} ${errors}`) );
                    })
                    .catch( errors => reject(`Create Room ${roomName} ${errors}`) );
            })
            .catch( errors => reject(`Create Home ${homeName} ${errors}`) );
    });
}

export function createDeviceFromNotExistingRoom(home, roomName, deviceName, typeId){
    return new Promise( (resolve, reject) => {
        createRoom(roomName, home)
            .then( room => {
                createDevice(deviceName, typeId, room)
                    .then( device => resolve(device) )
                    .catch( errors => reject(`Create Device ${deviceName} ${errors}`) );
            })
            .catch( errors => reject(`Create Room ${roomName} ${errors}`) );
    });
}

export function deviceTypeActionParams(typeId, action){
    return new Promise( (resolve, reject) => {
        Api.deviceType.get(typeId)
            .then( data => resolve( data.result.actions.find(elem => elem.name === action).params ) )
            .catch( error => reject(`Get DeviceType: ${error}` ) );
    });
}

// No se que preferis Nacho, un array mezclado, o las dos arrays separadas.
export function getFavs() {
    let p1 = Api.device.getAll();
    let p2 = Api.routine.getAll();

    return new Promise( (resolve, reject) => {
        Promise.all([p1, p2])
            .then( values => resolve( [].concat(
                values[0].result
                    .filter( elem => elem.meta.fav )
                    .map( elem => new Device(elem.id, elem.name, elem.type, elem.meta, elem.state, elem.room)),
                values[1].result
                    .filter( elem => elem.meta.fav)
                    .map( elem => new Routine(elem.id, elem.name, elem.meta))
            )))
            .catch( error => reject(`Get Favs: ${error}`));
    });
}

export function getRoomsFromHome(homeId){
    return new Promise( (resolve, reject) => {
        Api.room.getAll()
            .then( data => data.result.filter( room => room.home.id === homeId))
            .catch( error => reject(`Get All Rooms ${error}`));
    });
}



// function saveIdsToLocalStorage() {
//     Api.deviceType.getAll()
//         .then(data => {
//             data.result.forEach(elem => {
//                 localStorage[elem.name] = elem.id;
//             });
//         })
// }
