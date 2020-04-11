document.addEventListener('DOMContentLoaded', function(){
    createUser()
})
    
function createUser(){
    let newUserForm = document.getElementById('new-user-and-new-problem-form')
    let newUser = document.getElementById('new-user-body')
    newUserForm.addEventListener('submit', function(e){
        e.preventDefault()
            fetch('http://localhost:3000/api/v1/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        user: {
                            name: e.target.children[1].value
                        }
                    })
                })
                    .then(resp =>  {
                        return resp.json()
                    })
                    .then(user => {
                        displayUser(user)
                    })
    })
}

function displayUser(user) {
    let body = document.getElementById('container')
    body.innerHTML = ''
    let userContainer = document.createElement('div')
    userContainer.setAttribute('data-id', user.id)
    let id = userContainer.dataset.id
    userContainer.innerHTML = `Welcome, ${user.name}!`
    body.append(userContainer)
    newProblemForm(user.id)
    if (user.problems) {
        user.problems.forEach(function(problem){
            appendProblem(problem)
        })
    }
}

function newProblemForm(id) {
    let body = document.getElementById('container')
    let form = 
    `
        <form id="new-user-and-new-problem-form">
            <label>What's your problem?:</label>
            <input type="text" id="problem-name"/>
            <label>Describe it:</label>
            <input type="text" id="problem-description"/>
            <input type="submit"/>
        </form>
    `
    body.insertAdjacentHTML( 'beforeend', form )
    let newForm = document.getElementById('new-user-and-new-problem-form')
    newForm.addEventListener('submit', function(e){
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/problems', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    problem: {
                        name: e.target.children[1].value,
                        description: e.target.children[3].value,
                        user_id: id
                    }
                }
            )
        })
        .then(resp => resp.json())
        .then(json => appendProblem(json))
        newForm.reset()
    })
}

function appendProblem(problem){
    let body = document.getElementById('container')
    let problems = document.createElement('ul')
    problems.setAttribute('style', "list-style-type:none")
    let li = document.createElement('li')
    li.setAttribute('data-id', problem.id)
    li.setAttribute('id', 'problem')
    problems.append(li)
    body.append(problems)
    let solveForm = `<button type="button" id="solve-problem">Solve</button>`
    li.innerHTML = `${problem.name} ~ ${problem.description}`
    li.insertAdjacentHTML('beforeend', solveForm)
    let deleteButton = document.getElementById('solve-problem')
    deleteButton.addEventListener('click', function(e){
        fetch(`http://localhost:3000/api/v1/problems/${e.target.parentNode.dataset.id}`, {
                method: "DELETE",
                })
                    .then(resp =>  {
                        return resp.json()
                    })
                    .then(problem => {
                        //let newProblem = new Problem(problem)
                        li.innerText = ''
                    })
        })
}