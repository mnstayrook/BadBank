// still showing a success message when there is no account to deposit into.

function Deposit(){
  const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');
  const [message, setMessage] = React.useState('outer default message');

  return (
    <Card
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus} setMessage={setMessage}/> :
        <DepositMsg setShow={setShow} message={message}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>{props.message}</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>
        Deposit Again
    </button>
  </>);
}; 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [data, setData] = React.useState('');
  
  function handle(){
    console.log(email, balance);
    const url = `/account/deposit/${email}/${balance}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let message = data.message;
        props.setMessage(message);
        console.log("data = " + data);
        console.log(message);
    });

    props.setStatus('');
    props.setShow(false);
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={balance} onChange={e => setBalance(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>Deposit</button>

  </>);
}