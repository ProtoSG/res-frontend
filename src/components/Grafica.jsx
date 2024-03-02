import React from 'react';
import UseDays from '../hooks/useVenta';
import ChartComponent from './ChartComponent';

export default function Grafica() {

    const { dayData, loadingDayData, errorDayData} = UseDays()
    console.log(dayData)
    const weekData = [
        { time: '2016-07-18', value: 26.10 },
        { time: '2016-07-25', value: 26.19 },
        { time: '2016-08-01', value: 26.24 },
    ];
    const monthData = [
        { time: '2006-12-01', value: 25.40 },
        { time: '2007-01-01', value: 25.50 },
        { time: '2007-02-01', value: 25.11 },
    ];
    const yearData = [
        { time: '2006-01-02', value: 24.89 },
        { time: '2007-01-01', value: 25.50 },
        { time: '2008-01-01', value: 23.90 },
    ];
    
    const intervals = ['1D', '1W', '1M', '1Y'];

    const seriesesData = new Map([
        ['1D', dayData],
        ['1W', weekData],
        ['1M', monthData],
        ['1Y', yearData],
    ]);

    return (
        <section className='p-2 bg-bg-200 row-span-4 rounded-2xl shadow-inner'>
            {
                loadingDayData ? <p>Cargando...</p>
                :(
                    <ChartComponent intervals={intervals} seriesesData={seriesesData}/>
                )
            }
        </section>
    );
}
