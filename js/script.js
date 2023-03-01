let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");


// "escucha" el click del boton submit
form.addEventListener("submit", (e)=> {
    e.preventDefault();
    console.log("button clicked");
    formValidation();
});

// validacion
let formValidation = () =>{
    if(input.value === ""){ // si textarea esta vacio
        msg.innerHTML = 'Post cannot be blank'; // si esta en blanco escribe advertencia
        console.log('failure');
    }
    else{
        console.log('success');
        msg.innerHTML = ""; // si hay texto limpia el msg
        accepData();
    }
};

let data = [];  // arr vacío

let accepData = () => { //función
    
    data.push({
        text : input.value,
    });

    localStorage.setItem('data', JSON.stringify(data));
        
    console.log(data);

    createPost();
}; 

let createPost = () => {
    
    posts.innerHTML='';
    
    data.map((x,y)=> {
        return (posts.innerHTML += // += suma el posteo sin borrar los anteriores
        //JS template
        `
        <div id=${y}>
            <p>${x.text}</p>
            <span class="options">
                <i onclick='editPost(this)' class="fa-regular fa-pen-to-square"></i>
                <i onclick='deletePost(this);createPost()' class="fa-regular fa-trash-can"></i>
            </span>
        </div>

    `);
});

    input.value = ''; //dejamos el input en blanco

};

let deletePost = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem('data', JSON.stringify(data));

};

let editPost = (e)=> {
    input.value = e.parentElement.previousElementSibling.innerHTML; 
    e.parentElement.parentElement.remove();
    deletePost(e);

};

(() =>{

    data = JSON.parse(localStorage.getItem('data')) || []; 
    createPost();

})();