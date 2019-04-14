import React, { useState, useEffect } from "react";
import { Button, Table, TableHeader, Icon, Segment } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Steps } from "../common";

const Summary = () => {
  const [list, setList] = useState([
    {
      id: 1,
      date: "21/09/2019",
      description: "teste",
      friendsCount: 10,
      amount: 34.43
    }
  ]);

  return (
    <Segment attached basic>
      <Steps selected={2} />
      <Segment basic>
        <Segment secondary>
          Dia 05/59/0198
          <br />
          Participantes
        </Segment>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Contribuição</Table.HeaderCell>
              <Table.HeaderCell>Bebida</Table.HeaderCell>
              <Table.HeaderCell>Pago</Table.HeaderCell>
              <Table.HeaderCell>Observação</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list.map(item => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.friendsCount}</Table.Cell>
                <Table.Cell>{item.amount}</Table.Cell>
                <Table.Cell>sdfsdf</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button primary floated="right" positive>
          <Icon name="plus" />
          Concluído!
        </Button>
        <br style={{ clear: "both" }} />
      </Segment>
    </Segment>
  );
};

export default withRouter(Summary);
