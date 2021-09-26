import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ProductItem from './ProductItem'


const ProductList = ({products, title, remove, edit, ...props}) => {
    if(!products.length) {
        return (
            <h1 style={{textAlign:'center'}}>
                Товары не найдены!
            </h1>
        )
    }
    return (
        <div {...props}>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
                <TransitionGroup style={{display: "flex", justifyContent: 'center', width: "100%", flexWrap: "wrap"}}>
                { products.map((product, index) => 
                    <CSSTransition
                        key={product.id}
                        timeout={500}
                        classNames="product"
                    >
                    <ProductItem remove={remove} edit={edit} number={index + 1} product={product} key={product.id}/>
                    </CSSTransition>
                )}
                </TransitionGroup>
        </div>
    )
}

export default ProductList
