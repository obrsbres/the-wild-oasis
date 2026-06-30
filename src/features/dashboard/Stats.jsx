
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'

import Stat from './Stat'

import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  //1. 
  const numBookngs = bookings.length;
  //2.
  const sales=bookings.reduce((acc,cur)=>acc+cur.totalPrice,0)
  //3. 
  const checkins = confirmedStays.length;
  //4. num of checkin nights/all available nights
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0)/(cabinCount*numDays) 
  console.log(occupation)


  return (
    <>
      <Stat icon={<HiOutlineBriefcase/>  } value={numBookngs} title='Bookings' color='blue'/>
      <Stat icon={<HiOutlineBanknotes/>  } value={formatCurrency(sales)} title='Sales' color='green'/>
      <Stat icon={<HiOutlineCalendarDays/>  } value={checkins} title='Check ins' color='indigo'/>
      <Stat icon={<HiOutlineChartBar/>  } value={Math.round(occupation*100)} title='Occupancy rate' color='yellow'/>
    </>
  );
}

export default Stats;
