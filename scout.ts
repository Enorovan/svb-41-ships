import * as svb from '@svb-41/core'

type Data = {}

export const data: Data = {}
export const speedPercentage = 0.1
export let hasFoundAnEnemy = false
export const ai: svb.AI<Data> = ({ stats, comm, radar, ship }) => {
  const messages = comm.messagesSince(0)
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
  //if (comm.messagesSince.)

  const { speed } = stats.position
  if (speed < speedPercentage && !hasFoundAnEnemy) {
    return ship.thrust(speedPercentage - speed)
  }
  if (speed - speedPercentage >= 0.01) {
    return ship.thrust(speed - speedPercentage)
  }
  return ship.idle()
}