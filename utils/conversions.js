export function dmToFt(dm) {
  const initInches = (dm * 3.9370);
  const initFeet = initInches / 12;

  const feet = Math.floor(initFeet);
  const inches = Math.round((initFeet - feet) * 12);

  return `${feet}' ${inches}"`;
}

export function hgToLbs(hg) {
  let pounds = (hg * 0.220462);
  pounds = Math.round(pounds * 10) / 10

  return `${pounds} lbs`;
}