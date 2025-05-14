import React, { useRef } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TempTodoItem } from './TempTodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Props {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => Promise<void>;
  onUpdateTodo: (todo: Todo) => Promise<void>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  onDelete,
  onUpdateTodo,
}) => {
  const nodeRefs = useRef(new Map<number | string, React.RefObject<HTMLDivElement | null>>());
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => {
          if (!nodeRefs.current.has(todo.id)) {
            nodeRefs.current.set(todo.id, React.createRef<HTMLDivElement>());
          }

          const nodeRef = nodeRefs.current.get(todo.id)!;

          return (
            <CSSTransition key={todo.id} timeout={500} classNames="item" nodeRef={nodeRef}>
              <TodoItem
                todo={todo}
                onDelete={onDelete}
                onUpdateTodo={onUpdateTodo}
                nodeRef={nodeRef}
              />
            </CSSTransition>
          );
        })}
        {tempTodo && (() => {
          if (!nodeRefs.current.has('tempTodo')) {
            nodeRefs.current.set('tempTodo', React.createRef<HTMLDivElement | null>());
          }

          const tempNodeRef = nodeRefs.current.get('tempTodo')!;

          return (
            <CSSTransition
              key="tempTodo"
              nodeRef={tempNodeRef}
              timeout={300}
              classNames="temp-item"
            >
              <TempTodoItem todo={tempTodo} nodeRef={tempNodeRef} />
            </CSSTransition>
          );
        })()}
      </TransitionGroup>
    </section>
  );
};
