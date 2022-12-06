import * as svb from '@svb-41/core'

type Data = {}

export const data: Data = {}
export const ai: svb.AI<Data> = ({ stats, comm, radar, ship }) => {
  if (radar.length > 0) {
    const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)
    if (near) {
      comm.sendMessage(near.enemy.position)
      if (stats.position.speed > -0.1) return ship.thrust(-0.1)
    }
  }
  if (stats.position.speed < 0.4) return ship.thrust(0.4 - stats.position.speed)
  return ship.idle()
}
