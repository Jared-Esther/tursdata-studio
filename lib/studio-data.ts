export type SourceStatus = 'synced' | 'streaming' | 'stale'

export type DataSource = {
  id: string
  label: string
  file: string
  kind: 'CSV' | 'SQLite' | 'DXF' | 'Parquet'
  rows: string
  size: string
  status: SourceStatus
  joinKey: string
  defaultSelected: boolean
}

export const dataSources: DataSource[] = [
  {
    id: 'table_a',
    label: 'Table_A',
    file: 'SupplyChain_2026.csv',
    kind: 'CSV',
    rows: '1,284,502',
    size: '412 MB',
    status: 'synced',
    joinKey: 'SKU_ID',
    defaultSelected: true,
  },
  {
    id: 'table_b',
    label: 'Table_B',
    file: 'Pricing_Q2.db',
    kind: 'SQLite',
    rows: '86,410',
    size: '64 MB',
    status: 'streaming',
    joinKey: 'SKU_ID',
    defaultSelected: true,
  },
  {
    id: 'table_c',
    label: 'Table_C',
    file: 'CAD_Specs.dxf',
    kind: 'DXF',
    rows: '2,148',
    size: '18 MB',
    status: 'synced',
    joinKey: 'PART_NO',
    defaultSelected: true,
  },
  {
    id: 'table_d',
    label: 'Table_D',
    file: 'Vendor_Master.parquet',
    kind: 'Parquet',
    rows: '12,904',
    size: '31 MB',
    status: 'stale',
    joinKey: 'VENDOR_ID',
    defaultSelected: false,
  },
  {
    id: 'table_e',
    label: 'Table_E',
    file: 'Logistics_Lanes.csv',
    kind: 'CSV',
    rows: '340,118',
    size: '96 MB',
    status: 'synced',
    joinKey: 'LANE_ID',
    defaultSelected: false,
  },
]

export const gridRows = [
  { sku: 'SKU-90142', part: 'PN-4471-B', vendor: 'Nordwind AG', units: 18420, unitCost: 41.28, margin: 0.312, lead: 14, variance: 2.4 },
  { sku: 'SKU-90188', part: 'PN-4471-C', vendor: 'Kaito Metals', units: 9260, unitCost: 63.94, margin: 0.284, lead: 22, variance: -1.1 },
  { sku: 'SKU-91007', part: 'PN-5120-A', vendor: 'Helios Forge', units: 24118, unitCost: 27.6, margin: 0.401, lead: 9, variance: 4.8 },
  { sku: 'SKU-91344', part: 'PN-5120-D', vendor: 'Nordwind AG', units: 3140, unitCost: 118.05, margin: 0.196, lead: 31, variance: -6.2 },
  { sku: 'SKU-92210', part: 'PN-6033-A', vendor: 'Tessera Ltd', units: 15872, unitCost: 52.4, margin: 0.338, lead: 17, variance: 1.6 },
  { sku: 'SKU-92471', part: 'PN-6033-F', vendor: 'Kaito Metals', units: 7304, unitCost: 76.12, margin: 0.259, lead: 26, variance: -0.4 },
  { sku: 'SKU-93055', part: 'PN-7712-A', vendor: 'Helios Forge', units: 31280, unitCost: 19.94, margin: 0.437, lead: 7, variance: 5.9 },
  { sku: 'SKU-93419', part: 'PN-7712-E', vendor: 'Tessera Ltd', units: 11640, unitCost: 58.7, margin: 0.301, lead: 19, variance: 0.8 },
  { sku: 'SKU-94120', part: 'PN-8890-B', vendor: 'Vantage Poly', units: 6088, unitCost: 92.35, margin: 0.221, lead: 28, variance: -3.7 },
  { sku: 'SKU-94688', part: 'PN-8890-H', vendor: 'Nordwind AG', units: 20450, unitCost: 34.16, margin: 0.372, lead: 12, variance: 3.1 },
]

export const throughputSeries = [
  { month: 'Jan', landed: 4.2, forecast: 3.9, margin: 28.4 },
  { month: 'Feb', landed: 4.8, forecast: 4.3, margin: 29.1 },
  { month: 'Mar', landed: 5.6, forecast: 5.1, margin: 30.8 },
  { month: 'Apr', landed: 5.1, forecast: 5.4, margin: 29.6 },
  { month: 'May', landed: 6.4, forecast: 6.0, margin: 32.2 },
  { month: 'Jun', landed: 7.2, forecast: 6.6, margin: 33.7 },
  { month: 'Jul', landed: 6.9, forecast: 7.1, margin: 32.9 },
  { month: 'Aug', landed: 7.8, forecast: 7.4, margin: 34.5 },
  { month: 'Sep', landed: 8.6, forecast: 8.0, margin: 35.9 },
  { month: 'Oct', landed: 9.1, forecast: 8.7, margin: 36.4 },
  { month: 'Nov', landed: 9.8, forecast: 9.3, margin: 37.1 },
  { month: 'Dec', landed: 10.6, forecast: 9.9, margin: 38.2 },
]

export const snapshots = [
  { id: 'snap_0f41', label: 'Inner join + margin recompute', time: '14:08:22', cells: 42, delta: '+3 cells' },
  { id: 'snap_0f40', label: 'Vendor master excluded', time: '13:51:04', cells: 39, delta: '-1 cell' },
  { id: 'snap_0f3e', label: 'Baseline DAG hydration', time: '13:22:47', cells: 40, delta: 'init' },
]

export const pipelineCells = [
  { id: 'cell_01', name: 'load_sources', state: 'idle' as const, ms: 412 },
  { id: 'cell_02', name: 'normalize_sku', state: 'idle' as const, ms: 288 },
  { id: 'cell_03', name: 'inner_join_sku', state: 'running' as const, ms: 1140 },
  { id: 'cell_04', name: 'margin_model', state: 'queued' as const, ms: 0 },
  { id: 'cell_05', name: 'render_artifacts', state: 'queued' as const, ms: 0 },
]

export const exportTargets = [
  { ext: '.xlsx', label: 'Analytical Workbook', detail: 'Excel · 10 sheets' },
  { ext: '.pdf', label: 'Executive Report', detail: 'PDF · 12 pages' },
  { ext: '.pptx', label: 'Board Deck', detail: 'PowerPoint · 16:9' },
  { ext: '.dxf', label: 'CAD Blueprint', detail: 'AutoCAD R2018' },
]
