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

  static emptyCheck(room){
    return new Promise((resolve, reject) => {
      Api.room.getRoomDevices(room.id)
          .then( data => {
            if(data.result.length === 0) {
              Api.room.delete(room.id)
                  .then(() => Home.emptyCheck(room.home.id))
                  .catch(console.log);
              resolve(true);
            } else
              resolve(false);
          })
          .catch(reject);
    });

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

  removeDevice(deviceId){
    return Api.room.removeDevice(deviceId);
  }

  static persistNewName(id, newName, meta){
    return Api.room.modify({id: id, name: newName, meta: meta});
  }
}
export default Room;