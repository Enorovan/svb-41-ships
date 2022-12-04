import * as svb from '@svb-41/core'

type Data = { target?: svb.ship.Position }

export const data: Data = {}
export const speedPercentage = 0.5
export let hasFoundAnEnemy = false
export const ai: svb.AI<Data> = ({ stats, comm, radar, ship }) => {
  if (radar.length > 0) {
    const enemies = radar
      .filter(
        (detectedShip) =>
          detectedShip.team !== stats.team && !detectedShip.destroyed,
      )
      .map((detectedShip) => detectedShip.position)
    if (enemies.length > 0) {
      comm.sendMessage(enemies)
      hasFoundAnEnemy = true
      return ship.thrust(-1)
    }
  }

  const { speed } = stats.position
  if (speed < speedPercentage && !hasFoundAnEnemy) {
    return ship.thrust(speedPercentage - speed)
  }
  if (speed - speedPercentage >= 0.01) {
    return ship.thrust(speed - speedPercentage)
  }
  return ship.idle()
}
/*
  const messages = comm.messagesSince(0)
  
  if (messages && messages.length > 0) {
      const target = messages[0].content.message
      svb.console.log('received ', target)
  }
*/
