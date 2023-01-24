function AllData() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(
          data.map((data, index) => (
            <div key={index}>
              <ul className="User Data" key={index}>
                <li name={Number(`${index}0`)}>Name: {data.name}</li>
                <li name={Number(`${index}1`)}>Email: {data.email}</li>
                <li name={Number(`${index}2`)}>Password: {data.password}</li>
                <li name={Number(`${index}3`)}>Balance: {data.balance}</li>
                <li name={Number(`${index}4`)}>
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
            </div>
          ))
        );
      });
  }, []);

  return <Card header="AllData" body={data} />;
}
