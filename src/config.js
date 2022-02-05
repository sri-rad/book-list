const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
    issuer: 'https://dev-31323009.okta.com/oauth2/default',
    clientId: '0oa16ynsrs6SuuF8e5d7',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: window.location.origin + '/login/callback',
  };

  const oktaSignInConfig = {
    baseUrl: 'https://dev-31323009.okta.com',
    clientId: '0oa16ynsrs6SuuF8e5d7',
    redirectUri: window.location.origin + '/login/callback',
    authParams: {
        scopes: ['openid', 'profile', 'email'],
      // If your app is configured to use the Implicit flow
      // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
      // you will need to uncomment the below line
    //   pkce: false
    },
    features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
         registration: true // REQUIRED
      }
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
  };

  export { oktaAuthConfig, oktaSignInConfig };