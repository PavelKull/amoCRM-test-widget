const SERVICE_NAME = 'widget'

const broker = require('../../broker')(SERVICE_NAME)

broker.createService({
  name: SERVICE_NAME,
  actions: {
    random: {
      rest: {
        method: 'GET',
      },
      async handler(ctx) {
        console.log(`${SERVICE_NAME} call getRandom`)
        const { min, max } = ctx.params
        const result = await ctx.call('randomizer.getNum', { min, max })
        return { result }
      },
    },
  },
})

broker.start()
