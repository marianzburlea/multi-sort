var sortBy = (function() {
    const identity = v => v;

    const ignoreCase = v => typeof(v)==='string' ? v.toLowerCase() : v;

    const makeCompareFunction = (f, opt) => {
        opt = typeof(opt) === 'number' ? {direction:opt} : opt || {};
        if (typeof(f)!='function'){
            var prop = f;
            f = v => !!v[prop] ? v[prop] : '';
        }
        if (f.length === 1) {
            var uf = f;
            var preprocess = opt.ignoreCase ? ignoreCase : identity;
            f = (v1,v2) => preprocess(uf(v1)) < preprocess(uf(v2)) ? -1 : preprocess(uf(v1)) > preprocess(uf(v2)) ? 1 : 0;
        }
        if (opt.direction === -1) {
          return (v1,v2) => -f(v1,v2);
        };
        return f;
    }

    function tb(func, opt) {
        var x = typeof(this) == "function" ? this : false;
        var y = makeCompareFunction(func, opt);
        var f = x ? (a, b) => x(a,b) || y(a,b) : y;
        f.thenBy = tb;
        return f;
    }
    return tb;
})();
const multiSort = ({data, sortList}) => {
  let s;
  sortList.forEach((sort, key) => {
    const direction = sort.direction || 1;
    const ignoreCase = sort.ignoreCase || 1;
    if (key === 0) {
      s = sortBy(sort.property, {direction, ignoreCase});
    } else {
      s = s.thenBy(sort.property, {direction, ignoreCase});
    }

    console.log(sort.property)
    console.log(direction)
  });
  return data.sort(s);
}

export default multiSort;