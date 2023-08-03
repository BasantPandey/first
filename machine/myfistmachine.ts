import { createMachine } from "xstate";

export const myMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAtADZ0AT0FCAdAAZZc+fIDsyNCGLlqtOpOzsAElgBuYAE6RGLNp259EAFgBMYxAA4AjJLsuArEICc0gDMgX4uQm6BLiro6pQ09JIURqbmSMysHFw8afwI3h6hLtLhQopu3tIODm7OCBF+kn6KgdJ+Qi6KdopClQ4qKkA */
    initial: "notHovered",
    states: {
        notHovered: {
            on: {
                MOUSEOVER: {
                    target:"hovered"
                }
            }
        },
        hovered: {
            on: {
                MOUSEOUT: {
                    target:"notHovered"
                }
            }
        }
    }
});