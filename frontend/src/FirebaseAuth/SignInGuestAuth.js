import {auth} from './firebase'
import {
    signInAnonymously, 
} from 'firebase/auth'

async function SignInGuestAuth(email, password){
    try{
        const check = await signInAnonymously(auth, email, password)
        return check;
    }catch(err){
        console.log(err.code)
        return err.code
    }
}
export default SignInGuestAuth;