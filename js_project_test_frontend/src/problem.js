class Problem {

    constructor(problem){
        this.id = problem.id
        this.name = problem.name
        this.description = problem.description
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
        Problem.postProblem(user_id)
    }

    //is it appropriate for this to be a static method?
    static postProblem(user_id) {
        let newForm = document.getElementById('new-problem-form')
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
                            user_id: user_id
                        }
                    }
                )
            })
            .then(resp => resp.json())
            .then(json => {
                let newProblem = new Problem(json)
                newForm.reset()
                newProblem.appendProblem()
                
            })
        })
    }

    appendProblem(){
        let problems = document.getElementsByClassName('problems-container')
        let li = document.createElement('li')
        li.setAttribute('data-id', this.id)
        li.setAttribute('style', "list-style-type:none")
        li.innerHTML = `${this.name} ~~ ${this.description}`
        let solveForm = `<button type="button" id="${this.id}" class="solve-problem"> Solve </button>`
        li.insertAdjacentHTML('beforeend', solveForm)
        problems[0].append(li)
        let button = document.getElementById(`${this.id}`)
        this.solve(button)
    }

    solve(button){
        button.addEventListener('click', function(e){
            e.preventDefault()
            fetch(`http://localhost:3000/api/v1/problems/${e.target.parentNode.dataset.id}`, {
                    method: "DELETE"
            })
                    e.target.parentElement.remove();
        })
    }

}