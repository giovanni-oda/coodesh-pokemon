import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      sans: ['Mulish', 'sans-serif']
    },
    extend: {
      colors: {
        poison: '#AF08FE',
        grass: '#08FEC3',
        water: '#00A3FF',
        fire: '#FE0808',
        electric: '#FFB800',
        ground: '#85826E',
        fairy: '#FBA1EC',
        normal: '#C4C4C4',
        flying: '#5317FC',
        default: '#0E0E0E',
        'default-bg': '#F1F4F5'
      }
    }
  }
}
