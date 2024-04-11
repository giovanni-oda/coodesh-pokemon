export const useCounterStore = defineStore('main', {
  state: () => ({
    loading: false
  }),
  getters: {
    isLoading: (state) => state.loading
  },
  actions: {
    //
  }
})
