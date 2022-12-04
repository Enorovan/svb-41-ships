import * as svb from '@svb-41/core'

type Data = {}

export const data: Data = {}
export const ai: svb.AI<Data> = ({ stats, radar, ship }) => {
  const ally = radar.find((res) => {
    const isSameTeam = res.team === stats.team
    if (!isSameTeam) return false
    const source = stats.position
    const target = svb.geometry.nextPosition(200)(res.position)
    const finalAngle = svb.geometry.angle({ source, target })
    const direction = finalAngle - stats.position.direction
    return Math.abs(direction) < 0.1
  })

  const near = svb.radar.nearestEnemy(radar, stats.team, stats.position)
  if (near) {
    const source = stats.position
    const target = near.enemy.position
    const threshold = 1 / Math.sqrt(near.dist2)
    const speed = stats.weapons[0].bullet.position.speed
    const delay = Math.sqrt(near.dist2) / speed
    const resAim = svb.geometry.aim({ ship, source, target, threshold, delay })
    if (resAim.id === svb.Instruction.FIRE && ally) return ship.idle()
    return resAim
  }

  return ship.idle()
}
