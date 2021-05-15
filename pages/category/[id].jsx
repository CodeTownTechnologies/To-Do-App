import React from "react";
import { Alert, Button, Col, Row, Spinner, Form } from "react-bootstrap";
import Layout from "../../component/layout";
import { apiConfig } from "../../utils/api";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import SimpleReactValidator from "simple-react-validator";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const simpleValidator = React.useRef(
    new SimpleReactValidator({
      element: (message) => message,
    })
  );

  const getData = async (id) => {
    await apiConfig.get(`categories/${id}`).then((response) => {
      if (response.status == 200) {
        const { data } = response;        
        formik.setFieldValue("name", data.name);        
      }
    });
  };

  const formik = useFormik({
    initialValues: {      
      name: "",      
    },
    validate: (values) => {
      const errors = {};

      const nameError = simpleValidator.current.message(
        "name",
        values.name,
        "required"
      );

      if (nameError) {
        errors.name = nameError;
      }

      simpleValidator.current.showMessages();

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      setMessage("");
      setError("");
      setLoading(true);

      let url, method;

      if (id == "new") {
        method = "post";
        url = "categories";
      } else {
        method = "put";
        url = `categories/${id}`;
      }

      await apiConfig
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            setMessage(response.data.message);
          } else {
            setError(response.data.message);
          }
          setLoading(false);
        })
        .catch((error) => {
          const { response } = error;
          setError(response.data.message);
          setLoading(false);
          if (response.data.errors) {
            response.data.errors.forEach((element) => {
              setErrors({ [element.field]: element.message });
            });
          }
        });
    },
  });

  React.useEffect(() => {
    if (id && id !== "new") {
      getData(id);
    }
  }, [id]);


  return (
    <Layout>
      <Row style={{ marginTop: 20, marginBottom: 20 }}>
        <Col md={12}>
          <h1>Category</h1>
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

      <Form noValidate onSubmit={formik.handleSubmit}>
        
        <Form.Group>
          <Form.Control
            size="lg"
            type="text"
            placeholder="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={formik.touched.name && Boolean(formik.errors.name)}
          />
          {formik.touched.name && Boolean(formik.errors.name) && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button block type="submit" size="lg" disabled={loading}>
          {loading && <Spinner animation="border" />}
          {!loading && "Save"}
        </Button>
      </Form>
    </Layout>
  );
};

export default Index;
