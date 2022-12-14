async function getFiles(dir, tree, branch) {
  if (branch && (!tree[branch] || !tree[branch].length)) {
    tree[branch] = []
  }
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      tree[dirent.name] = []
      await getFiles(res, tree, dirent.name)
    } else if (dirent.isFile()) {
      tree[branch].push(res)
    }
  }
}

export { getFiles }
