function UserCursor({top,left,name,id}){   
    const style = {
        top: `${top}px`,
        left:`${left}px`
      };      
    return (
        <div 
        className="user-cursor"
        id={id}
        style={style}
        >
            <div className="name">
                {name}
            </div>
            <div className="cursor">
                <span>|</span>
            </div>
        </div>
    )
}
export default UserCursor;