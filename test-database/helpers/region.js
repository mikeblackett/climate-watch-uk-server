const regions = [
  {
    iso: 'GBR',
    name: 'United Kingdom',
    parentIso: null,
  },
  {
    iso: 'GB-ENG',
    name: 'England',
    parentIso: 'GBR',
  },
  {
    iso: 'GB-SCT',
    parentIso: 'GBR',
    name: 'Scotland',
  },
  {
    iso: 'GB-WLS',
    parentIso: 'GBR',
    name: 'Wales',
  },
  {
    iso: 'GB-NIR',
    parentIso: 'GBR',
    name: 'Northern Ireland',
  },
]

export { regions }
