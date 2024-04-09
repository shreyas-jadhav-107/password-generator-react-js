import { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*(){}+=";

    for (let i = 1; i <= length; i++) {
      let char = Math.random() * str.length + 1;
      // pass += str.charAt(char);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [password]);

  // console.log(numberAllowed);
  return (
    <>
      <Container className="mt-5 ">
        <Card
          className="mx-auto shadow text-center"
          style={{ width: "70%", background: "#f0f9ff" }}
        >
          <Card.Body>
            <Card.Title className="mt-3">Password Generator</Card.Title>

            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder={password}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                readOnly
                ref={passwordRef}
              />
              <Button
                variant="outline-primary"
                id="button-addon2"
                onClick={copyPasswordToClipboard}
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </InputGroup>

            <Row className="align-items-center">
              <Col xs={3} className="pr-0">
                <Form.Range
                  min={6}
                  max={50}
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
              </Col>
              <Col xs={2} className="pl-0">
                <Form.Label>Length: {length}</Form.Label>
              </Col>
              <Col xs={3} className="pl-0">
                <Form.Check
                  type="switch"
                  id="number-switch"
                  label="Numbers"
                  defaultChecked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                />
              </Col>
              <Col xs={4} className="pl-0">
                <Form.Check
                  type="switch"
                  id="character-switch"
                  label="Special Characters"
                  defaultChecked={characterAllowed}
                  onChange={() => setCharacterAllowed((prev) => !prev)}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;
