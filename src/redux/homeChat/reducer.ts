const initialState={
    User_Data:[],
}

const chatReducer=(state=initialState,action:any)=>{
    const{type,payload}=action
    switch(type){
           case 'Set_Data':
            return {...state,User_Data:payload}
       default: 
           return state
    }

}
export default chatReducer;