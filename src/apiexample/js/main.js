var room;
var createButton, updateButton, deleteButton, getButton, getAllButton;
var resultTextArea;

function toggleButtons(disabled) {
  createButton.disabled = disabled;
  updateButton.disabled = !disabled;
  deleteButton.disabled = !disabled;
  getButton.disabled = !disabled;
}

window.addEventListener('load', () => {
  createButton = document.querySelector('#create');
  updateButton = document.querySelector('#update');
  deleteButton = document.querySelector('#delete');
  getButton = document.querySelector('#get');
  getAllButton = document.querySelector('#getAll');
  resultTextArea = document.querySelector('#result');

  createButton.addEventListener('click', () => {
    var index = Math.floor(Math.random() * (999 - 1) + 1)
    room = new api.model.room(null, `kitchen ${index}`, { 'size': '9m2' });

    api.room.add(room)
      .then(data => {
        room.id = data.result.id;
        resultTextArea.innerHTML = JSON.stringify(data, null, 2);
        toggleButtons(true);
      })
      .catch(error => {
        resultTextArea.innerHTML = `Request failed: ${error}`;
      });
  }, false);

  updateButton.addEventListener('click', () => {
    room.meta = { 'size': '6m2' };

    api.room.modify(room)
      .then(data => {
        resultTextArea.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        resultTextArea.innerHTML = `Request failed: ${error}`;
      });
  }, false);

  deleteButton.addEventListener('click', () => {
    api.room.delete(room.id)
      .then(data => {
        resultTextArea.innerHTML = JSON.stringify(data, null, 2);
        toggleButtons(false);
      })
      .catch(error => {
        resultTextArea.innerHTML = `Request failed: ${error}`;
      });
  }, false);

  getButton.addEventListener('click', () => {
    api.room.get(room.id)
      .then(data => {
        resultTextArea.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        resultTextArea.innerHTML = `Request failed: ${error}`;
      });
  }, false);

  getAllButton.addEventListener('click', () => {
    api.room.getAll()
      .then(data => {
        resultTextArea.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        resultTextArea.innerHTML = `Request failed: ${error}`;
      });
  }, false);

  toggleButtons(false);
}, false);
 