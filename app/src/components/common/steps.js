import React from "react";
import { Step } from "semantic-ui-react";

const Steps = props => {
  const { selected } = props;

  return (
    <Step.Group attached="top" widths={3}>
      <Step active={selected === 0} disabled={selected !== 0}>
        <i
          className="fas fa-drumstick-bite"
          style={{
            fontSize: "2.5em",
            lineHeight: 1,
            margin: "0 1rem 0 0"
          }}
        />
        <Step.Content>
          <Step.Title>Churrasco</Step.Title>
          <Step.Description>Quando? Por quê?</Step.Description>
        </Step.Content>
      </Step>
      <Step active={selected === 1} disabled={selected !== 1}>
        <i
          className="fas fa-smile"
          style={{
            fontSize: "2.5em",
            lineHeight: 1,
            margin: "0 1rem 0 0"
          }}
        />
        <Step.Content>
          <Step.Title>Amigos</Step.Title>
          <Step.Description>Quem vai?</Step.Description>
        </Step.Content>
      </Step>
      <Step active={selected === 2} disabled={selected !== 2}>
        <i
          className="fas fa-glass-cheers"
          style={{
            fontSize: "2.5em",
            lineHeight: 1,
            margin: "0 1rem 0 0"
          }}
        />
        <Step.Content>
          <Step.Title>Pronto</Step.Title>
          <Step.Description>:D :D :D</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default Steps;
