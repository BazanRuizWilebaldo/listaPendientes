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

    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange(e) {
    var name = e.target.name
    var value = e.target.value
    console.log('Name:', name)
    console.log('Value:', value)

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('ITEM:', this.state.activeItem)
    var url = 'http://127.0.0.1:8000/api/task-create/'

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem: {
          id: null,
          title: '',
          completed: false,
          status: '',
        }
      })
    }).catch(function (error) {
      console.log('ERROR:', error)
    })
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
                  <form onSubmit={this.handleSubmit} id="form">
                    <div className="">
                      <div className=" bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-5">
                            <input onChange={this.handleChange} type="text" id="create-account-pseudo"
                              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                              name="title" placeholder="tarea" />
                          </div>

                          <div className="col-span-6 sm:col-span-1">
                            <button type="submit" id="submit"
                              className="py-2 px-4  bg-cyan-400 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            > Agregar 
                              </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>



                </div>
              </div>


              <div >
                {tasks.map(function (task, index) {
                  return (
                    <div className="w-full  px-3 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 grid grid-cols-8 gap-1 mb-5 mt-5" key={index}>
                      <div className=" col-span-4 sm:col-span-6 " >
                        <input id="task" name="task" type="checkbox" className="accent-cyan-300 focus:accent-cyan-500  rounded" />

                        <span className="text-md  text-gray-800 sm:text-lg"> {task.title} </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <button id="edit" type="button" className="py-1 px-2 flex justify-center items-center  bg-lime-500 hover:bg-lime-600 focus:ring-lime-500 focus:ring-offset-lime-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">


                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>

                        </button>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <button id="delete" type="button" className="py-1 px-2 flex justify-center items-center  bg-red-400 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>

                        </button>
                      </div>
                    </div>
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