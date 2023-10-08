/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var token = "90931630|-31949332885731447|90961820";
var baseUrl = "http://api.login2explore.com:5577";
var dbName = "Student-Data";
var relName = "STD-REL";
document.getElementById("stdSave").disabled=true;

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    console.log(lvData.rec_no);
    localStorage.setItem("rec_no",lvData.rec_no);
}

function validateAndGetFormData() {
            var stdRoll = $("#rollNo").val();
            if(stdRoll===""){
                alert("Invalid Roll No");
                $("#stdRoll-msg").focus();
                return "";
            }
            var stdName = $("#stdName").val();
            if(stdName===""){
                alert("Invalid NAME");
                $("#stdName").focus();
                return "";
            }
            var stdClass = $("#stdClass").val();
            if(stdClass===""){
                alert("Invalid Class");
                $("#stdClass").focus();
                return "";
            }
            var stdDoB = $("#stdDoB").val();
            if(stdDoB===""){
                alert("Invalid DoB");
                $("#stdDoB").focus();
                return "";
            }
            var stdAddr = $("#stdAddr").val();
            if(stdAddr===""){
                alert("Invalid Addr");
                $("#stdAddr").focus();
                return "";
            }
            var stdEnrDate = $("#stdEnrDate").val();
            if(stdEnrDate===""){
                alert("Invalid EnrDate");
                $("#stdEnrDate").focus();
                return "";
            }
    
            var jsonStrObj = {
                stdRoll : stdRoll,
                stdName : stdName,
                stdClass : stdClass,
                stdDoB : stdDoB,
                stdAddr : stdAddr,
                stdEnrDate : stdEnrDate
            };
            return JSON.stringify(jsonStrObj);
}

function resetStudent(){
    $("#rollNo").val("");
    $("#stdName").val("");
    $("#stdClass").val("");
    $("#stdDoB").val("");
    $("#stdAddr").val("");
    $("#stdEnrDate").val("");
    $("#rollNo").focus();
    $("#stdSave").prop("disabled",true);
     $("#stdUpdate").prop("disabled",true);
        $("#stdReset").prop("disabled",true);
    
}

function fillForm(jsonObj){
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#rollNo").val(data.stdRoll);
    $("#stdName").val(data.stdName);
    $("#stdClass").val(data.stdClass);
    $("#stdDoB").val(data.stdDoB);
    $("#stdAddr").val(data.stdAddr);
    $("#stdEnrDate").val(data.stdEnrDate);
}

function checkRoll(){    
    var rollNo = $("#rollNo").val();
    console.log(rollNo);
    var jsonObjStr = {
        "stdRoll" : rollNo
    };
    
    var temp = JSON.stringify(jsonObjStr);
    var val = createGET_BY_KEYRequest(token,dbName,relName,temp,true,true);
    jQuery.ajaxSetup({async : false});
    var resultObj = executeCommandAtGivenBaseUrl(val,baseUrl,"/api/irl");
    jQuery.ajaxSetup({async : true});
    console.log(val);
    console.log(resultObj);
    
    if(resultObj.status===400){
        $("#stdSave").prop("disabled",false);
        $("#stdReset").prop("disabled",false);
        $("#stdName").focus();
    }
    else{
        $("#stdSave").prop("disabled",true);
        fillForm(resultObj);
        $("#stdUpdate").prop("disabled",false);
        $("#stdReset").prop("disabled",false);
        $("#stdName").focus();
    }
    
}
function updateStudent(){
    $("#stdUpdate").prop("disabled",true);
    jsonChg = validateAndGetFormData();
    console.log(localStorage.getItem("rec_no"));
    var updateRequest = createUPDATERecordRequest(token,jsonChg,dbName,relName,localStorage.getItem("rec_no"));
    console.log(updateRequest);
    jQuery.ajaxSetup({async : false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,baseUrl,"/api/iml");
    console.log(resJsonObj);
    jQuery.ajaxSetup({async : true});
    resetStudent();
    $("#rollNo").focus();
}

function saveStudent(){
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        console.log("helo world");
        return;
    }
    var putReqStr = createPUTRequest(token,jsonStr, "Student-Data", "STD-REL");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
                        baseUrl, "/api/iml");
                alert(JSON.stringify(resultObj));
                jQuery.ajaxSetup({async: true});
    resetStudent();
}

