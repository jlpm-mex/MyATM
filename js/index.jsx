const getSaludo = (hour) => {
    if(hour > 0 && hour < 12) return 'Buenos días';
    if(hour >= 12 && hour < 19) return 'Buenas tardes';
    if(hour >= 19 ) return 'Buenas noches';
}



const Header = () => {
    const d     = new Date();
    let hour    = d.getHours();
    let minutes = d.getMinutes();
    const { Container, Row, Col, ToggleButton, ButtonGroup } =
      ReactBootstrap;
    const [radioValue, setRadioValue] = React.useState("1");
    const [saldo, setSaldo] = React.useState({
      balance: 0,
      operaciones: [
        { monto: 0, fecha: moment().format("MMMM Do YYYY, h:mm:ss a") },
      ],
    });
    const radios = [
      { name: "Retiro", value: 1 },
      { name: "<- Balance ->", value: 2 },
      { name: "Deposito", value: 3 },
    ];

    const updateSaldo = (total,monto)=>{
        setSaldo({
          ...saldo,
          ["balance"]: total,
          ["operaciones"]: [
            ...saldo.operaciones,
            {
              monto: monto,
              "fecha": moment().format("MMMM Do YYYY, h:mm:ss a"),
            },
          ],
        });
    }

    const getBtnColor = (value) => {
        switch(value){
            case 1:
                return 'warning';
            case 2:
                return 'secondary';
            case 3:
                return 'info';
        }
    }

    return (
      <Container>
        <Row>
          <Col className="text-center">
            <h2>Bienvenido a Mi ATM</h2>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h6>{`${getSaludo(hour)} son las ${moment().format("MMMM Do YYYY, h:mm:ss a")}`}</h6>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h4>{`Tu saldo al dia de hoy es: $${saldo.balance}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h6>¿Que Operación desea realizar hoy?</h6>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <ButtonGroup className="mb-2">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  variant={getBtnColor(radio.value)}
                  onChange={(e) => setRadioValue(+e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {radioValue == 1 || radioValue == 3 ? (
              <Operacion
                isDeposito={radioValue === 1 ? false : true}
                saldo={saldo.balance}
                updateSaldo={updateSaldo}
              />
            ) : (
              <Balance saldo = {saldo}/>
            )}
          </Col>
        </Row>
      </Container>
    );
}


const MainView = () => {
    return(
        <div>
            <Header/>
        </div>
    );
}

ReactDOM.render(<MainView />, document.getElementById('root'));