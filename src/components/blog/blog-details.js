import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailsThunk } from "./blog-thunks";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { parseTime } from "./parseTime";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { userLikesFoodThunk } from "../likes/likes-thunks";

const BlogDetails = () => {
  const { bid } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const { blogById, loading, blogNotFoundError } = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogDetailsThunk(bid));
  }, []);

  console.log(blogById);
  const aDay = new Date(blogById.time).getTime();
  console.log(parseTime(aDay));
  return (
    <div>
      <Link to={-1} className={"text-decoration-none text-secondary"}>
        <i className="bi bi-arrow-left me-1"></i>Back
      </Link>
      <Container>
        {blogNotFoundError ? (
          <Alert variant="danger" className={"mt-5"}>
            <Alert.Heading>Blog not found!</Alert.Heading>
            <p>
              Please go back by clicking on the back icon or find another blog
              in the Blog tab.
            </p>
          </Alert>
        ) : (
          !loading && (
            <>
              <h1>{blogById.title}</h1>
              <div className={"text-secondary"}>
                {/*                    {*/}
                {/*                        blogById.author !== undefined &&*/}

                {/*                <span>By: <Link to={'/profile/' + blogById.author.authorId} className={' text-secondary'}>*/}
                {/*                    {blogById.author.authorName}*/}
                {/*                </Link></span> }*/}
                {blogById.author && (
                  <span>
                    <span>
                      By:{" "}
                      <Link
                        to={"/profile/" + blogById.author.authorId}
                        className={" text-secondary"}
                      >
                        {blogById.author.authorName}
                      </Link>
                    </span>
                    {/*<i onClick={() => {*/}
                    {/*    dispatch(userLikesFoodThunk(bid))*/}
                    {/*}} className={`${currentUser ? '' : 'd-none'} float-end bi bi-heart me-2`}></i>*/}
                  </span>
                )}
                <i className="bi bi-dot"></i>
                <span>{parseTime(blogById.time)}</span>
              </div>

              <hr />

              <ReactMarkdown children={blogById.blog} />
            </>
          )
        )}
      </Container>
    </div>
  );
};

export default BlogDetails;
