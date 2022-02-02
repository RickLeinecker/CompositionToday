import {auth} from './firebase'
import {
    signInWithEmailAndPassword, signOut
} from 'firebase/auth'

async function SignInUserAuth(email, password){
    try{
        const check = await signInWithEmailAndPassword(auth, email, password)
        if(!check.user.emailVerified)
        {
            // console.log(check.user.emailVerified)
            signOut(auth)
            const errorCode = "auth/email-not-verified";
            return errorCode;
        }
        return check;
    }catch(err){
        console.log(err.code)
        return err.code
    }
}
export default SignInUserAuth;