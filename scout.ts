import * as svb from '@svb-41/core'

type Data = {}

export const data: Data = {}
export let hasFoundAnEnemy = false
export const ai: svb.AI<Data> = ({ stats, comm, radar, ship }) => {
  if (radar.length > 0) {
    const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)
    if (near) {
      comm.sendMessage(near.enemy.position)
      svb.console.log(near.enemy.position.pos)
      if (stats.position.speed > -0.1)
        return ship.thrust(-0.1 - stats.position.speed)
    }
  }
  if (stats.position.speed < 0.1) return ship.thrust(0.1 - stats.position.speed)
  return ship.idle()
}
