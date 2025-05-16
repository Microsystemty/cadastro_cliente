function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) window.location.href = "dashboard.html";
  else document.getElementById("loginError").classList.remove("hidden");
}
function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = getUsers();
  if (!users.some(u => u.username === username)) {
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Usuário cadastrado com sucesso");
  } else {
    alert("Usuário já existe");
  }
}
