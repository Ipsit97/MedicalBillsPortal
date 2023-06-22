import React from 'react';
import { useState,useEffect } from 'react';
import { useForm,  Controller } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { updateFormData, setIsEdit, addFormData } from '../../actions/actions';
import Calendar from 'react-calendar';
import './Form.css';
import 'react-calendar/dist/Calendar.css';


function Form() {
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
    const navigateToSummary = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateOfService, setDateOfService] = useState(''); 
    const navigateToForm = useNavigate();
    const dispatch = useDispatch();
    const activeEntryIndex = useSelector((state) => state.form.createEntryIndex);
    const activeAccountInfo = useSelector((state) => state.form.activeAccountInfo);
    var formEntries = useSelector((state) => state.form.formData[activeAccountInfo]);
    const isEditVal = useSelector((state) => state.form.isEdit);
    const receivedFormData = (formEntries === undefined || formEntries[activeEntryIndex] === undefined) ? {} : formEntries[activeEntryIndex];
    const today = new Date();

    function onChangeDate (calDate) {
        if(calDate)
        {
            setDateOfService(calDate.toLocaleDateString());
            setShowCalendar(false);
        }
    }

    const onSubmit = (formData) => {
        console.log('Form submitted!');
        console.log('Form data:', formData);

        formData.dateofservice = new Date(formData.dateofservice).toLocaleDateString();

        const file = formData.bill_photo[0].name;
        formData.file_name = file;
        delete formData.bill_photo;

        if(formEntries === undefined)
            formEntries = {};

        if(formEntries.length - 1 === activeEntryIndex)
        {
            dispatch(updateFormData({activeEntryIndex,formData, activeAccountInfo}));
        }
        else
        {
            dispatch(addFormData({activeAccountInfo,formData}));
        }
        dispatch(setIsEdit(false));
        navigateToSummary('/summary');
    };


    const onEdit = () => {
        dispatch(setIsEdit(true));
        navigateToForm(-1);
      };
    
    const checkValReceivedData =() => {
        if(receivedFormData.dateofservice !== undefined)  
            return receivedFormData.dateofservice;
        return '';    
    }

    const isDateDisabled = (date) => {
        return date > today;
    };
    
    useEffect(() => {

        if (receivedFormData) {
            Object.keys(receivedFormData).forEach((fieldName) => {
              setValue(fieldName, receivedFormData[fieldName]);
            });
          }
      }, [receivedFormData]);


  return (
    <div className='d-flex justify-content-center custom-box'>   

        <form onSubmit={handleSubmit(onSubmit)}>
            
            {isEditVal && <h4 style={{color:"#7E77E5"}}>Please Enter the Details:</h4>}
            {!isEditVal && <h4 style={{color:"#7E77E5"}}>Please Confirm the Details</h4>}
            <br/>

            {/* Patient Name Field */}
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                    Patient Name:
                </label>  

                <div className="col-sm-8">
                    <input type="text" className="form-control" 
                    disabled={!isEditVal}
                    {...register("p_name",{required: 'Full name is required',
                    pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Only alphabet characters are allowed',}})} 
                    />
                    {errors.p_name && <p style={{color:"red"}}>{errors.p_name.message}</p>}
                </div>
            </div>  
            <br />

            {/* Patient Address Field */}
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                    Patient Address:
                </label>  

                <div className="col-sm-8">
                    <input type="text" className="form-control"  
                    disabled={!isEditVal}
                    {...register("p_address",{ required: true })} 
                    />
                    {errors.p_address && <span style={{color:"red"}}>Address is required</span>}
                </div>    
            </div>  
            <br/>

            {/* Date Of Service Field */}
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                    Date of Service:
                </label> 

                <div className="col-sm-8">

                    {( <Controller control={control} name="dateofservice"
                    rules={{ required: true }} render={({ field }) => (
                    <> 
                    <input type="text" className="form-control" onClick={() => setShowCalendar(true)}
                    value={dateOfService!=="" ? dateOfService : checkValReceivedData(receivedFormData)} 
                    disabled ={!isEditVal}
                    onChange={field.onChange} readOnly />
                    {errors.dateofservice && <span style={{color:"red"}}>Date is required</span>}
                    </>)}
                    />)}

                    {showCalendar && ( <div className="calendar-popup">
                    <Controller control={control} name="dateofservice" render={({ field }) => (
                    <Calendar className="form-control" 
                    onChange={(date) => {
                    field.onChange(date);
                    onChangeDate(date);
                    }}
                    value={dateOfService!=='' ? dateOfService : checkValReceivedData(receivedFormData)} 
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    />
                    )}
                    />
                    </div> )}
                </div>
            </div>
            <br />

            {/* Hospital Name Field */}
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                Hospital Name:
                </label>

                <div className="col-sm-8">
                    <input type="text" className="form-control" 
                    disabled={!isEditVal}
                    {...register("hospital_name",{ required: true })} />
                    {errors.hospital_name && <span style={{color:"red"}}>Hospital Name is required</span>}
                </div>    
            </div>  
            <br />

            {/* Amount Field */}
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                    Amount:
                </label>  
                <div className="col-sm-8">
                    <input type="text" className="form-control" placeholder="$" 
                    disabled ={!isEditVal}
                    {...register("amount",{ required: 'Amount is required',
                    pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Only numbers or decimal values are allowed',
                    },
                    })} />
                    {errors.amount && <p style={{color:"red"}}>{errors.amount.message}</p>}
                </div>    
            </div>
            <br />  

            {/* File Upload Field             */}
            <div className="form-group row">
                <label className="col-sm-4 col-form-label">
                    Upload Bill:
                </label>  
                <div className="col-sm-8">
                    <input type="file" className="form-control" 
                    disabled = {!isEditVal}
                    {...register("bill_photo",{ required: 'File is required',
                    validate: {
                    allowedTypes: (value) => {
                        const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
                        const fileExtension = value?.[0]?.name?.split('.').pop().toLowerCase();
                        return allowedExtensions.includes(fileExtension) || 'Only PDF, JPG, JPEG, PNG files are allowed';},
                    },})} 
                    accept=".pdf,.jpg,.jpeg,.png"/>
                    {!isEditVal && <p>Selected File Name : {receivedFormData.file_name}</p>}
                    {errors.bill_photo && <p style={{color:"red"}}>{errors.bill_photo.message}</p>}
                </div>  
            </div>
            <br />

            {/* Buttons */}
            {isEditVal && <button type="submit" className="btn btn-custom">Submit</button>}
            {!isEditVal && <button type="submit" className="btn btn-custom" onClick={onEdit}>Edit</button>}

        </form>
    </div>  

  );
}

export default Form;
