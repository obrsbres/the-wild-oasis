import { useSearchParams } from 'react-router-dom';

import { useCabins } from './useCabins';

import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  const discountFilter = searchParams.get('discount') || 'all';
  const sortBy = searchParams.get('sortBy') || 'startDay-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  let filteredCabins;
  if (!cabins?.length) return <Empty resourceName={'cabins'}/>
  if (discountFilter === 'all') filteredCabins = cabins;

  if (discountFilter === 'with-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  if (discountFilter === 'no-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

  if (discountFilter === 'high-price')
    filteredCabins = cabins?.filter((cabin) => cabin.regularPrice > 300);

  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (field === 'name') return a.name.localeCompare(b.name) * modifier;

    return (a[field] - b[field]) * modifier;
  });

  if (isLoading) return <Spinner />;

  if (filteredCabins?.length === 0) return <Empty resource='cabins' />;
  // console.log(filteredCabins, sortedCabins);
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
