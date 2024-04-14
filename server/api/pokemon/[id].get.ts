export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'An ID is required'
    })
  }

  try {
    const response = await $fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return response
  } catch (err) {
    return err
  }
})
