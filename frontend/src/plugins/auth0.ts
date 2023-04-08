import { createAuth0 } from '@auth0/auth0-vue'
import { auth0 } from '@/environment.json';

export default createAuth0({
  domain: auth0.domain,
  clientId: auth0.clientId,
  cacheLocation: 'localstorage',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: auth0.audience
  },
})