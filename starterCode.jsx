const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <div className="card">
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </div>
  );
};

const Account = () => {
  const [atmMode, setAtmMode] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if(Number(event.target.value) <= 0){
      return setValidTransaction(false)
    };
    if(atmMode === "Cash Back" && Number(event.target.value)>totalState){
      setValidTransaction(false);
    }else{
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
    
  };
  

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };
  function handleHide(event){
    setChecked(!checked);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div class="btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary btn-sm">
          <input type="checkbox" checked autocomplete="off" onChange={handleHide} value=""/> {checked ? "Hide Balance" : "Show Balance"}
        </label>
      </div>
      <div className="form-group">
        <h2 className="lead" id="total">{checked ? status:"Account Balance $****"}</h2>
        <label>Select an action below to continue</label>
        <br />
        <select className="form-control" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        {atmMode && (<ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>)}
      </div>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
