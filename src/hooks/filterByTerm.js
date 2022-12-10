export const filterByTerm = (term, array) => {
  return array.filter((entry) =>
    entry.nombre.toLowerCase().includes(term.toLocaleLowerCase())
  );
};
