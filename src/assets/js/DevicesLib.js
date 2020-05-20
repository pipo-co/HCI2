export {SelectionField, BooleanStatus, ButtonStatus, NumberField, NumberFieldWithButtons, DeviceEventHandler, ExtraControls, getLocation}

class SelectionField{

        constructor(device, valueKey, action) {
        this.device = device;
        this.valueKey = valueKey;
        this.value = this.device.state[this.valueKey];
        this.action = action;
        this.awaitingResponse = false;
        this.validInput = true;
        this.supportedValues = null;
    }

    changeState(){
        if(this.validInput){
            this.awaitingResponse = true;
            this.device.execute(this.action, [this.value])
                .then( response => response.result && (this.device.state[this.valueKey] = this.value))
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
    }

    getActionLoaderObject(){
        return {
            action: this.action,
            handler: this.loadSupportedValues.bind(this),
        };
    }

    loadSupportedValues(params){
        this.supportedValues = params[0].supportedValues;
    }

}

class BooleanStatus{

    constructor(device, valueKey, actionTrue, actionFalse, statusTrue, statusFalse) {
        this.device = device;
        this.valueKey = valueKey;
        this.value = this.device.state[this.valueKey] === statusTrue;
        this.actionTrue = actionTrue;
        this.actionFalse = actionFalse;
        this.statusTrue = statusTrue;
        this.statusFalse = statusFalse;
        this.awaitingResponse = false;
    }

    changeState(){
        if(this.value) {
            this.awaitingResponse = true;
            this.device.execute(this.actionTrue)
                .then( response => response.result && (this.device.state[this.valueKey] = this.statusTrue))
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
        else {
            this.awaitingResponse = true;
            this.device.execute(this.actionFalse)
                .then( response => response.result && (this.device.state[this.valueKey] = this.statusFalse))
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
    }

}

class ButtonStatus{

    constructor(device, valueKey, actionTrue, actionFalse, statusTrue, statusFalse) {
        this.device = device;
        this.valueKey = valueKey;
        this.value = this.device.state[this.valueKey] === statusTrue;
        this.actionTrue = actionTrue;
        this.actionFalse = actionFalse;
        this.statusTrue = statusTrue;
        this.statusFalse = statusFalse;
        this.awaitingResponse = false;
    }

    changeState(){
        this.value = !this.value;
        if(this.value) {
            this.awaitingResponse = true;
            this.device.execute(this.actionTrue)
                .then( response => response.result && (this.device.state[this.valueKey] = this.statusTrue))
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
        else {
            this.awaitingResponse = true;
            this.device.execute(this.actionFalse)
                .then( response => response.result && (this.device.state[this.valueKey] = this.statusFalse))
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
    }

}

class NumberField{

    constructor(device, valueKey, action) {
        this.device = device;
        this.valueKey = valueKey;
        this.action = action;
        this.value = 0;
        this.minValue = 0;
        this.maxValue = 0;
        this.awaitingResponse = false;
        this.validInput = true;
        this.rules =
            [
                entry => /[0-9]+/.test(entry) || "La temperatura debe ser un numero",
                entry => entry >= this.minValue || "Valor por debajo del minimo",
                entry => entry <= this.maxValue || "Valor por arriba del maximo",
            ];
    }

    changeState(){
        if(this.validInput){
            this.value = parseInt(this.value);
            this.awaitingResponse = true;
            this.device.execute(this.action, [this.value])
                .then( () => (this.device.state[this.valueKey] = this.value))
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
    }

    getActionLoaderObject(){
        return {
            action: this.action,
            handler: this.loadSupportedValues.bind(this),
        };
    }

    loadSupportedValues(params){
        this.minValue = params[0].minValue;
        this.maxValue = params[0].maxValue;
        this.value = this.device.state[this.valueKey];
    }
}

class NumberFieldWithButtons extends NumberField{

    constructor(device, valueKey, action, incrementFactor) {
        super(device, valueKey, action);
        this.incrementFactor = incrementFactor;
    }

    increment(){
        this.value = parseInt(this.value);
        this.value += this.incrementFactor;
        if(this.value > this.maxValue)
            this.value = this.maxValue;
        this.changeState();
    }

    decrement(){
        this.value = parseInt(this.value);
        this.value -= this.incrementFactor;
        if(this.value < this.minValue)
            this.value = this.minValue;
        this.changeState();
    }
}

const deviceEventHandlers = {

    fav: (device) => {
        if (device.isFav())
            device.unFav();
        else
            device.fav();
    },

    edit: (device) => {
        console.log(`Edit handler ${device}`);
    },

    history: (device) => {
        console.log(`History handler ${device}`);
    },

    delete: (device) => {
        console.log(`Delete handler ${device}`);
    }
}

class DeviceEventHandler {

    constructor(device) {
        this.device = device
    }

    handle(event){
        deviceEventHandlers[event.eventName](this.device)
    }
}

class ExtraControls {

    constructor() {
        this.value = false;
        this.message = 'Mas'
    }

    changeState() {
        this.value = !this.value;
        if (this.value)
            this.message = 'Menos';
        else
            this.message = 'Mas';
    }
}

function getLocation(device) {

    return `${device.getHomeName()} - ${device.getRoomName()}`
}