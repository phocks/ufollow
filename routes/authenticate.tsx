

const Authenticate = () => {
  return (
    <div>
      <p>Please authenticate to continue.</p>
      
          <div class="my-4">
            <a
              href=""
              target="_blank"
              class=""
            >
              Authorize {"-->"}
            </a>
          </div>
          <div class="my-4">
            <form
              
              class="flex gap-2"
            >
              <input
                type="text"
                placeholder="<authorization_code>"
                class=""
              />
              <button type="submit" class="btn">Auth</button>
            </form>
          </div>
        
    </div>
  );
};

export default Authenticate;
