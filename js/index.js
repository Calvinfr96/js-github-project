// Deliverable 1: When the search form is submitted, take the value of the user input and search GitHub for matches using the User Search Endpoint
//Step 1: Add event listner to search form and grab user input
const githubForm = document.getElementById('github-form');
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchbtn');
const userList = document.getElementById('user-list');
const repoList = document.getElementById('repos-list');

searchBtn.addEventListener('click', function (event) {
    event.preventDefault()
    // Step 2: Fetch data from the user search endpoint
    const configObj = {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    }
    userList.innerHTML = '';
    repoList.innerHTML = '';
    fetch(`https://api.github.com/search/users?q=${search.value}`, configObj)
        .then(resp => resp.json())
        .then(user => {
            user.items.forEach(user => appendUserLi(createUserLi(user)))
        })
    githubForm.reset()
})

// Deliverable 2: Display user's name avatar and link to profile
function createUserLi(user) {
    const userLi = document.createElement('li');
    userLi.innerHTML =
        `
    <li><strong>${user.login}</strong></li>
    <li><img src = ${user['avatar_url']}></li>
    <li><em>${user['html_url']}</em></li>
    `
    userLi.addEventListener('click', function () { fetchRepositories(user.login) })
    return userLi
}
function appendUserLi(li) {
    userList.appendChild(li)
}

//Deliverable 3: Search user repos endpoint by clicking on search result
function fetchRepositories(userLogin) {
    const configObj = {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    }
    fetch(`https://api.github.com/users/${userLogin}/repos`)
        .then(resp => resp.json())
        .then(repos => {
            repoList.innerHTML = `<h3>${userLogin} Repositories</h3> `
            repos.forEach(repo => appendRepoLi(createRepoLi(repo['clone_url'])))
        })
}

//Deliverable 4: Display repos for clicked user
function createRepoLi(repo) {
    const repoLi = document.createElement('li');
    repoLi.innerHTML = `<a href='${repo}' target='_blank'>${repo}</a>`
    return repoLi
}

function appendRepoLi(li) {
    repoList.appendChild(li)
}
