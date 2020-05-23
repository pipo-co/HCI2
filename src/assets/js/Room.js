import Api from "./Api.js";
import Home from "./Home";

class Room {
  constructor(id, name, meta, home) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
    this.home = home;
  }

  static emptyCheck(roomId, homeId){
    return new Promise((resolve, reject) => {
      Api.room.getRoomDevices(roomId)
          .then( data => {
            if(data.result.length === 0)
              Api.room.delete(roomId)
                  .then(() => {
                      Home.emptyCheck(homeId)
                          .catch(console.log)
                          .finally(() => resolve(true));
                  })
                  .catch(console.log);
            else
              resolve(false);
          })
          .catch(reject);
    });
  }

  static removeDevice(deviceId, roomId, homeId){
    return new Promise((resolve, reject) => {
      Api.room.removeDevice(deviceId)
          .then(response => {
            this.emptyCheck(roomId, homeId)
                .finally(() => resolve(response))
          })
          .catch(reject);
    });
  }

  static deleteRoom(roomId, homeId){
      return new Promise((resolve, reject) => {
          Api.room.delete(roomId)
              .then( () => {
                  console.log(homeId);
                  Home.emptyCheck(homeId)
                      .then(resolve)
                      .catch(error => {
                          console.log(error);
                          resolve(false);
                      });
              })
              .catch(reject);
      });
  }

  static persistNewName(id, newName, meta){
    return Api.room.modify({id: id, name: newName, meta: meta});
  }

  persistChange(){
    return Api.room.modify(this);
  }

  delete(){
    return new Promise((resolve, reject) => {
      Api.room.delete(this.id)
          .then( () => {
            Home.emptyCheck(this.home.id)
                .then(resolve)
                .catch(error => {
                  console.log(error);
                  resolve(false);
                });
          })
          .catch(reject);
    });
  }

  getName(){
    return this.name.split("_").pop();
  }

  setNewName(name){
    this.name = `${this.home.id}_${name}`;
  }

  getDevices(){
    return Api.room.getRoomDevices(this.id);
  }

  addDevice(deviceId){
    return Api.room.addDevice(this.id, deviceId);
  }
}
export default Room;