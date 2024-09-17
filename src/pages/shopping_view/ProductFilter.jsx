import React from 'react'
import { filterOptions } from '../../config';

const ProductFilter = ({filter, handleFilter}) => {
  return (
    <div className='bg-stone-100 rounded-lg shadow-sm h-screen mt-2'>
        <div className='p-4 border-b'>
            <h2 className='text-lg font-extrabold'>Filters</h2>
        </div>
        <div className='p-4 space-y-4'>
            {
                Object.keys(filterOptions).map((keyItems, index)=>(
                    <div key={index}>
                    <div>
                        <h3 className='text-base font-bold'>{keyItems}</h3>
                        <div className='grid gap-2 m-2'>
                            {
                                filterOptions[keyItems].map((options, index)=> (
                                    <label key={index} className="flex items-center gap-2 font-normal">
                                    <input type="checkbox" 
                                    checked={ filter && filter[keyItems] && filter[keyItems].includes(options.id)}
                                    className="form-checkbox h-4 w-4 text-slate-900" onChange={()=>handleFilter(keyItems, options.id)}/>
                                        {options.label}
                                  </label>
                                ))
                            }
                        </div>
                    </div>
                    <hr/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ProductFilter;