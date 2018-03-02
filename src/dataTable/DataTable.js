import React, {Component} from 'react';
import ReactTable from 'react-table';

import './DataTable.scss';

class DataTable extends Component {

  state = {
    settingsBar: 'none',
    checkboxes: []
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
        accessor: 'id', // String-based value accessors!
        className: 'md-checkbox',
        Cell: props => {
          return (
            <div>
              <input
                type="checkbox"
                onClick={this.clickCheckbox}
                id={`checkbox-${props.original.id}`} />
              <label
                htmlFor={`checkbox-${props.original.id}`} />
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
        accessor: 'author' // String-based value accessors!
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
        Header: 'Počet stran',
        accessor: 'pages',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
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
            data={data}
            columns={columns}
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
                  } else {
                    console.log(rowInfo.original.url);
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
