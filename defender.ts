import * as svb from '@svb-41/core'

type Data = {}

export const data: Data = {}
export const ai: svb.AI<Data> = ({ stats, radar, ship }) => {
  const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)
  if (near) {
    const source = stats.position
    const target = near.enemy.position
    const threshold = 4 / Math.sqrt(near.dist2)
    const speed = stats.weapons[0]?.bullet.position.speed
    const delay = Math.sqrt(near.dist2) / speed
    const resAim = svb.geometry.aim({
      ship,
      source,
      target,
      threshold,
      delay,
      weapon: 0,
    })
    if (resAim.id === svb.Instruction.FIRE) return ship.fire()
    return resAim
  }

  return ship.thrust(0.1 - stats.position.speed)
}
