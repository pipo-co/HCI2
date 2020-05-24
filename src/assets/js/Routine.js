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

    refreshActions(){
        return Api.routine.get(this.id)
            .then( data => this.actions = data.result.actions)
            .catch(console.log);
    }

    fav() {
        if (!this.meta.fav)
            this.invertFav();
    }

    unFav() {
        if (this.meta.fav)
            this.invertFav();
    }

    invertFav(){
        this.meta.fav = !this.meta.fav;
        if(!this.actions || this.actions.length === 0)
            this.refreshActions()
                .then(() => this.persistChanges().catch(console.log))
                .catch(console.log);
        else
            this.persistChanges()
                .catch(console.log);
    }

    isFav(){
        return this.meta.fav;
    }
}
export default Routine;