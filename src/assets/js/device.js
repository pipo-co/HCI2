api.model = api.model || {};

api.model.device = class {
  constructor(id, name, type, meta, state, room, home) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
    this.type = type;
    this.state = state;
    this.room = room;
    this.house = home;
  }

  persistChanges(){
    return api.device.modify(this);
  }

  delete(){
    return api.device.delete(this.id);
  }

  getLogs(limit, offset){
    return api.device.getLogs(this.id, limit, offset);
  }

  getState(){
    return api.device.getState(this.id);
  }

  excecute(action){
    return api.device.excecuteAction(this.id, action);
  }
}
