let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    // const nameError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        try {
            checkName(name.value);
            setTextValue('.text-error', "");
        } catch (e) {
            setTextValue('.text-error', e);
        }
    });



const date = document.querySelector('#date');
date.addEventListener('input', function() {
    let startDate = getInputValueId('#day') + " " + getInputValueId('#month') + " " + getInputValueId('#year');
    try {
        checkStartDate(new Date(Date.parse(startDate)));
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
    }
});

const salary = document.querySelector('#salary');
setTextValue('.salary-output', salary.value);
salary.addEventListener('input', function(){
    setTextValue('.salary-output', salary.value);
});

document.querySelector('#cancelButton').href = site_properties.home_page;
checkForUpdate(); 

});



const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    try{
        setemployeePayrollObj();
        if (site_properties.use_local_storage.match("true")) {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        }
        else {
            createAndUpdateEmployeePayroll();
        }
    }catch (e) {
        return;
    }
}



const setForm = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true")) {
        employeePayrollObj.id = createNewEmployeeId();
    }
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=Profile]', employeePayrollObj._Profilepic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#salary', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}



const createAndUpdateEmployeePayroll = () => {
    let postURL =site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate) {
        methodCall = "PUT";
        postURL = postURL + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall, postURL, true, employeePayrollObj)
    .then(responseText => {
        resetForm();
        window.location.replace(site_properties.home_page);
    })
    .catch(error => {
        throw error;
    });
}




// const createEmployeePayRroll = () => {
//     try {
//         checkName(name.value);
//         setTextValue('.text-error', "");
//     } catch (e) {
//         setTextValue('.text-error', e);
//     }

    

//     employeePayroll.profilePic = getSelectedValue('[name=profile]').pop();
//     employeePayroll.gender = getSelectedValue('[name=gender]').pop();
//     employeePayroll.department = getSelectedValue('[name=department]');
//     employeePayroll.salary = getInputValueId('#salary');
//     employeePayroll.notes = getInputValueId('#notes');
//     employeePayroll.id = new Date().getTime()+1;
//     return employeePayroll;
// }

// const getInputValueId = (id) => {
//     return document.querySelector(id).value;
// }

// const setTextValue = (id, message) => {
//     const textError = document.querySelector(id);
//     textError.textContent = message;
// }
// const getSelectedValue = (propertyValue)=> {
//     let allItem = document.querySelectorAll(propertyValue);
//     let setItem = [];
//     allItem.forEach(item=>{
//         if(item.checked == true){
//             setItem.push(item.value);
//         }
//     })
//     return setItem;
// }


//localStorage-----------------------------
function createAndUpdateStorage(employeePayroll){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollObj);
    }else{
        employeePayrollList = [employeePayrollObj]
    }    
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
    alert(JSON.stringify(employeePayrollList));
}



// const setSelectedValues = (propertyValue, value) => {
//     let allItems = document.querySelectorAll(propertyValue);
//     allItems.forEach(item => {
//         if(Array.isArray(value)) {
//             if (value.includes(item.value)) {
//                 item.checked = true;
//             }
//         }
//         else if (item.value === value)
//             item.checked = true;
//     })
// }





// //create reset form
// const resetForm = () => {
//     setValue('#name','');
//     unsetSelectedValues('[name=Profile]');
//     unsetSelectedValues('[name=gender]');
//     unsetSelectedValues('[name=department]');
//     setValue('#salary','');
//     setValue('#notes','');
//     setValue('#day', 0);
//     setValue('#month', 0);
//     setValue('#year', 0);
// }
// const unsetSelectedValues = (propertyValue) =>{
//     let allItems = document.querySelectorAll(propertyValue);
//     allItems.forEach(item =>{
//         item.checked = false;
//     });
// }
// const setValue = (id, value) =>{
//     const element = document.querySelector(id);
//     element.value = value;
// }
// const setSelectedIndex = (id, index) => {
//     const element = document.querySelector(id);
//     element.selectedIndex = index;
// }
// const checkForUpdate = () => {
//     const employeePayrollJson = localStorage.getItem('editEmp');
//     isUpdate = employeePayrollJson ? true : false;
//     if(!isUpdate) return;
//     employeePayrollObj = JSON.parse(employeePayrollJson);
//     setForm();
// }
