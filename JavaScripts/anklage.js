//create the request form html
   /*const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
    .then(FingerprintJS => FingerprintJS.load())*/

   var div2 = document.createElement("div2");
       div2.id = 'custominput1';
       div2.style.overflow = 'auto';
       div2.style.overflowX = 'hidden';
   
   var tbl = document.createElement("table1");
   var tbl1 = document.createElement("table1");
   var tbl2 = document.createElement("table1");
   var tbl3 = document.createElement("table1");

   var row6 = document.createElement("tr");

   var form1 = document.getElementById("form1");
   
   var saveBtn = document.createElement('img');
   var oImg = new Array();
   var aImg = document.createElement("img");
   var bImg = document.createElement("img");
   var tImg = document.createElement("img");
   var qrImg = document.createElement("img");
   var textEditor = new Array();
   var caller;

   var sides = 0;
   var selectedSide = 1;
   var txArea = new Array();
   var arrChoosed = [];
   var newDoc = false;


function anklage() {

   var row0 = document.createElement("tr");
   var row1 = document.createElement("tr");
   var row2 = document.createElement("tr");
   var row3 = document.createElement("tr");
   var row4 = document.createElement("tr");
   var row5 = document.createElement("tr");

   var cellText = document.createTextNode("Anklage Schrift");
   var cellText1 = document.createTextNode("Anklage Unterstützung");
   var cell1 = document.createElement("td2");
       cell1.appendChild(cellText);
   var cell2 = document.createElement("td2");
       cell2.appendChild(cellText1);
   
  
   for(var i=0;i<sides;i++) {
      if(i == 0) checked = true;
      row6.appendChild(createRadioElement('radio_'+(i+1), 'radioBtn', sides));
   }
   row0.appendChild(cell1);
   row0.appendChild(createImg('./Pictures/anklage_reading.png', 40, 40));
   row1.appendChild(createTxArea(0,'read','custominput',true,5000,40,120));
   row1.appendChild(createImg('./Pictures/newDoc.png', 20, 20));

   tbl1.appendChild(row0);
   tbl1.appendChild(row1);
   tbl1.appendChild(row6);

   row2.appendChild(cell2);
   row2.appendChild(createImg('./Pictures/anklage_writing.png', 40, 40));
   row3.appendChild(createAddForm('custominput1',false));
   tbl3.appendChild(row2);
   tbl3.appendChild(row3);
   
   row4.appendChild(tbl3);
   row5.appendChild(createImg('./Pictures/Mitstreiter.png', 160, 100));
   row5.appendChild(createEditField ('counterStyle', textEditor.length, 'Counter', ''));
   row5.appendChild(createImg('./Animation/animCounter/0001.png', 150, 150));
   
   tbl2.appendChild(row4);
   tbl2.appendChild(row5);
   
   tbl.appendChild(tbl1);
   tbl.appendChild(tbl2);

   div2.appendChild(tbl);
   var form1 = document.getElementById('form1');

   form1.appendChild(tbl); // appends <table> into <form1>

   requestSide(1);
}

async function runCounter(mitstreiter) {
    var n = 1;
    var n0 = '0000';
    var n1 = 1;

    while ( n <= mitstreiter) {
       
       var Sn = n0.substring(0,(4 -(""+n1).length)) + n1;
       
       aImg.setAttribute('src', "./Animation/animCounter/"+Sn+".png");
       textEditor[textEditor.length -1].value = n;
       await sleep(150);
       
      n++;
      n1++;
      
      if(!(""+parseFloat(n/50)).includes('.')) n1 = 1;
      
    }
    saveBtn.src = './Pictures/signBtn_closed.png';
}

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve,time || 1000);
    });
}

