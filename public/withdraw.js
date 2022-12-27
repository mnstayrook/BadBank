function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [message, setMessage] = React.useState('outer default message');

  return (
    <Card
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} setMessage={setMessage}/> :
        <WithdrawMsg setShow={setShow} message={message}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>{props.message}</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]       = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [balance, setBalance]   = React.useState('');
  const [data, setData] = React.useState('');

  function handle(){
    console.log(email, balance);
    // add /${password}
    const url = `/account/withdraw/${email}/${balance}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let message = data.message;
        props.setMessage(message);
        console.log('data = ' + data);
      });

      props.setShow(false);
      props.setStatus('');
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    {/* Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/> */}

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={balance} 
      onChange={e => setBalance(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>Withdraw</button>

  </>);
}
