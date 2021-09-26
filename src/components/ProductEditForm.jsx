import React, {useState, useEffect} from 'react'
import { MyButton } from './UI/Button/MyButton';
import { MyInput } from './UI/Input/MyInput';



const ProductEditForm = ({edit, someObject}) => {
    
    const [product, setProduct] = useState({id: '', name: '', description: '', cost: '', discount: '', discountDate: ""});

    const [photo, setPhoto] = useState([]);
    const [photoSize, setPhotoSize] = useState([]);
    const [errorText, setErrorText] = useState([]);

    let check = [];
    let someVar;
    
    useEffect(() => {
        if(someObject.id != undefined)
        setProduct(someObject);        
    }, [someObject])
    
    useEffect(() => {
        if(product.id != undefined)
        {
            //Дополнительная валидация хардкодом т.к. запись не через форму

            //проверка названия
            check[0] = product.name.length >= 20 && product.name.length <= 60;

            errorText[0] = check[0] ?  "" : "обязательное поле, минимум 20, максимум 60 символов";
            setErrorText([...errorText, errorText[0]]);
            //проверка описания
            check[1] = product.description.length <= 200;

            if(product.description.length > 0 && product.description.length <= 200)
                errorText[1] = ""
            else if(product.description.length > 200) errorText[1] = "максимум 200 символов";
            else errorText[1] = "необязательное поле";
            setErrorText([...errorText, errorText[1]]);
            //проверка стоимости
            let costFloat = parseFloat(product.cost);
            check[2] = costFloat <= 99999999.99 && costFloat >= 0;

            errorText[2] = check[2] ? "" : "обязательное поле, положительное число, максимальное значение 99999999.99$";
            setErrorText([...errorText, errorText[2]]);
            //проверка скидки
            let discountInt = parseInt(product.discount);
            check[3] = (isInt(product.discount) && discountInt <= 90 && discountInt >= 10) || product.discount === "";

            if(product.discount === "")
                errorText[3] = "необязательное поле";
            else errorText[3] = check[3] ? "" : "целое положительное число, от 10-90%";
            setErrorText([...errorText, errorText[3]]);

            if(product.photo != undefined)
            {
                //проверка файла
                let _URL = window.URL || window.webkitURL;
                let file, img;
                let height, width;
                errorText[4] = "";
                if(photo.length != 0)
                {
                    if ((file = photo[0].target.files[0])) {
                        img = new Image();
                        img.onload = async function() {
                            setPhotoSize([this.width, this.height]);
                        };
                        img.src = _URL.createObjectURL(file);
                    }
                }
                setErrorText([...errorText, errorText[4]]);
            }
          
        }
        
    }, [product])
    function isInt(str) {
        return !isNaN(str) && Number.isInteger(parseFloat(str));
    }


    const addNewProduct = (e) => {
        
        e.preventDefault();
        
        let checkCounter = 0;
        check.forEach((element) => {
            if(element === true)
                checkCounter ++
        })
        console.log(check.length);
        if(checkCounter == check.length)
        {
            
            errorText[4] = "";
            let editedProduct;
            if(photo[0] != undefined)
                editedProduct = {
                    ...product, photo: photo[0].target.files[0]
                }
            else editedProduct = product
            edit(editedProduct); 
            setProduct({name: '', description: '', cost: '', discount: '', discountDate: getTimeFormat()});
            document.getElementById("photoInput").value = "";
        }
    }


    function getTimeFormat() {
        var today = new Date();
        var dd = today.getDate()+1;
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        }
        return yyyy+'-'+mm+'-'+dd;
    }
    return (
        <div>
            {/* управляемый компонент */}
            
            <MyInput 
                value={product.name}
                onChange={ e => setProduct({...product, name: e.target.value}) }
                type="text" 
                placeholder="Название продукта" 
            />
            {errorText[0]}<br></br>
            <img style={{width:"20%", height:"20%"}} src={product.photo}></img>
            <MyInput 
                id={ "photoInput" }
                onChange={ e => setPhoto([e, e.target.value]) }
                type="file" 
                accept="image/png, image/jpeg"
            />
            {errorText[4]}

            <MyInput 
                value={product.description}
                onChange={ e => setProduct({...product, description: e.target.value}) }
                type="text" 
                placeholder="Описание товара" 
            />
            {errorText[1]}

            <MyInput 
                value={product.cost}
                onChange={ e => setProduct({...product, cost: e.target.value}) }
                type="number"
                placeholder="Цена" 
            />
            {errorText[2]}

            <MyInput 
                value={product.discount}
                onChange={ e => setProduct({...product, discount: e.target.value}) }
                type="number"
                placeholder="Процент скидки" 
            />
            {errorText[3]}
            {
                errorText[3] === "" ?
                <MyInput 
                    value={product.discountDate}
                    onChange={ e => setProduct({...product, discountDate: e.target.value}) }
                    type="date" 
                    min={getTimeFormat()}
                /> : <div>У вас нет скидки</div>
            }
            {
                <MyButton onClick={addNewProduct}>Редактировать продукт</MyButton>
            }
        </div>
    )
}

export default ProductEditForm;
