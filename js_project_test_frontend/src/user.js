class User {
    constructor(user){
        this.name = user.name
        this.problems = user.problems
    }

    static createUser(){
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
                            let newUser = new User(user)
                            newUser.displayUser(user)
                        })
        })
    }

    displayUser(user) {
        let body = document.getElementById('container')
        body.innerHTML = ''
        let userContainer = document.createElement('div')
        userContainer.setAttribute('data-id', user.id)
        let id = userContainer.dataset.id
        userContainer.innerHTML = `<h1>Hey, ${user.name}!</h1>`
        body.append(userContainer)
        if (this.problems) {
            this.problems.forEach(function(problem){
                let newProblem = new Problem(problem)
                newProblem.appendProblem()
            })
        }
        Problem.newProblem(user.id)
    }
}