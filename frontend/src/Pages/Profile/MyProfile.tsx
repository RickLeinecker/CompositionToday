import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'
import './MyProfileStyle.scss'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import { getAuth } from 'firebase/auth'
import { GenericHandlerType, User, UserProfile } from '../../ObjectInterface'
import GenericHandler from '../../Handlers/GenericHandler'
import MyProfileContentSelector from './MyProfileContentSelector'

export default function MyProfile(props: any) {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const currentUid = getAuth().currentUser?.uid;
    const [hasChanged, setHasChanged] = useState(false);

    const notifyChange = () => {
        setHasChanged(value => !value);
    }

    // get user info
    useEffect(() => {
        async function fetchUser(){
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({uid: currentUid}),
                methodType: "POST",
                path: "getLoggedInUser",
            }
            
            try{
                let answer = (await GenericHandler(handlerObject));
                if(answer.error.length > 0){
                    setError(answer.error);
                    return;
                }
                
                setError("");
                const result = await answer.result;
                setUser({
                    id: result.id,
                    userProfileID: result.userProfileID,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,

                });
                setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }
        
        }
        async function fetchUserProfile(){
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({uid: currentUid}),
                methodType: "POST",
                path: "readUserProfileByUID",
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
                    bio: result.bio,
                    displayName: result.displayName,
                });
                setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }
        
        }

        fetchUser();
        fetchUserProfile();
    },[currentUid, hasChanged])

    return (
        <>
            <TopNavBar/>
            <div>
                { 
                (loading && !error) ?
                    <div>...loading</div> 
                :
                (user && userProfile && !error) ? 
                    <MyProfileContentSelector user={user} userProfile={userProfile} notifyChange={notifyChange}/>
                :
                    <Alert variant="danger">{error}</Alert>
                }
            </div>
        </>
    )
}
