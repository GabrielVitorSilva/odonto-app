export default function getImage(treatmentName: string) {
  switch (treatmentName) {
    case "Consulta de avaliação":
      return require("@/assets/Consulta de avaliação.png");
    case "Limpeza":
      return require("@/assets/Limpeza.png");
    case "Clareamento":
      return require("@/assets/Clareamento.png");
    case "Manutenção":
      return require("@/assets/Manutenção.png");
    default:
      return require("@/assets/default.png");
  }
}
