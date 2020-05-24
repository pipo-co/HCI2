import Api from "./Api.js";

class Routine {
    constructor(id, name, meta, actions){
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.meta = meta;
        this.actions = actions;
    }

    persistChanges() {
        return Api.routine.modify(this);
    }

    delete(){
        return Api.routine.delete();
    }

    execute(){
        return Api.routine.execute(this.id);
    }
}
export default Routine;