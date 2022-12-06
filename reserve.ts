import * as svb from '@svb-41/core'

type Data = {
  pos?: svb.ship.Position,
  target?: svb.ship.Position,
  sourceSave?: svb.ship.Position,
  turnOnce?: boolean,
}

export const data: Data = { turnOnce: true }
export const ai: svb.AI<Data> = ({ stats, radar, ship, memory, comm }) => {
  const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)

  const messages = comm.messagesSince(0)
  if (messages) memory.target = messages[0].content.message

  const source = stats.position

  if (near) {
    const target = near.enemy.position
    return svb.geometry.aim({ ship, source, target, threshold: 0.01 })
  } else if (memory.target) {
    const targetToAim = memory.target
    if (
      svb.geometry.angle({ source: stats.position, target: targetToAim }) > 0.4
    ) {
      return svb.geometry.aim({
        ship,
        source,
        target: targetToAim,
        threshold: 0.01,
      })
    }
    if (stats.position.speed < 0.1) return ship.thrust()
  }
  if (Math.abs(stats.position.direction - memory.pos.direction) > 0.1)
    return ship.turn(stats.position.direction - memory.pos.direction)
  return ship.idle()
}
