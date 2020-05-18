import Api from "./Api.js";

class Device {
  // Meta must have boolean value fav
  constructor(id, name, type, meta, state, room) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
    this.type = type;
    this.state = state;
    this.room = room;
  }

  persistChanges(){
    return Api.device.modify({
      id: this.id,
      name: this.name,
      meta: this.meta
    });
  }

  delete(){
    return Api.device.delete(this.id);
  }

  getName(){
    return this.name.split("_").pop();
  }

  getRoomName(){
    return `${this.room.name.split("_").pop()}`;
  }

  getHomeName(){
    return `${this.room.home.name}`;
  }

  setNewName(name){
    this.name = `${this.room.name}_${name}`;
  }

  getLogs(limit, offset){
    return Api.device.getLogs(this.id, limit, offset);
  }

  getState(){
    return Api.device.getState(this.id);
  }

  execute(action, params){
    return Api.device.excecuteAction(this.id, action, params);
  }

  fav(){
    if(!this.meta.fav){
      this.meta.fav = true;
      this.persistChanges()
          .catch( error => {  console.log(`Fav: ${error}`)});
    }
  }

  unFav(){
    if(this.meta.fav){
      this.meta.fav = false;
      this.persistChanges()
          .catch( error => {  console.log(`UnFav: ${error}`)});
    }
  }

  isFav(){
    return this.meta.fav;
  }
}
export default Device;
