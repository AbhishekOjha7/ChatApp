const initialState={
    Auth_Data:[],
}

const authReducer=(state=initialState,action:any)=>{
    const{type,payload}=action
    switch(type){
       case 'signIn':
           return {...state,Auth_Data:payload}
       default: 
           return state
    }

}
export default authReducer;