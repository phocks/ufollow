const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("user-info");

    Object.keys(localStorage)
      .filter((key) => key.startsWith("access-token:"))
      .forEach((key) => localStorage.removeItem(key));

    globalThis.location.reload();
  };

  return (
    <button type="button" onClick={handleLogout} className="btn logout-button">
      Logout
    </button>
  );
};
export default LogoutButton;
