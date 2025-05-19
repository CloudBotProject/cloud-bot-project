import PropTypes from 'prop-types';

const Home = ({ user }) => (
  <div style={{ textAlign: 'center' }}>
    <h1>The chatbot comes here</h1>
    <h1>Welcome, {user.username}!</h1>
    
  </div>
);

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Home;
