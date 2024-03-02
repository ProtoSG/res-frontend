import { ColorType, createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

function SimpleSwitcher({ items, activeItem, onItemClicked }) {
    return (
        <div className='flex  justify-around'>
            {items.map((item, index) => (
                <button
                    key={index}
                    className={`transition-all border-2 border-primary-100 px-8 py-2 rounded-2xl text-lg 
                    hover:scale-110
                    
                    ${
                        item === activeItem ? 'text-accent-200 bg-primary-100' : 'text-text-200'
                    }`}
                    onClick={() => onItemClicked(item)}>
                    {item}
                </button>
            ))}
        </div>
    );
}

export default function ChartComponent({intervals, seriesesData}) {
    
    const [activeInterval, setActiveInterval] = useState(intervals[0]);
    const chartContainerRef = useRef();
    const [chart, setChart] = useState(null);
    const [areaSeries, setAreaSeries] = useState(null);

    

    useEffect(() => {
        const chartInstance = createChart(chartContainerRef.current, {
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: '#DFD3C3'
                },
                textColor: '#1E2022',
                fontSize: 16,
            },
            grid: {
                vertLines: {
                    visible: false
                },
                horzLines: {
                    visible: false
                }
            },
            rightPriceScale: {
                borderVisible: false,
            },
            timeScale: {
                borderVisible: false,
            },
        });

        setChart(chartInstance);

        const areaSeriesInstance = chartInstance.addAreaSeries({
            topColor: '#596E79',
            bottomColor: '#DFD3C3',
            lineColor: '#596E79',
            lineWidth: 4,
        });

        setAreaSeries(areaSeriesInstance);

        return () => {
            if (chartInstance) {
                chartInstance.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (chart && areaSeries) {
            areaSeries.setData(seriesesData.get(activeInterval));
        }

        chart?.timeScale().fitContent();
    }, [activeInterval, chart, areaSeries]);

    const handleItemClicked = (item) => {
        if (item !== activeInterval) {
            setActiveInterval(item);
        }
    };

    return (
        <>
            <div className='h-[90%] w-full -mb-6' ref={chartContainerRef}></div>
            <SimpleSwitcher
                items={intervals}
                activeItem={activeInterval}
                onItemClicked={handleItemClicked}
            />
        </>
    );
}
