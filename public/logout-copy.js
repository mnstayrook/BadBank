// Non-Operational

function Logout(){
console.log('In Logout');
    const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');
  const [message, setMessage] = React.useState('outer default message');
  
  return (
    <Card
      header="Logout"
      status={status}
      body={show ?
        <LogoutForm setShow={setShow} setStatus={setStatus} setMessage={setMessage}/> :
        <LogoutMsg/>
        }
    />
  );
}

function LogoutMsg(){
  return (<>
    <h5>You have been logged out.</h5>
    
    <br/>
    <button type="submit"
      className="btn btn-primary">
        Log In Again
    </button>
  </>);
}

function LogoutForm(props){
  const {ctx, setCtx}        = React.useContext(UserContext);

  console.log("on logout pg");
  function handle(){
      console.log("Logging Out");
      setCtx(null);

      props.setStatus('');
      props.setShow(false);
      props.setMessage(message);
  };

 return(
  <>
    <h5>
      Thank you for your business! <br/>
      Click below to log out.
    </h5>
    <button type="button" className="btn btn-primary" onClick={handle}>
      Log Out
    </button>
  </>);
};