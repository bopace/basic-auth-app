import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthContext from './AuthContext'

function PrivateRoute({ component: Component, scopes, ...rest }) {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            // redirect to login if not logged in
            if (!auth.isAuthenticated()) return auth.login()

            // display message if user lacks requierd scope(s)
            if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
              return (
                <h1>
                  Unauthorized - You need the following scope(s) to view this
                  page: {scopes.join(',')}.
                </h1>
              )
            }

            // render component
            return <Component auth={auth} {...props} />
          }}
        />
      )}
    </AuthContext.Consumer>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  scopes: PropTypes.array,
}

PrivateRoute.defaultProps = {
  scopes: [],
}

export default PrivateRoute
