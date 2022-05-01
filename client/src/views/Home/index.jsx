import { useParams } from 'react-router';
import {useAuth} from '../../hook/useAuth'
import './styles.scss'

function Home(){
    const {user} = useAuth()
    const params = useParams();
    const code = params.id
    return(
       <div className="page">
           <div className="header">
               <div className='username'>
                    <p>{user}</p>
               </div>
               <div className="code">
                   <p>{code}</p>
               </div>
           </div>
           <div className="editor">

           </div>
       </div>
    )
}
export default Home