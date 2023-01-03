function Logout(){
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState('');
    const [message, setMessage] = React.useState('outer default message');
    const Link                  = ReactRouterDOM.Link;
    const useRouter             = require('next/navigation');
    const router                = useRouter();
  
    return (
      <Card
        header="Log Out"
        status={status}
        body=
          <LogoutMsg setShow={setShow} setMessage={setMessage}/>
      />
    )
}
  
function LogoutMsg(props){
  console.log("on logout pg");
  function handle(){
      console.log("Logging Out");
      const url = `/account/logout`;
    
      fetch(url).then(response => response.json())
        .then(data => {
          let message = data.message;
          console.log("data = " + data);
          props.setMessage(message);
      });
      props.setStatus('');
      router.push('/login');
  };

  return (<>
    <h5>You have been logged out.</h5>
    <button type="button" 
      className="btn btn-primary" 
      onClick={handle}>
        Thank you for your business!
    </button>
  </>);
}; 
