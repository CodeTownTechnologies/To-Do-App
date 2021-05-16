import Layout from "../component/layout";
import { connect } from "react-redux";
import { crudActions } from "../utils/redux/actions";
import { useEffect } from "react";

const Index = (props) => {
  useEffect(() => {
    props.getAllData("categories", "categories");
  }, []);

  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = {
  getAllData: crudActions._getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
