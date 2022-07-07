const routes = {
    '/login': { templateId: 'login', title: 'Login' },
    '/dashboard': { templateId: 'dashboard' , title: 'Dashboard', method : writeToConsole},
    '/credits': {templateId: 'credits', title: 'Credits'},
  };


function updateRoute(templateId){
    const path = window.location.pathname;
    const route = routes[path];

    if(!route){
        return navigate('/login');
    }
    
    
    const template = document.getElementById(route.templateId);
    
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    document.title = route.title;
    if(route.method){
        route.method(route.title);
    }
    app.innerHTML = '';
    app.appendChild(view);
}

function navigate(path){
    window.history.pushState({},path, path);
    updateRoute();
}

function onLinkClick(event){
    event.preventDefault();
    navigate(event.target.href);
    console.log(event.target.href);
}

function writeToConsole(title){
    console.log(`${title} is shown`);
}




async function register(){
    
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    const result = await createAccount(jsonData);
    //controlar si todo esta ok
    if(result.error){
        return console.log('An error occurred: ', result.error);
    }
    console.log('Account created!', result);
}

async function createAccount(account) {
    try {
      const response = await fetch('//localhost:5000/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: account
      });
      return await response.json();
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
  }

window.onload = ()=>{
    updateRoute();
};

window.onpopstate = ()=>{
    //actualiza cuando usamos el historial del navegador para navegar
    updateRoute();
}