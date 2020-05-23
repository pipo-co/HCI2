export {SelectionField, BooleanStatus, ButtonStatus, NumberField, NumberFieldWithButtons, ExtraControls, getLocation}

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
        let value = this.value;
        if(value) {
            this.awaitingResponse = true;
            this.device.execute(this.actionTrue)
                .then( response => {
                    if(response.result){
                        this.device.state[this.valueKey] = this.statusTrue;
                        this.value = value;
                    }
                })
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
        else {
            this.awaitingResponse = true;
            this.device.execute(this.actionFalse)
                .then( response => {
                    if(response.result) {
                        this.device.state[this.valueKey] = this.statusFalse;
                        this.value = value;
                    }
                })
                .catch(console.log)
                .finally( () => this.awaitingResponse = false);
        }
    }

}

class ButtonStatus extends BooleanStatus{

    constructor(device, valueKey, actionTrue, actionFalse, statusTrue, statusFalse) {
        super(device, valueKey, actionTrue, actionFalse, statusTrue, statusFalse);
    }

    changeState(){
        this.value = !this.value;
        super.changeState();
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

class ExtraControls {

    constructor() {
        this.value = false;
        this.message = 'Mas'
        this.icon = 'mdi-chevron-down'
    }

    changeState() {
        this.value = !this.value;
        if (this.value) {
            this.message = 'Menos';
            this.icon = 'mdi-chevron-up';
        }
        else {
            this.message = 'Mas';
            this.icon = 'mdi-chevron-down';
        }
    }
}

function getLocation(device) {

    return `${device.getHomeName()} - ${device.getRoomName()}`
}