import React, { useState, useEffect } from 'react';
import { MyButton } from './UI/Button/MyButton'
import { Loader } from './UI/Loader/Loader';

const ProductItem = (props) => {
    const [modal, setModal] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    function calculateDateDiff(a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);
        return [ days, days + " " + declOfNum(days, ["день", "дня", "дней"]) ];
    }
    const dateDiff = calculateDateDiff(new Date(Date.now()), new Date(props.product.discountDate));

    function percentageOfNum(number, percentage) {
        return (number - ((number * percentage) / 100)).toFixed(2);
    }
    function discountCheck() {
        return dateDiff[0] > 0 && props.product.discount != "";
    }
    function declOfNum(number, words) {  
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }


    return (
        <div className="product">
                <div className="product__content">
                    <h1>{props.product.name}</h1>
                    <div>
                        <img onLoad={() => setLoaded(true)} style={{width: "100%", height: "100%"}} src={props.product.photo}></img>
                        <p>{props.product.description}</p><br></br>
                        
                        {
                            discountCheck() 
                            ? <div><p style={{textDecoration: "line-through"}}>{props.product.cost}$</p> <p style={{color: "red"}}>{percentageOfNum(props.product.cost, props.product.discount)}$<br></br>Скидка закончится через: { dateDiff[1] }</p></div>
                            : <p>{props.product.cost}$</p>  
                        }
                    </div>
                </div>
                <div className="product__btns">
                    <MyButton onClick={() => props.remove(props.product)}>Удалить</MyButton>
                    <MyButton onClick={() => props.edit(props.product)}>Изменить</MyButton>
                </div>
        </div>
    )
}

export default ProductItem
