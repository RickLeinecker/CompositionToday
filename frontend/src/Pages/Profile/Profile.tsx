import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import './ProfileStyle.scss';
import DefaultValues from '../../Styles/DefaultValues.module.scss';
import { getAuth } from 'firebase/auth';
import { GenericHandlerType, UserProfile } from '../../ObjectInterface';
import GenericHandler from '../../Handlers/GenericHandler';
import ProfileContentSelector from './ProfileContentSelector';
import { useParams } from 'react-router-dom';
import { ProfileContext } from './ProfileContext';
import { auth } from '../../FirebaseAuth/firebase';

export default function Profile(props: any) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const currentUid = getAuth().currentUser?.uid;
    const [hasChanged, setHasChanged] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState(false);

    const {username} = useParams();

    const notifyChange = () => {
        setHasChanged(value => !value);
    }

    // sets current section button color to selected 
    useEffect(() => {
        setIsMyProfile(false);
        if(userProfile?.uid === auth.currentUser?.uid)
            setIsMyProfile(true);

    }, [userProfile])

    // get user info
    useEffect(() => {
        async function fetchUser(){
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({username: username}),
                methodType: "POST",
                path: "readUserByUsername",
            }
            
            try{
                let answer = (await GenericHandler(handlerObject));
                if(answer.error.length > 0){
                    setError(answer.error);
                    return;
                }
                
                setError("");
                const result = await answer.result;

                setUserProfile({
                    userID: result.userID,
                    uid: result.uid,
                    bio: result.bio,
                    displayName: result.displayName,
                    profilePicPath: result.profilePicPath,
                });
                setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }
        
        }

        fetchUser();
    },[currentUid, hasChanged, username])

    return (
        <>
            <ProfileContext.Provider value={{ isMyProfile }} >
            <div>
                { 
                (loading && !error) ?
                    <div>...loading</div> 
                :
                (userProfile && !error) ? 
                    <ProfileContentSelector userProfile={userProfile} notifyChange={notifyChange}/>
                :
                    <Alert variant="danger">{error}</Alert>
                }
            </div>
            </ProfileContext.Provider>
        </>
    )
}
