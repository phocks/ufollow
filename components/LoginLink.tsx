import { application, baseUrl, domain, username } from "../signals/auth.ts";
import { buildAuthorizationUrl } from "../utils/application.ts";

const LoginLink = () => {
  const authUrl = baseUrl.value && application.value &&
    buildAuthorizationUrl(baseUrl.value, application.value.client_id);
  return <div>{authUrl}</div>;
};

export default LoginLink;