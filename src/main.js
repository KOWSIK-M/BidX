export function callApi(method, url, data, callbacksuccess, callbackerror)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(data);

    xhttp.onreadystatechange = function(){
        if(this.readyState === 4)
        {
            if(this.status === 200)
                callbacksuccess(this.responseText);
            else
                callbackerror("Error: 404 - Service not available");
        }
    };
}
//callApiFileUpload
export function callApiFileUpload(method, url, data, callbackSuccess, callbackError) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    // Don't set Content-Type header
    
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200)
                callbackSuccess(this.responseText);
            else
                callbackError("Error: " + this.status + " - Service not available");
        }
    };

    // Send FormData object as the request body
    xhttp.send(data);
}


export function errorResponse(res)
{
    alert(res);
}

export function setSession(sname, svalue, exp)
{
    var d = new Date();
    d.setTime(d.getTime() + (exp * 600000));
    document.cookie = sname + "=" + svalue + ";expires=" + d.toUTCString() + ";path=/";
}

export function getSession(sname)
{
    sname += "=";
    var decoddedCookie = decodeURIComponent(document.cookie);
    var sn = decoddedCookie.split(";");
    for(var i=0; i< sn.length; i++)
    {
        var s = sn[i];
        while(s.charAt(0) === ' ')
            s = s.substring(1);
        if(s.indexOf(sname) === 0)
            return s.substring(sname.length, s.length);
    }
    return "";
}


