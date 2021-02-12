class User {
    static allUsers = []

    constructor(user){
        this.id = user.id
        this.name = user.name
        this.problems = user.problems
        User.allUsers.push(this)
    }

    static fakeLogin(){
        let newUserForm = document.getElementById('new-user-form')
        newUserForm.addEventListener('submit', function(e){
            e.preventDefault()
            apiService.findOrCreateUser(e)
                .then(user => {
                    console.log(user)
                    let newUser = new User(user)
                    newUser.displayUser()
                })
        })
    }

    displayUser() {
        let body = document.getElementById('container')
        body.innerHTML = ''
        let userGreeting = document.createElement('p')
        userGreeting.setAttribute('data-id', this.id)
        let id = userGreeting.dataset.id
        userGreeting.innerHTML = `<h1>Hey, ${this.name}!</h1>`
        body.append(userGreeting)
        this.renderProblems()
        Problem.newProblemForm(this.id)
    }

    renderProblems() {
        if (this.problems) {
            this.problems.forEach(function(problem){
                let newProblem = new Problem(problem)
                newProblem.createProblemCard()
            })
        }
    }
    
}