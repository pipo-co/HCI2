import api from "@/assets/js/api.js";

api.model = api.model || {};

api.model.room = class {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }

  persistChange(){
    return api.room.modify(this);
  }

  delete(){
    return api.room.delete(this.id);
  }

  getDevices(){
    return api.room.getRoomDevices(this.id);
  }

  addDevice(deviceId){
    return api.room.addDevice(this.id, deviceId);
  }

  removeDevice(deviceId){
    return api.room.delete(deviceId);
  }
}
