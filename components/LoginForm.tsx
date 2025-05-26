const LoginForm = () => {
  return (
    <>
      <p>
        Please enter your fediverse address...
      </p>

      <div class="my-4">
        <form class="flex flex-col sm:flex-row gap-2">
          <input
            name="handle"
            type="text"
            placeholder="@user@domain.com"
            class="w-full sm:flex-1"
          />
          <button type="submit" class="btn w-fit sm:w-auto">Continue</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
