import { configure } from "@jest/fake-timers";
import { setup, teardown } from "jest-silent-mock";

export const server = await setup({});

configure({ toFake: [] });

export const teardownTimers = await configure();
