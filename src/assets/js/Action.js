
class Action {
    constructor(deviceId, actionName, params, meta) {
        this.device = {id: deviceId};
        this.actionName = actionName;
        this.params = params;
        this.meta = meta;
    }
}
export default Action;