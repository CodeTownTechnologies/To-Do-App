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

import { connect } from "react-redux";
import { crudActions } from "../utils/redux/actions";


const Index = (props) => {
  const { tasks } = props;
  const router = useRouter();
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {    
      getData();    
  }, []);

  const getData = async () => {
    // get tasks from redux if null
    await props.getAllData("tasks", "tasks");    
  };

  const deleteData = async (id) => {
    await apiConfig
      .delete(`tasks/${id}`)
      .then((response) => {
        if (response.status == 200) {
          getData();
          setMessage(response.data.message);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        const { response } = error;
        setError(response.data.message);
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
      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
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

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  getAllData: crudActions._getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
