import { signal } from "@preact/signals";
import { User } from "~/types/User.ts";

export const userInfoSignal = signal<User | null>(null);
