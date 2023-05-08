import React,{useEffect} from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "./styles.css";
import Rate from "./Rate";
import Actions from "./Actions";
import ReactDOM from 'react-dom';


function AImodels() {
   const ObjectId = (id) =>
   {
	   return ""+id;
   }
   const strToObj = (str) => 
   {
		return eval('('+str+')');
   }
   useEffect(() => {
      const xhttp = new XMLHttpRequest();
	  xhttp.onload = function() {
		  let data = JSON.parse(this.responseText);
		  const tbody = document.querySelector("Tbody");
		  data = strToObj(data["content"]);
		  for (let i = 0; i < data.length; i++){
			  const newRow = document.createElement("Tr");
			  const descriptionCell = document.createElement("Td");
			  const rateCell = document.createElement("Td");
			  const actionsCell = document.createElement("Td");
			  descriptionCell.innerHTML = data[i]["description"];
			  ReactDOM.render(<Rate id = {data[i]["_id"]} />, rateCell);
		      ReactDOM.render(<Actions id = {data[i]["_id"]} />, actionsCell);
			  newRow.appendChild(descriptionCell);
			  newRow.appendChild(rateCell);
			  newRow.appendChild(actionsCell);
			  tbody.appendChild(newRow);
		  }
		  };
	  xhttp.open("POST", "http://127.0.0.1:5000/api/getModels", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhttp.send();
    }, []);
	
	return (
	 <div  className="tab">
	  <Table>
	    <Thead>
		 <Tr>
		  <Th>DESCRIPTION</Th>
		  <Th>Rate</Th>
		  <Th>ACTIONS</Th>
		 </Tr>
		</Thead>
		<Tbody>
		</Tbody>
	  </Table>
	 </div>
	);

}
export default AImodels;