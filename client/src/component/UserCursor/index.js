function UserCursor(cursor,name,id){                            
    return (
        <div 
        className="user-cursor"
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