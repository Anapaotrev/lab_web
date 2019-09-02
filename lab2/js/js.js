checkboxDone();

// Adds done class
function checkboxDone() {
  var checkboxes = document.getElementsByName('todo');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', (event) => {
      if (event.target.checked) {
        event.target.parentElement.children[1].classList.add('done');
      } else {
        event.target.parentElement.children[1].classList.remove('done');
      }
    })

  }
}

// Add new items
var input = document.getElementById("newitem");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const list = document.createElement('li');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');

    checkbox.type = 'checkbox';
    checkbox.name = 'todo';
    checkbox.classList.add('checkbox');
    span.textContent = input.value;
    input.value = "";

    list.appendChild(checkbox);
    list.appendChild(span);

    document.getElementById('todo-list').appendChild(list);
    checkboxDone();
  }
});
