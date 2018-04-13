import React from 'react';
import {Col, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { addPaymentDetail, getPaymentEntry, updatePaymentDetail } from "./database";
import PropTypes from "prop-types"

class Add extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            DATE: "",
            CHFTO:"CH",
            CHFTONO:"",
            BILLNO:"",
            VILLAGE:"Adri",
            WORKTYPE:"LABOUR",
            WORKNAME:"BNRGSK",
            WORKDETAIL:"",
            AMOUNT:"",
            NOTE:"",
            YEAR: "20172018"
        }
        if(props.match.params.key){
            getPaymentEntry(props.match.params.key, "20172018").then((res) => {
                const entryVal = res.val();
                this.setState({
                    DATE: entryVal.DATE,
                    CHFTO:entryVal.CHFTO,
                    CHFTONO:entryVal.CHFTONO,
                    BILLNO:entryVal.BILLNO,
                    VILLAGE:entryVal.VILLAGE,
                    WORKTYPE:entryVal.WORKTYPE,
                    WORKNAME:entryVal.WORKNAME,
                    WORKDETAIL:entryVal.WORKDETAIL,
                    AMOUNT:entryVal.AMOUNT,
                    NOTE:entryVal.NOTE,
                    YEAR: "20172018"
                });
            });
        }
    }
    setDefaultValue = () => {
        this.setState({
            DATE: "",
            CHFTO:"CH",
            CHFTONO:"",
            BILLNO:"",
            VILLAGE:"Adri",
            WORKTYPE:"LABOUR",
            WORKNAME:"BNRGSK",
            WORKDETAIL:"",
            AMOUNT:"",
            NOTE:"",
            YEAR: "20172018"
        });
    }
    _handleAddPaymentDetail = () => {
        const { DATE,
            CHFTO,
            CHFTONO,
            BILLNO,
            VILLAGE,
            WORKTYPE,
            WORKNAME,
            WORKDETAIL,
            AMOUNT,
            NOTE,
            YEAR,
        } = this.state;
        const modelData = {DATE,
            CHFTO,
            CHFTONO,
            BILLNO,
            VILLAGE,
            WORKTYPE,
            WORKNAME,
            WORKDETAIL,
            AMOUNT,
            NOTE,
            YEAR,
        };
        if(this.props.match.params.key){
            updatePaymentDetail(modelData, this.props.match.params.key).then(() => {
                this.setState({
                    showSuccess:true,
                    successMessage: "Updated Successfully."
                });
                window.scrollTo(500, 0);
                this.setDefaultValue();            
            });
        } else {
            addPaymentDetail(modelData).then(() => {
                this.setState({
                    showSuccess:true,
                    successMessage: "Saved Successfully."
                });
                window.scrollTo(500, 0);
                this.setDefaultValue();            
            });
        }
    }
    _handleDateChange = (event) => {
        this.setState({
            "DATE": event.target.value
        });
    }
    _handleChFTOChange = (event) => {
        this.setState({
            "CHFTO": event.target.value
        });
    }
    _handleChFTONOChange = (event) => {
        this.setState({
            "CHFTONO": event.target.value
        });
    }
    _handleVillageChange = (event) => {
        this.setState({
            "VILLAGE": event.target.value
        });
    }
    _handleBillNoChange = (event) => {
        this.setState({
            "BILLNO": event.target.value
        });
    }
    _handleWorkTypeChange = (event) => {
        this.setState({
            "WORKTYPE": event.target.value
        });
    }
    _handleWorkNameChange = (event) => {
        this.setState({
            "WORKNAME": event.target.value
        });
    }
    _handleWorkDetailChange = (event) => {
        this.setState({
            "WORKDETAIL": event.target.value
        });
    }
    _handleAmountChange = (event) => {
        this.setState({
            "AMOUNT": event.target.value
        });
    }
    _handleNoteChange = (event) => {
        this.setState({
            "NOTE": event.target.value
        });
    }
    
    _handleYearChange = () => {

    }
  render() {
    const villageList = [ "Adri",
        "Ajotha",
        "Ambaliyala",
        "Badalpara",
        "Bhalpara",
        "Bherala",
        "Bhetali",
        "Bij",
        "Bolas",
        "Chamoda",
        "Chanduvav",
        "Chhapri (Khandheri)",
        'Chhatroda',
        'Dabhor',
        'Dari',
        'Deda',
        'Govindpara',
        'Gunvantpur',
        'Hasnavadar',
        'Inaj',
        'Indroi',
        'Ishvariya',
        'Kajli',
        'Khandheri',
        'Kherali',
        'Kindarva',
        'Kodidara',
        'Kukras',
        'Lumbha',
        'Malondha',
        'Mandor',
        'Mathasuriya',
        'Meghpur',
        'Mithapur',
        'Moraj',
        'Nakhada',
        'Navadra',
        'Navapara',
        'Paldi',
        'Pandva',
        'Patan',
        'Rampara',
        'Sarasva',
        'Savni',
        'Sidokar',
        'Simar',
        'Sonariya',
        'Supasi',
        'Tantivela',
        'Ukadiya',
        'Umba',
        'Umrala',
        "Vadodra dodiya",
        "Vavdi Adri"
    ];
    const workTypeList = [
        "LABOUR",
        "MATERIALS",
        "ADMIN"
    ];
    const workName = [
        'BNRGSK',
        'ROAD EARTH WORK',
        'C.TOILET',
        'TOILET',
        'L.D.',
        'F.P. WALL',
        'PMAY'
    ];
    return (
        <div className="App-intro">
            <Form>
                {this.state.showSuccess && 
                    <Alert color="success">
                        {this.state.successMessage}
                    </Alert>
                }
                <div className="col col-sm-6">
                <FormGroup row>
                    <Label for="selch" sm={4}>Select Year</Label>
                    <Col sm={8}>
                        <Input type="select" name="ch" id="selch" onChange={ this._handleYearChange } value={this.state.YEAR}>
                            <option value="20152016">2015-2016</option>
                            <option value="20162017">2016-2017</option>
                            <option value="20172018">2017-2018</option>
                            <option value="20182019">2018-2019</option>
                            <option value="20192020">2019-2020</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="txtDate">DATE</Label>
                    <Col sm={8}>
                        <Input type="date" name="date" id="txtDate" placeholder="Select Date"  onChange={ this._handleDateChange } value={this.state.DATE} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="selch">CH/FTO</Label>
                    <Col sm={8}>
                        <Input type="select" name="ch" id="selch" onChange={ this._handleChFTOChange } value={this.state.CHFTO}>
                        <option value="CH">CH</option>
                        <option value="FTO">FTO</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="txtchno">CH/FTO NO.</Label>
                    <Col sm={8}>
                        <Input type="number" name="CHNO" id="txtchno" placeholder="Enter CH/FTO NO." onChange={ this._handleChFTONOChange } value={this.state.CHFTONO}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="txtbillno">BILL NO.</Label>
                    <Col sm={8}>
                        <Input type="text" name="billno" id="txtbillno" placeholder="Enter BILL NO." onChange={ this._handleBillNoChange } value={this.state.BILLNO}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="selvillage">VILLAGE</Label>
                    <Col sm={8}>
                        <Input type="select" name="village" id="selvillage" onChange={ this._handleVillageChange } value={this.state.VILLAGE}>
                        {
                            villageList.map((village, index) => {
                                return <option value={village}>{village}</option>;
                            })
                        }
                        </Input>
                    </Col>
                </FormGroup>
                </div>
                <div className="col col-sm-6">
                <FormGroup row>
                    <Label sm={4} for="selworktype">WORK TYPE</Label>
                    <Col sm={8}>
                        <Input type="select" name="worktype" id="selworktype" onChange={ this._handleWorkTypeChange } value={this.state.WORKTYPE}>
                        {
                            workTypeList.map((work, index) => {
                                return <option value={work}>{work}</option>;
                            })
                        }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="selworkname">WORK NAME</Label>
                    <Col sm={8}>
                        <Input type="select" name="workname" id="selworkname" onChange={ this._handleWorkNameChange } value={this.state.WORKNAME}>
                        {
                            workName.map((work, index) => {
                                return <option value={work}>{work}</option>;
                            })
                        }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="txtworkdetails">WORK DETAILS</Label>
                    <Col sm={8}>
                        <Input type="text" name="workdetails" id="txtworkdetails" placeholder="Enter Work Details" onChange={ this._handleWorkDetailChange } value={this.state.WORKDETAIL}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="txtamount">AMOUNT</Label>
                    <Col sm={8}>
                        <Input type="number" name="amount" id="txtamount" placeholder="Enter Amount" onChange={ this._handleAmountChange } value={this.state.AMOUNT} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4} for="txtnote">NOTE</Label>
                    <Col sm={8}>
                        <Input type="textarea" name="note" id="txtnote" onChange={ this._handleNoteChange } value={this.state.NOTE} />
                    </Col>
                </FormGroup>
                </div>
                <Input type="button" className="primary" value="Submit" onClick={ this._handleAddPaymentDetail }/>
            </Form>
        </div>
    );
  }
}
Add.propTypes = {
    key: PropTypes.string
}

Add.defaultProps={
    key:""
}
export default Add;
