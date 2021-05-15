import React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  ListGroup,
  Row,
} from "react-bootstrap";
import Layout from "../component/layout";
import { apiConfig } from "../utils/api";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [tasks, setTasks] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await apiConfig.get("tasks").then((response) => {
      if (response.status == 200) {
        setTasks(response.data);
      }
    });
  };

  const deleteData = async (id) => {
    await apiConfig.delete(`tasks/${id}`).then((response) => {
      if (response.status == 200) {
        setMessage(response.data.message);
        getData();
      }
    });
  };

  const editData = (id) => {
    router.push({
      pathname: "/task/[id]",
      query: { id: id },
    });
  };
  const addData = () => {
    router.push({
      pathname: "/task/[id]",
      query: { id: 'new' },
    });    
  };

  return (
    <Layout>
      <Row style={{ marginTop: 20, marginBottom: 20 }}>
        <Col md={10}>
          <h1>Tasks</h1>
        </Col>
        <Col md={2}>
          <Button onClick={() => addData()}>Add</Button>
        </Col>
      </Row>

      {message && (
        <Alert variant="success" onClose={() => setMessage("")} dismissible>
          {message}
        </Alert>
      )}

      <ListGroup>
        {tasks &&
          tasks.map((category) => {
            return (
              <ListGroup.Item>
                <Row>
                  <Col md={10}>
                    <h3>{category.name}</h3>
                    <p>{category.created_at}</p>
                  </Col>
                  <Col md={2}>
                    <ButtonGroup>
                      <Button onClick={() => editData(category.id)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteData(category.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Layout>
  );
};

export default Index;
