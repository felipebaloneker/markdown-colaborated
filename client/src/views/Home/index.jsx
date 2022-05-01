import { useParams } from 'react-router';
import {useAuth} from '../../hook/useAuth'
import './styles.scss'

function Home(){
    const {user} = useAuth()
    const params = useParams();
    const code = params.id
    console.log(user)
    return(
       <div className="page">
           <div className="header">
               <div className='username'>
                    <p>Olá, {user.name}</p>
               </div>
               <div className="code">
                   <p>Código:</p>
                   <span>{code}</span>
               </div>
           </div>
           <div className="editor">
               <div className="toolbar">

               </div>
               <div className="editor_container">
                <div className="text-area">

                </div>
                <div className="preview">
                    
                </div>
               </div>
           </div>
       </div>
    )
}
export default Home