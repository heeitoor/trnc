import React, { useState } from "react";
import {
  Button,
  Table,
  Icon,
  Segment,
  Image,
  Message
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Steps } from "../common";
import PartyService from "../../services/party";
import MoneyHelper from "../../helpers/money";
const _ = require("lodash");
const { placeholderUrl } = require('../../config');

const Summary = props => {
  const service = new PartyService();

  let initialState;
  const wip = localStorage.getItem("wip");
  if (wip) {
    initialState = {
      ...initialState,
      ...JSON.parse(wip)
    };
  } else {
    props.history.push("/barbecue");
    return;
  }

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const finish = async () => {
    setLoading(true);

    const { ok } = await service.post({
      barbecue: {
        description: form.description,
        when: form.when,
        why: form.why
      },
      contributions: form.friends.map(item => {
        return {
          ...item,
          friendId: item.id
        };
      })
    });

    if (ok) {
      localStorage.removeItem("wip");
      props.history.push("/barbecue");
    } else {
      setLoading(false);
    }
  };

  const previous = () => {
    props.history.push("/barbecue/confirm");
  };

  return (
    <Segment attached basic loading={loading}>
      <Steps selected={2} />
      <Segment basic>
        <Message positive>
          <Icon name="check" />
          Tudo certo para o dia<b> 05/59/0198</b>
        </Message>
        <Table celled stackable size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Contribuição</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Bebida</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Pago</Table.HeaderCell>
              <Table.HeaderCell>Observação</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {form.friends.map(item => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Image avatar src={`${placeholderUrl}${item.name}`} />
                  {item.name}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {MoneyHelper.format(item.value)}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.fun ? (
                    <Icon color="green" name="check" />
                  ) : (
                    <Icon color="red" name="remove" />
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.paid ? (
                    <Icon color="green" name="check" />
                  ) : (
                    <Icon color="red" name="remove" />
                  )}
                </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell textAlign="right">
                <b>{`Total: ${_.size(form.friends)}`}</b>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                <b>
                  {MoneyHelper.format(
                    _.sumBy(form.friends, x => parseFloat(x.value))
                  )}
                </b>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                <b>{`Total: ${_.filter(form.friends, x => x.fun).length}`}</b>
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                <b>{`Total: ${_.filter(form.friends, x => x.paid).length}`}</b>
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
        <Button floated="left" onClick={() => previous()}>
          Anterior
        </Button>
        <Button
          floated="right"
          color={form.friends.length > 1 ? "green" : "orange"}
          disabled={form.friends.length < 2}
          positive={form.friends.length > 1}
          onClick={() => finish()}
        >
          <Icon name="smile outline" />
          {form.friends.length < 2
            ? "Poxa, só uma pessoa? Não dá!"
            : "Concluir!"}
        </Button>
        <br style={{ clear: "both" }} />
      </Segment>
    </Segment>
  );
};

export default withRouter(Summary);
