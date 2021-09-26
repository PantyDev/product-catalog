import {useMemo} from "react";


export const useProducts = (products, query) => {
    const sotredAndSeachedProducts = useMemo(() => {
        return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, products])

    return sotredAndSeachedProducts;
}