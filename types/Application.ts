interface Application {
  id: string;
  name: string;
  website: string;
  scopes: string[];
  redirect_uris: string[];
  vapid_key: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
  client_secret_expires_at: number;
}

export default Application;