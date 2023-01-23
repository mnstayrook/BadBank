function AllData() {
  const [data, setData] = React.useState("");
  const [floppy, setFloppy] = React.useState(false);

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(
          data.map((data, index) => (
            <>
              <ul className="User Data" key={index}>
                <li>Name: {data.name}</li>
                <li>Email: {data.email}</li>
                <li>Password: {data.password}</li>
                <li>Balance: {data.balance}</li>
                <li>
                  <button
                    onClick={async () => {
                      await fetch(`/account/delete/${data.email}`).then(() => {
                        console.log("User Deleted");
                        window.location.reload(true);
                      });
                    }}
                  >
                    Delete User
                  </button>
                </li>
              </ul>
            </>
          ))
        );
      });
  }, []);

  return <Card header="Deposit" body={data} />;
}
