import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { createEntryIndex,setIsEdit } from '../../actions/actions';
import './Home.css';

function Home() {

    const navigateToForm = useNavigate();
    const dispatch = useDispatch();
    const activeAccountInfo = useSelector((state) => state.form.activeAccountInfo);
    var formEntries = useSelector((state) => state.form.formData[activeAccountInfo]);

    const onSubmit = () => {
        dispatch(createEntryIndex(activeAccountInfo));
        dispatch(setIsEdit(true));
        navigateToForm('/form');
    };


    return (
        <div>
         <div>   
            <div className="row">
                <div className="col-lg-3 col-md-4 offset-lg-9 offset-md-8">
                    <button className="btn add-data-btn" onClick={onSubmit}>Add New Data</button>
                </div>
            </div>

            <div className="row">
            {formEntries !== undefined && formEntries.map((item, index) => (
                <div className=" col-lg-4 col-md-6 col-sm-12" key={index}>
                    <div className="box bg-white custom-box">
                        <div className="table-container">    
                            <table style={{ borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                    <td style={{ color: '#5d33fb', fontWeight: 'bold', textAlign:'left' }}>Patient Name:</td>
                                    <td style={{ textAlign: 'center' }}>{item.p_name}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ color: '#5d33fb', fontWeight: 'bold', textAlign:'left' }}>Patient Address:</td>
                                    <td style={{ textAlign: 'center' }}>{item.p_address}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ color: '#5d33fb', fontWeight: 'bold', textAlign:'left' }}>Date of Service:</td>
                                    <td style={{ textAlign: 'center' }}>{item.dateofservice}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ color: '#5d33fb', fontWeight: 'bold', textAlign:'left' }}>Amount:</td>
                                    <td style={{ textAlign: 'center' }}>{item.amount}</td>
                                    </tr>
                                    <tr>
                                    <td style={{ color: '#5d33fb', fontWeight: 'bold', textAlign:'left' }}>Bill:</td>
                                    <td style={{ textAlign: 'center' }}>{item.file_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br/>
                </div>
                ))}
            </div>
        </div>
        </div>
    );

}

export default Home;