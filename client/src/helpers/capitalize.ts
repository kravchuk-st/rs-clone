function capitalize(string: string) {
  const words = string.split(' ');
  const wordsCapitalized = words.map(word => word[0].toUpperCase() + word.slice(1));

  return wordsCapitalized.join(' ');
}

export default capitalize;
