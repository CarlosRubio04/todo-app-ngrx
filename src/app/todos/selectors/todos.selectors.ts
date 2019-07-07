import { createSelector } from '@ngrx/store';

import { getTodosModuleState } from '@todos/reducers';
import { todosAdapter } from '@todos/states';
import { getRouterState } from '@app/reducers';

export const geTodosState = createSelector(
  getTodosModuleState,
  state => state.todos
);

export const {
  selectAll: getAllTodos,
  selectTotal: getCountAllTodos,
  selectEntities: getEntitiesTodos
} = todosAdapter.getSelectors(geTodosState);

export const getVisibleTodos = createSelector(
  getAllTodos,
  getRouterState,
  (todos, router) => {
    if (router.state) {
      if (router.state.params) {
        const filter = router.state.params.filter;
        switch (filter) {
          default:
            return todos;
          case 'completed':
            return todos.filter(t => t.completed);
          case 'active':
            return todos.filter(t => !t.completed);
        }
      }
      return todos;
    }
    return [];
  }
);

export const getCountVisibleTodos = createSelector(
  getVisibleTodos,
  (todos) => todos.length
);
