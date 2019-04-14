import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHeader,
  Icon,
  Form,
  Segment
} from "semantic-ui-react";

const FriendForm = props => {
  const { data } = props;

  // const initialState = {
  //   id: undefined,
  //   name: data.name,
  //   value: data.value,
  //   description: data.description,
  //   paid: data.paid,
  //   fun: data.fun
  // };

  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm({
      ...data
    });
  }, [props.data]);

  return (
    <Form>
      <Form.Input
        label="Nome"
        type="text"
        value={form.name}
        readOnly
        onChange={() => {}}
        placeholder="Seu nome...."
      />
      <Form.Input
        label="Valor da contribuição"
        type="text"
        placeholder="Valor..."
      />
      <Form.TextArea label="Observação" />
      <Form.Checkbox label="Pago?" />
      <Form.Group inline>
        <Form.Radio label="Com bebida" value="true" name="beverage" />
        <Form.Radio label="Sem bebida" value="false" name="beverage" />
      </Form.Group>
      <Button primary>
        <Icon name="check" />
        Ok
      </Button>
    </Form>
  );
};

export default FriendForm;
