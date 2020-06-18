export const range = (start: number, end: number, step = 1) =>
  [...Array(Math.floor((end - start) / step)).keys()].map((e, i) => start + i * step)

export const circle = center => radius => pointsCount => e => [
  center[0] + radius * Math.cos(2 * Math.PI * e / pointsCount),
  center[1] + radius * Math.sin(2 * Math.PI * e / pointsCount)
];

export const sine = A => k => w => phase => (x, t) =>
  A * Math.sin(k * x + w * t + phase);

export const sineWave = start => delta => (e, i) => [
  start[0] + delta * i,
  start[1] + sine(delta)(1)(6)(0)(i, i)
];

export const sineCircle = center => radius => delta => pointsCount => (e, i) =>
  circle(center)(radius + delta + sine(delta)(6)(6)(Math.PI / 2)(i, i))(pointsCount)(e);

export const makePath = (ctx: CanvasRenderingContext2D, points: number[][], closePath: boolean) => {
  if (!ctx || points.length < 2)
    return;

  ctx.moveTo(points[0][0], points[0][1]);

  for (let i = 1; i < points.length; ++i) {
    ctx.lineTo(points[i][0], points[i][1]);
  }

  if (closePath)
    ctx.lineTo(points[0][0], points[0][1]);
}
