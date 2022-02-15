import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false,
        status: '',
      },
      editing: false,
    }

  };

  componentWillMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    console.log('obteninedo...')

    fetch('http://127.0.0.1:8000/api/task-list/')
      .then(response => response.json())
      .then(data =>
        this.setState({
          todoList: data
        })
      )

  }

  render() {
    var tasks = this.state.todoList

    return (

      <div className="w-full h-screen font-sans bg-cover bg-landscape">
        <div className="container flex items-center justify-center flex-1 h-full mx-auto">
          <div className="w-full max-w-5xl">

            <div className="flex flex-col  px-4 py-8 bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">

              <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                Lista de Tareas Pendientes
              </div>


              <div className=" w-full md:grid md:grid-cols-3 md:gap-2 mt-8">
                <div className="mt-5 md:mt-0 md:col-span-4">
                  <form>
                    <div className="">
                      <div className=" bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-5">
                            <input type="text" id="create-account-pseudo"
                              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                              name="pseudo" placeholder="tarea" />
                          </div>

                          <div className="col-span-6 sm:col-span-1">
                            <button type="submit"
                              className="py-2 px-4  bg-cyan-400 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                              Guardar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div>
                {tasks.map(function (task, index) {
                  return (
                    <p key={index}>
                      <span>{task.title}</span>

                    </p>
                  )
                })}
              </div>



            </div>
          </div>
        </div>
      </div>



    )
  }
}

export default App;