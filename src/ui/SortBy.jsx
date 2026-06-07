import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searhchParam, setSearchParam] = useSearchParams();
  const sortBy = searhchParam.get('sortBy') || '';
  function handleChange(e) {
    searhchParam.set('sortBy', e.target.value);
    setSearchParam(searhchParam);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      type='white'
    />
  );
}

export default SortBy;
