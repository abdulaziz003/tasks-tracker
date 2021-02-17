import {useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({title, setShowAddTask, showAddTask}) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && <Button color={showAddTask ? 'red': 'green'} text={showAddTask ? "اخفاء النموذج":  "اضافة"} onClick={setShowAddTask}/>}
    </header>
  )
}

Header.defaultProps = {
  title: 'متابعة المهام'
}

// determine the type of props
Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header

