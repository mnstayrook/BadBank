function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="This is an experimental site to showcase the MERN stack. You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
