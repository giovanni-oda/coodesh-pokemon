export const useMainStore = defineStore('main', {
  state: () => ({
    loading: false,
    pkChipColors: [
      { type: 'POISON', color: '#AF08FE' },
      { type: 'GRASS', color: '#08FEC3' },
      { type: 'WATER', color: '#00A3FF' },
      { type: 'FIRE', color: '#FE0808' },
      { type: 'ELECTRIC', color: '#FFB800' },
      { type: 'GROUND', color: '#85826E' },
      { type: 'FAIRY', color: '#FBA1EC' },
      { type: 'NORMAL', color: '#C4C4C4' },
      { type: 'FLYING', color: '#5317FC' },
      { type: 'DEFAULT', color: '#0E0E0E' }
    ]
  }),
  getters: {
    isLoading: (state) => state.loading
  },
  actions: {
    getChipColor(pkType: string) {
      const selectedObj = this.pkChipColors.find((obj) => obj.type === pkType)
      return selectedObj ? selectedObj.color : '#0E0E0E'
    }
  }
})
