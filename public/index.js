function Spa() {
  const [ctx,setCtx] = React.useState();
  const value = {ctx,setCtx,checkUser};

  // checks [ctx] status to see if it is null. If so, it replaces name;
  // if not, it gets destructured into array to pass name.
  function checkUser(ctx){
    if (ctx == null){
      return {name:"Not Logged In"};
    } else {
      return ctx;
    };
  };

  return (
    <HashRouter>
      <div>
        <UserContext.Provider value={value}>
        <NavBar/>        
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/alldata/" component={AllData} />
            {/* <Route path="/logout/" component={Logout} /> */}
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
