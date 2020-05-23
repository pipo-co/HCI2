import Api from "./Api.js";

class Home {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.meta = meta;
    }

    static emptyCheck(homeId){
        Api.home.getHomeRooms(homeId)
            .then( data => {
                if(data.result.length === 0)
                    Api.home.delete(homeId);
            })
            .catch(console.log);
    }

    persistChanges(){
        return Api.home.modify(this);
    }

    delete(){
        return Api.home.delete(this.id);
    }

    addRoom(roomId){
        return Api.home.addRoom(this.id, roomId);
    }

    getRooms(){
        return Api.home.getHomeRooms(this.id);
    }

    removeRoom(roomId){
        return Api.home.removeRoom(roomId);
    }
    static persistNewName(id, newName, meta){
        return Api.home.modify({id: id, name: newName, meta: meta});
    }
}
export default Home;
