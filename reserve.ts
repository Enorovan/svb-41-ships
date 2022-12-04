import * as svb from '@svb-41/core'

type Data = {}

export const data: Data = {}
export const ai: svb.AI<Data> = ({ stats, radar, ship, comm }) => {
  if (radar.length > 0) {
    const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)
    if (near) {
      const source = stats.position
      const target = near.enemy.position.pos
      return ship.fire(0, { target, armedTime: 0 })
    }
  } else {
    const messages = comm.messagesSince(0)
    if (messages.length > 0) {
      const target = messages[0].content.message
      const params = { target, armedTime: 0 }
      return ship.fire(0, params)
    }
  }
  return ship.idle()
}
