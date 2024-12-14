export class TodoListService {
    // TODOLIST
    todolist=["user1", "user2", "user3", "user4", "user5"];

    // GET /todo
     getJsonTodoList(){
        return JSON.stringify({
            code: 200,
            status: "OK",
            data:this.todolist.map((value,index) =>{
                return{
                    id: index,
                    todo: value
                }
            })
        });
        
    }

    // GET /todo
    getTodoList(request, response){
        response.write(this.getJsonTodoList());
        response.end();
    }

    // POST /todo
    createTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.todolist.push(body.todo);

            response.write(this.getJsonTodoList());
            response.end();
        })
    }

    // PUT /todo
    updateTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString())
            if(this.todolist[body.id]){
                this.todolist[body.id]= body.todo;
            } 

            response.write(this.getJsonTodoList());
            response.end();
        })
    }

    // DELETE /todo
    deleteTodo(request,response){
         request.addListener("data", (data)=>{
            const body = JSON.parse(data.toString())
            if(this.todolist[body.id]) {
                this.todolist.splice(body.id, 1);
            }
         })
         response.write(this.getJsonTodoList());
         response.end();
    }
}

