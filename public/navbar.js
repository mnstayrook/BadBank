function NavBar(){
  const {ctx,setCtx, checkUser}                         = React.useContext(UserContext);
  
  function checkLoggedInUser(){
    if (ctx !== null){
      return (
        <li className="nav-item">
            <a className="nav-link" onClick={() => setCtx(null)}>Logout</a>
          </li>
      )
    }
  };

  return(
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
    
    {/* pulls checkUser function from public/index.js to check logged in status and either
    pass name or Not Logged In status. */}
      <a>Logged In User: <br/> {checkUser(ctx).name}</a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {checkLoggedInUser()}
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>
          
        </ul>
      </div>
    </nav>

  );
}