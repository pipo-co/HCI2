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
export default Routine;