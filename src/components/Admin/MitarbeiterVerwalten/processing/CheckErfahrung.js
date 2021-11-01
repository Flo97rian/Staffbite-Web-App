export const checkerfahrung = ({userInput}) => {
    if (userInput.erfahrung === undefined) {
      return "Anfänger"
    } else {
      return userInput.erfahrung
    }
  };