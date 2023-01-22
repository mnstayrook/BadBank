function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = React.useState('outer default message');


  return (
    <Card
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setMessage={setMessage}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus} message={message}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>{props.message}</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
    <br/>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const {ctx, setCtx}        = React.useContext(UserContext);
  
  function handle(){
    console.log(email, password);
    const url = `/account/login/${email}/${password}`;
    (async () => {
      var res = await fetch(url)
        .then(response => response.json())
        .then(data => {
          let message = data.message;
          props.setMessage(message);
          console.log('data = ' + data);
          console.log(message);
          if (data.user.name !== "Null")
            setCtx(data.user);
            console.table(ctx);
        })
        .catch((err)=>{props.setMessage("Please enter username and password.")});
    })();

    props.setStatus('');
    props.setShow(false);
  };

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-primary" onClick={handle}>Login</button>
   
  </>);
}