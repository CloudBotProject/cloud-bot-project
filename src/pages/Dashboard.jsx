import PropTypes from 'prop-types';

const Dashboard = ({ user }) => (
  <div style={{ textAlign: 'center' }}>
    <h1>Dashboard</h1>
    <p>Hello, {user.username}. Here is your dashboard content.</p>
  </div>
);

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
