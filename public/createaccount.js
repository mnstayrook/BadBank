function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = React.useState('outer default message');

  return (
    <Card
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus} setMessage={setMessage}/> : 
        <CreateMsg setShow={setShow} setStatus={setStatus} message={message}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const {ctx, setCtx}        = React.useContext(UserContext);

  function handle(){
  console.log(name, email, password);
  const url = `/account/create/${name}/${email}/${password}`;
  (async () => {
    var res = await fetch(url)
    //var data = res.json();
        .then(response => response.json())
        .then(data => {
          let message = data.message;
          props.setMessage(message);
          //console.log('data: ' + data);
          //console.log(message);
          if (data.user !== null)
                setCtx(data.user);
                console.table(ctx);
        })
        .catch((err)=>{props.setMessage("Please enter username and password.")});
    })();
    props.setShow(false);
};

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    IMPORTANT: Do not use a real password; this is a testing site for features.<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password (not a real one!)" 
      title="Do not use a real password on this site; for testing only."
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>Create Account</button>

  </>);
}