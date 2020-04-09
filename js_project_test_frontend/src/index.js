// document.addEventListener('DOMContentLoaded', function(){
//     console.log("hi")
   
//     displayUserForm()
//     createUser()
//     displayUser()
// })

// class Problems {
//     constructor(problem){
//         problem.name = this.name
//         problem.description = this.description
//         problem.user = this.user_id
//     }
// }

//class User {


        document.addEventListener('DOMContentLoaded', function(){
            //console.log("hi")
        
            // displayUserForm()
            createUser()
            // displayUser()
        })
    

    function createUser(){
        let newUserForm = document.getElementById('new-user-and-new-problem-form')
        let newUser = document.getElementById('new-user-body')
        newUserForm.addEventListener('submit', function(e){
            e.preventDefault
            return fetch('http://localhost:3000/api/v1/users', {
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
                debugger
                return resp.json()
            })
            .then(user => console.log(user))
        })

    }

//}

// function displayUser() {
    

// }


