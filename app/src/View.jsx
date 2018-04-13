import React, {Component} from "react";
import _ from "lodash";
// Import React Table
import ReactTable from "react-table";
import { formatDate } from "./Utils";
import { Nav } from 'reactstrap';
import "react-table/react-table.css";
import {getPaymentDetail, removeEntry} from "./database";
import './App.css';
import XlsExport from "./xls-export";
import {
    Link
  } from 'react-router-dom'

const requestData = (filteredData,pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          var selectedValue = nextFilter.value.toLowerCase().split(",");
          //console.log(row[nextFilter.id], selectedValue);
          return selectedValue.includes((row[nextFilter.id] + "").toLowerCase());
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};


class View extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filterList:{
        "DATE": [],
		"CH/FTO NO": [],
		"V.NO.": [],
		"VILLAGE": [],
		"BILL DETAIL": [],
		"WORK NAME": []
        },
        filteredData:[],
        pages: null,
        loading: true,
        selectedOption: { value: 'four', label: 'Four' }
    };
    this.fetchData = this.fetchData.bind(this);
  }
  filterRawData = (rawData) => {
    let filterList = {
        "DATE": [],
        "CHFTO": [],
		"CHFTONO": [],
		"BILLNO": [],
		"VILLAGE": [],
		"WORKTYPE": [],
		"WORKNAME": []
    };
    let filteredData = [];
    var dataKeys= Object.keys(rawData);
    dataKeys.forEach((key, index) => {
        const obj = rawData[key];
        obj.key = key;
        obj.DATE = formatDate(obj.DATE, "dd/mm/yyyy");
        filteredData.push(obj);
        let value = obj["DATE"];
        if(value && !filterList["DATE"].includes(value)){
            filterList["DATE"].push(value);
        }
        value = obj["CHFTONO"];
        if(value && !filterList["CHFTONO"].includes(value)){
            filterList["CHFTONO"].push(value);
        }
        value = obj["CHFTO"];
        if(value && !filterList["CHFTO"].includes(value)){
            filterList["CHFTO"].push(value);
        }
        value = obj["BILLNO"];
        if(value && !filterList["BILLNO"].includes(value)){
            filterList["BILLNO"].push(value);
        }
        value = obj["VILLAGE"];
        if(value && !filterList["VILLAGE"].includes(value)){
            filterList["VILLAGE"].push(value);
        }
        value = obj["WORKNAME"];
        if(value && !filterList["WORKNAME"].includes(value)){
            filterList["WORKNAME"].push(value);
        }
        value = obj["WORKTYPE"];
        if(value && !filterList["WORKTYPE"].includes(value)){
            filterList["WORKTYPE"].push(value);
        }
    });
    this.setState({
        filterList,
        filteredData
    })
  }
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });

    getPaymentDetail("20172018").then((res) => {
        this.filterRawData(res.val());
        requestData(
        this.state.filteredData,
        state.pageSize,
        state.page,
        state.sorted,
        state.filtered
        ).then(res => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
            data: res.rows,
            pages: res.pages,
            loading: false
        });
        });
    });
  }
  _handleDeleteEntry = (event) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
    if(!isConfirmed){
        return false;
    }
    const key = event.target.getAttribute("data-key");
    const index = event.target.getAttribute("data-index");
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({
        data
    })
    removeEntry(key, "20172018");
  }
  
  _handleExportToExcel = () => {
    const xls = new XlsExport(this.state.data, "PaymentDetails");
    xls.exportToXLS('paymentDetails-'+ Date.now() +'.xls')
    
  }
  render() {
    const { data, pages, loading } = this.state;
    
    return (
        <div className="App-intro">
            <ReactTable
            columns={[
                {
                Header: (
                    <p>
                    <strong>Total Entry:</strong>{" "}
                    <span>{data.length + "  |  "}</span>
                    <strong>Total Amount:</strong>{" "}
                    <span>{_.reduce(data, (prev, curr) => prev + (isNaN(curr.AMOUNT) ? 0 : parseInt(curr.AMOUNT || 0, 10)), 0)}</span>
                    <input type="button" className="form-control primary" value="export To Excel" Style="width:200px;" onClick={this._handleExportToExcel}/>
                    </p>
                ),
                columns:[
                    {
                    Header: "ACTION",
                    Cell: (props) => {
                        console.log(props);
                            return <div>
                                <Nav>
                                    <Link Style="float: left;width: 55px;margin-right: 5px;" type="button" className="form-control primary" to={"/edit/"+props.original.key.toString()}>Edit</Link> 
                                    <input Style="float: left;width: 70px;" type="button" className="form-control primary" value="Delete" data-key={props.original.key.toString()} onClick={ this._handleDeleteEntry } data-index={props.index}/>                                
                                </Nav>                                
                            </div>
                        }
                    },
                    {
                    Header: "Date",
                    accessor: "DATE",
                    Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                    <option value="">Show all</option>
                    {
                        _.map(this.state.filterList["DATE"], value => 
                        <option value={value}>{value}</option>
                        )
                    }
                    </select>
                    },
                    {
                    Header: "CH/FTO",
                    accessor: "CHFTO",
                    Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                    <option value="">Show all</option>
                    {
                        _.map(this.state.filterList["CHFTO"], value => 
                        <option value={value}>{value}</option>
                        )
                    }
                    </select>
                    },
                    {
                    Header: "CH/FTO NO",
                    accessor: "CHFTONO",
                    Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                    <option value="">Show all</option>
                    {
                        _.map(this.state.filterList["CHFTONO"], value => 
                        <option value={value}>{value}</option>
                        )
                    }
                    </select>
                    },
                    {
                    Header: "BILL DETAIL",
                    accessor: "BILLNO",
                    Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                    <option value="">Show all</option>
                    {
                        _.map(this.state.filterList["BILLNO"], value => 
                        <option value={value}>{value}</option>
                        )
                    }
                    </select>
                    },
                    {
                    Header: "VILLAGE",
                    id: "VILLAGE",
                    accessor: d => d.VILLAGE,
                    Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                    <option value="">Show all</option>
                    {
                        _.map(this.state.filterList["VILLAGE"], value => 
                        <option value={value}>{value}</option>
                        )
                    }
                    </select>
                    },
                    {
                    Header: "WORK TYPE",
                    accessor: "WORKTYPE",
                    Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                    <option value="">Show all</option>
                    {
                        _.map(this.state.filterList["WORKTYPE"], value => 
                        <option value={value}>{value}</option>
                        )
                    }
                    </select>
                    },
                    {
                    Header: "WORK NAME",
                    accessor: "WORKNAME",
                    Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                    <option value="">Show all</option>
                    {
                        _.map(this.state.filterList["WORKNAME"], value => 
                        <option value={value}>{value}</option>
                        )
                    }
                    </select>
                    },
                    {
                    Header: "WORK DETAILS",
                    accessor: "WORKDETAIL"
                    },
                    {
                    Header: "Amount",
                    accessor: "AMOUNT"
                    },
                    {
                    Header: "NOTE",
                    accessor: "NOTE"
                    }

                ]
                }
            ]}
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            pages={pages} // Display the total number of pages
            loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            filterable
            defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            defaultPageSize={500}
            pageSizeOptions={[5, 10, 20, 25, 50, 100, 500, 1000]}
            className="-striped -highlight"
            style={{
                height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
            }}
            />
        </div>       
    );
  }
}

export default View;
