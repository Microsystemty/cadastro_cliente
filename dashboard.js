let clients = JSON.parse(localStorage.getItem('clients') || '[]');
let servers = JSON.parse(localStorage.getItem('servers') || '[]');

function formatMAC(input) {
  let value = input.value.replace(/[^a-fA-F0-9]/g, "").slice(0, 12);
  let formatted = value.match(/.{1,2}/g)?.join(":") || "";
  input.value = formatted;
}

function renderServers() {
  const select = document.getElementById("clientServer");
  const list = document.getElementById("serverList");
  select.innerHTML = '';
  list.innerHTML = '';
  servers.forEach(s => {
    select.innerHTML += `<option>${s}</option>`;
    list.innerHTML += `<li>${s}</li>`;
  });
}

function renderClients() {
  const filter = document.getElementById("filterInput").value.toLowerCase();
  const ul = document.getElementById("clientList");
  ul.innerHTML = '';
  clients.filter(c => 
    c.name.toLowerCase().includes(filter) || 
    c.server.toLowerCase().includes(filter)
  ).forEach(c => {
    ul.innerHTML += `<li class="p-2 border rounded">${c.name} - ${c.server} ${c.mac || ''}</li>`;
  });
}

function addClient() {
  const name = document.getElementById("clientName").value;
  const server = document.getElementById("clientServer").value;
  const mac = document.getElementById("clientMAC").value;
  clients.push({ name, server, mac });
  localStorage.setItem('clients', JSON.stringify(clients));
  renderClients();
}

function addServer() {
  const input = document.getElementById("serverInput");
  if (input.value && !servers.includes(input.value)) {
    servers.push(input.value);
    localStorage.setItem('servers', JSON.stringify(servers));
    input.value = '';
    renderServers();
  }
}

function showSection(section) {
  document.getElementById("clients").classList.add("hidden");
  document.getElementById("servers").classList.add("hidden");
  document.getElementById(section).classList.remove("hidden");
  document.getElementById("menuDropdown").classList.add("hidden");
}

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("menuDropdown").classList.toggle("hidden");
});

window.onload = () => {
  renderServers();
  renderClients();
}
