const routes = {
  "/login": { templateId: "login", title: "Login" },
  "/dashboard": {
    templateId: "dashboard",
    title: "Dashboard",
    method: updateDashboard,
    init: updateDashboard,
  },
  "/credits": { templateId: "credits", title: "Credits" },
};

let account = null;

function updateRoute(templateId) {
  // debugger;
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    return navigate("/login");
  }

  const template = document.getElementById(route.templateId);

  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");
  document.title = route.title;
  
  app.innerHTML = "";
  app.appendChild(view);
  if (typeof route.init === 'function') {
    // debugger;
    route.init();
    
  }
}

function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
  console.log(event.target.href);
}

function writeToConsole(title) {
  console.log(`${title} is shown`);
}

async function register() {
  const registerForm = document.getElementById("registerForm");
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);

  const result = await createAccount(jsonData);
  //controlar si todo esta ok
  if (result.error) {
    return console.log("An error occurred: ", result.error);
  }
  console.log("Account created!", result);
}

async function createAccount(account) {
  try {
    const response = await fetch("//localhost:5000/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: account,
    });
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}
async function getAccount(user) {
  try {
    const response = await fetch(
      "//localhost:5000/api/accounts/" + encodeURIComponent(user)
    );
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

async function login() {
  const loginForm = document.getElementById("loginForm");
  const user = loginForm.user.value;
  const data = await getAccount(user);
  console.log(data);
  if (data.error) {
    return updateElement("loginError", data.error);
  }

  account = data;
  navigate("/dashboard");
}

function updateElement(id, text) {
  const element = document.getElementById(id);
  element.textContent = text;
}

function updateDashboard() {
  if (!account) {
    return navigate("/login");
  }
  // debugger;
  updateElement("descripcion", account.description);
  updateElement("balance", account.balance.toFixed(2));
  updateElement("currency", account.currency);
}

window.onload = () => {
  updateRoute();
};

window.onpopstate = () => {
  //actualiza cuando usamos el historial del navegador para navegar
  updateRoute();
};
