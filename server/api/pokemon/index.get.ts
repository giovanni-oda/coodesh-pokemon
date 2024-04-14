export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { offset, limit } = query
    const endPoint = 'https://pokeapi.co/api/v2/pokemon/'

    let response = null
    if (offset && limit) {
      response = await $fetch(`${endPoint}?offset=${offset}&limit=${limit}`)
    } else {
      response = await $fetch(endPoint)
    }
    // console.log('response', response)
    return response
  } catch (err) {
    return err
  }
})
