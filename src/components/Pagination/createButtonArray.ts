export default function crateButtonArray(
  Arraylength: number,
  currentIndex: number,
  pageRangeDisplayed = 3
) {
  const buttonsArray: number[] = [];
  Array(Arraylength)
    .fill("")
    .map((value, index) => {
      if (
        (index + 1 > currentIndex + pageRangeDisplayed &&
          index + 1 != Arraylength) ||
        (index + 1 < currentIndex - pageRangeDisplayed && index + 1 != 1)
      )
        return null;
      buttonsArray.push(index + 1);
    });
  return buttonsArray;
}
