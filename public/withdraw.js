function Withdraw(){
  const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');  
  const [message, setMessage] = React.useState('outer default message');
  const {ctx,setCtx}                = React.useContext(UserContext);

  if (ctx == null){
    return(
      <>
        <a href="#/login/">
          <button
      className="btn btn-primary">Please Login to Continue</button>
        </a>
      </>
    )
  }; 

  return (
    <Card
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} setMessage={setMessage}/> :
        <WithdrawMsg setShow={setShow} message={message}/>
        }
    />
  )
};

function WithdrawMsg(props){
  return(<>
    <h5>{props.message}</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>
      Withdraw Again
      </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]           = React.useState('');
  const [password, setPassword]     = React.useState('');
  const [balance, setBalance]       = React.useState('');
  const [data, setData]             = React.useState('');
  const {ctx,setCtx}                = React.useContext(UserContext);
  //console.table(ctx)

  function handle(){
    console.log(email, balance);
    const url = `/account/withdraw/${ctx.email}/${balance}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let message = data.message;
        props.setMessage(message);
        console.log('data = ' + data);
        console.log(message);
      });

      props.setStatus('');
      props.setShow(false);
      ctx.balance = Number(ctx.balance) - Number(balance);
      setCtx(ctx);
  }

  return(<>
    User: {ctx.name} <br/>
    Current Balance: ${ctx.balance}<br/>

    Amount to Withdraw:<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      id="withdrawAmt"
      value={balance} onChange={e => setBalance(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>Withdraw</button>

  </>);
}
