import React, {Component} from 'react';
import ReactTable from 'react-table';
import ReactTablePagination from './Pagination';

import './DataTable.scss';
import dataJson from './data.json';

class DataTable extends Component {

  state = {
    settingsBar: 'none',
    checkboxes: [],
    setColumns: 'var1',
    index: 0,
    columns: {
      var2: [
        {
          Header: '',
          accessor: '_id', // String-based value accessors!
          className: 'md-checkbox',
          Cell: props => {
            return (
              <div>
                <input
                  type="checkbox"
                  onClick={this.clickCheckbox}
                  id={`checkbox-${props.original['_id']}`} />
                <label
                  htmlFor={`checkbox-${props.original['_id']}`} />
              </div> // Custom cell components!
            );
          }

        },
        {
          Header: 'Název knihy',
          accessor: 'bookName', // String-based value accessors!
          Cell: props => {
            if (props.index === 0) {
              return <input type="text" value={props.value} />;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Autor',
          accessor: 'authors', // String-based value accessors!
          Cell: props => {
            if (props.index === 0) {
              return <input type="text" value={props.value} />;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Kategorie',
          accessor: 'category', // String-based value accessors!
          Cell: props => {
            if (props.index === 0) {
              return <input type="text" value={props.value} />;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Umístění',
          accessor: 'location', // String-based value accessors!
          Cell: props => {
            if (props.index === 0) {
              return <input type="text" value={props.value} />;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Datum',
          accessor: 'inputDate.$$date',
          Cell: props => {
            if (props.index === 0) {
              return <input type="date" value={this.formatDate(props.value)} />;
            } else {
              return <span>{props.value}</span>
            }
          } // Custom cell components!
        },
        /*      {
                id: 'friendName', // Required because our accessor is not a string
                Header: 'Friend Name',
                accessor: d => d.friend.name // Custom value accessors!
              },
              {
                Header: props => <span>Friend Age</span>, // Custom header components!
                accessor: 'friend.age'
              },*/
        {
          Header: '',
          accessor: 'settings', // String-based value accessors!
          className: 'data-table-ellipsis',
          Cell: () => <i className="fa fa-ellipsis-h" aria-hidden="true"/>// Custom cell components!
        }
      ],
      var1: [
        {
          Header: '',
          accessor: '_id', // String-based value accessors!
          className: 'md-checkbox',
          Cell: props => {
            return (
              <div>
                <input
                  type="checkbox"
                  onClick={this.clickCheckbox}
                  id={`checkbox-${props.original['_id']}`} />
                <label
                  htmlFor={`checkbox-${props.original['_id']}`} />
              </div> // Custom cell components!
            );
          }

        },
        {
          Header: 'Název knihy',
          accessor: 'bookName' // String-based value accessors!
        },
        {
          Header: 'Autor',
          accessor: 'authors' // String-based value accessors!
        },
        {
          Header: 'Kategorie',
          accessor: 'category' // String-based value accessors!
        },
        {
          Header: 'Umístění',
          accessor: 'location' // String-based value accessors!
        },
        {
          Header: 'Datum',
          accessor: 'inputDate.$$date',
          Cell: props => <span className='number'>{this.formatDate(props.value)}</span> // Custom cell components!
        },
        /*      {
                id: 'friendName', // Required because our accessor is not a string
                Header: 'Friend Name',
                accessor: d => d.friend.name // Custom value accessors!
              },
              {
                Header: props => <span>Friend Age</span>, // Custom header components!
                accessor: 'friend.age'
              },*/
        {
          Header: '',
          accessor: 'settings', // String-based value accessors!
          className: 'data-table-ellipsis',
          Cell: () => <i className="fa fa-ellipsis-h" aria-hidden="true"/>// Custom cell components!
        }
      ]
    }
  };

  formatDate = (timestamp) => {
    const date = new Date(timestamp);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    // return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
  };

  clickCheckbox = (event) => {
    const id = event.target.id;

    if (event.target.checked) {
      this.setState((prevState, props) => {
        return {
          settingsBar: 'flex',
          checkboxes: [...prevState.checkboxes, id]};
      });
    } else {
      this.setState((prevState, props) => {
        const changedState = prevState.checkboxes.filter(o => o !== id);
        return {
          checkboxes: changedState,
          settingsBar: changedState.length === 0 ? 'none' : 'flex'
        };
      });
    }
  };

  render() {
    const data = [
      {
        bookName: 'Honzíkova cesta',
        author: 'Tanner Linsley',
        category: 'Dobrodružné',
        location: 'C4',
        url: '/book/honzikova-cesta',
        pages: 120,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        },
        id: 1
      },
      {
        bookName: 'Řeč těla',
        author: 'Linda Linsley',
        category: 'Odborné',
        url: '/book/rec-tela',
        location: 'D2',
        pages: 256,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        },
        id: 2
      },
    ];

    const columns = [
      {
        Header: '',
        accessor: '_id', // String-based value accessors!
        className: 'md-checkbox',
        Cell: props => {
          return (
            <div>
              <input
                type="checkbox"
                onClick={this.clickCheckbox}
                id={`checkbox-${props.original['_id']}`} />
              <label
                htmlFor={`checkbox-${props.original['_id']}`} />
            </div> // Custom cell components!
          );
        }

      },
      {
        Header: 'Název knihy',
        accessor: 'bookName' // String-based value accessors!
      },
      {
        Header: 'Autor',
        accessor: 'authors' // String-based value accessors!
      },
      {
        Header: 'Kategorie',
        accessor: 'category' // String-based value accessors!
      },
      {
        Header: 'Umístění',
        accessor: 'location' // String-based value accessors!
      },
      {
        Header: 'Datum',
        accessor: 'inputDate.$$date',
        Cell: props => <span className='number'>{this.formatDate(props.value)}</span> // Custom cell components!
      },
/*      {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
      },*/
      {
        Header: '',
        accessor: 'settings', // String-based value accessors!
        className: 'data-table-ellipsis',
        Cell: () => <i className="fa fa-ellipsis-h" aria-hidden="true"/>// Custom cell components!
      }
    ];

    const columns2 = [
      {
        Header: '',
        accessor: '_id', // String-based value accessors!
        className: 'md-checkbox',
        Cell: props => {
          return (
            <div>
              <input
                type="checkbox"
                onClick={this.clickCheckbox}
                id={`checkbox-${props.original['_id']}`} />
              <label
                htmlFor={`checkbox-${props.original['_id']}`} />
            </div> // Custom cell components!
          );
        }

      },
      {
        Header: 'Název knihy',
        accessor: 'bookName' // String-based value accessors!
      },
      {
        Header: 'Autor',
        accessor: 'bookName' // String-based value accessors!
      },
      {
        Header: 'Kategorie',
        accessor: 'bookName' // String-based value accessors!
      },
      {
        Header: 'Umístění',
        accessor: 'location' // String-based value accessors!
      },
      {
        Header: 'Datum',
        accessor: 'inputDate.$$date',
        Cell: props => <span className='number'>{this.formatDate(props.value)}</span> // Custom cell components!
      },
      /*      {
              id: 'friendName', // Required because our accessor is not a string
              Header: 'Friend Name',
              accessor: d => d.friend.name // Custom value accessors!
            },
            {
              Header: props => <span>Friend Age</span>, // Custom header components!
              accessor: 'friend.age'
            },*/
      {
        Header: '',
        accessor: 'settings', // String-based value accessors!
        className: 'data-table-ellipsis',
        Cell: () => <i className="fa fa-ellipsis-h" aria-hidden="true"/>// Custom cell components!
      }
    ];
    return (
      <div className="row">
        <div className="data-table">
          <h2 style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>Data table</h2>
          <div className='settings-bar' style={{display: this.state.settingsBar}}>
            <ul>
              <li><i className="fa fa-trash" aria-hidden="true"/></li>
            </ul>
          </div>
          <ReactTable
            PaginationComponent={ReactTablePagination}
            data={dataJson}
            columns={this.state.columns[this.state.setColumns]}
            className="-striped -highlight"
            minRows={2}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  // execute React-table internal function if necessary
                  if (handleOriginal) {
                    handleOriginal()
                  }
                  const tagName = e.target.tagName.toLowerCase();
                  if (tagName === 'label' || tagName === 'input' || tagName === 'i') {
                    console.log('checkbox');
                    console.log(instance);
                    if (tagName === 'input' && e.target.checked) {
                      this.setState((prevState, props) => {

                        if (prevState.setColumns === 'var1') {
                          return {setColumns: 'var2'};
                        } else {
                          return {setColumns: 'var1'};
                        }
                      });
                      instance.forceUpdate();
                    }

                  } else {
                    const url = `/edit/book/${rowInfo.original['_id']}`;
                    console.log(url);
                  }

                }
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default DataTable;
