import { signal } from "@preact/signals";
import { UserData } from "~/types/User.ts";

export const userInfoSignal = signal<UserData | null>(null);
