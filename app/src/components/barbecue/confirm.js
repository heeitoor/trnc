import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHeader,
  Icon,
  Form,
  Segment,
  Modal,
  Image,
  Header,
  List
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Steps } from "../common";
import { FriendForm } from "../friend";
import FriendService from "../../services/friend";

const placeholderUrl = "https://ui-avatars.com/api/?rounded=true&name=";

function Confirm() {
  const service = new FriendService();

  let initialState = {
    when: "",
    why: "",
    description: "",
    friends: []
  };

  const wip = localStorage.getItem("wip");
  if (wip) {
    initialState = {
      ...initialState,
      ...JSON.parse(wip)
    };
  }

  const [form, setForm] = useState(initialState);
  const [friendsList, setFriendsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [selectedFriend, setSelectedFriend] = useState({
    id: undefined,
    name: "",
    value: 0,
    description: "",
    paid: false,
    fun: false
  });

  const load = async () => {
    const data = await service.get();
    setFriendsList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const addFriend = () => {
    setFriendsList([{ id: 9, name: friendName }, ...friendsList]);
    setFriendName("");
  };

  const onChange = e => {
    setFriendName(e.target.value);
  };

  const selectFriend = args => {
    console.log({
      ...args,
      value: 0,
      description: "",
      paid: false,
      fun: false
    });

    setSelectedFriend({
      //...args,
      id: 12,
      value: 0,
      description: "",
      paid: false,
      fun: false
    });

    console.log(selectedFriend.id === undefined)
  };

  return (
    <Segment attached basic>
      <Steps selected={1} />
      <Segment basic>
        <Table celled size="small">
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="2">
                <p>Dia 01/09/2019</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="2">lorem ipsum</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan="2">Quantos pila?</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Com bebida</Table.Cell>
              <Table.Cell>R$ 15,00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sem bebida</Table.Cell>
              <Table.Cell>5,00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button primary onClick={() => toggleModal()}>
          <Icon name="plus" />
          Adicionar Amigo
        </Button>
        <Segment secondary>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Nº de amigos</Table.Cell>
                <Table.Cell>{form.friends.length}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Meta da vaquinha</Table.Cell>
                <Table.Cell>12</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Valor atual da vaquinha</Table.Cell>
                <Table.Cell>12</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total de bebuns</Table.Cell>
                <Table.Cell>12</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Total de saudáveis</Table.Cell>
                <Table.Cell>12</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Button floated="left">Anterior</Button>
        <Button floated="right" onClick={() => next()}>
          Próximo
        </Button>
        <br style={{ clear: "both" }} />
      </Segment>
      <Modal open={modal} centered={false} size="tiny">
        <Modal.Header>Adicionar Amigos</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Segment>
              <Form>
                <Form.Input
                  label="Nome"
                  placeholder="Nome..."
                  type="text"
                  onChange={e => onChange(e)}
                  value={friendName}
                  action={{
                    color: "teal",
                    icon: "plus",
                    onClick: addFriend
                  }}
                />
              </Form>
              <List horizontal relaxed selection size="small">
                {friendsList.map(item => {
                  return (
                    <List.Item key={item.id} onClick={() => selectFriend(item)}>
                      <Image avatar src={`${placeholderUrl}${item.name}`} />
                      <List.Content>
                        <List.Header>{item.name}</List.Header>
                        <List.Description
                          style={{ textAlign: "center", color: "green" }}
                        >
                          <Icon name="smile outline" />
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Segment>
            <Segment className={selectedFriend.id === undefined ? "hidden" : ""}>
              <Header>Contribução</Header>
              <FriendForm data={selectedFriend} />
            </Segment>
          </Modal.Description>
          <Modal.Actions style={{ textAlign: "center", marginTop: "10px" }}>
            <Button primary onClick={() => toggleModal()}>
              Pronto!
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </Segment>
  );
}

export default withRouter(Confirm);
