function Home(){
  return (
    <Card
      header="BadBank Home Page"
      body={<BodyText/>}
    />
  );  
}

function BodyText(){
  return (
    <>
      <h5 align="center">Welcome to the BadBank</h5>
      <p>
        Welcome! This website is to test out a multitude of features such as data linking, react components, routing, validation, database management, and more.
      </p>
      <p>
        You can navigate by using the above navigation bar.
      </p>
      <ul>
        <li>Create a pseudo-account under "Create Account" or login with a pre-existing user from "AllData"</li>
        <li>Deposit and withdraw money</li>
        <li>View all stored data from the MongoDB database in "AllData"</li>
        <li>Delete user data from "AllData"</li>
        <p><b>Important:</b> When creating a new password, please do not use one you are actively using. While you can delete a user on the system, your information will still be displayed publicly for the short amount of time before it is deleted.</p>
      </ul><br/>
      <img src="bank.png" className="img-fluid" alt="Responsive image"/>
      <br/><br/>
      <p align="center">
        Website created by Maegan Stayrook. <br/>
        <a href="https://github.com/mnstayrook/BadBank">GitHub Portfolio</a><br/>
      </p>
    </>
  )
}