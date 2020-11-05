const containerEl = document.querySelector('[data-container]');
const templateEl = document.querySelector('[data-template]');
const buttonSort = document.querySelector('[data-sort]');
const buttonReverse = document.querySelector('[data-reverse]');
const buttonDefault = document.querySelector('[data-default]');

function createPostItem(item, i) {
    const postClone = templateEl.content.cloneNode(true);
    const postTitle = postClone.querySelector('h2');
    const postBody = postClone.querySelector('p');
    const buttonDel = postClone.querySelector('button');

    postTitle.textContent = item.title;
    postBody.textContent = item.body;
    buttonDel.setAttribute(`data-del-${i}`, '');
    containerEl.appendChild(postClone);
    const deleteButton = document.querySelector(`[data-del-${i}]`);
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(deleteButton);
    });
}

function toggleLoader() {
    const imageLoaderEl = document.querySelector('.loader');
    if (imageLoaderEl.style.display === 'none') {
        imageLoaderEl.style.display = 'block';
    } else {
        imageLoaderEl.style.display = 'none';
    }
}

function deleteAllPosts() {
    const elements = containerEl.getElementsByClassName('post');
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function sortUp(posts) {
    return posts.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function sortDown(posts) {
    return posts.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }
        return 0;
    });
}

async function showData(sort) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    deleteAllPosts();
    if (sort === 'sort') { sortUp(posts); }
    if (sort === 'reverse') { sortDown(posts); }
    posts.forEach((item, i) => {
        createPostItem(item, i);
    });
}

buttonSort.addEventListener('click', () => { showData('sort').then(); });
buttonReverse.addEventListener('click', () => { showData('reverse').then(); });
buttonDefault.addEventListener('click', () => { showData().then(); });
setTimeout(() => { showData().then(toggleLoader); }, 1000);
