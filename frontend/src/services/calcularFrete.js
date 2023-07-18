export const calcularFrete = (uf) => {
  const custos = {
    MG: 20,
    SP: 25,
    RJ: 30,
    ES: 30,
    BA: 35,
    DF: 35,
    GO: 35,
    MT: 45,
    MS: 45,
    PR: 25,
    SC: 30,
    RS: 35,
    AL: 40,
    CE: 40,
    MA: 40,
    PB: 40,
    PE: 40,
    PI: 40,
    RN: 40,
    SE: 40,
    AC: 55,
    AM: 55,
    AP: 55,
    PA: 55,
    RO: 55,
    RR: 55,
    TO: 55,
  };

  return custos[uf] || 0;
};
