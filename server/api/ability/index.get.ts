export default defineEventHandler(async () => {
  try {
    const response = await $fetch('https://pokeapi.co/api/v2/ability/')
    // console.log('response', response)
    return response
  } catch (err) {
    return err
  }
})
