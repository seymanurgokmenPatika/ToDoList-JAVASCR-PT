import { useEffect, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid'

function App() {

  const [todoname, setTodoName] = useState() //input (yapılacak olan)

  const [newList, setNewlst] = useState([]) //yapılacaklar listesi => [] dizi şeklinde

  const [num, setnum] = useState() // yapılmayan maddelerin sayısı

  //yapılacaklar,maddeler
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      name: "Learn JavaScript", //madde
      completed: true, //yapıldı şeklinde işaretli

    },
    {
      id: nanoid(),
      name: "Learn React", //madde
      completed: false,//yapılmadı şeklinde işaretli
    },
    {
      id: nanoid(),
      name: "Have a life!", //madde
      completed: false,//yapılmadı şeklinde işaretli
    },
    {
      id: nanoid(),
      name: "carpe diem!", //madde
      completed: false,//yapılmadı şeklinde işaretli
    }
  ])

  //HandleSubmit ile formu asenkron(eşzamansız) olarak kolayca gönderme
  function handleSubmit(e) {
    e.preventDefault();
    if (todoname) //input varsa
    {
      setTodos([...todos, // önceki maddeleri koruyarak
         { 
          id: nanoid(),
          name: todoname,// yeni maddeyi ekleme
          completed: false //yapılmadı şeklinde işaretli
         }]) 

    }
    document.querySelector(".new-todo").value = "" //new-todo = DIV => ClassName
  }


  function getCompleted(t) {
    t.completed ? t.completed = false : t.completed = true //TOGGLE, yapılmış mı ? yapılmışsa = false(yapılmamış) : yapılmamışsa = true(yapılmış)
    let unComplited = todos.filter(t => t.completed === false) //yapılmamışları seç
    setnum(unComplited.length) // yapılmayanların sayısı
  }


  useEffect(() => {
    setNewlst(todos) // todolist i güncelle
    setnum(todos.filter(t => t.completed === false).length) //yapılmayan maddelerin sayısını set et
  }, [todos]) //her todo için



  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          {/* onSubmit  => callback’i hem submit butonuna tıkladığınızda hem de klavyede enter tuşuna bastığınızda çalışır. */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input className="new-todo" placeholder="What needs to be done?" onChange={(e) => setTodoName(e.target.value)} autoFocus />
          </form>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {
              newList.map(t => { // yapılacaklar listesindeki maddeler
                return (
                  // yapılmış ise className = completed, değilse = ""
                  <li key={t.id} className={t.completed ? "completed" : " "}> 
                    <div className="view">
                      <input id={t.id} className="toggle" type="checkbox" onChange={() => getCompleted(t)} checked={t.completed} /> {/*Toggle = yapılmıştan yapılmamışa, yapılmamıştan yapılmışa çevirme */}
                      <label htmlFor={t.id} >{t.name}</label> {/* id'sine göre yapılacak madde */}
                      <button className="destroy" onClick={() => setTodos(todos.filter(ta => ta.id !== t.id))} ></button>
                    </div>
                  </li>
                )
              })
            }

          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{num}</strong> {/* yapılacak madde sayısı */}
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected" onClick={() => setNewlst(todos)}>All</a> {/* tüm maddeleri gösterme */}
            </li>
            <li>
              <a href="#/" onClick={() => setNewlst(todos.filter(t => t.completed === false))}>Active</a> {/* yapılacak maddeleri gösterme */}
            </li>
            <li>
              <a href="#/" onClick={() => setNewlst(todos.filter(t => t.completed === true))}>Completed</a> {/* yapılmış maddeleri gösterme */}
            </li>
          </ul>

          <button className="clear-completed" onClick={() => setTodos(todos.filter(t => t.completed === false))}> {/*yapılmışları temizle*/}
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  );
}

export default App;