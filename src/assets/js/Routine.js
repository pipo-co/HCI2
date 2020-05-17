import Api from "./Api.js";

class Routine {
    constructor(id, name, meta, actions, hasActions = false){
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.meta = meta;
        this.actions = actions;
        this.hasActions = hasActions;
    }

    persistChanges() {
        return Api.routine.modify(this);
    }

    delete(){
        return Api.routine.delete();
    }

    execute(){
        return Api.routine.excecute(this.id);
    }
}
export default Routine;