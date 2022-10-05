
const Operacion = ({isDeposito, saldo, updateSaldo}) => {
    const {Row,Col, Form, InputGroup, Button}   = ReactBootstrap;
    const [montoOperacion, setMontoOperacion]   = React.useState(0);
    const [disabledBtn, setDisabledBtn]         = React.useState(false);

    React.useEffect( () => {
        setDisabledBtn(false);
        setMontoOperacion("");
    },[isDeposito]);

    const getSign = () => {
        return (
            isDeposito ? "Depositar" : "Retirar"
         )
    }

    const getColor = () => {
        return(
            isDeposito ? 'info' : "warning"
        )
    }

    const getBackgroundColor = () => {
        return(
            isDeposito ? 'lightBlue' : 'lightYellow'
        )
    }

    const onBtnClick = () => {
        if(isDeposito) updateSaldo(saldo += montoOperacion, +montoOperacion);
        if(!isDeposito) updateSaldo(saldo -= montoOperacion, -montoOperacion);

        setMontoOperacion(0);
    }

    const handleOnChange = (e) => {
        let monto = +e.target.value;
        (!isDeposito && monto > saldo) ? setDisabledBtn(true) : setDisabledBtn(false);
        setMontoOperacion(monto);
    }

    return (
      <div>
        <Row>
          <Col>{`Por favor indroduce el monto a ${getSign()}`}</Col>
        </Row>
        <Row>
          <Col style={{ background: getBackgroundColor() }} className="p-3">
            <InputGroup className="w-50 m-auto">
              <Form.Control
                placeholder="Ingrese una cantidad"
                onChange={handleOnChange}
                value={montoOperacion}
                type="number"
                min={1}
                onClick={() => setMontoOperacion("")}
                onBlur={() => {
                  if (montoOperacion === "") setMontoOperacion(0);
                }}
              ></Form.Control>
              <Button
                variant={getColor()}
                onClick={onBtnClick}
                disabled={disabledBtn}
              >
                {getSign()}
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );

}