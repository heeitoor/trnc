import React, { useState, useEffect } from "react";
import { Button, Icon, Form } from "semantic-ui-react";

const FriendForm = props => {
  const { data, addFriendToParty } = props;

  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm({
      ...data
    });
  }, [props.data]);

  const handleChange = (e, obj) => {
    let { name, value, checked } = obj;

    if (["paid"].includes(name)) {
      value = checked;
    } else if (["fun", "noFun"].includes(name)) {
      value = !form.fun;
      name = "fun";
    }

    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <Form>
      <Form.Input
        label="Nome"
        type="text"
        placeholder="Seu nome...."
        readOnly
        value={form.name}
        onChange={() => {}}
      />
      <Form.Input
        label="Valor da contribuição"
        type="text"
        placeholder="Valor..."
        name="value"
        value={form.value}
        onChange={handleChange}
      />
      <Form.TextArea
        label="Observação"
        name="description"
        rows={2}
        value={form.description}
        onChange={handleChange}
      />
      <Form.Checkbox
        label="Pago?"
        name="paid"
        checked={form.paid}
        onChange={handleChange}
      />
      <Form.Group inline>
        <Form.Radio
          label="Com bebida"
          checked={form.fun}
          name="fun"
          onChange={handleChange}
        />
        <Form.Radio
          label="Sem bebida"
          checked={!form.fun}
          name="noFun"
          onChange={handleChange}
        />
      </Form.Group>
      <div style={{ textAlign: "center" }}>
        <Button
          negative
          onClick={() => {
            addFriendToParty(null);
          }}
        >
          <Icon name="remove" />
          Nah
        </Button>
        <Button
          primary
          onClick={() => {
            addFriendToParty(form);
          }}
        >
          <Icon name="check" />
          Ok
        </Button>
      </div>
    </Form>
  );
};

export default FriendForm;