function createImg(path,height,width) {
    if(path.includes('anim')) {
        var cell = document.createElement("td1");
           aImg.setAttribute('src', path);
           aImg.setAttribute('name', 'oImg');
           aImg.setAttribute('height', height);
           aImg.setAttribute('width', width);
           cell.appendChild(aImg);
    }
    if(path.includes('newDoc')) {
        var cell = document.createElement("td1");
           bImg.setAttribute('src', path);
           bImg.setAttribute('name', 'bImg');
           bImg.style.visibility = 'hidden';
           bImg.setAttribute('height', height);
           bImg.setAttribute('width', width);
           bImg.addEventListener('click', (event) => {
              txArea[0].value = '';
              newDoc = true;
           });
           cell.appendChild(bImg);
    }
    if(path.includes('anklage')) {
       var n = 0;
       if(path.includes('writing')) n= 1;
       var cell = document.createElement("td1");
       oImg[n] = document.createElement("img");
       oImg[n].setAttribute('src', path);
       oImg[n].setAttribute('name', 'oImg');
       oImg[n].setAttribute('height', height);
       oImg[n].setAttribute('width', width);
       
       if(n == 0) {
          oImg[n].addEventListener('click', (event) => {
             
             if(event.target.src.includes('reading')) {
                event.target.src = event.target.src.replace('reading','writing');
                oImg[0].src = './Pictures/anklage_writing.png';
                txArea[0].disabled = false;
                bImg.style.visibility = 'visible';
             }
             else if(event.target.src.includes('writing')) {
                if(txArea[0].value !== '') {
                   caller = 'Deploy_Seite';

                   if(newDoc) {
                      while(row6.lastChild)
                            row6.removeChild(row6.lastChild);

                      sides = parseInt(sides) +1;

                      for(var i=0;i<sides;i++) {
                          var checked = false;
                          if(i == 0) checked = true;
                          row6.appendChild(createRadioElement('radio_'+(i+1), 'radioBtn', sides));
                      }

                      arrChoosed[0] = caller;
                      arrChoosed[1] = getActualDate();
                      arrChoosed[2] = sides;
                      arrChoosed[3] = txArea[0].value;

                      newDoc = false;
                   } else {
                      arrChoosed[0] = caller;
                      arrChoosed[1] = getActualDate();
                      arrChoosed[2] = selectedSide;
                      arrChoosed[3] = txArea[0].value;
                   }

                   httpPost('https://connectmdb.onrender.com/Anklage',arrChoosed);
                   //httpPost('http://localhost:3030/Anklage',arrChoosed);

                }
                event.target.setAttribute('src', event.target.src.replace('writing','reading'));
                oImg[0].src = './Pictures/anklage_reading.png';
                txArea[0].disabled = true;
                bImg.style.visibility = 'hidden';
             }

          });
       }
       cell.appendChild(oImg[n]);
    }
    if(path.includes('Mitstreiter')) {
       var cell = document.createElement("td1");
       tImg.setAttribute('src', path);
       tImg.setAttribute('name', 'tImg');
       tImg.setAttribute('height', height);
       tImg.setAttribute('width', width);
       cell.appendChild(tImg);
    }
    if(path.includes('QR_Code')) {
       var cell = document.createElement("td3");
       var qrImg = document.createElement("img");
       qrImg.setAttribute('src', path);
       qrImg.setAttribute('name', 'qrImg');
       qrImg.setAttribute('height', height);
       qrImg.setAttribute('width', width);
       qrImg.addEventListener('click', (event) => {


       });
       cell.appendChild(qrImg);
    }
    
  return cell;
}

function createTxArea(nr,name,style,mode,maxLen,col,row) {
    var cell = document.createElement("td1");
    txArea[nr] = document.createElement('textarea');
    txArea[nr].name = name;
    txArea[nr].value = ' ';
    txArea[nr].maxLength = maxLen;
    txArea[nr].cols = col;
    txArea[nr].rows = row;
    txArea[nr].className = "speekersWriter";
    txArea[nr].class = 'custominput';
    txArea[nr].id = style;
    txArea[nr].disabled = mode;
    txArea[nr].padding = '20px';
    txArea[nr].setAttribute("spell", false);
    txArea[nr].setAttribute("wrap", true);
    if(nr === 0)
       txArea[nr].addEventListener('focus', (event) => {
            
       })
   
    while (cell.childNodes.length >0) {
        cell.removeChild(cell.childNodes[0]);
    }
    

    cell.appendChild(txArea[nr]);
    
   return cell;
}

function createAddForm(style,mode) {
   var tab = document.createElement("table");
       tab.id = style;
   
   var cell = document.createElement("td1");
   var AddTyps = ["Titel","Name","Vorname","geb.","PLZ/ Ort","Str./Hausnr.","e-mail","Tel.Nr."];
   var AddIndex = ["Herr/Frau/Dr./Prof.","Mustermann","Sowieso","14.02.1962","88639/Musterstadt","Musterstr./18","smustermann@gmx.de","+49 123 26734436"];

   var rowSign = document.createElement("tr");
       rowSign.appendChild(createButton('./Pictures/signBtn_closed.png',110,45));


   for(var i=0;i<AddTyps.length;i++) {
      var row = document.createElement("tr");
      var coll = document.createElement("td4");
         
      var cellText = document.createTextNode(AddTyps[i]+": ");
      coll.appendChild(cellText);    
      
      row.appendChild(coll);
      row.appendChild(createEditField ('listTxStyle', i, AddTyps[i], AddIndex[i]));
      
      tab.appendChild(row);
      
   }

   tab.appendChild(rowSign);
   
   return tab;
}

