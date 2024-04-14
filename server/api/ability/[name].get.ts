export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A ability name is required'
    })
  }

  try {
    const response = await $fetch(`https://pokeapi.co/api/v2/ability/${name}`)
    return response
  } catch (err) {
    return err
  }
})
