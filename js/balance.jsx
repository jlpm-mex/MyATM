
const movimientos = (saldo) => {
    const {tr} = ReactBootstrap;
    let total = 0;
    return(
    saldo.operaciones.map((operacion,index)=>{
        total += operacion.monto; 
        return(
        <tr key={index}>
            <td>
                {index}
            </td>
            <td>
                {operacion.fecha}
            </td>
            <td>
                $ {operacion.monto}
            </td>
            <td>
                {index > 0 ?
                 `$ ${total}`
                 : '0'
                }
            </td>
        </tr>)
    })
    )
}


const Balance = ({saldo}) => {

    const {Row,Col,Table, tr, tbody, thead, th} = ReactBootstrap;

    return(
        <Row>
            <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Fecha
                            </th>
                            <th>
                                Movimiento
                            </th>
                            <th>
                                Saldo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimientos(saldo)}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );

}
