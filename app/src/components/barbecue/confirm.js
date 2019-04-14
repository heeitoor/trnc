import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
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
import LocalStorageHelper from "../../helpers/localStorage";
import MoneyHelper from "../../helpers/money";
const _ = require("lodash");
const moment = require("moment");

const { placeholderUrl } = require("../../config");

const { withFun, noFun } = LocalStorageHelper.getSettings();

const BarbecueConfirm = props => {
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

  const initialSelectedFriend = {
    id: undefined,
    name: "",
    value: 0,
    description: "",
    paid: false,
    fun: false
  };

  const [form, setForm] = useState(initialState);
  const [friendsList, setFriendsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(initialSelectedFriend);

  const load = async () => {
    setLoading(true);
    let data = await service.get();

    data = data.map(item => {
      let inList = form.friends.find(x => x.id === item.id);

      if (!inList) {
        inList = {
          ...inList,
          ...{ value: 0, description: "", paid: false, fun: false }
        };
      }

      return {
        ...item,
        ...inList
      };
    });

    setLoading(false);
    setFriendsList(data);
  };

  useEffect(() => {
    load();
  }, [form]);

  const toggleModal = () => {
    if (!modal) {
      load();
    }

    setModal(!modal);
  };

  const addFriend = async () => {
    setLoading(true);
    const { data } = await service.post({ name: friendName });
    setFriendsList([
      {
        id: data,
        name: friendName,
        ...{ value: 0, description: "", paid: false, fun: false }
      },
      ...friendsList
    ]);
    setFriendName("");
    setLoading(false);
  };

  const onChange = e => {
    setFriendName(e.target.value);
  };

  const selectFriend = args => {
    setSelectedFriend(args);
  };

  const addFriendToParty = async friend => {
    if (!friend) {
      setSelectedFriend(initialSelectedFriend);
      return;
    }

    _.remove(form.friends, x => x.id === friend.id);

    const newForm = {
      ...form,
      friends: [
        {
          ...friend,
          checked: true
        },
        ...form.friends
      ]
    };
    localStorage.setItem("wip", JSON.stringify(newForm));
    setForm(newForm);
    setSelectedFriend(initialSelectedFriend);
  };

  const next = () => {
    props.history.push("/barbecue/summary");
  };

  const previous = () => {
    props.history.push("/barbecue/form");
  };

  return (
    <Segment attached basic>
      <Steps selected={1} />
      <Segment basic>
        <Table celled size="small" attached="top">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <b>Quando?</b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <b>Por quê?</b>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {moment(form.when, "Y-MM-D").format("D/MM/Y")}
              </Table.Cell>
              <Table.Cell>{form.why}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table celled size="small" attached="bottom">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Quantos pila?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Com bebida</Table.Cell>
              <Table.Cell textAlign="right">
                <b>{`R$ ${parseFloat(withFun)
                  .toFixed(2)
                  .replace(".", ",")}`}</b>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sem bebida</Table.Cell>
              <Table.Cell textAlign="right">
                <b>
                  {`R$ ${parseFloat(noFun)
                    .toFixed(2)
                    .replace(".", ",")}`}
                </b>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button primary onClick={() => toggleModal()}>
          <Icon name="plus" />
          Adicionar Amigo
        </Button>
        <Table celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell style={{ background: "#f9fafb", fontWeight: "bold" }}>
                Nº de amigos
              </Table.Cell>
              <Table.Cell textAlign="right">{form.friends.length}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={{ background: "#f9fafb", fontWeight: "bold" }}>
                Meta da vaquinha
              </Table.Cell>
              <Table.Cell textAlign="right">
                {MoneyHelper.format(
                  _.filter(form.friends, x => x.fun).length *
                    parseFloat(withFun) +
                    _.filter(form.friends, x => !x.fun).length *
                      parseFloat(noFun)
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={{ background: "#f9fafb", fontWeight: "bold" }}>
                Valor atual da vaquinha
              </Table.Cell>
              <Table.Cell textAlign="right">
                {MoneyHelper.format(
                  _.sumBy(form.friends.filter(x => x.paid), x =>
                    parseFloat(x.value)
                  )
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={{ background: "#f9fafb", fontWeight: "bold" }}>
                Total de bebuns
              </Table.Cell>
              <Table.Cell textAlign="right">
                {form.friends.filter(x => x.fun).length}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={{ background: "#f9fafb", fontWeight: "bold" }}>
                Total de saudáveis
              </Table.Cell>
              <Table.Cell textAlign="right">
                {form.friends.filter(x => !x.fun).length}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button floated="left" onClick={() => previous()}>
          Anterior
        </Button>
        <Button
          primary={form.friends.length > 0}
          disabled={form.friends.length === 0}
          color={form.friends.length > 0 ? "blue" : "orange"}
          floated="right"
          onClick={() => next()}
        >
          {form.friends.length > 0 ? "Próximo" : "Forever alone não pode!"}
        </Button>
        <br style={{ clear: "both" }} />
      </Segment>
      <Modal open={modal} centered={false} size="tiny">
        <Modal.Header>Adicionar Amigos</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Segment
              loading={loading}
              className={selectedFriend.id ? "hidden" : ""}
            >
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
                  let icon = item.checked ? (
                    <Icon name="smile outline" />
                  ) : null;
                  return (
                    <List.Item key={item.id} onClick={() => selectFriend(item)}>
                      <Image avatar src={`${placeholderUrl}${item.name}`} />
                      <List.Content>
                        <List.Header>{item.name}</List.Header>
                        <List.Description
                          style={{ textAlign: "center", color: "green" }}
                        >
                          {icon}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Segment>
            <Segment
              className={selectedFriend.id === undefined ? "hidden" : ""}
              style={{ marginTop: "0px" }}
            >
              <Header>Contribução</Header>
              <FriendForm
                data={selectedFriend}
                addFriendToParty={addFriendToParty}
              />
            </Segment>
          </Modal.Description>
          <Modal.Actions style={{ textAlign: "center", marginTop: "10px" }}>
            <Button
              className={selectedFriend.id ? "hidden" : ""}
              primary
              onClick={() => toggleModal()}
            >
              Pronto!
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </Segment>
  );
};

export default withRouter(BarbecueConfirm);
