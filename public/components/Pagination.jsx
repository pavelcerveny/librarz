import React, { Component } from 'react';
import _ from 'lodash';

export default class Pagination extends Component {

    render() {

        const { activePage, sum, paginate, limit } = this.props

        if (activePage === -1){
            return (
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-sm">
                        <li className="disabled">
                            <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="disabled"><a href="#">1</a></li>
                        <li className="disabled">
                            <a href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            );
        }

        var pagNum = Math.ceil(sum/limit);

        /*
         * Pagination explanation
          * 1. in Redux state fetchedBooks is:
          *     - sum = sum of all fetched books
          *     - limit = number limit for fetching items
          *     - activePage = current page we are at
          *         - default value = -1 -> fetched rand books at the beginning
          *         - after successful search, page is set to 0 as a first page
          *
          * 2. for page value -1 is returned no pagination
            3. pagNum = number of rendered num boxes (parts of pagination) [eg. 12 items = 2 lists of items (limit=10 on one page), 2 parts of pagination]
            4. when activePage is 0 or is equal to ( pagNum - 1 ) then li gets class of disabled
            5. every hyperlink has an event listener paginate(), which takes number of next page -> dispatches a function
         */

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-sm">
                    <li className={activePage === 0 ? 'disabled' : ''}>
                        <a href="#" aria-label="Previous" onClick={() => paginate(activePage-1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {_.times(pagNum, i =>
                        <li key={i} className={activePage == (i) ? 'disabled' : ''}>
                            <a href="#" onClick={() => paginate(i)}>{i+1}</a>
                        </li>
                    )}
                    <li className={activePage === (pagNum-1) || sum === 0 ? 'disabled' : ''}>
                        <a href="#" aria-label="Next" onClick={() => paginate(activePage+1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

        );
    }
}
