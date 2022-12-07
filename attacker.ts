import * as svb from '@svb-41/core'
type Data = {
  pos?: svb.ship.Position,
  target?: svb.ship.Position,
}
export const data: Data = {}
export const ai: svb.AI<Data> = ({ stats, radar, ship, memory, comm }) => {
  const source = stats.position
  const messages = comm.messagesSince(0)
  if (radar.length > 0) {
    const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)
    if (near) {
      comm.sendMessage(near.enemy.position)
      const target = near.enemy.position
      return svb.geometry.aim({ ship, source, target, threshold: 0.01 })
    }
  } else {
    return ship.thrust(0.1 - stats.position.speed)
  }
  if (messages) {
    memory.target = messages[0].content.message
  }
  if (memory.target) {
    const targetToAim = memory.target
    return svb.geometry.aim({
      ship,
      source,
      target: targetToAim,
      threshold: 0.01,
    })
  }
  if (Math.abs(stats.position.direction - memory.pos.direction) > 0.1)
    return ship.turn(stats.position.direction - memory.pos.direction)
  return ship.idle()
}

