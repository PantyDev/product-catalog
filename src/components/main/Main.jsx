import React, {useEffect, useState} from 'react';
import ProductFilter from '../ProductFilter';
import ProductAddForm from '../ProductAddForm';
import ProductEditForm from '../ProductEditForm';
import ProductList from '../ProductList';
import { MyButton } from '../UI/Button/MyButton';
import { Loader } from '../UI/Loader/Loader';
import  MyModal from '../UI/Modal/MyModal';
import { useProducts } from '../../hooks/useProducts';
import firebase, { auth }  from '../../firebase';
import { storage } from '../../firebase';
import { v4 as uuidv4 } from "uuid";

import '../../styles/App.css';


const Main = () => {
    const [products, setProducts] = useState([]);
    const [eProduct, setEProduct] = useState([]);
    const ref = firebase.firestore().collection("products")
 

    const [filter, setFilter] = useState({sort: { sortBy: "name", orderBy: "asc" }, query: ''})
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const searchedProducts = useProducts(products, filter.query)
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchProducts(filter.sort);
    }, [filter])

    async function fetchProducts(sort) {
        setIsLoading(true);
        setTimeout(async () => {
            ref.orderBy(sort.sortBy, sort.orderBy).onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                setProducts(items);
                setIsLoading(false);
            })
        }, 1000)
    }


    const createProduct = (newProduct) => {
        const elementId = uuidv4();

        const uploadTask = storage.ref(`images/${elementId}.png`).put(newProduct.photo);
        delete newProduct.photo;
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            }, 
            () => {
                storage
                    .ref("images")
                    .child(elementId + ".png")
                    .getDownloadURL()
                    .then(url => {
                        newProduct.photo = url;
                        ref
                            .doc(elementId)
                            .set({...newProduct, id: elementId})
                            .catch((err) => {
                                console.error(err);
                        });
                    });
            }
        )
        setModal(false);
    }


    const removeProduct = (product) => {
        storage
            .ref("images")
            .child(product.id + ".png")
            .delete()
            .catch((err) => {
                console.error(err);
            });
        ref.doc(product.id)
            .delete()
            .catch((err) => {
                console.error(err);
            });
    }

    const getProduct = (product) => {
        setEProduct(product);
        setModalEdit(true);
    }


    const editProduct = (product) => {
        const elementId = product.id;

        if(product.photo instanceof File)
        {
            const uploadTask = storage.ref(`images/${elementId}.png`).put(product.photo);
            delete product.photo;
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                }, 
                () => {
                    storage
                        .ref("images")
                        .child(elementId + ".png")
                        .getDownloadURL()
                        .then(url => {
                            product.photo = url;
                            ref
                                .doc(elementId)
                                .set({...product, id: elementId})
                                .catch((err) => {
                                    console.error(err);
                            });
                        });
                }
            )
        }
  
        ref
            .doc(elementId)
            .update({...product})
            .catch((err) => {
                console.error(err);
        });
        setModalEdit(false);
    }
    


    return (
        <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => { setModal(true); }}>Добавить продукт</MyButton>
        <MyButton onClick={() => auth.signOut()}>Выйти из аккаунта</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <ProductAddForm create={createProduct}/>
        </MyModal>
        <MyModal visible={modalEdit} setVisible={setModalEdit}>
            <ProductEditForm edit={editProduct} someObject={eProduct}/>
        </MyModal>

        
        <hr style={{margin: '15px 0'}} />
        <ProductFilter 
            filter={filter} 
            setFilter={setFilter} />
        {
            isLoading 
            ? <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}><Loader /></div>
            : <ProductList remove={removeProduct} edit={getProduct} products={searchedProducts} title="Каталог товаров"/>
        } 
        </div>
    )
}

export default Main
