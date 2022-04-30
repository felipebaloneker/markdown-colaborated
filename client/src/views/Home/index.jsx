import {useAuth} from '../../hook/useAuth'

function Home(){
    const {user} = useAuth()
    console.log(user)
    return(
        <div>{user}</div>        
    )
}
export default Home