import {auth} from './firebase'

import {
    createUserWithEmailAndPassword
} from 'firebase/auth'

async function SignUpAuth (email, password){
    
    // also logs them in
    // const check = await createUserWithEmailAndPassword(auth, email, password)
    // .catch(err =>{
    //     console.log(err.message)
    //     return err.message;
    // })
    // console.table(check)
    try{
        const check = await createUserWithEmailAndPassword(auth, email, password)
        return check;
    }catch(err){

        return err.code
    }
}
export default SignUpAuth;