function createButton(path,w,h) {
        
   var cell = document.createElement("td4");
    saveBtn.src = path;
    saveBtn.class = "SaveButton";
    saveBtn.id = "save";
    saveBtn.width = w;
    saveBtn.height = h;

    saveBtn.addEventListener('click', (event) => {

        if(event.target.src.includes('closed')) {
             event.target.src = event.target.src.replace('closed','open');
             saveBtn.src = './Pictures/signBtn_open.png';
             caller = 'Deploy_Mitklaeger';
             arrChoosed[0] = caller;
             arrChoosed[1] = getActualDate();
             for(var i=0;i<textEditor.length -1;i++)
                 arrChoosed[i+2] = textEditor[i].value;

             httpPost('https://connectmdb.onrender.com/Anklage',arrChoosed);
             //httpPost('http://localhost:3030/Anklage',arrChoosed);

             //getFingerPrint(selectedLenguage);
        } else {
             event.target.src = event.target.src.replace('open','closed')
             saveBtn.src = './Pictures/signBtn_closed.png';
          
        }

    })
    cell.appendChild(saveBtn);

  return cell;
}

function createRadioElement(value, name, checked) {
    
    var cell = document.createElement("td3");

    var radiobut = document.createElement('input');
        radiobut.type = 'radio';
        radiobut.checked = false;
        if(value.endsWith(checked))
           radiobut.checked = true;
        radiobut.name = name;
        radiobut.value = value;
        
        radiobut.addEventListener('click', (event) => {
            selectedSide = event.target.value.substring(event.target.value.lastIndexOf('_') +1);
            requestSide(selectedSide);
        })
    cell.appendChild(radiobut);
        
    return cell;
}

function createEditField (style, n, name, value) {
    var cell = document.createElement("td2");
    textEditor[n] = document.createElement('input');

	textEditor[n].type = "text";
	textEditor[n].name = name;
	textEditor[n].value = value;
        textEditor[n].id = style;
        textEditor[n].readonly = false;
        textEditor[n].addEventListener('click', (event) => { 
           event.target.value = '';
        })
    cell.appendChild(textEditor[n]);

    return cell;
}

function getActualDate() {
    var today = new Date();
    var dd = +(String(today.getDate()).padStart(2, '0'));
    var mm = +(String(today.getMonth() +1).padStart(2, '0'));
    var yyyy = +(today.getFullYear());

    yyyy = String(yyyy);
    if(mm < 10) mm = "0"+String(mm);
    else mm = String(mm);
    if(dd < 10) dd = "0"+String(dd);
    else dd = String(dd);

   return yyyy+mm+dd;
}

function requestSide(selected) {
   caller = 'Request_Seite';
   arrChoosed[0] = caller;
   arrChoosed[1] = selected;

   httpPost('https://connectmdb.onrender.com/Anklage',arrChoosed);
   //httpPost('http://localhost:3030/Anklage',arrChoosed);
}


async function httpPost(url, data) {
    event.preventDefault();
    var result;
	await fetch(url, {
	    method: "POST",
	    headers: {
	      "Content-Type": "application/json"
	    },
            body: JSON.stringify(data)
	    })
	    .then(res => {	if (res.status>=200 && res.status <300) {
	                    return res.json()
	                    } else {throw new Error();}
	    })
	    .then(data=> {result = data.body;
	                   //console.log(data)
	                  }	)

	    .catch(err=>console.log('fetch() failed'));

        if(result !== "" && caller.startsWith('Deploy')) {
           var list = result.split('-->');
           if(list.length > 1) {
              sides = list[0].replace('"','');
              //console.log("-->"+sides+"----"+list[0].replace('"','')+"----"+list[1].replace('"',''));

              runCounter(list[1].replace('"',''));
           }

        } else if(result !== "" && caller.startsWith('Request')) {
             var list = result.split('-->');
             if(list.length > 1) {
                sides = list[0].replace('"','');

                //console.log("cons "+sides+" -- "+list[0].replace('"','')+" -- "+list[1].replace('"',''));
                if(sides >= 1) {
                   while(row6.lastChild)
                         row6.removeChild(row6.lastChild);

                   for(var i=0;i<sides;i++)
                       row6.appendChild(createRadioElement('radio_'+(i+1), 'radioBtn', selectedSide));

                }

                for (var x=0;x<list[2].length;x++)
                       list[2] = list[2].replace('\\','°').replace('°n','\n').replace('\"','');

                   txArea[0].value = list[2];
                   if(selectedSide == 1)
                      runCounter(list[1].replace('"',''));
             }

        }

}