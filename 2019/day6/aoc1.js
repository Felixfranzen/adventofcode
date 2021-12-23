/*
Node
{
  parentId: string // traverse backwards to get number of orbits
  id: string,
  children: [ ...Node ]
}
*/

const toTree = rows => {
  const nodes = rows.map(row => row.split(')')).map(pair => ({ parentId: pair[0], id: pair[1], children: [] }))

  const root = { parentId: null, id: 'COM', children: [] };
  const memo = nodes.reduce((memo, node) => {
    memo[node.id] = node;
    return memo;
  }, {});

  memo[root.id] = root;

  nodes.forEach(node => {
    const parentNode = memo[node.parentId];
    parentNode.children.push(node);
  });
  console.log(memo);
  console.log(root);
}


const solution = (input = [])  => {
  console.log(toTree(input));
}

module.exports = solution