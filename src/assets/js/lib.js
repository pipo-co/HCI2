import Api from "./Api.js";
import Device from "./Device";
import Room from "./Room";
import Home from "./Home";


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

export function createDeviceFromScratch(homeName, roomName, deviceName, typeId){
    return new Promise( (resolve, reject) => {
        lib.createHome(homeName)
            .then(home => {
                lib.createRoom(roomName, home)
                    .then( room => {
                        lib.createDevice(deviceName, typeId, room)
                            .then( device => resolve(device) )
                            .catch( errors => reject(`Create Device ${deviceName} ${errors}`) );
                    })
                    .catch( errors => reject(`Create Room ${roomName} ${errors}`) );
            })
            .catch( errors => reject(`Create Home ${homeName} ${errors}`) );
    });
}

export function deviceTypeActionParams(typeId, action){
    return new Promise( (resolve, reject) => {
        Api.deviceType.get(typeId)
            .then( data => resolve( data.result.actions.find(elem => elem.name === action).params ) )
            .catch( error => reject(`Get DeviceType: ${error}` ) );
    });
}

export function getFavs() {
    return new Promise( (resolve, reject) => {
        Api.device.getAll()
            .then( data => {
                resolve(data.result.filter( elem => elem.meta.fav ).map( elem => new Device(elem.id, elem.name, elem.type, elem.meta, elem.state, elem.room)));
            })
            .catch( error => {
                reject(`Get Favs: ${error}`);
            });
    })

}

// function saveIdsToLocalStorage() {
//     Api.deviceType.getAll()
//         .then(data => {
//             data.result.forEach(elem => {
//                 localStorage[elem.name] = elem.id;
//             });
//         })
// }
