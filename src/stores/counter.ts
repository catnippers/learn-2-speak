import { defineStore } from 'pinia'

export type RootState = {
  tries: number;
  points: number;
}

export const useStore = defineStore({
  id: 'tries',
  state: () => ({
    tries: 0,
    points: 0,
  } as RootState),

  actions: {
    incrementTries() {
      this.tries++;
    },
    incrementPoints() {
      this.points++;
    },
  }
})
