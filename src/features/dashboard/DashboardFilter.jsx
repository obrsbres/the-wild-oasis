import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterField='last'
      elements={[
        { criteria: '7', description: 'Last 7 days' },
        { criteria: '30',description: 'Last 30 days' },
        { criteria: '90',description: 'Last 90 days' },
      ]}    />
  );
}

export default DashboardFilter;
