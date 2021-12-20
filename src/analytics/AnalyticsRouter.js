import React from 'react'
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    
    return (
      <Component
        history={history}
        {...props}
        />
    );
  };
  
  return Wrapper;
};
const RouteChangeTracker = ({ history }) => {

    history.listen((location, action) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });

    return <div></div>;
};

export default withRouter(RouteChangeTracker);