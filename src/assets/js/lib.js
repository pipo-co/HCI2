import Api from "./Api.js";
import Device from "./Device";
import Room from "./Room";
import Home from "./Home";


export function createDevice(name, typeId, room) {
    let device = new Device(null, name, {id: typeId}, {fav: false});
    Api.device.add(device)
        .then( data => {
            device.id = data.result.id;
            device.type = data.result.type;
            device.state = data.result.state;

            room.addDevice(device.id)
                .then( () => {
                    device.room = room;
                    return device;
                })
                .catch( error => {
                    Promise.reject(error);
                });
        })
        .catch( error => {
            console.log(`Add Device: ${error}`);
        });
}

export function createRoom(name, home){
    let room = new Room(null, name, {});
    Api.room.add(room)
        .then( data => {
            room.id = data.result.id;

            home.addRoom(room.id)
                .then( () => {
                    room.home = home;
                    return room;
                })
                .catch( error => {
                    Promise.reject(error);
                });
        })
        .catch( error => {
            console.log(`Add Room: ${error}`);
        });
}

export function createHome(name){
    let home = new Home(null, name, {});
    return Api.home.add(home)
        .then( data => {
            home.id = data.result.id;
            return home;
        })
        .catch( error => {
            console.log(`Add Home: ${error}`);
        });
}

export function deviceTypeActionParams(typeId, action){
    Api.deviceType.get(typeId)
        .then( data => {
            data.result.actions.forEach( elem => {
                if(elem.name === action)
                    return elem.params;
            });
        })
        .catch( error => {
            console.log(`Get DeviceType: ${error}`);
        });
}

export function getFavs() {
    Api.device.getAll()
        .then( data => {
            return data.result.filter( elem => {
                return elem.meta.fav;
            });
        })
        .catch( error => {
            console.log(`Get Favs: ${error}`);
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
