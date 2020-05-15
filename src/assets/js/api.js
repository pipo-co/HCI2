var api = class {
  static get baseUrl() {
    return 'http://127.0.0.1:8080/api';
  }

  static get timeout() {
    return 60 * 1000;
  }

  static fetch(url, init) {
    return new Promise((resolve, reject) => {
      let controller = new AbortController();
      let signal = controller.signal;

      setTimeout(() => controller.abort(), api.timeout);

      init.signal = signal

      fetch(url, init)
      .then(response => {
        if (!response.ok)
          reject(new Error(response.statusText));

        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  static get(url) {
    return api.fetch(url, {})
  }

  static post(url, data) {
    return api.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });
  }

  static put(url, data) {
    return api.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });
  }

  static delete(url) {
    return api.fetch(url, {
      method: 'DELETE',
    });
  }
}

api.deviceType = class {

  static get url() {
    return `${api.baseUrl}/devicetypes`;
  }

  static get(id) {
    return api.get(`${api.deviceType.url}/${id}`);
  }

  static getAll() {
    return api.get(api.deviceType.url);
  }

  static saveIdsToLocalStorage() {
    api.deviceType.getAll()
        .then(data => {
          data.result.forEach(elem => {
            localStorage[elem.name] = elem.id;
          });
        })
  }
}

api.room = class {
  static get url() {
    return `${api.baseUrl}/rooms`;
  }

  static add(room) {
    return api.post(api.room.url, room);
  }

  static modify(room) {
    return api.put(`${api.room.url}/${room.id}`, room);
  }

  static delete(id) {
    return api.delete(`${api.room.url}/${id}`);
  }

  static get(id) {
    return api.get(`${api.room.url}/${id}`);
  }

  static getAll() {
    return api.get(api.room.url);
  }

  static getRoomDevices(id){
    return api.get(`${api.room.url}/${id}/devices`);
  }

  static addDevice(roomId, deviceId){
    return api.post(`${api.home.url}/${roomId}/devices/${deviceId}`);
  }

  static removeDevice(deviceId){
    return api.delete(`${api.home.url}/devices/${deviceId}`);
  }
}

api.device = class {
  static get url() {
    return `${api.baseUrl}/devices`;
  }

  static add(device) {
    return api.post(api.device.url, device);
  }

  static modify(device) {
    return api.put(`${api.device.url}/${device.id}`, device);
  }

  static delete(id) {
    return api.delete(`${api.device.url}/${id}`);
  }

  static get(id) {
    return api.get(`${api.device.url}/${id}`);
  }

  static getAll() {
    return api.get(api.device.url);
  }

  static getByType(typeId){
    return api.get(`${api.device.url}/devicetypes/${typeId}`);
  }

  static getAllLogs(limit, offset){
    return api.get(`${api.device.url}/logs/limit/${limit}/offset/${offset}`);
  }

  static getState(id) {
    return api.get(`${api.device.url}/${id}/state`);
  }

  static getLogs(id, limit, offset){
    return api.get(`${api.device.url}/${id}/logs/limit/${limit}/offset/${offset}`);
  }

  static excecuteAction(id, actionName){
    return api.put(`${api.device.url}/${id}/${actionName}`, {});
  }
}

api.home = class {
  static get url() {
    return `${api.baseUrl}/homes`;
  }

  static add(home) {
    return api.post(api.home.url, home);
  }

  static modify(home) {
    return api.put(`${api.home.url}/${home.id}`, home);
  }

  static delete(id) {
    return api.delete(`${api.home.url}/${id}`);
  }

  static get(id) {
    return api.get(`${api.home.url}/${id}`);
  }

  static getAll() {
    return api.get(api.home.url);
  }

  static addRoom(homeId, roomId){
    return api.post(`${api.home.url}/${homeId}/rooms/${roomId}`);
  }

  static getHomeRooms(id){
    return api.get(`${api.home.url}/${id}/rooms`);
  }

  static removeRoom(roomId){
    return api.delete(`${api.home.url}/rooms/${roomId}`);
  }
}
