const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext();

function Card(props){

  return (
    <div className={"card border-dark mb-3"} style={{maxWidth: "30rem"}}>
      <div className="card-header" style={{"text-align":"center"}}><h1>{props.header}</h1></div>
      <div className="card-body text-dark">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>      
  );    
}
