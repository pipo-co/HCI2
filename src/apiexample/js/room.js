api.model = api.model || {};

api.model.room = class {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }
}
