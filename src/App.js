import React, {useMemo, useEffect, useState, useRef} from 'react';
import PostService from './API/PostService';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import { PostFilter } from './components/PostFilter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import { MyButton } from './components/UI/Button/MyButton';
import { MyInput } from './components/UI/Input/MyInput';
import { Loader } from './components/UI/Loader/Loader';
import { MyModal } from './components/UI/Modal/MyModal';
import MySelect from './components/UI/Select/MySelect';
import { usePosts } from './hooks/usePosts';
import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const sotredAndSeachedPosts = usePosts(posts, filter.sort, filter.query)
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }

    async function fetchPosts() {
        setIsPostsLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
            setIsPostsLoading(false);
        }, 1000)
        
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    
  return (
    <div className="App">
        <MyButton onClick={()=> fetchPosts()}>Test</MyButton>
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Создать пользователя</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
        </MyModal>
        
        <hr style={{margin: '15px 0'}} />
        <PostFilter 
            filter={filter} 
            setFilter={setFilter} />
        
        {
            isPostsLoading 
            ? <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}><Loader /></div>
            : <PostList remove={removePost} posts={sotredAndSeachedPosts} title="Посты про JS"/>
        } 
    </div>
  );
}

export default App;
