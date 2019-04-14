import React, { useState, useEffect } from "react";
import { Button, Table, Icon, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import BarbecueService from "../../services/barbecue";

const Grid = props => {
  let listInitialState = [];

  const wip = localStorage.getItem("wip");
  if (wip) {
    listInitialState.push(JSON.parse(wip));
  }

  const service = new BarbecueService();
  const [list, setList] = useState(listInitialState);
  const [hasPending, setHasPending] = useState(false);

  const add = (editPending = false) => {
    localStorage.setItem(
      "wip",
      editPending
        ? wip
        : JSON.stringify({
            id: undefined,
            why: 'fake',
            when: '2019-09-26',
            description: 'fake',
            friends: []
          })
    );
    props.history.push("/barbecue/form");
  };

  const remove = () => {
    localStorage.removeItem("wip");
    setList(list.filter(x => x.id));
    setHasPending(false);
  };

  const load = async () => {
    const data = await service.get();
    setList([...list, ...data]);
    if (list.length > 0) {
      setHasPending(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    console.log("haspending");
  }, [hasPending]);

  let pendingMessage = (
    <Message warning size="small">
      <p>
        <Icon name="warning sign" />
        Você tem um item que não foi salvo ainda!
      </p>
    </Message>
  );

  return (
    <>
      {hasPending ? pendingMessage : null}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.HeaderCell>Descrição</Table.HeaderCell>
            <Table.HeaderCell>Participantes</Table.HeaderCell>
            <Table.HeaderCell>Total Arrecadado</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {list.map(item => (
            <Table.Row key={item.id} warning={!item.id}>
              <Table.Cell>{item.when}</Table.Cell>
              <Table.Cell>{item.why}</Table.Cell>
              <Table.Cell>{item.friendsCount}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell textAlign="right">
                {item.id ? (
                  <Icon name="pencil" />
                ) : (
                  <Icon name="remove" onClick={() => remove()} />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {hasPending ? (
        <Button color="orange" onClick={() => add(true)}>
          <Icon name="pencil" />
          Editar pendência
        </Button>
      ) : (
        <Button primary onClick={() => add()}>
          <Icon name="plus" />
          Adicionar
        </Button>
      )}
    </>
  );
};

export default withRouter(Grid);
