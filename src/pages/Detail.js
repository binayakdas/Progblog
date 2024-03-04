import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';

const Detail = ({setActive}) => {
  const {id} = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({id: doc.id, ...doc.data()})));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };
    getBlogsData();
  }, [])

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  }

  return (
    <div className="single">
      <div className="blog-title-box" 
      style={{backgroundImage: `url('${blog?.imgUrl}')`}}>
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <div className="blogContainer">
              <div className="blogBox">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start">{blog?.description}</p>
              </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="tagContainer">
                <div className="tagBox">
              <Tags tags={tags} />
              </div>
              </div>
              <div className="mostPopularContainer">
                <div className="mostPopularBox">
                <MostPopular blogs={blogs} />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail