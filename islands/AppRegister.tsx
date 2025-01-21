export default function AppRegister() {
  const resistrationData = {
    client_name: "Test Application",
    redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
    scopes: "read write push",
    website: "https://myapp.example",
  };

  const handleRegister = async () => {
    const response = await fetch("https://masto.byrd.ws/api/v1/apps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(resistrationData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div class="my-4">
      <button
        onClick={handleRegister}
        class="px-4 py-1 bg-slate-500 text-white rounded hover:bg-gray-400"
      >
        Register with Instance
      </button>
    </div>
  );
}
