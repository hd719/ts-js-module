// Redux Tool Kit

import React, { useCallback, useRef } from "react";
import "./App.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { selectTodos, addTodo, removeTodo } from "./store";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "red",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      // addTodo(newTodoRef.current.value);
      dispatch(addTodo(newTodoRef.current.value));
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Introduction" />
      <Heading title="Todos" />
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}

const JustTheTodos = () => {
  const todos = useSelector(selectTodos);

  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <App />
    <JustTheTodos />
  </Provider>
);

export default AppWrapper;
