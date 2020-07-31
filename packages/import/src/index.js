/* eslint-disable @typescript-eslint/no-var-requires */
const exportMap = require('./exportMap');
const rulesMap = require('./rulesMap');

const defaultRule = name => name;

function muyaImport(libDirname, nameMap) {
  const innerMap = nameMap || exportMap;
  return Object.keys(innerMap).map(function(pkgName) {
    return [
      'import',
      {
        libraryName: pkgName,
        transformToDefaultImport: false,
        camel2DashComponentName: false,
        customName: function(name) {
          const modPath = innerMap[pkgName][name];
          /**
           * 特殊规则命中走特殊规则，否则走默认规则
           */
          if (modPath) {
            return [pkgName, libDirname, modPath].join('/');
          } else {
            const rule = rulesMap[pkgName] || defaultRule;
            const defaultPath = rule(name);
            return [pkgName, libDirname, defaultPath].join('/');
          }
        },
      },
      pkgName,
    ];
  });
}

muyaImport.default = muyaImport.muyaImport = muyaImport;
muyaImport.exportMap = exportMap;

module.exports = muyaImport;
