import * as svb from '@svb-41/core'

type Data = { x: number, y: number }

export let hasTurned = false
export const data: svb.ship.Position = {
  pos: {
    x: 1000,
    y: 400,
  },
  direction: 0,
  speed: 0,
}
export const ai: svb.AI<svb.ship.Position> = ({
  stats,
  radar,
  ship,
  comm,
  memory,
}) => {
  if (radar.length > 0) {
    const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)
    if (near) {
      comm.sendMessage(near.enemy.position)
      const source = stats.position
      const target = near.enemy.position
      return svb.geometry.aim({ ship, source, target, threshold: 0.01 })
    }
    return ship.thrust(0.1 - stats.position.speed)
  }
  if (!hasTurned) {
    const source = stats.position
    const target = data
    if (stats.position.direction === data.direction) hasTurned = true
    return svb.geometry.aim({ ship, source, target, threshold: 0.01 })
  } else {
    return ship.thrust(0.1 - stats.position.speed)
  }
}
