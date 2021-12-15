import React, { useEffect, useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'
import './MyProfileStyle.scss'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import { getAuth } from 'firebase/auth'
import { GenericHandlerType, User } from '../../ObjectInterface'
import GenericHandler from '../../Handlers/GenericHandler'
import MyProfileContentSelector from './MyProfileContentSelector'

export default function MyProfile(props: any) {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();

    // get user info
    useEffect(() => {
        async function fetchUser(){
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({uid: getAuth().currentUser?.uid}),
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
                });
                setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }
        
        }
        fetchUser();
    },[])

    return (
        <>
            <TopNavBar/>
            <Container style = {{padding:"2%"}}>
                { 
                (loading && !error) ?
                    <div>...loading</div> 
                :
                (user && !error) ? 
                    <MyProfileContentSelector user={user}/>
                :
                    <Alert variant="danger">{error}</Alert>
                }
            </Container>
        </>
    )
}
