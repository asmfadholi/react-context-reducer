import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
    production: localStorage.getItem('production') ? JSON.parse(localStorage.getItem('production')) : [
        {
            id: 1,
            name: 'Rumahku',
        }
    ],
    movie: localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : [
        {
            id: 1,
            name: 'Ada Cinta yang Corona berikan',
            genre: 'War',
            production: { id: 1, name:'Rumahku' },
            age: 'adult'
        }
    ],
    edit_production: {
        show: false,
    },
    edit_movie: {
        show: false,
    }
 };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'DELETE':
                const containerDelete = [...state[action.feature]]
                containerDelete.splice([state['edit_'+action.feature].index], 1)
                const newDelete = { ...state, [action.feature]: containerDelete}
                localStorage.setItem(action.feature, JSON.stringify(newDelete[action.feature]))
                return newDelete;
            case 'DETAIL':
                const newDetail = { ...state, ['edit_'+action.feature]: action}
                return newDetail;
            case 'EDIT':
                const containerEdit = [...state[action.feature]]
                containerEdit[state['edit_'+action.feature].index] = action
                const newEdit = { ...state, [action.feature]: containerEdit}
                localStorage.setItem(action.feature, JSON.stringify(newEdit[action.feature]))
                return newEdit;
            case 'ADD':
                const prod = [...state[action.feature]]
                prod.push( { ...action, id: Number(new Date()) } )
                const newAdd = { ...state,  [action.feature]: prod }
                localStorage.setItem(action.feature, JSON.stringify(newAdd[action.feature]))
                return newAdd;
            case 'CLOSE_MODAL':
                const newState = { ...state, ['edit_'+action.feature]: action}
                return newState;
            case 'SHOW_MODAL':
                const showModal = { ...state, ['edit_'+action.feature]: action }
                return showModal;
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value = { { state, dispatch } } > { children } </Provider>;
};

function connect(mapStateToProps, mapDispatchToProps) {
    return function (Component) {
        return function () {
            const {state, dispatch} = useContext(store)
            const stateToProps = mapStateToProps(state)
            const dispatchToProps = mapDispatchToProps(dispatch)
            const props = {...stateToProps, ...dispatchToProps}
            return (
                <Component {...props} />
            )
        }
    }
  }

export { store, StateProvider, connect }