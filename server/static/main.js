const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const name = document.querySelector('.name')
const comment = document.querySelector('.comment')


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("ok.json", (text) => {
    var data = JSON.parse(text)
    data['comments'].forEach(element => {
        const item = document.createElement('li')
        item.innerHTML = `<span>${element.name}</span>: ${element.comment}`
        messages.insertBefore(item, messages.firstChild);
    })
});

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if(comment.value && name.value){
    socket.emit('chat message', {
      message: comment.value,
      name: name.value
    })
    comment.value = ''
  }
})


socket.on('chat message', (data) => {
  const item = document.createElement('li')
  item.innerHTML = `<span>${data.name}</span>: ${data.message}`
  messages.insertBefore(item, messages.firstChild);
  window.scrollTo(0, document.body.scrollHeight)
})
