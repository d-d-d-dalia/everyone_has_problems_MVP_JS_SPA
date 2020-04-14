class Problem {
    constructor(problem){
        this.id = problem.id
        this.name = problem.name
        this.description = problem.description
    }

    static newProblem(id) {
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
            .then(function(json) {
                let newProblem = new Problem(json)
                newProblem.appendProblem()
                newForm.reset()
            })
        })
    }

    appendProblem(){
        let problems = document.getElementsByClassName('problems-container')
        //problems is an html collection
        let li = document.createElement('li')
        li.setAttribute('data-id', this.id)
        li.setAttribute('style', "list-style-type:none")
        //this is just so I don't see actually bullets
        li.innerHTML = `${this.name} ~ ${this.description}`
        let solveForm = `<button type="button" id="${this.id}" class="solve-problem"> Solve </button>`
        li.insertAdjacentHTML('beforeend', solveForm)
        let button = document.getElementsByClassName('solve-problem')
        problems[0].append(li)
        Array.from(button).forEach(function (b) {
            b.addEventListener('click', function(e){
                e.preventDefault()
                fetch(`http://localhost:3000/api/v1/problems/${e.target.parentNode.dataset.id}`, {
                        method: "DELETE"
                        })
                        e.target.parentElement.remove();
            })
        })
    }

}