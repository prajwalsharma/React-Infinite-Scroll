import "./styles.css";
import { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      currentPage: 0
    };
  }

  componentDidMount() {
    this.fetchInitialData(0);
  }

  fetchInitialData = (page) => {
    let offset = page * 20;
    setTimeout(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        .then((res) => {
          let oldPosts = this.state.posts;
          if (oldPosts == null) {
            oldPosts = res.data.results;
          } else {
            Array.prototype.push.apply(oldPosts, res.data.results);
          }

          this.setState({ posts: oldPosts }, () => console.log(oldPosts));
        });
    }, 5000);
  };

  fetchMoreData = () => {
    this.setState(
      {
        currentPage: this.state.currentPage + 1
      },
      () => {
        this.fetchInitialData(this.state.currentPage);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <h1>React Infinite Scroll</h1>
        {this.state.posts && (
          <div>
            <InfiniteScroll
              dataLength={this.state.posts.length}
              className="pokemon-container"
              next={this.fetchMoreData}
              hasMore={true}
              loader={<div className="">Loading...</div>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {this.state.posts &&
                this.state.posts.length > 0 &&
                this.state.posts.map((post, index) => {
                  return (
                    <div key={index} className="pokemon-card">
                      <h3>#{index + 1}</h3>
                      <h4>{post.name}</h4>
                    </div>
                  );
                })}
            </InfiniteScroll>
          </div>
        )}
      </div>
    );
  }
}

export default App;
