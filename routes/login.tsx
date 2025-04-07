const Login = () => {
  return (
    <>
      <p>
        Please enter your fediverse address...
      </p>

      <div class="my-4">
        <form class="flex gap-2">
          <input
            name="handle"
            type="text"
            placeholder="@user@domain.com"
            class=""
          />
          <button type="submit" class="btn">Continue</button>
        </form>
      </div>
    </>
  );
};

export default Login;
