api.model = api.model || {};

api.model.home = class {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.meta = meta;
    }

    persistChanges(){
        return api.home.modify(this);
    }

    delete(){
        return api.home.delete(this.id);
    }

    addRoom(roomId){
        return api.home.addRoom(this.id, roomId);
    }

    getRooms(){
        return api.home.getHomeRooms(this.id);
    }

    removeRoom(roomId){
        return api.home.removeRoom(roomId);
    }
}
