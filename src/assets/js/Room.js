import Api from "./Api.js";

class Room {
  constructor(id, name, meta, home) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
    this.home = home;
  }

  persistChange(){
    return Api.room.modify(this);
  }

  delete(){
    return Api.room.delete(this.id);
  }

  getName(){
    return this.name.split("_").pop();
  }

  setNewName(name){
    this.name = `${this.home.name}_${name}`;
  }

  getDevices(){
    return Api.room.getRoomDevices(this.id);
  }

  addDevice(deviceId){
    return Api.room.addDevice(this.id, deviceId);
  }

  removeDevice(deviceId){
    return Api.room.delete(deviceId);
  }
}
export default Room;