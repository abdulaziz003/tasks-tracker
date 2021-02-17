import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  return (
    <footer>
      {location.pathname === '/' && <p>جميع الحقوق محفوظة &copy; ٢٠٢١</p>} 
      {location.pathname === '/' && <Link to="/about">تعرف علينا</Link>}
    </footer>
  )
}

export default Footer
