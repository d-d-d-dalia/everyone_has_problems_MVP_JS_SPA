document.addEventListener('DOMContentLoaded', function(){
    User.createUser()
})

class User {

    constructor(user){
        this.id = user.id
        this.name = user.name
        this.problems = user.problems
    }

    static createUser(){
        let newUserForm = document.getElementById('new-user-form')
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
                            console.log(newUser)
                            newUser.displayUser()
                        })
        })
    }

    displayUser() {
        let body = document.getElementById('container')
        body.innerHTML = ''
        let userContainer = document.createElement('div')
        userContainer.setAttribute('data-id', this.id)
        let id = userContainer.dataset.id
        userContainer.innerHTML = `<h1>Hey, ${this.name}!</h1>`
        body.append(userContainer)
        if (this.problems) {
            this.problems.forEach(function(problem){
                let newProblem = new Problem(problem)
                newProblem.appendProblem()
            })
        }
        Problem.newProblemForm(this.id)
    }
    
}