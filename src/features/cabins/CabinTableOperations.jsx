import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';

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
    </TableOperations>
  );
}

export default CabinTableOperations;
