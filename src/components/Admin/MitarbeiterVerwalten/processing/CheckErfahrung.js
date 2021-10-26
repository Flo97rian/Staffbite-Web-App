export const checkerfahrung = ({employeeIsActive}) => {
    if (employeeIsActive.erfahrung === undefined) {
      return "Anfänger"
    } else {
      return employeeIsActive.erfahrung
    }
  };