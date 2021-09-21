import React, {useMemo, useState, useRef} from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import { MyButton } from './components/UI/Button/MyButton';
import { MyInput } from './components/UI/Input/MyInput';
import MySelect from './components/UI/Select/MySelect';
import './styles/App.css';

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'zz 1', body: 'aa'},
        {id: 2, title: 'xx 2', body: 'bb'},
        {id: 3, title: 'ww 3', body: 'cc'}
    ])
    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');



    const sortedPosts = useMemo(()=> {
        if(selectedSort)
        {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return posts;
    }, [selectedSort, posts]);

    const sotredAndSeachedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        console.log(sort);
        
    }
    
  return (
    <div className="App">
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}} />
        <div>
            <MyInput 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
            />
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue='Сортировка'
                options={[ 
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}    
                ]}
            />
        </div>
        {
            sotredAndSeachedPosts.length
            ? <PostList remove={removePost} posts={sotredAndSeachedPosts} title="Посты про JS"/> 
            : <h1 style={{textAlign:'center'}}>Посты не найдены!</h1>
        }
        
    </div>
  );
}

export default App;
