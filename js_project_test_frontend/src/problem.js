class Problem {

    static allProblems = []

    constructor(problem){
        this.id = problem.id
        this.name = problem.name
        this.description = problem.description
        Problem.allProblems.push(this)
    }

    static newProblemForm(user_id) {
        let body = document.getElementById('container')
        let form = 
            `
                <form id="new-problem-form">
                    <label>What's your problem?:</label>
                    <input type="text" id="problem-name"/>
                    <label>Describe it:</label>
                    <input type="text" id="problem-description"/>
                    <input type="submit"/>
                    <h4>Your current problems:</h4>
                </form>
            `
        body.insertAdjacentHTML('beforeend', form)
        Problem.makeProblem(user_id)
    }

    static makeProblem(user_id) {
        let newForm = document.getElementById('new-problem-form')
        newForm.addEventListener('submit', function(e){
            e.preventDefault()
            apiService.postProblem(e, user_id)
                .then(json => {
                    console.log(json)
                    newForm.reset()
                    let newProblem = new Problem(json)
                    newProblem.createProblemCard()
                })
        })
    }

    createProblemCard() {
        let p = document.createElement('p')
        p.setAttribute('data-id', this.id)
        p.innerHTML = `${this.name} ~~ ${this.description}`
        let solveForm = ` <button type="button" id="${this.id}" class="solve-problem"> Solve </button>`
        p.insertAdjacentHTML('beforeend', solveForm)
        this.appendProblem(p)
    }

    appendProblem(p){
        let problems = document.getElementsByClassName('problems-container')
        problems[0].append(p)
        let button = document.getElementById(`${this.id}`)
        this.solve(button)
    }

    solve(button){
        button.addEventListener('click', function(e){
            e.preventDefault()
            apiService.deleteProblem(e)
                e.target.parentElement.remove();
        })
    }
}