import React, {useState} from 'react'
import { MyButton } from './UI/Button/MyButton';
import { MyInput } from './UI/Input/MyInput';



const ProductAddForm = ({create}) => {
    const [product, setProduct] = useState({id: '', name: '', description: '', cost: 0, discount: 0, discountDate: getTimeFormat()});

    const [photo, setPhoto] = useState([]);
    const [photoSize, setPhotoSize] = useState([]);
    const [errorText, setErrorText] = useState([]);

    let check = [];

    //Дополнительная валидация хардкодом т.к. запись не через форму

    //проверка названия
    check[0] = product.name.length >= 20 && product.name.length <= 60;

    errorText[0] = check[0] ?  "" : "обязательное поле, минимум 20, максимум 60 символов";

    //проверка описания
    check[1] = product.description.length <= 200;

    if(product.description.length > 0 && product.description.length <= 200)
        errorText[1] = ""
    else if(product.description.length > 200) errorText[1] = "максимум 200 символов";
    else errorText[1] = "необязательное поле";

    //проверка стоимости
    let costFloat = parseFloat(product.cost);
    check[2] = costFloat <= 99999999.99 && costFloat >= 0;

    errorText[2] = check[2] ? "" : "обязательное поле, положительное число, максимальное значение 99999999.99$";

    //проверка скидки
    let discountInt = parseInt(product.discount);
    check[3] = (isInt(product.discount) && discountInt <= 90 && discountInt >= 10) || product.discount === "";

    if(product.discount === "")
        errorText[3] = "необязательное поле";
    else errorText[3] = check[3] ? "" : "целое положительное число, от 10-90%";

    //проверка файла
    let _URL = window.URL || window.webkitURL;
    let file, img;
    let height, width;
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
    
    check[4] = (photoSize[0] >= 200 && photoSize[1] >= 200) && (photoSize[0] <= 4000 && photoSize[1] <= 4000)
    errorText[4] = check[4] ? "" : "минимальные ширина/высота = 200px, максимальные 4000px" 

    const addNewProduct = (e) => {
        e.preventDefault();
        
        let checkCounter = 0;
        check.forEach((element) => {
            if(element === true)
                checkCounter ++
        })

        if(checkCounter == check.length)
        {
            errorText[4] = "";
            const newProduct = {
                ...product, photo: photo[0].target.files[0]
            }
            create(newProduct); 
            setProduct({name: '', description: '', cost: 0, discount: 0, discountDate: getTimeFormat()});
            document.getElementById("photoInput").value = "";
        }
    }

    function isInt(str) {
        return !isNaN(str) && Number.isInteger(parseFloat(str));
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
            {errorText[0]}
            
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
                onChange={ e => setProduct({...product, cost: Number (e.target.value)}) }
                type="number"
                placeholder="Цена" 
            />
            {errorText[2]}

            <MyInput 
                value={product.discount}
                onChange={ e => setProduct({...product, discount: Number (e.target.value)}) }
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
                <MyButton onClick={addNewProduct}>Добавить продукт</MyButton>
            }
        </div>
    )
}

export default ProductAddForm;
