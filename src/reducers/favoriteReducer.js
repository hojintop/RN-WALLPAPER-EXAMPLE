import { ACTION_CLICKED_FAVORITE } from "../actions/favorite"

export const initialState = {
    favoriteList:[]
}

export const favoriteListReducer=(state=initialState, action)=>{
    if(action.type === ACTION_CLICKED_FAVORITE){
        const hasItem = state.favoriteList.filter((item)=> item === action.clicked).length > 0;

        // 해당하는 아이템 List 가 있다면 필터를 통해 제외
        if(hasItem){
            return{
                ...state,
                favoriteList: state.favoriteList.filter((item)=> item !== action.clicked),
            }
        }

        return{
            ...state,
            favoriteList: [...state.favoriteList, action.clicked],
        }
    }
    return {
        ...state
    }
}