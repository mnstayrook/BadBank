function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      txtcolor="black"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
    <br/>
    <button type="submit"
    className="btn btn-primary">
      Logout (coming soon)
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  
  function handle(){
    console.log(email, password);
    const url = `/account/login/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }
  // const ctx = React.useContext(UserContext);  

  // function handle(){
  //   const user = ctx.users.find((user) => user.email == email);
  //   console.log(user);
  //   console.log(email, password);
  //   if (!user) {
  //     console.log('one')      
  //     props.setStatus('fail!')      
  //     return;      
  //   }
  //   if (user.password == password) {
  //     console.log('two')            
  //     props.setStatus('');
  //     props.setShow(false);
  //     return;
  //   }
  //   console.log('three')          
  //   props.setStatus('fail!');        
  // }


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