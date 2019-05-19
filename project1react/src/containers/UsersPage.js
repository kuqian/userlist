import React, { Component } from 'react';
import User from '../components/User'
import Th from '../components/UI/Th'
import Loader from 'react-loader-spinner';
//import ReactPaginate from 'react-paginate';
import Spinhead from '../assets/spinhead.gif';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from "../redux/actions";
class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      sortMap: {
        firstName: [false, true, "First Name"],
        lastName: [false, true, "Last Name"],
        sex: [false, true, "Sex"],
        age: [false, true, "Age"],
        initParam: []
      },
      curSortParam: "initParam",
      currentPage: 0
    }
  }
  componentDidMount() {
    this.props.getUsers();
  }
  handleInputChange = (event) => {
    this.setState({
      searchText: event.target.value,
      currentPage: 0
    });
  }
  handleSort = (sortParam) => {
    const { curSortParam, sortMap } = this.state;
    console.log("sortParam: " + sortParam);
    console.log("oldParam: " + curSortParam);
    if (curSortParam === sortParam) {
      const temp = [...sortMap[sortParam]];
      temp[1] = !temp[1];
      this.setState({
        sortMap: {
          ...sortMap,
          [sortParam]: temp
        }
      });
    } else {
      this.setState({
        sortMap: {
          ...sortMap,
          [curSortParam]: [false, true, sortMap[curSortParam][2]],
          [sortParam]: [true, true, sortMap[sortParam][2]]
        },
        curSortParam: sortParam
      })
    }
  }
  toFirstPage = () => {
    this.setState({
      currentPage: 0
    })
  }
  toPrevPage = () => {
    this.setState({
      currentPage: this.state.currentPage - 1
    });
  }
  toNextPage = () => {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  }
  toLastPage = (pageCount) => {
    this.setState({
      currentPage: pageCount - 1
    });
  }
  gotoCreatePage = () => {
    this.props.history.push("/create");
  }
  render() {
    console.log("inside user page render function");
    const { users, httpError, isLoading } = this.props;
    const { searchText, sortMap, curSortParam, currentPage } = this.state;

    let displayUsers = users.filter(
      (ele) => {
        return ele.firstName.indexOf(searchText) > -1 ||
          ele.lastName.indexOf(searchText) > -1 ||
          ele.sex.indexOf(searchText) > -1
      }
    );
    if (curSortParam !== "initParam") {
      displayUsers.sort((a, b) => {
        if (curSortParam !== "age") {
          const ret = a[curSortParam].localeCompare(b[curSortParam]);
          return sortMap[curSortParam][1] ? ret : -ret;
        }
        const ret = parseInt(a.age) - parseInt(b.age);
        return sortMap.age[1] ? ret : -ret;
      });
    }

    const ITEMS_PER_PAGE = 10;
    const pageCount = Math.ceil(displayUsers.length / ITEMS_PER_PAGE);
    displayUsers = displayUsers.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);
    const pc = [false, false, false, false];
    pc[0] = currentPage === 0;
    pc[1] = currentPage === 0;
    pc[2] = currentPage + 1 >= pageCount;
    pc[3] = currentPage + 1 >= pageCount;
    if (httpError) {
      return (
        <div className="userpage-container">
          <div className="error-container">
            <img src={Spinhead} className="error-img" alt="spinhead" />
            <p className="error-msg">
            oops, error: {httpError.response && httpError.response.data}, code: {httpError.response && httpError.response.status}
            </p>
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div className="userpage-container">
          <div className="loader-container">
            <Loader type="CradleLoader" color="#somecolor" height={80} width={80} />
          </div>
          <p className="loading-msg">Getting most up-to-date users list, please wait</p>
        </div>
      );
    }
    return (
      <div className="userpage-container">
        <div className="search-container">
          <h2>Users</h2>
          <label htmlFor="input">Search: </label>
          <input
            className="search-input"
            type="text"
            placeholder="search text"
            id="input"
            value={searchText}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Edit</th>
                <th>Delete</th>
                {
                  Object.keys(sortMap).slice(0, Object.keys(sortMap).length - 1).map((ele) => {
                    return (
                      <Th
                        key={ele}
                        title={sortMap[ele][2]}
                        inUse={sortMap[ele][0]}
                        inOrder={sortMap[ele][1]}
                        click={() => this.handleSort(ele)}
                      />
                    );
                  })
                }
              </tr>
            </thead>
            <tbody>
              {displayUsers
                .map((ele) => {
                  return (
                    <User
                      firstName={ele.firstName}
                      lastName={ele.lastName}
                      sex={ele.sex}
                      age={ele.age}
                      key={ele._id}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="pagebar-container">
          <button className="page-nav" onClick={this.toFirstPage} disabled={pc[0]}>&#60;&#60;</button>
          <button className="page-nav" onClick={this.toPrevPage} disabled={pc[1]}>&#60;</button>
          <button className="page-nav cur-page">{currentPage + 1}/{pageCount}</button>
          <button className="page-nav" onClick={this.toNextPage} disabled={pc[2]}>&#62;</button>
          <button className="page-nav" onClick={() => this.toLastPage(pageCount)} disabled={pc[3]}>&#62;&#62; ({pageCount})</button>
        </div>
        <div className="newbtn-container">
          <button onClick={this.gotoCreatePage} className="new-btn"><i className="fas fa-user"></i> Create New User</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
    httpError: state.usersReducer.error,
    isLoading: state.usersReducer.isLoading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(actions.getUsers())
  }
}
const UsersPageWithRouter = withRouter(UsersPage);
export default connect(mapStateToProps, mapDispatchToProps)(UsersPageWithRouter);