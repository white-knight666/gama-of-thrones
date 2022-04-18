
const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let thronesapi = [];



searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = thronesapi.filter((character) => {
        return (
            character.firstName.toLowerCase().includes(searchString) ||
            character.lastName.toLowerCase().includes(searchString) ||
            character.title.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});



const loadCharacters = async () => {
    try {
        const res = await fetch('https://thronesapi.com/api/v2/Characters/');
        thronesapi = await res.json();
        displayCharacters(thronesapi);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((data) => {
            return `
            <li class="character">
                <h2>${data.firstName}</h2>
                <h3>Title: ${data.title}</h3>
                <img src="${data.imageUrl}"></img>
                <h4>${data.lastName}</h4>
            </li>
        `;
        
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();




//mouse event
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})
