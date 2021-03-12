function tokenize(value) {
  return (typeof value === 'string' ? value : '')
    .toLowerCase()
    .replace(/["']/g, '')
    .split(/[\W]+/)
    .filter(Boolean);
}

module.exports = tokenize;
