import { z } from "zod";
import { authCode } from "../signals/auth.ts";
import { useSignal } from "@preact/signals";

const authCodeSchema = z.string();

const IdentityInput = () => {
  const inputText = useSignal("");

  const onSubmit = (e: Event) => {
    e.preventDefault();

    try {
      const parsedAuthCode = authCodeSchema.parse(inputText.value);
      authCode.value = parsedAuthCode;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation failed: ", error.issues[0]);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  return (
    <div class="my-4">
      <form onSubmit={onSubmit} class="flex gap-2 items-center">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="auth">
          Username
        </label>
        <input
          type="text"
          id="auth"
          name="auth"
          value={inputText.value}
          onInput={(e) =>
            inputText.value = (e.target as HTMLInputElement).value}
          placeholder="xxxxxxxx"
          class="px-2 py-1 border rounded w-64"
        />
        <button
          type="submit"
          class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default IdentityInput;
