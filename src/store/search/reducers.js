let initialState = {
    query: "",
    total: 0,
    results: [],
    current_page: 1
}

export default function resultsReducer(state = initialState, action){
    switch(action.type){

        case "RESULTS":
          return {
              ...state,
              query : action.payload.query,
              results: action.payload.images,
              total: action.payload.total
          }
        case "LOAD_MORE":
          return {
            ...state,
            results: [...state.results,...action.payload.images],
            current_page: state.current_page + 1
          }
            
        default:
          return state
    }
}