import * as svb from '@svb-41/core'

type Data = {}

export const data: Data = {}
export const ai: svb.AI<Data> = ({ stats, radar, ship, comm }) => {
  if (radar.length > 0) {
    const enemies = radar
      .filter(
        (detectedShip) =>
          detectedShip.team !== stats.team && !detectedShip.destroyed,
      )
      .map((detectedShip) => detectedShip.position)
    if (enemies.length > 0) {
    }
  }
  return ship.idle()
}
