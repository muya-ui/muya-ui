function isFirstCharUpcase(name) {
  return /^[A-Z].*$/.test(name);
}

function isi18n(name) {
  return /^[a-z]+_[A-Z]+$/.test(name);
}

function isThemeExport(name) {
  return /^create[_a-zA-Z0-9]*Theme$/.test(name) || /^muyaTheme[_a-zA-Z0-9]*$/.test(name);
}

module.exports = {
  isFirstCharUpcase,
  isThemeExport,
  isi18n,
};
