`aaaabbbccc`.replace(/(\w)(\1+)/g, (_, s1, s2, index) => (index === 0 ? s1 : s1.toUpperCase()) + s2)
