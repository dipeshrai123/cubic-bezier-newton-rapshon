function spline(x1, y1, x2, y2) {
  function A(b, c) {
    return 1 + 3 * b - 3 * c;
  }

  function B(b, c) {
    return -6 * b + 3 * c;
  }

  function C(b) {
    return 3 * b;
  }

  function calcBezier(t, b, c) {
    return ((A(b, c) * t + B(b, c)) * t + C(b)) * t;
  }

  function calcSlope(t, b, c) {
    return 3 * A(b, c) * t * t + 2 * B(b, c) * t + C(b);
  }

  function getTforX(x) {
    let initialGuessT = x;

    for (i = 0; i < 4; i++) {
      const currentSlope = calcSlope(initialGuessT, x1, x2);
      if (currentSlope == 0.0) return initialGuessT;

      const currentXt = calcBezier(initialGuessT, x1, x2) - x;

      initialGuessT = initialGuessT - currentXt / currentSlope;
    }

    return initialGuessT;
  }

  return function (x) {
    return calcBezier(getTforX(x), y1, y2);
  };
}
