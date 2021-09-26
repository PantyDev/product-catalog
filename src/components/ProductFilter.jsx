import React from 'react'
import { MyInput } from './UI/Input/MyInput'
import MySelect from './UI/Select/MySelect'

const ProductFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput 
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />
            <MySelect
                value={filter.sort.sortBy}
                onChange={selectedSort => setFilter({...filter, sort: { orderBy: filter.sort.orderBy, sortBy: selectedSort }})}
                defaultValue='Сортировка'
                options={[ 
                    {value: 'name', name: 'По названию'},
                    {value: 'description', name: 'По описанию'}, 
                ]}
            />
            <MySelect
                value={filter.sort.orderBy}
                onChange={selectedSort => setFilter({...filter, sort: { orderBy: selectedSort, sortBy: filter.sort.sortBy }})}
                defaultValue='Порядок'
                options={[ 
                    {value: 'asc', name: 'По возрастанию'},
                    {value: 'desc', name: 'По убыванию'}, 
                ]}
            />
        </div>
    )
}

export default ProductFilter