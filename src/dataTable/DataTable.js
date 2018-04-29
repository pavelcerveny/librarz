import React, {Component} from 'react';
import ReactTable from 'react-table';
import ReactTablePagination from './Pagination';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './DataTable.scss';
import 'react-datepicker/dist/react-datepicker.css';
import dataJson from './data.json';

class DataTable extends Component {


  getSortedComponent(id) {
    // console.log('getSortedComponent sorted:',this.state.sorted);
    let sortInfo = this.state.sorted.filter(item => item.id === id);
    if (sortInfo.length) {
      // console.log('getSortedComponent sortInfo:',sortInfo[0].desc);
      if (sortInfo[0].desc === true) return <i className="fa fa-long-arrow-down" aria-hidden="true" />;
      if (sortInfo[0].desc === false) return <i className="fa fa-long-arrow-up" aria-hidden="true" />;
    }
    return <i />;
  }

  genericHeaderArrows = () => {
    return {
      Header: props => {
        const Sorted = this.getSortedComponent(props.column.id);
        return (
          <span>
              {props.column.headerText} {Sorted}
            </span>
        );
      },
      headerStyle: { boxShadow: "none" }
    };
  };

  state = {
    settingsBar: 'none',
    checkboxes: [],
    setColumns: 'var1',
    index: 0,
    sorted: [],
    columns: {
      var2: [
        {
          Header: '',
          accessor: '_id', // String-based value accessors!
          className: 'md-checkbox',
          Cell: props => {
            return (
              <div id="table-checkbox">
                <input
                  type="checkbox"
                  onClick={(event) => {this.clickCheckbox(event, props.index)}}
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
            if (props.index === this.state.index) {
              return <input type="text" value={props.value} onChange={() => {}} />;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Autor',
          accessor: 'authors', // String-based value accessors!
          Cell: props => {
            if (props.index === this.state.index) {
              return <input type="text" value={props.value} onChange={() => {}} />;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Kategorie',
          accessor: 'category', // String-based value accessors!
          Cell: props => {
            if (props.index === this.state.index) {
              return <input type="text" value={props.value} onChange={() => {}} />;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Umístění',
          accessor: 'location', // String-based value accessors!
          Cell: props => {
            if (props.index === this.state.index) {
              return <input type="text" value={props.value} onChange={() => {}}/>;
            } else {
              return <span>{props.value}</span>
            }
          }
        },
        {
          Header: 'Datum',
          accessor: 'inputDate.$$date',
          Cell: props => {
            if (props.index === this.state.index) {
              return <DatePicker
                selected={moment(props.value)}
                onChange={() => {}}
                dateFormat="DD.M.YYYY"
              />;
            } else {
              return <span>{moment(props.value).format('DD.M.Y')}</span>
            }
          }
        },
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
              <div id="table-checkbox">
                <input
                  type="checkbox"
                  onClick={(event) => {this.clickCheckbox(event, props.index)}}
                  id={`checkbox-${props.original['_id']}`} />
                <label
                  htmlFor={`checkbox-${props.original['_id']}`} />
              </div> // Custom cell components!
            );
          }

        },
        {
          ...this.genericHeaderArrows(),
          headerText: 'Název knihy',
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
          Cell: props => <span className='number'>{moment(props.value).format('DD.M.Y')}</span> // Custom cell components!
        },
        {
          Header: '',
          accessor: 'settings', // String-based value accessors!
          className: 'data-table-ellipsis',
          Cell: () => <i className="fa fa-ellipsis-h" aria-hidden="true"/>// Custom cell components!
        }
      ]
    }
  };

  clickCheckbox = (event, index) => {
    const id = event.target.id;

    if (event.target.checked) {
      this.setState((prevState, props) => {
        return {
          settingsBar: 'flex',
          checkboxes: [...prevState.checkboxes, id],
          index
        };
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
                  // console.log(e.target.classList);
                  if (tagName === 'label' || tagName === 'input' || tagName === 'i') {
                    if (tagName === 'input' && e.target.parentElement.id === 'table-checkbox') {
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
            sorted={this.state.sorted}
            onSortedChange={sorted => this.setState({ sorted })}
          />
        </div>
      </div>
    );
  }
}

export default DataTable;
