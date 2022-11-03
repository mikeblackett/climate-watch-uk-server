function generateClimates(regions, times, variables) {
  let climates = []
  for (let r = 0; r < regions.length; r++) {
    for (let t = 0; t < times.length; t++) {
      for (let v = 0; v < variables.length; v++) {
        climates.push({
          value: Math.random() * 10,
          timeId: t + 1,
          regionId: regions[r].iso,
          variableId: variables[v].slug,
        })
      }
    }
  }

  return climates
}
export { generateClimates }
