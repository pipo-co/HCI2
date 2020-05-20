import Api from "./Api.js";
import Device from "./Device";
import Room from "./Room";
import Home from "./Home";
import Routine from "./Routine";


export function createDevice(name, typeId, room) {
    let device = new Device(null, `${room.home.id}_${room.id}_${name}`, { id: typeId }, {fav: false});
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
    let room = new Room(null, `${home.id}_${name}`, {});
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
    let routine = new Routine(null, name, {fav: false}, actions, true);
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

export function getActionParams(actions, action){
    return actions.find(elem => elem.name === action).params;
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

export function suscribeToDeviceEvent(f, deviceId){
    let source;
    if(deviceId)
        source = Api.device.getEventSource(deviceId);
    else
        source = Api.device.getAllEventSource();

    source.addEventListener('message', event => f(JSON.parse(event.data)), false);
}

export function loadAllSupportedValues(deviceID, actions) {
    Api.deviceType.get(deviceID)
        .then(data => {
            let actionsArray = data.result.actions;
            actions.forEach( entry => entry.handler(getActionParams(actionsArray, entry.action)))
        })
        .catch( error => console.log(`Load all supported values: ${error}`));
}

const iconInfo = {
    ac : {
        bgColor: '#FFF3C8',
        color: '#FDC701',
        src: 'mdi-fan'
    },
    blinds: {
        bgColor: '#f2d6ff',
        color: '#BF38FF',
        src:'mdi-window-shutter'
    },
    speaker: {
        bgColor: '#E1E0FE',
        color: '#6563FF',
        src:'mdi-speaker'
    },
    oven: {
        bgColor: '#FFBBBB',
        color: '#C01616',
        src:'mdi-stove'
    },
    faucet: {
        bgColor: '#B5FFB4',
        color: '#08B106',
        src:'mdi-sprinkler-variant'
    },
    lamp: {
        bgColor: '#FFFBDB',
        color: '#E9D94D',
        src:'mdi-lamp'
    },
    vacuum: {
        bgColor: "#BEF3FF",
        color: "#0091B1",
        src:'mdi-robot-vacuum-variant'
    }

}

export function getIconInfo(deviceName) {
    return iconInfo[deviceName];
}

export function getDeviceTypesInHome(homeID) {
     return new Promise( (resolve, reject) => {
         Api.device.getAll().then(
             data => {
                 let ans = data.result
                     .filter(entry => entry.room.home.id === homeID)
                     .map(entry => entry.type.name);
                 ans = ans.filter((entry, index) => ans.indexOf(entry) === index);
                 ans = ans.map(entry => {
                     return {deviceTypeName: entry, iconInfo: getIconInfo(entry)}
                 });
                 resolve(ans);
             }).catch(error => reject(`Load all supported values: ${error}`));
     });
}

export function getDeviceTypesInRoom(roomID) {
    return new Promise( (resolve, reject) => {
        Api.room.getRoomDevices(roomID).then(
            data => {
                let ans = data.result
                    .map(entry => entry.type.name);
                ans = ans.filter((entry, index) => ans.indexOf(entry) === index);
                ans = ans.map(entry => {
                    return {deviceTypeName: entry, iconInfo: getIconInfo(entry)}
                });
                resolve(ans);
            }).catch(error => reject(`Load all supported values: ${error}`));
    });
}

export function getRoomsAndDeviceTypesMapFromHome(homeID) {
    return new Promise( (resolve, reject) => {
        Api.home.getHomeRooms(homeID).then(data => {
            let ans = [];
            data.result.forEach(room => getDeviceTypesInRoom(room.id).then(data => {
                let aux = {};
                aux['deviceTypeArray'] = data;
                aux['roomName'] = room.name;
                aux['id'] = room.id;
                ans.push(aux);
            }).catch(console.log));
            resolve(ans);
        }).catch(error => reject(`Load all supported values: ${error}`));
    });
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
export function HSLtoHex(hue, satur, lumin) {
    satur /= 100;
    lumin /= 100;

    let c = (1 - Math.abs(2 * lumin - 1)) * satur,
        x = c * (1 - Math.abs((hue / 60) % 2 - 1)),
        m = lumin - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= hue && hue < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= hue && hue < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= hue && hue < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= hue && hue < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= hue && hue < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= hue && hue < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1)
        r = "0" + r;
    if (g.length === 1)
        g = "0" + g;
    if (b.length === 1)
        b = "0" + b;

    return r + g + b;
}

export function hexToHSL(H) {
    // Convert hex to RGB first
    let r = "0x" + H[0] + H[1];
    let g = "0x" + H[2] + H[3];
    let b = "0x" + H[4] + H[5];

    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta === 0)
        h = 0;
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { hue: h, saturation: s, luminosity: l};
}

export function getRoomDevices(roomID){

    return new Promise( (resolve, reject) => {
        Api.device.getAll().then(data => resolve(data.result
        .filter(elem => elem.room.id === roomID)
        .map( elem => new Device(elem.id, elem.name, elem.type, elem.meta, elem.state, elem.room)))
    ).catch( error => reject(`getRoomDevices: ${error}`));
    });
}