import ShowTodoList from "./components/showTodoList";
import CreateTodo from "./components/createTodo";
import { Route, Routes } from 'react-router-dom';
import "./App.scss";

function App() {
  return (
    <div className="app-contents">
      <Routes>
        <Route index element={<ShowTodoList />} />
        <Route path="/create-todo" element={<CreateTodo />} />
      </Routes>
    </div>
  );
}

export default App;