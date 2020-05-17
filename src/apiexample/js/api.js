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
}