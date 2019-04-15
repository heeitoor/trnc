import React, { useState, useEffect } from "react";
import { Segment, Button, Table, Icon, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import BarbecueService from "../../services/barbecue";
import SettingsService from "../../services/settings";
import LocalStorageHelper from "../../helpers/localStorage";
const moment = require("moment");

const Grid = props => {
  let listInitialState = [];

  const wip = localStorage.getItem("wip");
  if (wip) {
    listInitialState.push(JSON.parse(wip));
  }

  const service = new BarbecueService();
  const settingsService = new SettingsService();
  const [list, setList] = useState(listInitialState);
  const [hasPending, setHasPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const add = (editPending = false) => {
    localStorage.setItem(
      "wip",
      editPending
        ? wip
        : JSON.stringify({
            id: undefined,
            why: "",
            when: "",
            description: "",
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
    const [data, settings] = await Promise.all([
      service.get(),
      settingsService.get()
    ]);

    if (data.Ok !== undefined && !data.Ok) {
      setHasError(false);
    }

    setList([...list, ...data]);

    LocalStorageHelper.setSettings(settingsService.format(settings.data));

    if (list.length > 0) {
      setHasPending(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {}, [hasPending]);

  let pendingMessage = (
    <Message warning size="small">
      <p>
        <Icon name="warning sign" />
        Você tem um item que não foi salvo ainda!
      </p>
    </Message>
  );

  return (
    <Segment basic>
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
            <Table.Row key={item.id ? item.id : 0} warning={!item.id}>
              <Table.Cell>
                {moment(item.when, "Y-MM-D").format("D/MM/Y")}
              </Table.Cell>
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
          {list.length === 0 ? (
            <Table.Row>
              <Table.Cell
                textAlign="center"
                colSpan={5}
                style={{ height: "100px" }}
              >
                <Icon name="meh outline" />
                <br />
                Nada aqui...
              </Table.Cell>
            </Table.Row>
          ) : null}
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
    </Segment>
  );
};

export default withRouter(Grid);
