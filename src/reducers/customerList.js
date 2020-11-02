import { allClients, defaultImage } from '../constants'
import {configureStore} from "@reduxjs/toolkit";



export const CHANGE_DATA = 'CHANGE_DATA'
export const ADD_CLIENT = 'ADD_CLIENT'
export const  DELETE_CLIENT= 'DELETE_CLIENT'
export const CLEAR_LIST = "CLEAR_LIST"

export default (state = allClients, action) => {
    if (action.type === CHANGE_DATA) {
        const { selectedId, name, age, image } = action.payload;
        return [
            ...state.map(elem => {
                if(selectedId === elem.id){
                    return {...elem, name, age:age, image:image}
                }
                return elem
            }),
        ]
    }
    if (action.type === ADD_CLIENT) {
        return [
            ...state, action.payload
        ]
    }
    if (action.type === DELETE_CLIENT) {
        return state.filter(elem => elem.id !== action.payload)
    }
    if (action.type === CLEAR_LIST) {
        return []
    }

    return state
}