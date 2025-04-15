import type { User } from "~/types/User.ts";
import createPersistentSignal from "~/lib/createPersistentSignal.ts";

const userInfo = createPersistentSignal<User | null>("userInfo", null);
export default userInfo;
