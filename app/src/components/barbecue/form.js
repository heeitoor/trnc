import React, { useState, useEffect, useReducer } from "react";
import { Button, Table, Icon, Form, Segment } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Steps } from "../common";
import LocalStorageHelper from "../../helpers/localStorage";
import MoneyHelper from "../../helpers/money";

const { withFun, noFun } = LocalStorageHelper.getSettings();

const BarbecueForm = props => {
  const { match } = props;
  const { params } = match;

  let initialState = {
    when: "",
    why: "",
    description: "",
    friends: [],
    errors: []
  };

  const wip = localStorage.getItem("wip");
  if (wip) {
    initialState = {
      ...initialState,
      ...JSON.parse(wip)
    };
  }

  const [form, setForm] = useState(initialState);

  const validate = () => {
    let errors = [];

    if (!form.when) {
      errors.push("when");
    }

    if (!form.why) {
      errors.push("why");
    }

    return errors;
  };

  const next = () => {
    let errors = validate();

    if (errors.length === 0) {
      localStorage.setItem(
        "wip",
        JSON.stringify({
          when: form.when,
          why: form.why,
          description: form.description,
          friends: form.friends
        })
      );
      props.history.push("/barbecue/confirm");
    }

    setForm({
      ...form,
      errors
    });
  };

  const handleChange = e => {
    setForm({
      ...form,
      toggleError: false,
      [e.target.name]: e.target.value
    });
  };

  const hasError = name => {
    return form.errors.filter(x => x === name).length > 0;
  };

  const cancel = () => {
    props.history.push("/barbecue");
  };

  return (
    <>
      <Segment attached basic>
        <Steps selected={0} />
        <Segment basic>
          <Form>
            <Form.Input
              label="Quando?"
              type="date"
              name="when"
              onChange={handleChange}
              value={form.when}
              error={hasError("when")}
            />
            <Form.Input
              label="Por quê?"
              type="text"
              name="why"
              onChange={handleChange}
              value={form.why}
              error={hasError("why")}
            />
            <Form.TextArea
              rows={2}
              label="Observação"
              name="description"
              onChange={handleChange}
              value={form.description}
            />
          </Form>
          <Segment secondary>
            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell colSpan="2">
                    <b>Valor de contribuição sugerido:</b>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Com bebida</Table.Cell>
                  <Table.Cell textAlign="right">
                    <b>{MoneyHelper.format(withFun)}</b>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Sem bebida</Table.Cell>
                  <Table.Cell textAlign="right">
                    <b>{MoneyHelper.format(noFun)}</b>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
          <Button floated="left" negative onClick={() => cancel()}>
            Cancelar
          </Button>
          <Button floated="right" primary onClick={() => next()}>
            Próximo
          </Button>
          <br style={{ clear: "both" }} />
        </Segment>
      </Segment>
    </>
  );
};

export default withRouter(BarbecueForm);
