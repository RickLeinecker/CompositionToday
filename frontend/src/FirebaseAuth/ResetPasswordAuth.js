import {auth} from './firebase'
import {
    sendPasswordResetEmail
} from 'firebase/auth'

async function ResetPasswordAuth(email, actionCodeSettings){
    try{
        const check = await sendPasswordResetEmail (auth, email, actionCodeSettings)
        return check;
    }catch(err){
        return err.code
    }
}
export default ResetPasswordAuth;