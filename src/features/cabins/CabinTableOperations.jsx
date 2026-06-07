import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        elements={[
          { criteria: 'all', description: 'All' },
          { criteria: 'with-discount', description: 'With discount' },
          { criteria: 'no-discount', description: 'Without discount' },
          { criteria: 'high-price', description: 'over $4000' },
          { criteria: 'sort-asc', description: 'Price low to high' },
          { criteria: 'sort-desc', description: 'Price high to low' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by Name (A-Z)' },
          { value: 'name-desc', label: 'Sort by Name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by Price  (Low to High)' },
          { value: 'regularPrice-desc', label: 'Sort by Price (High to Low)' },
          { value: 'maxCapacity-asc', label: 'Sort by Capacity (Low to High)' },
          {
            value: 'maxCapacity-desc',
            label: 'Sort by Capacity (High to Low)',
          },
          {
            value: 'startDay-asc',
            label: 'Sort by Start Day (Earliest to Latest)',
          },
          {
            value: 'startDay-desc',
            label: 'Sort by Start Day (Latest to Earliest)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
